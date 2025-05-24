import { signinService, signupOwnerService } from "../services/auth.service.js";

const signin = async( req, res ) => {

    const { email, password } = req.body;    
    const { user, token } = await signinService(email, password);
    
    res.cookie("token", token, { 
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 12,
     });

    res.json200({ id: user.id ,name: user.name, lastName: user.lastName, email: user.email });
}

const signupOwner = async( req, res ) => {

    const { companyId, documentType, documentNumber, name, lastName, address, city, phone, email, password, isActive } = req.body;
    const { user, token } = await signupOwnerService({ companyId, documentType, documentNumber, name, lastName, address, city, phone, email, password, isActive });
    
    res.cookie("token", token, { 
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 12,
     });

    res.json200({ id: user.id ,name: user.name, lastName: user.lastName, email: user.email });
}

const signout = async( req, res ) => {
    res.clearCookie("token");
    res.json200({ message: "Logout exitoso" });
}


export {
    signin,
    signupOwner,
    signout
}