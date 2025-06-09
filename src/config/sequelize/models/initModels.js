import defineCompanyModel from "./company.model.js";
import defineRoleModel from "./role.model.js";
import defineUserModel from "./user.model.js";

const initModels = (sequelize) => {
    const CompanyModel = defineCompanyModel(sequelize);
    const RoleModel = defineRoleModel(sequelize);
    const UserModel = defineUserModel(sequelize);

    return {
        CompanyModel,
        RoleModel,
        UserModel,
    };
};

export default initModels;
