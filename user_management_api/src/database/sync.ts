import dotenv from 'dotenv';
import { User } from './models/User.model';

dotenv.config();

export const sync = async () => {
    try {
        await User.createTable();
        
        console.log('Banco de dados sincronizado com sucesso.');
    } catch (error) {
        console.error('Não foi possível sincronizar o DB:', error);
        process.exit(1);
    }
};