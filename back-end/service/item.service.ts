import { Category } from '../model/category';
import { Item } from '../model/item';
import { LocationTag } from '../model/locationTag';
import itemDb from '../repository/item.db';
import locationTagDb from '../repository/locationTag.db';
import profileDb from '../repository/profile.db';
import { ItemAddInput } from '../types';
import categoryDb from '../repository/category.db';

const getAllItems = async (): Promise<Item[]> => await itemDb.getAllItems();

const getItemById = async (id: number): Promise<Item> => {
    const item = await itemDb.getItemById({ itemId: id });
    if (item == null) {
        throw Error("No item found for this id.")
    }
    return item;
}

const getItemsByOwner = async (id: number): Promise<Item[]> => {
    const owner = await profileDb.getProfileById({ id });
    if (!owner) throw new Error('Owner not found.');
    if (!owner.getId()) throw new Error('No id is included in this owner.');

    return await itemDb.getItemsByOwnerId({ id: owner.getId()! });
}

const addItem = async (item: ItemAddInput): Promise<Item> => {
    const owner = await profileDb.getProfileById({ id: item.ownerId });
    if (!owner) throw new Error('Owner not found');

    let locationTag = await locationTagDb.getLocationTagByCoords(item.locationTag);
    if (!locationTag) {
        locationTag = new LocationTag({
            displayName: item.locationTag.displayName,
            longitude: item.locationTag.longitude,
            latitude: item.locationTag.latitude
        }); 
    }

    // Filter for the valid categories in the back-end
    const categories = (await Promise.all(item.categories
        .map(async (category) => category.id ? await categoryDb.getCategoryById({ id: category.id }) : null)))
        .filter((value): value is Category => value != null);
    
    return await itemDb.addItem(new Item({
        name: item.name,
        description: item.description,
        price: item.price,
        locationTag,        
        owner,
        categories
    }));
};

const deleteItemById = async (id: number) => {
    await itemDb.deleteItemById(id);
};

export default {
    getAllItems,
    getItemById,
    getItemsByOwner,
    addItem,
    deleteItemById
};