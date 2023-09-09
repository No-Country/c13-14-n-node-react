const { APP_FRONT_URL_VALIDATE } = require('../config/constants')
const { transproter } = require('../config/mailer')
const { createToken } = require('../libs/token')

const sendRegisterNotification = ( { idUser, email } )=>{
    const expiresIn ='3h' // El token para validar caduca en 3hs
    const token = createToken({ idUser, email },{expiresIn})
    const link = `${APP_FRONT_URL_VALIDATE}?token=${token}`
    transproter.sendMail({
        from:`"Unilink" <${process.env.SMTP_ACCOUNT}>`,
        to:email,
        subject: 'Confirmación de registro',
        html:`
            <a href=${link} >
                ACTIVA TU CUENTA
            </a>
        `
    })
    return true
}

const sendWelcomeMessage = ({email})=>{
    transproter.sendMail({
        from:`"Unilink" <${process.env.SMTP_ACCOUNT}>`,
        to:email,
        subject: 'Bienvenido a UNILINK',
        html:`
            <h2>Ya podes acceder a tu cuenta</h2>
        `
    })
}

module.exports = { sendRegisterNotification, sendWelcomeMessage }