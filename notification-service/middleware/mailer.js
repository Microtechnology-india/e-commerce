const nodemailer = require('nodemailer');

let transporter;

// Create a dummy mock transporter instantly
nodemailer.createTestAccount((err, account) => {
  if (err) {
    console.error('Failed to create a testing account', err);
    return;
  }

  console.log('--- Mock Mailer Config Active ---');
  console.log('Using ephemeral test credentials. Gmail bypassed.');
  console.log('---------------------------------');

  transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
      user: account.user,
      pass: account.pass
    }
  });

  transporter.verify((error) => {
    if (error) console.error('Mock validation failed:', error);
    else console.log('Mock Email Server is ready to simulate routing');
  });
});

// Wrapper to handle lazy loading since account creation is async
module.exports = {
  sendMail: async (mailOptions) => {
    if (!transporter) {
      // Small fallback delay if a request hits instantly on boot
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    const info = await transporter.sendMail(mailOptions);
    console.log(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`);
    return info;
  }
};