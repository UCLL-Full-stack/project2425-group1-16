import { Profile } from "../model/profile";
import profileDb from "../repository/profile.db";
import bcrypt from 'bcrypt';
import { AuthenticationResponse, LoginInput, ProfileInput, Role } from "../types";
import { generateJwtToken } from "../util/jwt";
import { LocationTag } from "../model/locationTag";
import locationTagDb from "../repository/locationTag.db";
import { decode } from 'jsonwebtoken';

const getAllProfiles = async (): Promise<Profile[]> => await profileDb.getAllProfiles();

const getProfileByEmail = async (email: string): Promise<Profile> => {
    if (!email) throw new Error('No email was provided.');
    const profile = await profileDb.getProfileByEmail({ email });
    if (profile == null) throw new Error("No profile found for this email.");
    return profile;
};

const getProfileById = async (id: number): Promise<Profile> => {
    if (id == null) throw new Error('No profile id was given.');
    const profile = await profileDb.getProfileById({ id });
    if (profile == null) throw new Error("No profile found with this ID.");
    return profile;
}

const getProfilesByRole = async (role: Role, token: string): Promise<Profile[]> => {
    if (!role) throw new Error('No role was given.');
    if (!verifyUserRole({ token, wantedRole: role }))
        throw new Error("You don't have the right role to make this request.");

    return await profileDb.getProfilesByRole({ role });
}

const authenticate = async ({ email, password }: LoginInput): Promise<AuthenticationResponse> => {
    const AUTH_ERROR = new Error("We couldn't log you in. Please check your credentials.");

    if (!password) throw AUTH_ERROR;

    const profile = await profileDb.getProfileByEmail({ email });
    if (!profile) throw AUTH_ERROR;
    if (profile.getId() == null) throw new Error(`This user (${profile.getUsername()}) does not have an id.`);

    const passwdEquals = await bcrypt.compare(password, profile.getPassword());
    if (!passwdEquals) throw AUTH_ERROR;

    return {
        token: generateJwtToken({ userId: profile.getId()!, role: profile.getRole() }),
        userId: profile.getId()!,
        role: profile.getRole()
    };
};

const signupUser = async ({
    username, password, email
}: ProfileInput): Promise<AuthenticationResponse> => {
    
    const inDb = await profileDb.getProfileByEmail({ email });
    if (inDb) throw new Error(`A user with email address ${email} already exists.`);

    const hashedPasswd = await bcrypt.hash(password, 12);
    const newProfile = new Profile({
        username, password: hashedPasswd, email, role: 'USER',
        locationTag: new LocationTag({
            displayName: "No location",
            longitude: 0.0,
            latitude: 0.0
        })
    });

    const defaultLocation = await locationTagDb.getDefault();
    const dbResult = await profileDb.createUser(newProfile, defaultLocation);
    return {
        token: generateJwtToken({ userId: dbResult.getId()!, role: dbResult.getRole() }),
        userId: dbResult.getId()!,
        role: dbResult.getRole()
    }
};

const updateRoleForProfile = async ({ id, role, token }: { id: number, role: Role, token: string}): Promise<Profile> => {
    if (!verifyUserRole({ token, wantedRole: role }))
        throw new Error("You don't have the right role to make this request.");

    return await profileDb.updateRoleForProfile({ id, role });
};

const verifyUserRole = async ({ token, wantedRole }: { token: string, wantedRole: Role }): Promise<boolean> => {
    const decodedToken = decode(token);

    if (!decodedToken || typeof decodedToken !== 'object')
        throw new Error('This is not a valid token.');
    return decodedToken.role == wantedRole;
};

export default {
    getAllProfiles,
    getProfileByEmail,
    getProfileById,
    getProfilesByRole,
    authenticate,
    signupUser,
    updateRoleForProfile
};