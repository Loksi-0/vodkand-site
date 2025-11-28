import express from 'express'
import cors from 'cors'
import router from './router.js'

const PORT = 5000
const app = express()

app.use(cors())
app.use(express.json())
app.use('/uploads', express.static('uploads'))
app.use('/api', router)

const server = () => {
    try {
        app.listen(PORT, () => console.log('сервер запустился на порте ', PORT))
    } catch(e) {
        console.log(e.message)
    }
}

server()