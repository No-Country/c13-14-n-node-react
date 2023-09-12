const nodemailer = require('nodemailer');

const smtpService = process.env.SMTP_SERVICE
const smtpHost = process.env.SMTP_HOST
const smtpPort = process.env.SMTP_PORT
const smtpAccount = process.env.SMTP_ACCOUNT
const smtpPassword = process.env.SMTP_PASSWORD


const transproter = nodemailer.createTransport({
  service: smtpService, 
  auth: {
      user: smtpAccount,
      pass: smtpPassword,
  },
})

/* const transproter = nodemailer.createTransport({
  host: smtpHost,
  port: smtpPort,
  secure: true, 
  auth: {
      user: smtpAccount,
      pass: smtpPassword,
  },
}) */

module.exports = {transproter}