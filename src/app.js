import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import envsVars from './helpers/envs.js';
import cookieParser from 'cookie-parser';
import pathNotFound from './middlewares/pathNotFound.middleware.js';
import apiRoutes from './routes/index.routes.js';
import errorHandler from './middlewares/errorHandler.middleware.js';

class App {

    constructor(){
        this.app = express();
        this.middlewares();
        this.routes();
    }

    middlewares(){
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(morgan('dev'));
        this.app.use(cookieParser(envsVars.cookieSecret));
        this.app.use(cors(this.getCors()));
    }

    routes(){
        this.app.use("/api", apiRoutes);
        this.app.use(pathNotFound);
        this.app.use(errorHandler);
    }

    getCors(){
        const corsOptions = {
            origin: envsVars.corsOrigin,
            methods: ["GET", "POST", "PUT", "DELETE"],
            credentials: true,
        };
        return corsOptions;
    }

    getApp(){
        return this.app;
    }
}

const app = new App().getApp();
export default app;