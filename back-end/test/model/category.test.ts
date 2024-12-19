import { Category } from '../../model/category';

describe('Category', () => {
    it('should create a category with valid name', () => {
        const category = new Category({ name: 'Electronics' });
        expect(category.getName()).toBe('Electronics');
    });

    it('should throw an error if name is empty', () => {
        expect(() => new Category({ name: '' })).toThrow('Name cannot be empty!');
    });

    it('should set and get parents correctly', () => {
        const parentCategory = new Category({ name: 'Parent' });
        const category = new Category({ name: 'Child', parents: [parentCategory] });
        expect(category.getParents()).toEqual([parentCategory]);
    });

    it('should set and get children correctly', () => {
        const childCategory = new Category({ name: 'Child' });
        const category = new Category({ name: 'Parent', children: [childCategory] });
        expect(category.getChildren()).toEqual([childCategory]);
    });

    it('should set and get name correctly', () => {
        const category = new Category({ name: 'Initial' });
        category.setName('Updated');
        expect(category.getName()).toBe('Updated');
    });

    it('should set and get parents correctly', () => {
        const parentCategory = new Category({ name: 'Parent' });
        const category = new Category({ name: 'Child' });
        category.setParents([parentCategory]);
        expect(category.getParents()).toEqual([parentCategory]);
    });

    it('should set and get children correctly', () => {
        const childCategory = new Category({ name: 'Child' });
        const category = new Category({ name: 'Parent' });
        category.setChildren([childCategory]);
        expect(category.getChildren()).toEqual([childCategory]);
    });

    it('should check equality correctly', () => {
        const category1 = new Category({ name: 'Category', id: 1 });
        const category2 = new Category({ name: 'Category', id: 1 });
        const category3 = new Category({ name: 'Different Category', id: 2 });

        expect(category1.equals(category2)).toBe(true);
        expect(category1.equals(category3)).toBe(false);
    });
});