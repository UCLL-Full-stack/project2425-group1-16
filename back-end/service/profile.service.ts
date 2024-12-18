import { Profile } from "../model/profile";
import profileDb from "../repository/profile.db";

const getAllProfiles = async (): Promise<Profile[]> => await profileDb.getAllProfiles();

const getProfileByEmail = async (email: string): Promise<Profile> => {
    const profile = await profileDb.getProfileByEmail({ email });
    if (profile == null) {
        throw Error("No profile found for this email")
    }
    return profile;
}


export default {
    getAllProfiles,
    getProfileByEmail
};