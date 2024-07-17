"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const User_model_1 = require("./models/User.model");
const { Sequelize } = require('sequelize');
dotenv_1.default.config();
const sequelize = new Sequelize(process.env.DB_URL, {
    dialect: 'mysql',
    models: [User_model_1.User]
});
exports.default = sequelize;
