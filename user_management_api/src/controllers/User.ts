import { Request, Response } from 'express'
import UserService from '../services/User.service'

async function createUser(req: Request, res: Response) {
    const { nome, email, senha } = req.body

    try {
        const result = await UserService.createUser({ nome, email, senha })
        return res.status(result.code).json(result.data)
    } catch (error) {
        console.error('Error creating user:', error)
        return res.status(500).json({ message: 'Internal server error' })
    }
}

async function getUsers(req: Request, res: Response) {
    try {
        const result = await UserService.getUsers()
        return res.status(result.code).json(result.data)
    } catch (error) {
        console.error('Error creating user:', error)
        return res.status(500).json({ message: 'Internal server error' })
    }
}

async function updateUser(req: Request, res: Response) {
    const payload = req.body
    payload.id = req.params.id

    try {
        const result = await UserService.updateUser({id: payload.id, nome: payload.nome, email: payload.email})
        return res.status(result.code).json(result)
    } catch(error) {
        console.error('Error ao atualizar usuario: ', error)
        return res.status(500).json({ message: "Ocorreu algum error desconhecido!" })
    }
}

async function deleteUser(req: Request, res: Response) {
    const payload = req.params.id
    
    try {
        const result = await UserService.deleteUser({id: payload})
        return res.status(result.code).json(result)
    } catch(error) {
        console.error('Error ao atualizar usuario: ', error)
        return res.status(500).json({ message: "Ocorreu algum error desconhecido!" })        
    }
}

async function loginUser(req: Request, res: Response) {
    const { email, senha } = req.body

    try {
        console.log(email)

        const result = await UserService.loginUser({ email, senha })
        return res.status(result.code).json(result)
    } catch(error) {
        console.error('Error ao atualizar usuario: ', error)
        return res.status(500).json({ message: "Ocorreu algum error desconhecido!" })       
    }
}

export default {
    createUser,
    getUsers,
    updateUser,
    deleteUser,
    loginUser
}