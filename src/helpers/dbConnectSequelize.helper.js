import { Sequelize } from "sequelize";
import envsVars from "./envs.js";
import initModels from "../config/sequelize/models/initModels.js";

//generar clase de coneccion con patron singleton

class DBConnectSequelize {

    static instance = null;
    sequelize = null;
    isConnected = false;
    models = {};
    
    constructor() {
        if(DBConnectSequelize.instance) {
            return DBConnectSequelize.instance;
        }
        
        DBConnectSequelize.instance = this;
        this.isConnected = false;
    }

    async connect(){
        if(this.isConnected) return console.log("Ya estamos conectados a la base de datos");
        this.sequelize = new Sequelize( envsVars.db.database, envsVars.db.username, envsVars.db.password, {
            host: envsVars.db.host,
            dialect: envsVars.db.dialect,
        })
        await this.sequelize.authenticate();
        this.models = initModels(this.sequelize);
        await this.sequelize.sync({ alter: true, force: true });
        this.isConnected = true;
    }

    getSequelize(){
        if(!this.isConnected) throw new Error("Error al cargar la base de datos"); 
        return this.sequelize; 
    }

    getModels(){
        if(!this.isConnected) throw new Error("Error al cargar los modelos");
        return this.models;
    }
}

const dbConnectSequelize = new DBConnectSequelize();

export {dbConnectSequelize};