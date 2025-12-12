import nodemailer from 'nodemailer'
import 'dotenv/config'

class MailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            }
        })
    }

    async sendActivationMail(to, link) {
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject: 'Активация | Vodkand',
            text: '',
            html: 
                `
                    <div style="width: 100%; 
                        text-align: center;
                        margin-top: 50px;
                        margin-bottom: 50px;"
                    >
                        <h1 style="max-width: 250px;
                            text-align: center; 
                            color: black;
                            line-height: 120%; 
                            margin: 0 auto 50px auto;"
                        >
                            Активируйте аккаунт на сайте Vodkand
                        </h1>
                        
                        <a href="${link}"
                            style="background-color: #62E27D;
                            font-size: 18px;
                            border: none;
                            border-radius: 20px;
                            padding: 20px;
                            text-align: center;
                            text-decoration: none;
                            color: black;
                            display: inline-block;"
                        >
                            Активировать аккаунт
                        </a>
                    </div>
                `
        })
    }
}

export default new MailService()