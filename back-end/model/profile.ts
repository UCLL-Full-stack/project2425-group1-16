import { Role } from "../types";
import { LocationTag } from "./locationTag";

import { 
    Profile as ProfilePrisma,
    LocationTag as LocationTagPrisma,
} from '@prisma/client';

export class Profile {
    private id?: number;
    private username: string;
    private password: string;
    private email: string;
    private role: Role;

    private locationTag: LocationTag;

    constructor(
        { id, username, password, email, role, locationTag }
    : {
        id?: number,
        username: string,
        password: string,
        email: string,
        role: Role,

        locationTag: LocationTag,
    }) {
        this.validate({ username, password, email, role, locationTag });

        this.id = id
        this.username = username;
        this.password = password;
        this.email = email;
        this.role = role;

        this.locationTag = locationTag;
    }

    validate({ username, password, email, role, locationTag }
    : {
        username: string,
        password: string,
        email: string,
        role: Role,
        locationTag: LocationTag,
    }) {
        if (!username?.trim())      throw new Error('A username must be given.');
        if (!password?.trim())      throw new Error('A password must be given.');
        if (!email?.trim())         throw new Error('A email must be given.');
        if (!role)                  throw new Error('A role must be given.');
        if (!locationTag)           throw new Error('A location must be given.');

        if (password.trim().length < 8)
            throw new Error('A password has to be at least 8 characters in lenght.');
        if (!password.trim().match(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!-/:-@\\[-`\\{-~]).*$/))
            throw new Error('Your password is not strong enough (needs at least 1 upper- & lowercase letter, 1 number, and 1 special character).');
        if (!email.trim().match(/^\w+@\w+\.\w+$/))
            throw new Error('Invalid email');
    }

    public getId(): number | undefined {
        return this.id;
    }

    public getUsername(): string {
        return this.username;
    }

    public setUsername(username: string) {
        this.username = username;
    }

    public getPassword(): string {
        return this.password;
    }

    public setPassword(password: string) {
        this.password = password;
    }

    public getEmail(): string {
        return this.email;
    }

    public setEmail(email: string) {
        this.email = email;
    }

    public getLocationTag(): LocationTag {
        return this.locationTag;
    }

    public setLocationTag(location: LocationTag) {
        this.locationTag = location;
    }

    public getRole(): Role {
        return this.role;
    }

    public setRole(role: Role) {
        this.role = role;
    }

    public equals(other: Profile): boolean {
        return (
            this.id === other.getId() &&
            this.username === other.getUsername() &&
            this.email === other.getEmail() &&
            this.password === other.getPassword() &&
            this.locationTag.equals(other.getLocationTag())
        );
    }

    static from({id, username, password, email, role, locationTag}: ProfilePrisma & { locationTag: LocationTagPrisma }): Profile {
        return new Profile({
            id,
            username,
            password,
            email,
            role,
            locationTag: LocationTag.from(locationTag)
        });
    }
}