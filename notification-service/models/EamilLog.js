const mongoose = require('mongoose')

const emailLogSchema = new mongoose.Schema({
  recipient: { 
    type: String, 
    required: true,
    match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address']
  },
  subject: { type: String, required: true },
  body: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['PENDING', 'SENT', 'FAILED'], 
    default: 'PENDING' 
  },
  messageId: { type: String }, // Returned by SMTP provider on success
  errorDetails: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('EmailLog', emailLogSchema);