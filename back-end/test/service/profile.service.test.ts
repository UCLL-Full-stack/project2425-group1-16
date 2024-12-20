import profileService from '../../service/profile.service';
import profileDb from '../../repository/profile.db';
import bcrypt from 'bcrypt';
import { generateJwtToken } from '../../util/jwt';
import { Profile } from '../../model/profile';
import { LocationTag } from '../../model/locationTag';
import { AuthenticationResponse, LoginInput, ProfileInput } from '../../types';

jest.mock('../../repository/profile.db');
jest.mock('bcrypt');
jest.mock('../../util/jwt');

let hashedPassword: string;

describe('Profile Service', () => {
    beforeEach(() => {
        hashedPassword = bcrypt.hashSync("Password123!", 12);
        jest.clearAllMocks();
    });

    describe('getAllProfiles', () => {
        it('should return all profiles', async () => {
            const profiles = [
                new Profile({ id: 1, username: 'User1', password: 'Password123!', email: 'user1@example.com', role: 'USER', locationTag: new LocationTag({ id: 1, displayName: 'Location', longitude: 50, latitude: 50 }) }),
                new Profile({ id: 2, username: 'User2', password: 'Password123!', email: 'user2@example.com', role: 'USER', locationTag: new LocationTag({ id: 2, displayName: 'Location', longitude: 50, latitude: 50 }) })
            ];
            (profileDb.getAllProfiles as jest.Mock).mockResolvedValue(profiles);

            const result = await profileService.getAllProfiles();
            expect(result).toEqual(profiles);
            expect(profileDb.getAllProfiles).toHaveBeenCalledTimes(1);
        });
    });

    describe('getProfileByEmail', () => {
        it('should return a profile by email', async () => {
            const profile = new Profile({ id: 1, username: 'User1', password: 'Password123!', email: 'user1@example.com', role: 'USER', locationTag: new LocationTag({ id: 1, displayName: 'Location', longitude: 50, latitude: 50 }) });
            (profileDb.getProfileByEmail as jest.Mock).mockResolvedValue(profile);

            const result = await profileService.getProfileByEmail('user1@example.com');
            expect(result).toEqual(profile);
            expect(profileDb.getProfileByEmail).toHaveBeenCalledWith({ email: 'user1@example.com' });
        });

        it('should throw an error if profile not found', async () => {
            (profileDb.getProfileByEmail as jest.Mock).mockResolvedValue(null);

            await expect(profileService.getProfileByEmail('user1@example.com')).rejects.toThrow('No profile found for this email.');
            expect(profileDb.getProfileByEmail).toHaveBeenCalledWith({ email: 'user1@example.com' });
        });
    });

    describe('getProfileById', () => {
        it('should return a profile by id', async () => {
            const profile = new Profile({
                id: 1,
                username: 'User1',
                password: 'Password123!',
                email: 'user1@example.com',
                role: 'USER',
                locationTag: new LocationTag({ id: 1, displayName: 'Location', longitude: 50, latitude: 50 })
            });
            (profileDb.getProfileById as jest.Mock).mockResolvedValue(profile);

            const result = await profileService.getProfileById(1);
            expect(result).toEqual(profile);
            expect(profileDb.getProfileById).toHaveBeenCalledWith({ id: 1 });
        });

        it('should throw an error if profile not found', async () => {
            (profileDb.getProfileById as jest.Mock).mockResolvedValue(null);

            await expect(profileService.getProfileById(1)).rejects.toThrow('No profile found with this ID.');
            expect(profileDb.getProfileById).toHaveBeenCalledWith({ id: 1 });
        });

        it('should throw an error if id is null', async () => {
            await expect(profileService.getProfileById(null as unknown as number)).rejects.toThrow('No profile id was given.');
        });
    });

    describe('authenticate', () => {
        it('should authenticate a user and return a token', async () => {
            const profile = new Profile({
                id: 1,
                username: 'User1',
                email: 'user1@example.com',
                password: "Password123%",
                role: 'USER',
                locationTag: new LocationTag({
                    id: 1,
                    displayName: 'Location',
                    longitude: 50,
                    latitude: 50
                })
            });
            (profileDb.getProfileByEmail as jest.Mock).mockResolvedValue(profile);
            (bcrypt.compare as jest.Mock).mockResolvedValue(true);
            (generateJwtToken as jest.Mock).mockReturnValue('token');

            const loginInput: LoginInput = { email: 'user1@example.com', password: 'password' };
            const result: AuthenticationResponse = await profileService.authenticate(loginInput);

            expect(result).toEqual({ token: 'token', userId: 1, role: 'USER' });
            expect(profileDb.getProfileByEmail).toHaveBeenCalledWith({ email: 'user1@example.com' });
            expect(bcrypt.compare).toHaveBeenCalledWith('password', 'Password123%');
            expect(generateJwtToken).toHaveBeenCalledWith({ userId: 1, role: 'USER' });
        });

        it('should throw an error if profile not found', async () => {
            (profileDb.getProfileByEmail as jest.Mock).mockResolvedValue(null);

            const loginInput: LoginInput = { email: 'user1@example.com', password: 'password' };
            await expect(profileService.authenticate(loginInput)).rejects.toThrow("We couldn't log you in. Please check your credentials.");
            expect(profileDb.getProfileByEmail).toHaveBeenCalledWith({ email: 'user1@example.com' });
        });

        it('should throw an error if password does not match', async () => {
            const profile = new Profile({
                id: 1,
                username: 'User1',
                email: 'user1@example.com',
                password: 'Password123%',
                role: 'USER',
                locationTag: new LocationTag({ 
                    id: 1,
                    displayName: 'Location',
                    longitude: 50,
                    latitude: 50
                }) 
            });
            (profileDb.getProfileByEmail as jest.Mock).mockResolvedValue(profile);
            (bcrypt.compare as jest.Mock).mockResolvedValue(false);
            
            const loginInput: LoginInput = { email: 'user1@example.com', password: 'password' };
            await expect(profileService.authenticate(loginInput)).rejects.toThrow("We couldn't log you in. Please check your credentials.");
            expect(profileDb.getProfileByEmail).toHaveBeenCalledWith({ email: 'user1@example.com' });
            expect(bcrypt.compare).toHaveBeenCalledWith('password', profile.getPassword());
        });
    });

    describe('signupUser', () => {
        it('should throw an error if email already exists', async () => {
            const profileInput: ProfileInput = {
                username: 'User1',
                password: 'password',
                email: 'user1@example.com',
                role: 'USER',
                locationTag: {
                    displayName: 'No location',
                    longitude: 0.0,
                    latitude: 0.0
                }
            };

            const existingProfile = new Profile({ 
                id: 1, 
                username: 'User1', 
                password: 'Password123!', 
                email: 'user1@example.com', 
                role: 'USER', 
                locationTag: new LocationTag({ id: 1, displayName: 'Location', longitude: 50, latitude: 50 }) 
            });

            (profileDb.getProfileByEmail as jest.Mock).mockResolvedValue(existingProfile);

            await expect(profileService.signupUser(profileInput)).rejects.toThrow('A user with email address user1@example.com already exists.');
            expect(profileDb.getProfileByEmail).toHaveBeenCalledWith({ email: 'user1@example.com' });
        });
    });
});