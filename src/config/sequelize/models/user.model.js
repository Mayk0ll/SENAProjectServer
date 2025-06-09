import { DataTypes } from 'sequelize';
import { ROLE_ADMIN, ROLE_OWNER, ROLE_USER } from '../../../constants/constants.js';

const defineUserModel = (sequelize) => sequelize.define('User', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        unique: true,
    },
    companyId: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    documentType: {
        type: DataTypes.STRING,
        allowNull: true
    },
    documentNumber: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
        index: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    address: {
        type: DataTypes.STRING,
        allowNull: true
    },
    city: {
        type: DataTypes.STRING,
        allowNull: true
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        index: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.STRING,
        enum: [ROLE_USER, ROLE_OWNER, ROLE_ADMIN],
        defaultValue: ROLE_OWNER,
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
});

export default defineUserModel; 