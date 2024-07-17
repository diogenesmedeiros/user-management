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
const User_model_1 = require("../database/models/User.model");
const uuid_1 = require("uuid");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
let response;
function createUser(payload) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const hashedPassword = yield bcrypt_1.default.hash(payload.senha, 10);
            yield User_model_1.User.create({
                id: (0, uuid_1.v4)(),
                nome: payload.nome,
                email: payload.email,
                senha: hashedPassword
            });
            return response = {
                code: 200,
                data: {
                    message: 'Sucesso ao adicionar o usuario!'
                }
            };
        }
        catch (error) {
            console.log(error);
            response = {
                code: 500,
                data: {
                    message: 'Ocorreu algum error desconhecido!'
                }
            };
            return response;
        }
    });
}
function getUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        let allUser = {};
        try {
            const getUsers = yield User_model_1.User.findAll({
                attributes: { exclude: ['senha'] }
            });
            if (getUsers.length > 0) {
                return response = {
                    code: 200,
                    data: {
                        users: getUsers,
                        message: 'Sucesso'
                    }
                };
            }
            else {
                return response = {
                    code: 404,
                    data: {
                        message: 'Nenhum usuario na base de dados!!'
                    }
                };
            }
        }
        catch (error) {
            console.log(error);
            return response = {
                code: 500,
                data: {
                    message: 'Ocorreu algum error desconhecido!'
                }
            };
        }
    });
}
function updateUser(payload) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id, nome, email } = payload;
            console.log(id);
            yield User_model_1.User.update({ id, nome, email }, { where: { id } });
            return response = {
                code: 200,
                data: {
                    message: 'Usuario atualizado com sucesso!!!'
                }
            };
        }
        catch (error) {
            console.log(error);
            return response = {
                code: 500,
                data: {
                    message: 'Ocorreu algum error desconhecido!'
                }
            };
        }
    });
}
function deleteUser(payload) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield User_model_1.User.destroy({ where: { id: payload.id } });
            return response = {
                code: 200,
                data: {
                    message: 'Usuario removido com sucesso!!!'
                }
            };
        }
        catch (error) {
            console.log(error);
            return response = {
                code: 500,
                data: {
                    message: 'Ocorreu algum error desconhecido!'
                }
            };
        }
    });
}
function loginUser(payload) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield User_model_1.User.findOne({ where: { email: payload.email } });
            console.log(user);
            if (!user) {
                response = {
                    code: 404,
                    data: {
                        message: 'Usuario nao encontrado!'
                    }
                };
                return response;
            }
            const isPasswordValid = yield bcrypt_1.default.compare(payload.senha, user.senha);
            if (!isPasswordValid) {
                response = {
                    code: 401,
                    data: {
                        message: 'Credenciais invalidas'
                    }
                };
                return response;
            }
            const token = jsonwebtoken_1.default.sign({ id: user.id }, String(process.env.SECRET_JWT), { expiresIn: '1h' });
            return response = {
                code: 200,
                data: {
                    message: 'Usuario autenticado',
                    token: token
                }
            };
        }
        catch (error) {
            console.log(error);
            return response = {
                code: 500,
                data: {
                    message: 'Ocorreu algum error desconhecido!'
                }
            };
        }
    });
}
exports.default = {
    createUser,
    getUsers,
    updateUser,
    deleteUser,
    loginUser
};
