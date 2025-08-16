import { inventoryManager } from "../config/dao.factory.js";
import { v4 as uuid } from 'uuid';

const createInventoryService = async (inventoryData, userId) => {
    const { name, description, quantity, price } = inventoryData;

    if (!name || !quantity || !price) {
        const error = new Error('Nombre, cantidad y precio son requeridos');
        error.statusCode = 400;
        throw error;
    }

    if (quantity < 0) {
        const error = new Error('La cantidad no puede ser negativa');
        error.statusCode = 400;
        throw error;
    }

    if (price < 0) {
        const error = new Error('El precio no puede ser negativo');
        error.statusCode = 400;
        throw error;
    }

    const inventory = await inventoryManager.create({
        id: uuid(),
        name,
        description,
        quantity,
        price,
        userId
    });

    return inventory;
};

const getAllInventoryService = async (userId) => {
    const inventory = await inventoryManager.readAll({ 
        userId, 
        isActive: true 
    });
    return inventory;
};

const getInventoryByIdService = async (id, userId) => {
    const inventory = await inventoryManager.readBy({ 
        id, 
        userId, 
        isActive: true 
    });

    if (!inventory) {
        const error = new Error('Producto no encontrado');
        error.statusCode = 404;
        throw error;
    }

    return inventory;
};

const updateInventoryService = async (id, updateData, userId) => {
    const { name, description, quantity, price } = updateData;

    // Verificar que el producto existe y pertenece al usuario
    const existingInventory = await inventoryManager.readBy({ 
        id, 
        userId, 
        isActive: true 
    });

    if (!existingInventory) {
        const error = new Error('Producto no encontrado');
        error.statusCode = 404;
        throw error;
    }

    // Validaciones
    if (quantity !== undefined && quantity < 0) {
        const error = new Error('La cantidad no puede ser negativa');
        error.statusCode = 400;
        throw error;
    }

    if (price !== undefined && price < 0) {
        const error = new Error('El precio no puede ser negativo');
        error.statusCode = 400;
        throw error;
    }

    const updatedInventory = await inventoryManager.update(id, updateData);
    return updatedInventory;
};

const deleteInventoryService = async (id, userId) => {
    // Verificar que el producto existe y pertenece al usuario
    const existingInventory = await inventoryManager.readBy({ 
        id, 
        userId, 
        isActive: true 
    });

    if (!existingInventory) {
        const error = new Error('Producto no encontrado');
        error.statusCode = 404;
        throw error;
    }

    await inventoryManager.delete(id);
    return { message: 'Producto eliminado exitosamente' };
};

export {
    createInventoryService,
    getAllInventoryService,
    getInventoryByIdService,
    updateInventoryService,
    deleteInventoryService
};
