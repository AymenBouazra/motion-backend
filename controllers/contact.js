const nodemailer = require('nodemailer');

exports.contact = async (req, res) => {
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        })
        await transporter.sendMail({
            from: `${req.body.fullname}<${process.env.EMAIL}>`,
            to: req.body.email,
            subject: `<${req.body.fullname}> : ${req.body.subject}`,
            html: `<p>${req.body.message}</p>`
        })
        res.send({ message: 'Reset password mail sent successfully.' })
    } catch (error) {
        res.status(500).json({ message: 'error server' })
    }
}