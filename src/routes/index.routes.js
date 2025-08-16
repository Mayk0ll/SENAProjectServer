import authRouter from "./auth.routes.js";
import CustomRouter from "./custom.routes.js";
import userRoutes from "./user.routes.js";
import inventoryRoutes from "./inventory.routes.js";


class Routes extends CustomRouter {
    constructor() {
        super();
        this.routes();
    }

    routes() {
        this.use("/auth", authRouter);
        this.use("/users", userRoutes);
        this.use("/inventory", inventoryRoutes);
    }
}

const apiRoutes = new Routes().getRoutes();
export default apiRoutes;
