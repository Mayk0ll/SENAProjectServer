class ManagerSequelize {
    constructor(model) {
        this.model = model;
    }

    create = (data) => this.model.create(data);
    readAll = (filter) => this.model.findAll({ where: filter });
    readBy = (filter) => this.model.findOne({ where: filter });
    readById = (id) => this.model.findByPk(id);
    update = (id, data) => this.model.update(data, { where: { id } });
    delete = (id) => this.model.update({ isActive: false }, { where: { id } });
}

const buildManagers = (models) => {
    const userManager = new ManagerSequelize(models.UserModel);
    const roleManager = new ManagerSequelize(models.RoleModel);
    return { userManager, roleManager };
};

export { buildManagers };
