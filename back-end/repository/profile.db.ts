import { Profile } from "../model/profile";
import database from "./database";
import locationTagDb from "./locationTag.db";
import { LocationTag } from "../model/locationTag";
import { Role } from "../types";

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

const getProfileById = async ({ id }: { id: number }): Promise<Profile | null> => {
    try {
        const profilePrisma = await database.profile.findUnique({
            where: {
                id
            },
            include: { locationTag: true }
        });
        return profilePrisma ? Profile.from(profilePrisma) : null;
    } catch (error) {
        console.error(`Database error: ${error}`);
        throw new Error(`Database error: ${error}`);
    }
};

const getProfilesByRole = async ({ role }: { role: Role }): Promise<Profile[]> => {
    try {
        const profilesPrisma = await database.profile.findMany({
            where: { role },
            include: { locationTag: true }
        });
        return profilesPrisma.map((profilePrisma) => Profile.from(profilePrisma));
    } catch (error) {
        console.error(`Database error: ${error}`);
        throw new Error(`Database error: ${error}`);
    }
}

const createUser = async (profile: Profile): Promise<Profile> => {
    try {
        let foundLocationTag: LocationTag | null | undefined;
        if (profile.getLocationTag().getId() == null) {
            foundLocationTag = await locationTagDb.getLocationTagByCoords({
                longitude: profile.getLocationTag().getLongitude(),
                latitude: profile.getLocationTag().getLatitude(),
            });
        }

        if (foundLocationTag == undefined && profile.getLocationTag().getId() == undefined) {
            throw new Error('No suitable source for profile location');
        }

        const createdUser = await database.profile.create({
            data: {
                username: profile.getUsername(),
                password: profile.getPassword(),
                email: profile.getEmail(),
                role: profile.getRole(),
                locationTag: {
                    connect: { id: profile.getLocationTag().getId() ?? foundLocationTag!.getId()}
                }
            },
            include: { locationTag: true }
        });
        return Profile.from(createdUser);
    } catch (error) {
        console.error(`Database error: ${error}`);
        throw new Error(`Database error: ${error}`);
    }
};

const updateRoleForProfile = async ({ id, role }: { id: number, role: Role }): Promise<Profile> => {
    const updateProfilePrisma = await database.profile.update({
        where: { id },
        data: { role },
        include: { locationTag: true } 
    });
    return Profile.from(updateProfilePrisma);
};

export default {
    getAllProfiles,
    getProfileByEmail,
    getProfileById,
    getProfilesByRole,
    createUser,
    updateRoleForProfile
};