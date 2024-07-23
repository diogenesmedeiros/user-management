import { User } from '../database/models/User.model';
import { v4 as uuid } from 'uuid';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

interface CreateUserPayload {
    id?: string;
    nome?: string;
    email?: string;
    senha?: string;
}

async function createUser(payload: CreateUserPayload) {
    try {
        const hashedPassword = await bcrypt.hash(payload.senha!, 10);
        await User.create(uuid(), payload.nome!, payload.email!, hashedPassword);

        return {
            code: 200,
            data: {
                message: 'Sucesso ao adicionar o usuario!',
            },
        };
    } catch (error) {
        console.error(error);
        return {
            code: 500,
            data: {
                message: 'Ocorreu algum erro desconhecido!',
            },
        };
    }
}

async function getUsers() {
    try {
        const allUsers = await User.findAll();

        if (allUsers.length > 0) {
            return {
                code: 200,
                data: {
                    users: allUsers,
                    message: 'Sucesso',
                },
            };
        } else {
            return {
                code: 404,
                data: {
                    message: 'Nenhum usuário na base de dados!',
                },
            };
        }
    } catch (error) {
        console.error(error);
        return {
            code: 500,
            data: {
                message: 'Ocorreu algum erro desconhecido!',
            },
        };
    }
}

async function updateUser(payload: CreateUserPayload) {
    try {
        const { id, nome, email } = payload;

        await User.update(id!, nome!, email!);

        return {
            code: 200,
            data: {
                message: 'Usuário atualizado com sucesso!',
            },
        };
    } catch (error) {
        console.error(error);
        return {
            code: 500,
            data: {
                message: 'Ocorreu algum erro desconhecido!',
            },
        };
    }
}

async function deleteUser(payload: CreateUserPayload) {
    try {
        await User.destroy(payload.id!);

        return {
            code: 200,
            data: {
                message: 'Usuário removido com sucesso!',
            },
        };
    } catch (error) {
        console.error(error);
        return {
            code: 500,
            data: {
                message: 'Ocorreu algum erro desconhecido!',
            },
        };
    }
}

async function loginUser(payload: CreateUserPayload) {
    try {
        const [user] = await User.findOne(payload.email!);

        if (!user) {
            return {
                code: 404,
                data: {
                    message: 'Usuário não encontrado!',
                },
            };
        }

        const isPasswordValid = await bcrypt.compare(payload.senha!, user.senha);
        if (!isPasswordValid) {
            return {
                code: 401,
                data: {
                    message: 'Credenciais inválidas',
                },
            };
        }

        const token = jwt.sign({ id: user.id }, String(process.env.SECRET_JWT), { expiresIn: '1h' });
        return {
            code: 200,
            data: {
                message: 'Usuário autenticado',
                token: token,
            },
        };
    } catch (error) {
        console.error(error);
        return {
            code: 500,
            data: {
                message: 'Ocorreu algum erro desconhecido!',
            },
        };
    }
}

export default {
    createUser,
    getUsers,
    updateUser,
    deleteUser,
    loginUser,
};