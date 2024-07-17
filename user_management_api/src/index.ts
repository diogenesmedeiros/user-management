import express, { Request, Response } from 'express'
import dotenv from 'dotenv'
import userRoutes from './router/User.route'
import cors from 'cors'

dotenv.config()

const app = express()

app.use(cors({
    origin: ['http://localhost:3000'],
    credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req: Request, res: Response) => {
    res.json({ "message": 'Hello World!'})
})

app.use('/users', userRoutes)

const port = process.env.PORT || 3001

app.listen(port, () => {
    console.log(`running: http://localhost:${port}`);
})