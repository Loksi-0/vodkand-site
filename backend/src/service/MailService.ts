import nodemailer from 'nodemailer'
import getEnv from '../helpers/getEnv.js'
import SMTPTransport from 'nodemailer/lib/smtp-transport/index.js'
import type { OrderDocument } from '../models/Order.js'
import User from '../models/User.js'

class MailService {
  private transporter: nodemailer.Transporter

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: getEnv('SMTP_HOST'),
      port: Number(getEnv('SMTP_PORT')),
      secure: false,
      auth: {
        user: getEnv('SMTP_USER'),
        pass: getEnv('SMTP_PASSWORD')
      }
    }) satisfies SMTPTransport.Options
  }

  sendActivationMail = async (to: string, link: string) => {
    await this.transporter.sendMail({
      from: getEnv('SMTP_USER'),
      to,
      subject: 'Активация | Vodkand',
      text: '',
      html: `
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

  sendSuccessNotification = async (order: OrderDocument) => {
    const user = await User.findById(order.user)

    const fullfillmentDate = order.fullfillmentDate
      ? order.fullfillmentDate.toLocaleDateString('ru-RU', {
          timeZone: 'Europe/Moscow'
        })
      : 'Отсутствует'

    await this.transporter.sendMail({
      from: getEnv('SMTP_USER'),
      to: getEnv('MY_EMAIL'),
      subject: 'Новая продажа!',
      text: '',
      html: `
        <h1>Приобретён товар: ${order.description}</h1>
        <ul>
            <li>Сумма заказа: ${order.value}</li>
            <li>Email покупателя: ${String(user?.email)}</li>
            <li>
                Дата создания заказа: ${order.creationDate.toLocaleDateString('ru-RU', { timeZone: 'Europe/Moscow' })}
            </li>
            <li>
                Дата выполнения заказа: ${fullfillmentDate}
            </li>
        </ul>
      `
    })
  }
}

export default new MailService()
