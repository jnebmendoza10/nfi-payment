import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

dotenv.config();

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const sequelize = new Sequelize(process.env.DB_NAME!, process.env.DB_USER!, process.env.DB_PASSWORD!, {
    host: process.env.DB_HOST,
    dialect: 'mssql',
});

export const checkConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error: any) {
        console.log('Unable to connect to the database:', error);
    }
};

export default sequelize;