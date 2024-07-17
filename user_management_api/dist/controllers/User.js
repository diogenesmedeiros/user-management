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
const User_service_1 = __importDefault(require("../services/User.service"));
function createUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { nome, email, senha } = req.body;
        try {
            const result = yield User_service_1.default.createUser({ nome, email, senha });
            return res.status(result.code).json(result.data);
        }
        catch (error) {
            console.error('Error creating user:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    });
}
function getUsers(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield User_service_1.default.getUsers();
            return res.status(result.code).json(result.data);
        }
        catch (error) {
            console.error('Error creating user:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    });
}
function updateUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const payload = req.body;
        payload.id = req.params.id;
        try {
            const result = yield User_service_1.default.updateUser({ id: payload.id, nome: payload.nome, email: payload.email });
            return res.status(result.code).json(result);
        }
        catch (error) {
            console.error('Error ao atualizar usuario: ', error);
            return res.status(500).json({ message: "Ocorreu algum error desconhecido!" });
        }
    });
}
function deleteUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const payload = req.params.id;
        try {
            const result = yield User_service_1.default.deleteUser({ id: payload });
            return res.status(result.code).json(result);
        }
        catch (error) {
            console.error('Error ao atualizar usuario: ', error);
            return res.status(500).json({ message: "Ocorreu algum error desconhecido!" });
        }
    });
}
function loginUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, senha } = req.body;
        try {
            console.log(email);
            const result = yield User_service_1.default.loginUser({ email, senha });
            return res.status(result.code).json(result);
        }
        catch (error) {
            console.error('Error ao atualizar usuario: ', error);
            return res.status(500).json({ message: "Ocorreu algum error desconhecido!" });
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
