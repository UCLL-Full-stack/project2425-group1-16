import { Item } from '../model/Item';
import itemDb from '../repository/item.db';

const getAllItems = (): Item[] => itemDb.getAllItems();

const getItemById = (id: number): Item => {
    const item = itemDb.getItemById({ id });
    if (item == null) {
        throw Error("No item found for this id")
    }
    return item;
}


export default { getAllItems, getItemById };