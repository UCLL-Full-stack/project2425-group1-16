import { Profile } from '../../model/profile';
import { LocationTag } from '../../model/locationTag';
import { Role } from '../../types';

describe('Profile', () => {
    let locationTag: LocationTag;

    beforeEach(() => {
        locationTag = new LocationTag({ id: 1, displayName: 'Test Location', longitude: 50, latitude: 50 });
    });

    it('should create a Profile instance', () => {
        const profile = new Profile({
            id: 1,
            username: 'testuser',
            password: 'Password123!',
            email: 'testuser@example.com',
            phoneNumber: '+1234567890',
            role: 'USER',
            locationTag: locationTag
        });

        expect(profile.getId()).toBe(1);
        expect(profile.getUsername()).toBe('testuser');
        expect(profile.getPassword()).toBe('Password123!');
        expect(profile.getEmail()).toBe('testuser@example.com');
        expect(profile.getPhoneNumber()).toBe('+1234567890');
        expect(profile.getRole()).toBe('USER');
        expect(profile.getLocationTag()).toBe(locationTag);
    });

    it('should throw an error if required fields are missing', () => {
        expect(() => new Profile({
            username: '',
            password: 'Password123!',
            email: 'testuser@example.com',
            phoneNumber: '+1234567890',
            role: 'USER',
            locationTag: locationTag
        })).toThrow('A username must be given.');

        expect(() => new Profile({
            username: 'testuser',
            password: '',
            email: 'testuser@example.com',
            phoneNumber: '+1234567890',
            role: 'USER',
            locationTag: locationTag
        })).toThrow('A password must be given.');

        expect(() => new Profile({
            username: 'testuser',
            password: 'Password123!',
            email: '',
            phoneNumber: '+1234567890',
            role: 'USER',
            locationTag: locationTag
        })).toThrow('A email must be given.');

        expect(() => new Profile({
            username: 'testuser',
            password: 'Password123!',
            email: 'testuser@example.com',
            phoneNumber: '',
            role: 'USER',
            locationTag: locationTag
        })).toThrow('A phone number must be given.');

        expect(() => new Profile({
            username: 'testuser',
            password: 'Password123!',
            email: 'testuser@example.com',
            phoneNumber: '+1234567890',
            role: undefined as unknown as Role,
            locationTag: locationTag
        })).toThrow('A role must be given.');

        expect(() => new Profile({
            username: 'testuser',
            password: 'Password123!',
            email: 'testuser@example.com',
            phoneNumber: '+1234567890',
            role: 'USER',
            locationTag: undefined as unknown as LocationTag
        })).toThrow('A location must be given.');
    });

    it('should validate phone number format', () => {
        expect(() => new Profile({
            username: 'testuser',
            password: 'Password123!',
            email: 'testuser@example.com',
            phoneNumber: '123',
            role: 'USER',
            locationTag: locationTag
        })).toThrow('A phone number can only consist of numbers, and be 8 to 15 characters in length.');
    });

    it('should validate password strength', () => {
        expect(() => new Profile({
            username: 'testuser',
            password: 'weakpass',
            email: 'testuser@example.com',
            phoneNumber: '+1234567890',
            role: 'USER',
            locationTag: locationTag
        })).toThrow('Your password is not strong enough (needs at least 1 upper- & lowercase letter, 1 number, and 1 special character).');
    });

    it('should validate email format', () => {
        expect(() => new Profile({
            username: 'testuser',
            password: 'Password123!',
            email: 'invalid-email',
            phoneNumber: '+1234567890',
            role: 'USER',
            locationTag: locationTag
        })).toThrow('Invalid email');
    });

    it('should set and get username', () => {
        const profile = new Profile({
            id: 1,
            username: 'testuser',
            password: 'Password123!',
            email: 'testuser@example.com',
            phoneNumber: '+1234567890',
            role: 'USER',
            locationTag: locationTag
        });

        profile.setUsername('newuser');
        expect(profile.getUsername()).toBe('newuser');
    });

    it('should set and get password', () => {
        const profile = new Profile({
            id: 1,
            username: 'testuser',
            password: 'Password123!',
            email: 'testuser@example.com',
            phoneNumber: '+1234567890',
            role: 'USER',
            locationTag: locationTag
        });

        profile.setPassword('NewPassword123!');
        expect(profile.getPassword()).toBe('NewPassword123!');
    });

    it('should set and get email', () => {
        const profile = new Profile({
            id: 1,
            username: 'testuser',
            password: 'Password123!',
            email: 'testuser@example.com',
            phoneNumber: '+1234567890',
            role: 'USER',
            locationTag: locationTag
        });

        profile.setEmail('newuser@example.com');
        expect(profile.getEmail()).toBe('newuser@example.com');
    });

    it('should set and get phone number', () => {
        const profile = new Profile({
            id: 1,
            username: 'testuser',
            password: 'Password123!',
            email: 'testuser@example.com',
            phoneNumber: '+1234567890',
            role: 'USER',
            locationTag: locationTag
        });

        profile.setPhoneNumber('+0987654321');
        expect(profile.getPhoneNumber()).toBe('+0987654321');
    });

    it('should set and get location tag', () => {
        const profile = new Profile({
            id: 1,
            username: 'testuser',
            password: 'Password123!',
            email: 'testuser@example.com',
            phoneNumber: '+1234567890',
            role: 'USER',
            locationTag: locationTag
        });

        const newLocationTag = new LocationTag({ id: 2, displayName: 'New Location', longitude: 60, latitude: 60 });
        profile.setLocationTag(newLocationTag);
        expect(profile.getLocationTag()).toBe(newLocationTag);
    });

    it('should set and get role', () => {
        const profile = new Profile({
            id: 1,
            username: 'testuser',
            password: 'Password123!',
            email: 'testuser@example.com',
            phoneNumber: '+1234567890',
            role: 'USER',
            locationTag: locationTag
        });

        profile.setRole('ADMIN');
        expect(profile.getRole()).toBe('ADMIN');
    });

    it('should check equality of two Profile instances', () => {
        const profile1 = new Profile({
            id: 1,
            username: 'testuser',
            password: 'Password123!',
            email: 'testuser@example.com',
            phoneNumber: '+1234567890',
            role: 'USER',
            locationTag: locationTag
        });

        const profile2 = new Profile({
            id: 1,
            username: 'testuser',
            password: 'Password123!',
            email: 'testuser@example.com',
            phoneNumber: '+1234567890',
            role: 'USER',
            locationTag: locationTag
        });

        const profile3 = new Profile({
            id: 2,
            username: 'anotheruser',
            password: 'Password123!',
            email: 'anotheruser@example.com',
            phoneNumber: '+0987654321',
            role: 'USER',
            locationTag: locationTag
        });

        expect(profile1.equals(profile2)).toBe(true);
        expect(profile1.equals(profile3)).toBe(false);
    });
});