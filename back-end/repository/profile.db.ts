import { LocationTag } from "../model/LocationTag";
import { Profile } from "../model/Profile";

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

const validProfile: Profile = new Profile({id: 1, username: validUsername, password: validPassword, email: validEmail, phoneNumber: validPhoneNumber, location: validLocation});
const validProfile2: Profile = new Profile({id: 2, username: validUsername2, password: validPassword2, email: validEmail2, phoneNumber: validPhoneNumber2, location: validLocation2});

const profiles: Profile[] = [
    validProfile,
    validProfile2
]


const getAllProfiles = (): Profile[] => profiles;

const getProfileByEmail = ({ email }: { email: string }): Profile | null => {
    return profiles.find((profile) => profile.getEmail() === email) || null;
};


export default {
    getAllProfiles,
    getProfileByEmail,
};