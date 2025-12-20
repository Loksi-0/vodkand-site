import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'
import router from './router/router.js'
import ErrorMiddeware from './middlewares/ErrorMiddeware.js'
import DeleteAccountManager from './managers/DeleteAccountManager.js'
import session from 'express-session'
import rateLimit from 'express-rate-limit'

const app = express()

const PORT = process.env.PORT || 5000
const isProd = process.env.NODE_ENV === 'production'

const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 50,
    standardHeaders: true,
    legacyHeaders: false
})
const mailLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    message: 'Слишком много запросов на активацию, попробуйте чуть позже'
})
const refreshLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  standardHeaders: true,
  legacyHeaders: false
})

app.set('trust proxy', 1)

app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}))
app.use(express.json())
app.use(cookieParser())
app.use(session({
  name: 'sid',
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: isProd,
    sameSite: 'lax',
    maxAge: 24 * 60 * 60 * 1000
  }
}))

app.use('/api/auth', authLimiter)
app.use('/api/sendmail', mailLimiter)
app.use('/api/refresh', refreshLimiter)

app.use('/uploads', express.static('uploads'))
app.use('/api', router)
app.use(ErrorMiddeware)

const start = async () => {
    try {
        await mongoose.connect(process.env.DB_URL)
        
        app.listen(PORT, () => {
            console.log('сервер запустился на порте ', PORT)
            new DeleteAccountManager()
        })
    } catch(e) {
        console.log(e.message)
    }
}

start()