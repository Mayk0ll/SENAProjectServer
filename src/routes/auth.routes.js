import { POLICY_PUBLIC } from "../constants/constants.js";
import { signin, signout, signupOwner } from "../controllers/user.controller.js";
import CustomRouter from "./custom.routes.js";


class Routes extends CustomRouter {

    constructor(){
        super();
        this.routes();
    }

    routes(){
        this.create("/signin", [POLICY_PUBLIC], signin);
        this.create("/signup", [POLICY_PUBLIC], signupOwner);
        this.destroy("/signout", [POLICY_PUBLIC], signout);
    }
}

const authRouter = new Routes().getRoutes();
export default authRouter;