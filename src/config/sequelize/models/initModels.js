import defineRoleModel from "./role.model.js";
import defineUserModel from "./user.model.js";

const initModels = (sequelize) => {
  const UserModel = defineUserModel(sequelize);
  const RoleModel = defineRoleModel(sequelize);

  return {
    UserModel,
    RoleModel
  };
};

export default initModels;
