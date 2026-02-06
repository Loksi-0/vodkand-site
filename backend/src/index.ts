import './env.js'
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'
import router from './router/router.js'
import ErrorMiddleware from './middlewares/ErrorMiddleware.js'
import DeleteAccountManager from './managers/DeleteAccountManager.js'
import session from 'express-session'
import rateLimit from 'express-rate-limit'
import MongoStore from 'connect-mongo'
import envChecker from './managers/EnvChecker.js'
import getEnv from './helpers/getEnv.js'

envChecker()

const app = express()

const PORT = Number(getEnv('PORT')) || 5000
const isProd = getEnv('NODE_ENV') === 'production'

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 50,
  standardHeaders: true,
  legacyHeaders: false
})
const mailLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: 'Слишком много запросов на активацию, попробуйте чуть позже'
})
const refreshLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  standardHeaders: true,
  legacyHeaders: false
})

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:4173',
  'https://vodkand.ru'
]

app.set('trust proxy', 1)

app.use(
  cors({
    credentials: true,
    origin: (
      origin: string | undefined,
      // eslint-disable-next-line no-unused-vars
      callback: (err: Error | null, allow?: boolean) => void
    ) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    }
  })
)
app.use(express.json())
app.use(cookieParser())

app.use(
  session({
    name: 'sid',
    secret: getEnv('SESSION_SECRET'),
    resave: false,
    saveUninitialized: false,

    store: MongoStore.create({
      mongoUrl: getEnv('DB_URL'),
      collectionName: 'sessions',
      ttl: 60 * 60 * 24 * 3
    }),

    cookie: {
      httpOnly: true,
      secure: isProd,
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000,
      path: '/'
    }
  })
)

app.use('/api/auth', authLimiter)
app.use('/api/sendmail', mailLimiter)
app.use('/api/refresh', refreshLimiter)

app.use('/uploads', express.static('uploads'))
app.use('/api', router)
app.use(ErrorMiddleware)

const start = async () => {
  try {
    await mongoose.connect(getEnv('DB_URL'))

    app.listen(PORT, () => {
      console.log('сервер запустился на порте ', PORT)
      new DeleteAccountManager()
    })
  } catch (e: unknown) {
    if (e instanceof Error && 'message' in e) {
      console.log(e.message)
    }
  }
}

void start()
