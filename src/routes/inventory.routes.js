import { POLICY_USER, POLICY_ADMIN, POLICY_OWNER } from "../constants/constants.js";
import CustomRouter from "./custom.routes.js";
import { 
    createInventory, 
    getAllInventory, 
    getInventoryById, 
    updateInventory, 
    deleteInventory 
} from "../controllers/inventory.controller.js";

class Routes extends CustomRouter {
    constructor() {
        super();
        this.routes();
    }

    routes() {
        // Crear nuevo producto - requiere autenticación de usuario, admin u owner
        this.create("/", [POLICY_USER, POLICY_ADMIN, POLICY_OWNER], createInventory);
        
        // Obtener todos los productos del usuario - requiere autenticación
        this.read("/", [POLICY_USER, POLICY_ADMIN, POLICY_OWNER], getAllInventory);
        
        // Obtener producto específico por ID - requiere autenticación
        this.read("/:id", [POLICY_USER, POLICY_ADMIN, POLICY_OWNER], getInventoryById);
        
        // Actualizar producto - requiere autenticación
        this.update("/:id", [POLICY_USER, POLICY_ADMIN, POLICY_OWNER], updateInventory);
        
        // Eliminar producto - requiere autenticación
        this.destroy("/:id", [POLICY_USER, POLICY_ADMIN, POLICY_OWNER], deleteInventory);
    }
}

const inventoryRoutes = new Routes().getRoutes();
export default inventoryRoutes;
