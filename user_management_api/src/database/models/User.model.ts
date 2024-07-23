import pool from "../Database";
import { OkPacketParams, RowDataPacket } from 'mysql2'

type QueryResult = RowDataPacket[] | OkPacketParams

async function userExists(nome?: string, email?: string): Promise<boolean> {
    const connection = await pool.getConnection();
    try {
        const query = 'SELECT COUNT(*) AS count FROM users WHERE nome = ? OR email = ?';
        const [rows] = await connection.query(query, [nome || '', email || '']);
        const result = rows as RowDataPacket[];
        return result[0].count > 0;
    } finally {
        connection.release();
    }
}

export class User {
    static async createTable(): Promise<void> {
        const connection = await pool.getConnection();
        try {
            await connection.query(`
                CREATE TABLE IF NOT EXISTS users (
                    id CHAR(36) PRIMARY KEY,
                    nome VARCHAR(128) NOT NULL,
                    email VARCHAR(128) NOT NULL,
                    senha VARCHAR(128) NOT NULL
                )
            `);
        } finally {
            connection.release();
        }
    }

    static async create(id: string, nome: string, email: string, senha: string): Promise<OkPacketParams> {
        if (await userExists(nome, email)) {
            throw new Error('Usuário com o mesmo nome ou e-mail já existe.');
        }

        const connection = await pool.getConnection();
        try {
            const [result] = await connection.query(
                'INSERT INTO users (id, nome, email, senha) VALUES (?, ?, ?, ?)',
                [id, nome, email, senha]
            );
            return result as OkPacketParams;
        } finally {
            connection.release();
        }
    }

    static async findAll(): Promise<RowDataPacket[]> {
        const connection = await pool.getConnection()

        try {
            const [rows] = await connection.query('SELECT id, nome, email FROM users WHERE 1')

            return rows as RowDataPacket[]
        } finally {
            connection.release()
        }
    }

    static async update(id:string, nome:string, email: string): Promise<OkPacketParams> {
        const connection = await pool.getConnection()

        try {
            const [result] = await connection.query('UPDATE users SET nome = ?, email =? WHERE id ?', [nome, email, id])

            return result as OkPacketParams
        } finally {
            connection.release()
        }
    }

    static async destroy(id:string): Promise<OkPacketParams> {
        const connection = await pool.getConnection()

        try {
            const [result] = await connection.query('DELETE FROM users WHERE id = ?', [id])

            return result as OkPacketParams
        } finally {
            connection.release()
        }
    }

    static async findOne(email:string): Promise<RowDataPacket[]> {
        const connection = await pool.getConnection()

        try {
            const [rows] = await connection.query('SELECT id, nome, email, senha FROM users WHERE email = ?', [email])

            return rows as RowDataPacket[]
        } finally {
            connection.release()
        }
    }
}