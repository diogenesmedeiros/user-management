"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const Database_1 = __importDefault(require("../Database"));
function userExists(nome, email) {
    return __awaiter(this, void 0, void 0, function* () {
        const connection = yield Database_1.default.getConnection();
        try {
            const query = 'SELECT COUNT(*) AS count FROM users WHERE nome = ? OR email = ?';
            const [rows] = yield connection.query(query, [nome || '', email || '']);
            const result = rows;
            return result[0].count > 0;
        }
        finally {
            connection.release();
        }
    });
}
class User {
    static createTable() {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield Database_1.default.getConnection();
            try {
                yield connection.query(`
                CREATE TABLE IF NOT EXISTS users (
                    id CHAR(36) PRIMARY KEY,
                    nome VARCHAR(128) NOT NULL,
                    email VARCHAR(128) NOT NULL,
                    senha VARCHAR(128) NOT NULL
                )
            `);
            }
            finally {
                connection.release();
            }
        });
    }
    static create(id, nome, email, senha) {
        return __awaiter(this, void 0, void 0, function* () {
            if (yield userExists(nome, email)) {
                throw new Error('Usuário com o mesmo nome ou e-mail já existe.');
            }
            const connection = yield Database_1.default.getConnection();
            try {
                const [result] = yield connection.query('INSERT INTO users (id, nome, email, senha) VALUES (?, ?, ?, ?)', [id, nome, email, senha]);
                return result;
            }
            finally {
                connection.release();
            }
        });
    }
    static findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield Database_1.default.getConnection();
            try {
                const [rows] = yield connection.query('SELECT id, nome, email FROM users WHERE 1');
                return rows;
            }
            finally {
                connection.release();
            }
        });
    }
    static update(id, nome, email) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield Database_1.default.getConnection();
            try {
                const [result] = yield connection.query('UPDATE users SET nome = ?, email =? WHERE id ?', [nome, email, id]);
                return result;
            }
            finally {
                connection.release();
            }
        });
    }
    static destroy(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield Database_1.default.getConnection();
            try {
                const [result] = yield connection.query('DELETE FROM users WHERE id = ?', [id]);
                return result;
            }
            finally {
                connection.release();
            }
        });
    }
    static findOne(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield Database_1.default.getConnection();
            try {
                const [rows] = yield connection.query('SELECT id, nome, email, senha FROM users WHERE email = ?', [email]);
                return rows;
            }
            finally {
                connection.release();
            }
        });
    }
}
exports.User = User;
