import { DataTypes, InferAttributes, InferCreationAttributes, Model, Sequelize } from 'sequelize';
import sequelize from '../Database'
import dotenv from 'dotenv'
import UserService from '../../services/User.service';

dotenv.config()

export class User extends Model<
    InferAttributes<User>,
    InferCreationAttributes<User>
> {
    declare id:string
    declare nome:string
    declare email:string
    declare senha:string
}

User.init({
    id: {
        type: DataTypes.UUID,
        primaryKey: true
    },

    nome: {
        type: new DataTypes.STRING(128),
        allowNull: false
    },

    email: {
        type: new DataTypes.STRING(128),
        allowNull: false
    },

    senha: {
        type: new DataTypes.STRING(128),
        allowNull: false
    }
}, {
    tableName: "users",
    sequelize
})

const sync = async() => {
    try {
        await sequelize.authenticate()

        await sequelize.sync({ force: process.env.MODE == "DEV" })
        
        UserService.createUser({ nome: 'admin', email: 'admin@admin.com', senha: '123456' })
    } catch(error) {
        console.log("nao foi possivel sicronizar o db: ", error)
        process.exit()
    }
} 

sync()