import { Profile } from "../model/profile";
import profileDb from "../repository/profile.db";


const getAllProfiles = (): Profile[] => profileDb.getAllProfiles();

const getProfileByEmail = (email: string): Profile => {
    const profile = profileDb.getProfileByEmail({ email });
    if (profile == null) {
        throw Error("No profile found for this email")
    }
    return profile;
}


export default { getAllProfiles, getProfileByEmail };