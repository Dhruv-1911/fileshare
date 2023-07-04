const nodemailer = require("nodemailer")

async function sendMail({from , To , subject , text , html}){
    const transporter = nodemailer.createTransport({
        service:"gmail",
        port: 587,
        secure: false,
        auth:{
            user:'kakadiyadhruv868@gmail.com',
            pass:'utqwoqoihstfyugp'
        },
    })
    const info = await transporter.sendMail({
        from,
        to:To,
        subject,
        text,
        html
    })
}

module.exports = sendMail;