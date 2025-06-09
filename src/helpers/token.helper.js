import jwt from "jsonwebtoken";
import envsVars from "./envs.js";

const createToken = (payload) => {
    try {
        const { id, role } = payload;
        const token = jwt.sign({
            id,
            role
        }, envsVars.jwtSecret, { expiresIn: "12h" });
        return token;
    } catch (error) {
        error.statusCode = 401;
        throw error;
    }
};

const verifyToken = (token) => {
    try {
        const verify = jwt.verify(token, envsVars.jwtSecret);
        return verify; 
    } catch (error) {
        error.message = "Token no valido";
        error.statusCode = 401;
        throw error;
    }
}

export { createToken, verifyToken };