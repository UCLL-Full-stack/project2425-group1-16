import { Category } from "../model/category";
import database from "./database";

const getAllCategories = async (): Promise<Category[]> => {
    try {
        const categoriesPrisma = await database.category.findMany({
            include: {
                parents: true,
                children: true
            }
        });
        return categoriesPrisma.map((categoryPrisma) => Category.from(categoryPrisma));
    } catch (error) {
        console.error(`Database error: ${error}`);
        throw new Error(`Database error: ${error}`);
    }
};

const getCategoryById = async ({ id }: { id: number }): Promise<Category | null> => {
    try {
        const categoryPrisma = await database.category.findUnique({
            where: {
                id
            }, 
            include: {
                parents: true,
                children: true
            }
        });
        return categoryPrisma ? Category.from(categoryPrisma) : null;
    } catch (error) {
        console.error(`Database error: ${error}`);
        throw new Error(`Database error: ${error}`);
    }
}

export default {
    getAllCategories,
    getCategoryById
};