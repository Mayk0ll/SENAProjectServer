import envsVars from "../helpers/envs.js";

let dao = {};
const persistence = envsVars.persistence;


switch(persistence){
    case "sequelize":{
        const { dbConnectSequelize } = await import("../helpers/dbConnectSequelize.helper.js");
        const { buildManagers } = await import("./sequelize/manager.sequelize.js");
        await dbConnectSequelize.connect();
        const models = dbConnectSequelize.getModels();
        dao = buildManagers(models);
        break;
    }

    case "mongo":
        console.log("mongo");
        break;

    default:
        console.log("default");
        break;
}

const { userManager, roleManager } = dao;

export {
    userManager,
    roleManager
};