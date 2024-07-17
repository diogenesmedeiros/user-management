import {User} from '../database/models/User.model'
import {v4 as uuid} from 'uuid'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

interface CreateUserPayload {
    id?: string
    nome?: string
    email?: string
    senha?: string
}

let response:any

async function createUser(payload: CreateUserPayload) {
    try {
        const hashedPassword = await bcrypt.hash(payload.senha!, 10)

        await User.create({ 
            id: uuid(),
            nome: payload.nome!,
            email: payload.email!,
            senha:  hashedPassword 
        })

        return response = {
            code: 200,
            data: {
                message: 'Sucesso ao adicionar o usuario!'
            }
        }
    }catch(error) {
        console.log(error)
        response = {
            code: 500,
            data: {
                message: 'Ocorreu algum error desconhecido!'
            }
        }

        return response
    }
}

async function getUsers() {
    let allUser: { [key: string]: any } = {}

    try {
        const getUsers = await User.findAll({
            attributes: { exclude: ['senha'] }
        })

        if(getUsers.length > 0) {
            return response = {
                code: 200,
                data: {
                    users: getUsers,
                    message: 'Sucesso'
                }
            }
        }else{
            return response = {
                code: 404,
                data: {
                    message: 'Nenhum usuario na base de dados!!'
                }
            }
        }
    }catch(error) {
        console.log(error)
        return response = {
            code: 500,
            data: {
                message: 'Ocorreu algum error desconhecido!'
            }
        }
    }
}

async function updateUser(payload: CreateUserPayload) {
    try {
        const { id, nome, email } = payload

        console.log(id)

        await User.update({ id, nome, email }, { where: { id } })

        return response = {
            code: 200,
            data: {
                message: 'Usuario atualizado com sucesso!!!'
            }
        }
    } catch(error) {
        console.log(error)
        return response = {
            code: 500,
            data: {
                message: 'Ocorreu algum error desconhecido!'
            }
        }
    }
}

async function deleteUser(payload: CreateUserPayload) {
    try {
        await User.destroy({ where: { id: payload.id }})

        return response = {
            code: 200,
            data: {
                message: 'Usuario removido com sucesso!!!'
            }
        }
    } catch(error) {
        console.log(error)
        return response = {
            code: 500,
            data: {
                message: 'Ocorreu algum error desconhecido!'
            }
        }
    }
}

async function loginUser(payload: CreateUserPayload) {
    try {
        const user = await User.findOne({ where: { email: payload.email } })

        console.log(user)

        if(!user) {
            response = {
                code: 404,
                data: {
                    message: 'Usuario nao encontrado!'
                }
            }

            return response
        }

        const isPasswordValid = await bcrypt.compare(payload.senha!, user.senha)
        if(!isPasswordValid) {
            response = {
                code: 401,
                data: {
                    message: 'Credenciais invalidas'
                }
            }

            return response
        }

        const token = jwt.sign({ id: user.id }, String(process.env.SECRET_JWT), { expiresIn: '1h' })
        return response = {
            code: 200,
            data: {
                message: 'Usuario autenticado',
                token: token
            }
        }
    } catch(error) {
        console.log(error)
        return response = {
            code: 500,
            data: {
                message: 'Ocorreu algum error desconhecido!'
            }
        }
    }
}

export default {
    createUser,
    getUsers,
    updateUser,
    deleteUser,
    loginUser
}