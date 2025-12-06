import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'
import router from './router/router.js'
import ErrorMiddeware from './middlewares/ErrorMiddeware.js'

const PORT = process.env.PORT || 5000
const app = express()

app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}))
app.use(express.json())
app.use(cookieParser())
app.use('/uploads', express.static('uploads'))
app.use('/api', router)
app.use(ErrorMiddeware)

const start = async () => {
    try {
        await mongoose.connect(process.env.DB_URL)
        
        app.listen(PORT, () => console.log('сервер запустился на порте ', PORT))
    } catch(e) {
        console.log(e.message)
    }
}

start()