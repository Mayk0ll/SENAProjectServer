import { v4 as uuid } from 'uuid';
import { companyManager } from "../config/dao.factory.js";

export const createCompany = async (companyData) => {
    companyData.id = uuid();
    companyData.name = `${companyData.name} Company`;
    const company = await companyManager.create(companyData);
    return company;
};

export const getAllCompanies = async () => {
    const companies = await companyManager.findAll({ isActive: true });
    return companies;
};

export const getCompanyById = async (id) => {
    const company = await companyManager.findOne({ id, isActive: true });
    if (!company) {
        throw new Error('Compañía no encontrada');
    }
    return company;
};

export const updateCompany = async (id, companyData) => {
    const company = await companyManager.findOne({ id, isActive: true });
    if (!company) {
        throw new Error('Compañía no encontrada');
    }
    const updatedCompany = await companyManager.update(id, companyData);
    return updatedCompany;
};

export const deleteCompany = async (id) => {
    const company = await companyManager.findOne({ id, isActive: true });
    if (!company) {
        throw new Error('Compañía no encontrada');
    }
    await companyManager.update(id, { isActive: false });
    return { message: 'Compañía eliminada exitosamente' };
}; 