import { Category } from "../../model/category";

const validName: string = "Tuingereedschap";
const validName2: string = "Grasmaaiers";
const validName3: string = "Elektronica";
const validName4: string = "Verlichting";
const validName5: string = "Decoratie";

const validCategory: Category = new Category({name: validName});
const validCategory2: Category = new Category({name: validName3});
const validCategory3: Category = new Category({name: validName5});

const validParents: Category[] = [validCategory];
const validParents2: Category[] = [validCategory2, validCategory3];

const validCategory4: Category = new Category({name: validName2, parents: validParents});

test(`given: valid values for category; when: category is created; then: category is created with those values`, () => {
    const category: Category = new Category({name: validName2, parents: validParents});
    expect(category.getId()).toBeUndefined();
    expect(category.getName()).toEqual(validName2);
    expect(category.getParents()).toEqual(validParents);
})

test(`given: a valid category and valid category values; when: category is edited with those values; then: category now has these new values`, () => {
    validCategory4.setName(validName4);
    validCategory4.setParents(validParents2);
    expect(validCategory4.getId()).toBeUndefined();
    expect(validCategory4.getName()).toEqual(validName4);
    expect(validCategory4.getParents()).toEqual(validParents2);
})