import authRouter from "./auth.routes.js";
import CustomRouter from "./custom.routes.js";
import userRoutes from "./user.routes.js";


class Routes extends CustomRouter {
    constructor() {
        super();
        this.routes();
    }

    routes() {
        this.use("/auth", authRouter);
        this.use("/users", userRoutes);
    }
}

const apiRoutes = new Routes().getRoutes();
export default apiRoutes;
