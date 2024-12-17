import { Category } from "../../model/Category";
import { Item } from "../../model/Item";
import { LocationTag } from "../../model/LocationTag";
import { Profile } from "../../model/Profile";

const validName: string = "Grasmaaier";
const validName2: string = "Sfeerverlichting";

const validDescription: string = "Dit is een grasmaaier";
const validDescription2: string = "Dit is wat sfeerverlichting";

const validPrice: number = 10;
const validPrice2: number = 20;

const validUsername: string = "Michiel05";
const validUsername2: string = "Kevin04";

const validPassword: string = "K5/#G6es:M(z8,";
const validPassword2: string = "K4/#G6es:M(z8,";

const validEmail2: string = "Kevin.Hiers@domain.be";
const validEmail: string = "Michiel.Nijs@domain.be";

const validPhoneNumber: string = "0467725913";
const validPhoneNumber2: string = "0467724913";

const validLocation: LocationTag = new LocationTag({
    displayName: "Leuven",
    latitude: 50.8775,
    longitude: 4.70444
})

const validLocation2: LocationTag = new LocationTag({
    displayName: "Brussel",
    latitude: 50.84667,
    longitude: 4.35472
})

const validProfile: Profile = new Profile({username: validUsername, password: validPassword, email: validEmail, phoneNumber: validPhoneNumber, location: validLocation});
const validProfile2: Profile = new Profile({username: validUsername2, password: validPassword2, email: validEmail2, phoneNumber: validPhoneNumber2, location: validLocation2});

const validCategoryName: string = "Tuingereedschap";
const validCategoryName2: string = "Grasmaaiers";
const validCategoryName3: string = "Elektronica";
const validCategoryName4: string = "Verlichting";
const validCategoryName5: string = "Decoratie";

const validCategory: Category = new Category({name: validCategoryName});
const validCategory2: Category = new Category({name: validCategoryName3});
const validCategory3: Category = new Category({name: validCategoryName5});

const validParents: Category[] = [validCategory];
const validParents2: Category[] = [validCategory2, validCategory3];

const validCategory4: Category = new Category({name: validCategoryName2, parents: validParents});
const validCategory5: Category = new Category({name: validCategoryName4, parents: validParents2});

const validCategories: Category[] = [validCategory, validCategory4];
const validCategories2: Category[] = [validCategory2, validCategory3, validCategory5];

const validItem: Item = new Item({name: validName, description: validDescription, price: validPrice, owner: validProfile, location: validLocation, categories: validCategories});

test(`given: valid values for item; when: item is created; then: item is created with those values`, () => {
    const item: Item = new Item({name: validName, description: validDescription, price: validPrice, owner: validProfile, location: validLocation, categories: validCategories});
    expect(item.getId()).toBeUndefined();
    expect(item.getName()).toEqual(validName);
    expect(item.getDescription()).toEqual(validDescription);
    expect(item.getPrice()).toEqual(validPrice);
    expect(item.getOwner()).toEqual(validProfile);
    expect(item.getLocation()).toEqual(validLocation);
    expect(item.getCategories()).toEqual(validCategories);
})

test(`given: a valid item and valid item values; when: item is edited with those values; then: item now has these new values`, () => {
    validItem.setName(validName2);
    validItem.setDescription(validDescription2);
    validItem.setPrice(validPrice2);
    validItem.setOwner(validProfile2);
    validItem.setLocation(validLocation2);
    validItem.setCategories(validCategories2);
    expect(validItem.getId()).toBeUndefined();
    expect(validItem.getName()).toEqual(validName2);
    expect(validItem.getDescription()).toEqual(validDescription2);
    expect(validItem.getPrice()).toEqual(validPrice2);
    expect(validItem.getOwner()).toEqual(validProfile2);
    expect(validItem.getLocation()).toEqual(validLocation2);
    expect(validItem.getCategories()).toEqual(validCategories2);
})