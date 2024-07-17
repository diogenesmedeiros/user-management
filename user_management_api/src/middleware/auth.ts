import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization']?.split(' ')[1]

    if(!token) {
        return res.status(401).json({
            data: {
                message: "Acesso negado"
            }
        })
    }

    try {
        const decoded = jwt.verify(token, String(process.env.SECRET_JWT))
        req.user = decoded
        next()
    } catch(error) {
        return res.status(400).json({
            data: {
                message: "Token invalido"
            }
        })
    }
}

export default authMiddleware