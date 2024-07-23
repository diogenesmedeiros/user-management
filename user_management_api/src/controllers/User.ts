import { Request, Response } from 'express';
import UserService from '../services/User.service';

async function createUser(req: Request, res: Response) {
    const { nome, email, senha } = req.body;

    try {
        if (!nome || !email || !senha) {
            return res.status(400).json({
                data: {
                    message: "Invalid values in inputs"
                }
            });
        }

        const result = await UserService.createUser({ nome, email, senha });
        return res.status(result.code).json(result.data);
    } catch (error) {
        console.error('Error creating user:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

async function getUsers(req: Request, res: Response) {
    try {
        const result = await UserService.getUsers();
        return res.status(result.code).json(result.data);
    } catch (error) {
        console.error('Error fetching users:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

async function updateUser(req: Request, res: Response) {
    const { id } = req.params;
    const { nome, email } = req.body;

    try {
        if (!id || !nome || !email) {
            return res.status(400).json({
                data: {
                    message: "Invalid values in inputs"
                }
            });
        }

        const result = await UserService.updateUser({ id, nome, email });
        return res.status(result.code).json(result.data);
    } catch (error) {
        console.error('Error updating user:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

async function deleteUser(req: Request, res: Response) {
    const { id } = req.params;

    try {
        if (!id) {
            return res.status(400).json({
                data: {
                    message: "Invalid values in inputs"
                }
            });
        }

        const result = await UserService.deleteUser({ id });
        return res.status(result.code).json(result.data);
    } catch (error) {
        console.error('Error deleting user:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

async function loginUser(req: Request, res: Response) {
    const { email, senha } = req.body;

    try {
        if (!email || !senha) {
            return res.status(400).json({
                data: {
                    message: "Invalid values in inputs"
                }
            });
        }

        const result = await UserService.loginUser({ email, senha });
        return res.status(result.code).json(result.data);
    } catch (error) {
        console.error('Error logging in user:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

export default {
    createUser,
    getUsers,
    updateUser,
    deleteUser,
    loginUser
};