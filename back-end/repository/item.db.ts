import { Item } from "../model/item";
import database from "./database";

const getAllItems = async (): Promise<Item[]> => {
    try {
        const itemsPrisma = await database.item.findMany({
            include: {
                owner: {
                    include: { locationTag: true }
                },
                locationTag: true,
                categories: true,
            },
        });
        return itemsPrisma.map((itemPrisma) => Item.from(itemPrisma));
    } catch (error) {
        console.error(`Database error: ${error}`);
        throw new Error(`Database error: ${error}`);
    }
};

const getItemById = async (itemId: number): Promise<Item | null> => {
    try {
        const itemPrisma = await database.item.findUnique({
            where: {
                id: itemId
            },
            include: {
                owner: {
                    include: { locationTag: true }
                },
                locationTag: true,
                categories: true,
            }
        });
        return itemPrisma ? Item.from(itemPrisma) : null;
    } catch (error) {
        console.error(`Database error: ${error}`);
        throw new Error(`Database error: ${error}`);
    }
};

export default {
    getAllItems,
    getItemById,
};