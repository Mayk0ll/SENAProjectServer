import { POLICY_PUBLIC } from "../constants/constants.js";
import CustomRouter from "./custom.routes.js";

class Routes extends CustomRouter {
    constructor() {
        super();
        this.routes();
    }

    routes() {
        this.create("/", [POLICY_PUBLIC], ()=>{console.log("user created");})
        this.read("/", [POLICY_PUBLIC], ()=>{console.log("user read");})
        this.update("/", [POLICY_PUBLIC], ()=>{console.log("user updated");})
        this.destroy("/", [POLICY_PUBLIC], ()=>{console.log("user deleted");})
    }
}

const userRoutes = new Routes().getRoutes();
export default userRoutes;

