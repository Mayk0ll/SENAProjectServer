import { 
    createInventoryService, 
    getAllInventoryService, 
    getInventoryByIdService, 
    updateInventoryService, 
    deleteInventoryService 
} from "../services/inventory.service.js";

const createInventory = async (req, res) => {
    const inventoryData = req.body;
    const userId = req.user.id;

    console.log("USERRRRRRRRRRRRRRRRRR", userId)

    const inventory = await createInventoryService(inventoryData, userId);
    res.json201(inventory);
};

const getAllInventory = async (req, res) => {
    const userId = req.user.id;
    
    const inventory = await getAllInventoryService(userId);
    res.json200(inventory);
};

const getInventoryById = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;

    const inventory = await getInventoryByIdService(id, userId);
    res.json200(inventory);
};

const updateInventory = async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;
    const userId = req.user.id;

    await updateInventoryService(id, updateData, userId);
    res.json200({ message: 'Producto actualizado exitosamente' });
};

const deleteInventory = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;

    const result = await deleteInventoryService(id, userId);
    res.json200(result);
};

export {
    createInventory,
    getAllInventory,
    getInventoryById,
    updateInventory,
    deleteInventory
};
