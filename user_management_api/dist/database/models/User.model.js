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
const sequelize_1 = require("sequelize");
const Database_1 = __importDefault(require("../Database"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class User extends sequelize_1.Model {
}
exports.User = User;
User.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true
    },
    nome: {
        type: new sequelize_1.DataTypes.STRING(128),
        allowNull: false
    },
    email: {
        type: new sequelize_1.DataTypes.STRING(128),
        allowNull: false
    },
    senha: {
        type: new sequelize_1.DataTypes.STRING(128),
        allowNull: false
    }
}, {
    tableName: "users",
    sequelize: Database_1.default
});
const sync = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield Database_1.default.authenticate();
        yield Database_1.default.sync({ force: process.env.MODE == "DEV" });
        console.log("tabelas sicronizadas");
    }
    catch (error) {
        console.log("nao foi possivel sicronizar o db: ", error);
        process.exit();
    }
});
sync();
