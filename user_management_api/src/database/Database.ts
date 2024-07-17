import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';
import mysql from 'mysql2';

dotenv.config();

const sequelize = new Sequelize(process.env.DB_URL!, {
    dialect: 'mysql',
    dialectModule: mysql
});

export default sequelize;