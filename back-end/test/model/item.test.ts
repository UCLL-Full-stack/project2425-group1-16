import { Item } from '../../model/item';
import { Category } from '../../model/category';
import { LocationTag } from '../../model/locationTag';
import { Profile } from '../../model/profile';

describe('Item', () => {
    let locationTag: LocationTag;
    let owner: Profile;
    let category: Category;

    beforeEach(() => {
        locationTag = new LocationTag({ displayName: 'Location', longitude: 0.324, latitude: -5.4 });
        owner = new Profile({ 
            username: 'Owner',
            email: 'owner@example.com',
            password: 'Password123%',
            phoneNumber: '957400245',
            role: 'USER',
            locationTag: locationTag
        });
        category = new Category({ id: 1, name: 'Category' });
    });

    it('should create an item with valid properties', () => {
        const item = new Item({
            name: 'Item Name',
            description: 'This is a valid description.',
            price: 100,
            locationTag,
            owner,
            categories: [category]
        });

        expect(item.getName()).toBe('Item Name');
        expect(item.getDescription()).toBe('This is a valid description.');
        expect(item.getPrice()).toBe(100);
        expect(item.getLocationTag()).toBe(locationTag);
        expect(item.getOwner()).toBe(owner);
        expect(item.getCategories()).toEqual([category]);
    });

    it('should throw an error if name is empty', () => {
        expect(() => new Item({
            name: '',
            description: 'This is a valid description.',
            price: 100,
            locationTag,
            owner,
            categories: [category]
        })).toThrow('Name cannot be empty.');
    });

    it('should throw an error if description is too short', () => {
        expect(() => new Item({
            name: 'Item Name',
            description: 'Short',
            price: 100,
            locationTag,
            owner,
            categories: [category]
        })).toThrow('The description has to be at least ten characters long.');
    });

    it('should throw an error if price is zero or negative', () => {
        expect(() => new Item({
            name: 'Item Name',
            description: 'This is a valid description.',
            price: 0,
            locationTag,
            owner,
            categories: [category]
        })).toThrow('Price cannot be negative or zero.');

        expect(() => new Item({
            name: 'Item Name',
            description: 'This is a valid description.',
            price: -10,
            locationTag,
            owner,
            categories: [category]
        })).toThrow('Price cannot be negative or zero.');
    });

    it('should throw an error if categories are missing', () => {
        expect(() => new Item({
            name: 'Item Name',
            description: 'This is a valid description.',
            price: 100,
            locationTag,
            owner,
            categories: []
        })).toThrow('There need to be at least one category for this item.');
    });

    it('should add a category', () => {
        const otherCategory = new Category({ id: 2, name: 'Other Category' });
        const item = new Item({
            name: 'Item Name',
            description: 'This is a valid description.',
            price: 100,
            locationTag,
            owner,
            categories: [otherCategory]
        });

        item.addCategory(category);
        expect(item.getCategories()).toEqual([otherCategory, category]);
    });

    it('should check equality correctly', () => {
        const item1 = new Item({
            id: 1,
            name: 'Item Name',
            description: 'This is a valid description.',
            price: 100,
            locationTag,
            owner,
            categories: [category]
        });

        const item2 = new Item({
            id: 1,
            name: 'Item Name',
            description: 'This is a valid description.',
            price: 100,
            locationTag,
            owner,
            categories: [category]
        });

        const item3 = new Item({
            id: 2,
            name: 'Different Item',
            description: 'This is another description.',
            price: 200,
            locationTag,
            owner,
            categories: [category]
        });

        expect(item1.equals(item2)).toBe(true);
        expect(item1.equals(item3)).toBe(false);
    });
});