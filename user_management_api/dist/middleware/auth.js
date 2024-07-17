"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const authMiddleware = (req, res, next) => {
    var _a;
    const token = (_a = req.headers['authorization']) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (!token) {
        return res.status(401).json({
            data: {
                message: "Acesso negado"
            }
        });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, String(process.env.SECRET_JWT));
        req.user = decoded;
        next();
    }
    catch (error) {
        return res.status(400).json({
            data: {
                message: "Token invalido"
            }
        });
    }
};
exports.default = authMiddleware;
