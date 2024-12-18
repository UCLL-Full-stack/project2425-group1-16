import { Item } from '../model/item';
import itemDb from '../repository/item.db';

const getAllItems = async (): Promise<Item[]> => await itemDb.getAllItems();

const getItemById = async (id: number): Promise<Item> => {
    const item = await itemDb.getItemById({ itemId: id });
    if (item == null) {
        throw Error("No item found for this id")
    }
    return item;
}


export default { getAllItems, getItemById };