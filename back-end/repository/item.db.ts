import { Category } from "../model/Category";
import { Item } from "../model/Item";
import { LocationTag } from "../model/LocationTag";
import { Profile } from "../model/Profile";

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
    longtitude: 4.70444
})

const validLocation2: LocationTag = new LocationTag({
    displayName: "Brussel",
    latitude: 50.84667,
    longtitude: 4.35472
})

const validProfile: Profile = new Profile({username: validUsername, password: validPassword, email: validEmail, phoneNumber: validPhoneNumber, location: validLocation});
const validProfile2: Profile = new Profile({username: validUsername2, password: validPassword2, email: validEmail2, phoneNumber: validPhoneNumber2, location: validLocation2});

const validCategoryName: string = "Tuingereedschap";
const validCategoryName2: string = "Grasmaaiers";
const validCategoryName3: string = "Elektronica";
const validCategoryName4: string = "Verlichting";
const validCategoryName5: string = "Decoratie";

const validCategory: Category = new Category({name: validCategoryName, parents: null});
const validCategory2: Category = new Category({name: validCategoryName3, parents: null});
const validCategory3: Category = new Category({name: validCategoryName5, parents: null});

const validParents: Category[] = [validCategory];
const validParents2: Category[] = [validCategory2, validCategory3];

const validCategory4: Category = new Category({name: validCategoryName2, parents: validParents});
const validCategory5: Category = new Category({name: validCategoryName4, parents: validParents2});

const validCategories: Category[] = [validCategory, validCategory4];
const validCategories2: Category[] = [validCategory2, validCategory3, validCategory5];

const validItem: Item = new Item({name: validName, description: validDescription, price: validPrice, owner: validProfile, location: validLocation, categories: validCategories});
const validItem2: Item = new Item({name: validName2, description: validDescription2, price: validPrice2, owner: validProfile2, location: validLocation2, categories: validCategories2});

const items: Item[] = [
    validItem,
    validItem2
]


const getAllItems = (): Item[] => items;

export default {
    getAllItems,
};