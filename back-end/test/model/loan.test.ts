import { Category } from "../../model/category";
import { Item } from "../../model/item";
import { Loan, LoanState } from "../../model/loan";
import { LocationTag } from "../../model/locationTag";
import { Profile } from "../../model/profile";

const validStart: Date = new Date(2024, 10, 16);
const validStart2: Date = new Date(2024, 10, 15);

const validEnd: Date = new Date (2024, 10, 18);
const validEnd2: Date = new Date (2024, 10, 17);

const validState: LoanState = "PENDING";
const validState2: LoanState = "ACCEPTED";

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

const validProfile: Profile = new Profile({username: validUsername, password: validPassword, email: validEmail, phoneNumber: validPhoneNumber, locationTag: validLocation});
const validProfile2: Profile = new Profile({username: validUsername2, password: validPassword2, email: validEmail2, phoneNumber: validPhoneNumber2, locationTag: validLocation2});

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

const validItem: Item = new Item({name: validName, description: validDescription, price: validPrice, owner: validProfile, locationTag: validLocation, categories: validCategories});
const validItem2: Item = new Item({name: validName2, description: validDescription2, price: validPrice2, owner: validProfile2, locationTag: validLocation2, categories: validCategories2});

const validLoan: Loan = new Loan({start: validStart, end: validEnd, state: validState, loanedItem: validItem, loaner: validProfile2});

test(`given: valid values for loan; when: loan is created; then: loan is created with those values`, () => {
    const loan: Loan = new Loan({start: validStart, end: validEnd, state: validState, loanedItem: validItem, loaner: validProfile2});
    expect(loan.getId()).toBeUndefined();
    expect(loan.getStart()).toEqual(validStart);
    expect(loan.getEnd()).toEqual(validEnd);
    expect(loan.getState()).toEqual(validState);
    expect(loan.getLoanedItem()).toEqual(validItem);
    expect(loan.getLoaner()).toEqual(validProfile2);
})

test(`given: a valid loan and valid loan values; when: loan is edited with those values; then: loan now has these new values`, () => {
    validLoan.setStart(validStart2);
    validLoan.setEnd(validEnd2);
    validLoan.setState(validState2);
    validLoan.setLoanedItem(validItem2);
    validLoan.setLoaner(validProfile);
    expect(validLoan.getId()).toBeUndefined();
    expect(validLoan.getStart()).toEqual(validStart2);
    expect(validLoan.getEnd()).toEqual(validEnd2);
    expect(validLoan.getState()).toEqual(validState2);
    expect(validLoan.getLoaner()).toEqual(validProfile);
    expect(validLoan.getLoanedItem()).toEqual(validItem2);
})
