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

const getItemById = async ({ itemId }: { itemId: number }): Promise<Item | null> => {
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

const getItemsByOwnerId = async ({ id }: { id: number }): Promise<Item[]> => {
    try {
        const itemsPrisma = await database.item.findMany({
            where: {
                ownerId: id
            },
            include: {
                owner: {
                    include: { locationTag: true }
                },
                locationTag: true,
                categories: true,
            }
        });
        return itemsPrisma.map((itemPrisma) => Item.from(itemPrisma));
    } catch (error) {
        console.error(`Database error: ${error}`);
        throw new Error(`Database error: ${error}`);
    }
};

const addItem = async (item: Item): Promise<Item> => {
    try {
        const itemPrisma = await database.item.create({
            data: {
                name: item.getName(),
                description: item.getDescription(),
                price: item.getPrice(),
                locationTag: {
                    create: {
                        displayName: item.getLocationTag().getDisplayName(),
                        longitude: item.getLocationTag().getLongitude(),
                        latitude: item.getLocationTag().getLatitude()
                    }
                },
                owner: {
                    connect: {
                        id: item.getOwner().getId()
                    }
                },
                categories: {
                    connect: item.getCategories().map((category) => ({ id: category.getId() }))
                }
            },
            include: {
                owner: {
                    include: { locationTag: true }
                },
                locationTag: true,
                categories: true,
            }
        });
        return Item.from(itemPrisma);
    } catch (error) {
        console.error(`Database error: ${error}`);
        throw new Error(`Database error: ${error}`); 
    }
};

const deleteItemById = async (id: number) => {
    try {
        database.item.delete({
            where: {
                id
            }
        });
    } catch (error) {
        console.error(`Database error: ${error}`);
        throw new Error(`Database error: ${error}`);
    }
}

export default {
    getAllItems,
    getItemById,
    getItemsByOwnerId,
    addItem,
    deleteItemById
};