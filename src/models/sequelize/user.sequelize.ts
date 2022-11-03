import { DataTypes, Model } from 'sequelize';
import sequelize from '../../utils/connection';
import { User } from '../base/user';

export interface UserSequelize extends User, Model {}

export const UserModel = sequelize.define<UserSequelize>('Users', {
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    balance: {
        type: DataTypes.DECIMAL,
        defaultValue: 0.000
    }
});