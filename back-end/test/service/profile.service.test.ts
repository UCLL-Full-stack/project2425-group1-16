import { Category } from "../../model/Category";
import { Item } from "../../model/Item";
import { LocationTag } from "../../model/LocationTag";
import { Profile } from "../../model/Profile";
import itemDb from "../../repository/item.db";
import profileDb from "../../repository/profile.db";
import itemService from "../../service/item.service";
import profileService from "../../service/profile.service";


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

const validProfile: Profile = new Profile({id: 1, username: validUsername, password: validPassword, email: validEmail, phoneNumber: validPhoneNumber, locationTag: validLocation});
const validProfile2: Profile = new Profile({id: 2, username: validUsername2, password: validPassword2, email: validEmail2, phoneNumber: validPhoneNumber2, locationTag: validLocation2});


let getProfileByEmailMock: jest.Mock;

beforeEach(() => {
    getProfileByEmailMock = jest.fn();
});

afterEach(() => {
    jest.clearAllMocks();
});

test('given a valid profile email, when a profile is requested by email, then the profile with that email is returned', () => {
    //given
    profileDb.getProfileByEmail = getProfileByEmailMock.mockReturnValue(validProfile);
    const profileEmail = "Kevin.Hiers@domain.be";
    
    //when
    const getProfileByEmail = () => profileService.getProfileByEmail(profileEmail);
    const result = getProfileByEmail();

    //then
    expect(getProfileByEmailMock).toHaveBeenCalledTimes(1);
    expect(result).toEqual(validProfile);
});

test('given an invalid profile email, when a profile is requested by email, then an error is thrown', () => {
    //given
    profileDb.getProfileByEmail = getProfileByEmailMock.mockReturnValue(null);
    const profileEmail = "notanemail";
    
    //when
    const getProfile = () => profileService.getProfileByEmail(profileEmail);

    //then
    expect(getProfile).toThrow("No profile found for this email");
});