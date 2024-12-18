import { Profile } from "../model/profile";
import database from "./database";

const getAllProfiles = async (): Promise<Profile[]> => {
    try {
        const profilesPrisma = await database.profile.findMany({
            include: {
                locationTag: true
            }
        });
        return profilesPrisma.map((profilePrisma) => Profile.from(profilePrisma));
    } catch (error) {
        console.error(`Database error: ${error}`);
        throw new Error(`Database error: ${error}`);
    }
};

const getProfileByEmail = async ({ email }: { email: string }): Promise<Profile | null> => {
    try {
        const profilePrisma = await database.profile.findUnique({
            where: {
                email
            },
            include: { locationTag: true }
        })
        return profilePrisma ? Profile.from(profilePrisma) : null;
    } catch (error) {
        console.error(`Database error: ${error}`);
        throw new Error(`Database error: ${error}`);
    }
};

export default {
    getAllProfiles,
    getProfileByEmail,
};