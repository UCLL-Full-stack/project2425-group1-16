import itemService from '../../service/item.service';
import itemDb from '../../repository/item.db';
import locationTagDb from '../../repository/locationTag.db';
import profileDb from '../../repository/profile.db';
import categoryDb from '../../repository/category.db';
import { Item } from '../../model/item';
import { LocationTag } from '../../model/locationTag';
import { Profile } from '../../model/profile';
import { Category } from '../../model/category';
import { ItemAddInput } from '../../types';

jest.mock('../../repository/item.db');
jest.mock('../../repository/locationTag.db');
jest.mock('../../repository/profile.db');
jest.mock('../../repository/category.db');

describe('Item Service', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('getAllItems', () => {
        it('should return all items', async () => {
            const locationTag = new LocationTag({ id: 1, displayName: 'Location', longitude: 50, latitude: 50 });
            const owner = new Profile({ 
                id: 1, 
                username: 'Owner', 
                password: 'Password123!', 
                email: 'owner@example.com', 
                role: 'USER', 
                locationTag: locationTag 
            });
            const category = new Category({ id: 1, name: 'Category' });
            const items = [
                new Item({ id: 1, name: 'Item 1', description: 'Description 1', price: 100, locationTag, owner, categories: [category] }),
                new Item({ id: 2, name: 'Item 2', description: 'Description 2', price: 200, locationTag, owner, categories: [category] })
            ];
            (itemDb.getAllItems as jest.Mock).mockResolvedValue(items);

            const result = await itemService.getAllItems();
            expect(result).toEqual(items);
            expect(itemDb.getAllItems).toHaveBeenCalledTimes(1);
        });
    });

    describe('getItemById', () => {
        it('should return an item by id', async () => {
            const item = new Item({
                id: 1,
                name: 'Item 1',
                description: 'Description 1',
                price: 100,
                locationTag: new LocationTag({ id: 1, displayName: 'Location', longitude: 50, latitude: 50 }),
                owner: new Profile({ id: 1, username: 'Owner', password: 'Password123!', email: 'owner@example.com', role: 'USER', locationTag: new LocationTag({ id: 1, displayName: 'Location', longitude: 50, latitude: 50 }) }),
                categories: [new Category({ id: 1, name: 'Category' })]
            });
            (itemDb.getItemById as jest.Mock).mockResolvedValue(item);

            const result = await itemService.getItemById(1);
            expect(result).toEqual(item);
            expect(itemDb.getItemById).toHaveBeenCalledWith({ itemId: 1 });
        });

        it('should throw an error if item not found', async () => {
            (itemDb.getItemById as jest.Mock).mockResolvedValue(null);

            await expect(itemService.getItemById(1)).rejects.toThrow('No item found for this id');
            expect(itemDb.getItemById).toHaveBeenCalledWith({ itemId: 1 });
        });
    });

    describe('addItem', () => {
        it('should add a new item', async () => {
            const itemInput: ItemAddInput = {
                name: 'New Item',
                description: 'Description',
                price: 100,
                locationTag: { displayName: 'Location', longitude: 50, latitude: 50 },
                ownerId: 1,
                categories: [{
                    id: 1,
                    name: 'Category',
                    parents: [],
                    children: []
                }]
            };

            const owner = new Profile({ 
                id: 1, 
                username: 'Owner', 
                password: 'Password123!', 
                email: 'owner@example.com', 
                role: 'USER', 
                locationTag: new LocationTag({ id: 1, displayName: 'Location', longitude: 50, latitude: 50 }) 
            });
            const locationTag = new LocationTag({ id: 1, displayName: 'Location', longitude: 50, latitude: 50 });
            const category = new Category({ id: 1, name: 'Category' });
            const newItem = new Item({
                name: 'New Item',
                description: 'Description',
                price: 100,
                locationTag,
                owner,
                categories: [category]
            });

            (profileDb.getProfileById as jest.Mock).mockResolvedValue(owner);
            (locationTagDb.getLocationTagByCoords as jest.Mock).mockResolvedValue(locationTag);
            (categoryDb.getCategoryById as jest.Mock).mockResolvedValue(category);
            (itemDb.addItem as jest.Mock).mockResolvedValue(newItem);

            const result = await itemService.addItem(itemInput);
            expect(result).toEqual(newItem);
            expect(profileDb.getProfileById).toHaveBeenCalledWith({ id: itemInput.ownerId });
            expect(locationTagDb.getLocationTagByCoords).toHaveBeenCalledWith(itemInput.locationTag);
            expect(categoryDb.getCategoryById).toHaveBeenCalledWith({ id: 1 });
            expect(itemDb.addItem).toHaveBeenCalledWith(expect.any(Item));
        });

        it('should throw an error if owner not found', async () => {
            const itemInput: ItemAddInput = {
                name: 'New Item',
                description: 'Description',
                price: 100,
                locationTag: { displayName: 'Location', longitude: 50, latitude: 50 },
                ownerId: 1,
                categories: [{
                    id: 1,
                    name: '',
                    parents: [],
                    children: []
                }]
            };

            (profileDb.getProfileById as jest.Mock).mockResolvedValue(null);

            await expect(itemService.addItem(itemInput)).rejects.toThrow('Owner not found');
            expect(profileDb.getProfileById).toHaveBeenCalledWith({ id: itemInput.ownerId });
        });

        it('should create a new location tag if not found', async () => {
            const itemInput: ItemAddInput = {
                name: 'New Item',
                description: 'Description',
                price: 100,
                locationTag: { displayName: 'New Location', longitude: 50, latitude: 50 },
                ownerId: 1,
                categories: [{
                    id: 1,
                    name: '',
                    parents: [],
                    children: []
                }]
            };

            const owner = new Profile({ 
                id: 1, 
                username: 'Owner', 
                password: 'Password123!', 
                email: 'owner@example.com', 
                role: 'USER', 
                locationTag: new LocationTag({ id: 1, displayName: 'Location', longitude: 50, latitude: 50 }) 
            });
            const newLocationTag = new LocationTag({ displayName: 'New Location', longitude: 50, latitude: 50 });
            const category = new Category({ id: 1, name: 'Category' });
            const newItem = new Item({
                name: 'New Item',
                description: 'Description',
                price: 100,
                locationTag: newLocationTag,
                owner,
                categories: [category]
            });

            (profileDb.getProfileById as jest.Mock).mockResolvedValue(owner);
            (locationTagDb.getLocationTagByCoords as jest.Mock).mockResolvedValue(null);
            (categoryDb.getCategoryById as jest.Mock).mockResolvedValue(category);
            (itemDb.addItem as jest.Mock).mockResolvedValue(newItem);

            const result = await itemService.addItem(itemInput);
            expect(result).toEqual(newItem);
            expect(profileDb.getProfileById).toHaveBeenCalledWith({ id: itemInput.ownerId });
            expect(locationTagDb.getLocationTagByCoords).toHaveBeenCalledWith(itemInput.locationTag);
            expect(categoryDb.getCategoryById).toHaveBeenCalledWith({ id: 1 });
            expect(itemDb.addItem).toHaveBeenCalledWith(expect.any(Item));
        });

        it('should filter out invalid categories', async () => {
            const itemInput: ItemAddInput = {
                name: 'New Item',
                description: 'Description',
                price: 100,
                locationTag: { displayName: 'Location', longitude: 50, latitude: 50 },
                ownerId: 1,
                categories: [{
                    id: 1,
                    name: '',
                    parents: [],
                    children: []
                }, {
                    id: 2,
                    name: '',
                    parents: [],
                    children: []
                }]
            };

            const owner = new Profile({ 
                id: 1, 
                username: 'Owner', 
                password: 'Password123!', 
                email: 'owner@example.com', 
                role: 'USER', 
                locationTag: new LocationTag({ id: 1, displayName: 'Location', longitude: 50, latitude: 50 }) 
            });
            const locationTag = new LocationTag({ id: 1, displayName: 'Location', longitude: 50, latitude: 50 });
            const category1 = new Category({ id: 1, name: 'Category 1' });
            const newItem = new Item({
                name: 'New Item',
                description: 'Description',
                price: 100,
                locationTag,
                owner,
                categories: [category1]
            });

            (profileDb.getProfileById as jest.Mock).mockResolvedValue(owner);
            (locationTagDb.getLocationTagByCoords as jest.Mock).mockResolvedValue(locationTag);
            (categoryDb.getCategoryById as jest.Mock).mockResolvedValueOnce(category1).mockResolvedValueOnce(null);
            (itemDb.addItem as jest.Mock).mockResolvedValue(newItem);

            const result = await itemService.addItem(itemInput);
            expect(result).toEqual(newItem);
            expect(profileDb.getProfileById).toHaveBeenCalledWith({ id: itemInput.ownerId });
            expect(locationTagDb.getLocationTagByCoords).toHaveBeenCalledWith(itemInput.locationTag);
            expect(categoryDb.getCategoryById).toHaveBeenCalledWith({ id: 1 });
            expect(categoryDb.getCategoryById).toHaveBeenCalledWith({ id: 2 });
            expect(itemDb.addItem).toHaveBeenCalledWith(expect.any(Item));
        });
    });
});