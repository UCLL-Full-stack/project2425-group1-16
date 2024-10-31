import { Item } from '../model/Item';
import itemDb from '../repository/item.db';

const getAllItems = (): Item[] => itemDb.getAllItems();


export default { getAllItems };