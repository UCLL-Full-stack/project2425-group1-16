import { LocationTag } from "../../model/LocationTag";
import { Profile } from "../../model/Profile";

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

test(`given: valid values for profile; when: profile is created; then: profile is created with those values`, () => {
    const profile: Profile = new Profile({username: validUsername, password: validPassword, email: validEmail, phoneNumber: validPhoneNumber, location: validLocation});
    expect(profile.getId()).toBeUndefined();
    expect(profile.getUsername()).toEqual(validUsername);
    expect(profile.getPassword()).toEqual(validPassword);
    expect(profile.getEmail()).toEqual(validEmail);
    expect(profile.getPhoneNumber()).toEqual(validPhoneNumber);
    expect(profile.getLocation()).toEqual(validLocation);
})

test(`given: a valid profile and valid profile values; when: profile is edited with those values; then: profile now has these new values`, () => {
    validProfile.setUsername(validUsername2);
    validProfile.setPassword(validPassword2);
    validProfile.setEmail(validEmail2);
    validProfile.setPhoneNumber(validPhoneNumber2);
    validProfile.setLocation(validLocation2);
    expect(validProfile.getId()).toBeUndefined();
    expect(validProfile.getUsername()).toEqual(validUsername2);
    expect(validProfile.getPassword()).toEqual(validPassword2);
    expect(validProfile.getEmail()).toEqual(validEmail2);
    expect(validProfile.getPhoneNumber()).toEqual(validPhoneNumber2);
    expect(validProfile.getLocation()).toEqual(validLocation2);
})