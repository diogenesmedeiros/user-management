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
function createUser(payload) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const hashedPassword = yield bcrypt_1.default.hash(payload.senha, 10);
            yield User_model_1.User.create((0, uuid_1.v4)(), payload.nome, payload.email, hashedPassword);
            return {
                code: 200,
                data: {
                    message: 'Sucesso ao adicionar o usuario!',
                },
            };
        }
        catch (error) {
            console.error(error);
            return {
                code: 500,
                data: {
                    message: 'Ocorreu algum erro desconhecido!',
                },
            };
        }
    });
}
function getUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const allUsers = yield User_model_1.User.findAll();
            if (allUsers.length > 0) {
                return {
                    code: 200,
                    data: {
                        users: allUsers,
                        message: 'Sucesso',
                    },
                };
            }
            else {
                return {
                    code: 404,
                    data: {
                        message: 'Nenhum usuário na base de dados!',
                    },
                };
            }
        }
        catch (error) {
            console.error(error);
            return {
                code: 500,
                data: {
                    message: 'Ocorreu algum erro desconhecido!',
                },
            };
        }
    });
}
function updateUser(payload) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id, nome, email } = payload;
            yield User_model_1.User.update(id, nome, email);
            return {
                code: 200,
                data: {
                    message: 'Usuário atualizado com sucesso!',
                },
            };
        }
        catch (error) {
            console.error(error);
            return {
                code: 500,
                data: {
                    message: 'Ocorreu algum erro desconhecido!',
                },
            };
        }
    });
}
function deleteUser(payload) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield User_model_1.User.destroy(payload.id);
            return {
                code: 200,
                data: {
                    message: 'Usuário removido com sucesso!',
                },
            };
        }
        catch (error) {
            console.error(error);
            return {
                code: 500,
                data: {
                    message: 'Ocorreu algum erro desconhecido!',
                },
            };
        }
    });
}
function loginUser(payload) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const [user] = yield User_model_1.User.findOne(payload.email);
            if (!user) {
                return {
                    code: 404,
                    data: {
                        message: 'Usuário não encontrado!',
                    },
                };
            }
            const isPasswordValid = yield bcrypt_1.default.compare(payload.senha, user.senha);
            if (!isPasswordValid) {
                return {
                    code: 401,
                    data: {
                        message: 'Credenciais inválidas',
                    },
                };
            }
            const token = jsonwebtoken_1.default.sign({ id: user.id }, String(process.env.SECRET_JWT), { expiresIn: '1h' });
            return {
                code: 200,
                data: {
                    message: 'Usuário autenticado',
                    token: token,
                },
            };
        }
        catch (error) {
            console.error(error);
            return {
                code: 500,
                data: {
                    message: 'Ocorreu algum erro desconhecido!',
                },
            };
        }
    });
}
exports.default = {
    createUser,
    getUsers,
    updateUser,
    deleteUser,
    loginUser,
};
