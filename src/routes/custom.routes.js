import { Router } from "express";
import setupPolicies from "../middlewares/setupPolicies.middlaware.js";
import setupResponses from "../middlewares/responses.middleware.js";


class CustomRouter{

    constructor(){
        this.router = Router();
        this.router.use(setupResponses);
    }

    getRoutes = () => {
        return this.router;
    }

    applyMiddleware = (callbacks) => callbacks.map(callback => async(req, res, next) => {
        try {
            await callback(req, res, next);
        } catch (error) {
            console.log(error)
            next(error);
        }
    });

    create = (path, policies, ...callbacks) => this.router.post(path, setupPolicies(policies), this.applyMiddleware(callbacks));
    read = (path, policies, ...callbacks) => this.router.get(path, setupPolicies(policies), this.applyMiddleware(callbacks));
    update = (path, policies, ...callbacks) => this.router.put(path, setupPolicies(policies), this.applyMiddleware(callbacks));
    destroy = (path, policies, ...callbacks) => this.router.delete(path, setupPolicies(policies), this.applyMiddleware(callbacks));
    use = (path, ...callbacks) => this.router.use(path, this.applyMiddleware(callbacks));
}

export default CustomRouter;