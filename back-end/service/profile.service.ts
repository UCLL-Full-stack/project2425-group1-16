import { Profile } from "../model/profile";
import profileDb from "../repository/profile.db";
import bcrypt from 'bcrypt';
import { AuthenticationResponse, LoginInput, ProfileInput } from "../types";
import { generateJwtToken } from "../util/jwt";
import { LocationTag } from "../model/locationTag";
import { profile } from "console";

const getAllProfiles = async (): Promise<Profile[]> => await profileDb.getAllProfiles();

const getProfileByEmail = async (email: string): Promise<Profile> => {
    const profile = await profileDb.getProfileByEmail({ email });
    if (profile == null) {
        throw Error("No profile found for this email")
    }
    return profile;
};

const authenticate = async ({ email, password }: LoginInput): Promise<AuthenticationResponse> => {
    const AUTH_ERROR = new Error("We couldn't log you in. Please check your credentials.");

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
    username, password, email, phoneNumber, role
}: ProfileInput): Promise<AuthenticationResponse> => {
    
    const inDb = await profileDb.getProfileByEmail({ email });
    if (inDb) throw new Error(`A user with email address ${email} already exists.`);

    const hashedPasswd = await bcrypt.hash(password, 12);
    const newProfile = new Profile({
        username, password: hashedPasswd, email, phoneNumber, role,
        locationTag: new LocationTag({
            displayName: "No location",
            longitude: 0.0,
            latitude: 0.0
        })
    });

    const dbResult = await profileDb.createUser(newProfile);
    return {
        token: generateJwtToken({ userId: dbResult.getId()!, role: dbResult.getRole() }),
        userId: dbResult.getId()!,
        role: dbResult.getRole()
    }
};

export default {
    getAllProfiles,
    getProfileByEmail,
    authenticate,
    signupUser
};