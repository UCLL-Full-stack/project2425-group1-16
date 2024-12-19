import { Category } from "../../model/category";
import { Item } from "../../model/item";
import { LocationTag } from "../../model/locationTag";
import { Profile } from "../../model/profile";
import itemDb from "../../repository/item.db";
import itemService from "../../service/item.service";


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

const validProfile1: Profile = new Profile({username: validUsername2, password: validPassword2, email: validEmail2, phoneNumber: validPhoneNumber2, role: 'USER', locationTag: validLocation2});
const validProfile2: Profile = new Profile({username: validUsername2, password: validPassword2, email: validEmail2, phoneNumber: validPhoneNumber2, role: 'ADMIN', locationTag: validLocation2});

const validCategoryName: string = "Tuingereedschap";
const validCategoryName2: string = "Grasmaaiers";
const validCategoryName3: string = "Elektronica";
const validCategoryName4: string = "Verlichting";
const validCategoryName5: string = "Decoratie";

const validCategory: Category = new Category({ name: validCategoryName });
const validCategory2: Category = new Category({ name: validCategoryName3 });
const validCategory3: Category = new Category({ name: validCategoryName5 });

const validParents: Category[] = [validCategory];
const validParents2: Category[] = [validCategory2, validCategory3];

const validCategory4: Category = new Category({name: validCategoryName2, parents: validParents});
const validCategory5: Category = new Category({name: validCategoryName4, parents: validParents2});

const validCategories: Category[] = [validCategory, validCategory4];
const validCategories2: Category[] = [validCategory2, validCategory3, validCategory5];

const validItem: Item = new Item({id: 1, name: validName, description: validDescription, price: validPrice, owner: validProfile1, locationTag: validLocation, categories: validCategories});
const validItem2: Item = new Item({id:2, name: validName2, description: validDescription2, price: validPrice2, owner: validProfile2, locationTag: validLocation2, categories: validCategories2});


let getItemByIdMock: jest.Mock;

beforeEach(() => {
    getItemByIdMock = jest.fn();
});

afterEach(() => {
    jest.clearAllMocks();
});

test('given a valid item id, when an item is requested by id, then the item with that id is returned', () => {
    //given
    itemDb.getItemById = getItemByIdMock.mockReturnValue(validItem);
    const itemId = 1;
    
    //when
    const getItemById = () => itemService.getItemById(itemId);
    const result = getItemById();

    //then
    expect(getItemByIdMock).toHaveBeenCalledTimes(1);
    expect(result).toEqual(validItem);
});

test('given an invalid item id, when an item is requested by id, then an error is thrown', () => {
    //given
    itemDb.getItemById = getItemByIdMock.mockReturnValue(null);
    const itemId = 4;
    
    //when
    const getItem = () => itemService.getItemById(itemId);

    //then
    expect(getItem).toThrow("No item found for this id");
});