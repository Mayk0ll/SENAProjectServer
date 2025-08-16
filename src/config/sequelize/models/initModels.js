import defineInventoryModel from "./inventory.model.js";
import defineRoleModel from "./role.model.js";
import defineUserModel from "./user.model.js";

const initModels = (sequelize) => {
    const RoleModel = defineRoleModel(sequelize);
    const UserModel = defineUserModel(sequelize);
    const InventoryModel = defineInventoryModel(sequelize);

    return {
        RoleModel,
        UserModel,
        InventoryModel
    };
};

export default initModels;
