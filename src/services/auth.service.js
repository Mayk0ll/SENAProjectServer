import { userManager } from "../config/dao.factory.js";
import { createHash, isValidPassword } from "../helpers/hash.helpers.js";
import { createToken } from "../helpers/token.helper.js";
import { v4 as uuid } from 'uuid';


const signinService = async (email, password) => {
    if (!email || !password) {
        const error = new Error('Email y contraseña son requeridos');
        error.statusCode = 401;
        throw error;
    }

    const user = await userManager.readBy({ email, isActive: true });

    if (!user || !isValidPassword(user, password)) {
        const error = new Error('Credenciales invalidas');
        error.statusCode = 401;
        throw error;
    }

    const token = createToken(user);
    return {user, token};
}

const signupOwnerService = async (newUser) => {

    const { companyId, documentType, documentNumber, name, lastName, address, city, phone, email, password, isActive } = newUser;

    if (!name || !lastName || !email || !password) {
        const error = new Error('Una de los campos requeridos no fue enviado');
        error.statusCode = 400;
        throw error;
    }

    const userExist = await userManager.readBy({email});
    if (userExist) {
        const error = new Error('El email ya existe');
        error.statusCode = 400;
        throw error;
    }

    const user = await userManager.create({
        id: uuid(),
        companyId,
        documentType,
        documentNumber,
        name,
        lastName,
        address,
        city,
        phone,
        email,
        password: createHash(password),
        isActive
    });
    const token = createToken(user);
    return {user, token};
}

export {
    signinService,
    signupOwnerService
}