import { signinService, signupOwnerService } from "../services/auth.service.js";
import { createCompany } from "../services/company.service.js";

const signin = async( req, res ) => {

    const { email, password } = req.body;    
    const { user, token } = await signinService(email, password);
    
    res.cookie("token", token, { 
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 12,
        signed: true,
     });

    res.json200({ id: user.id ,name: user.name, lastName: user.lastName, email: user.email });
}

const signupOwner = async( req, res ) => {

    const { documentType, documentNumber, name, lastName, address, city, phone, email, password, password2 } = req.body;

    const company = await createCompany({ name, address, city, phone, email });

    const { user, token } = await signupOwnerService({ companyId: company.id, documentType, documentNumber, name, lastName, address, city, phone, email, password, password2 });
    
    res.cookie("token", token, { 
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 12,
        signed: true,
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