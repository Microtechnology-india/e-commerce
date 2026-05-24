const EmailLog = require('../models/EamilLog')
const transporter = require('../middleware/mailer')

exports.sendEmail = async (req, res) => {
  const { to, subject, message } = req.body;

  if (!to || !subject || !message) {
    return res.status(400).json({ error: 'Missing required fields: to, subject, message' });
  }

  // 1. Initialize the audit entry
  const log = new EmailLog({
    recipient: to,
    subject,
    body: message
  });
  await log.save();

  try {
    // 2. Dispatch email
    const info = await transporter.sendMail({
      from: process.env.FROM_EMAIL,
      to,
      subject,
      text: message, // Plain text fallback
      html: `${message}` // Simple HTML wrapping
    });

    // 3. Update log to SENT
    log.status = 'SENT';
    log.messageId = info.messageId;
    await log.save();

    return res.status(200).json({
      success: true,
      message: 'Email dispatched successfully',
      messageId: info.messageId
    });

  } catch (error) {
    // 4. Record the exception
    log.status = 'FAILED';
    log.errorDetails = error.message;
    await log.save();

    return res.status(500).json({
      success: false,
      error: 'Email delivery failed',
      details: error.message
    });
  }
};