import { Role } from "../types";
import { LocationTag } from "./LocationTag";

import { 
    Profile as ProfilePrisma,
    LocationTag as LocationTagPrisma,
} from '@prisma/client';

export class Profile {
    private id?: number;
    private username: string;
    private password: string;
    private email: string;
    private phoneNumber: string;
    private role: Role;

    private location: LocationTag;

    constructor(
        { id, username, password, email, phoneNumber, role, locationTag }
    : {
        id?: number,
        username: string,
        password: string,
        email: string,
        phoneNumber: string,
        role: Role,

        locationTag: LocationTag,
    }) {
        this.id = id
        this.username = username;
        this.password = password;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.role = role;

        this.location = locationTag;
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

    public getPhoneNumber(): string {
        return this.phoneNumber;
    }

    public setPhoneNumber(phoneNumber: string) {
        this.phoneNumber = phoneNumber;
    }

    public getLocationTag(): LocationTag {
        return this.location;
    }

    public setLocationTag(location: LocationTag) {
        this.location = location;
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
            this.username === other.getEmail() &&
            this.email === other.getEmail() &&
            this.phoneNumber === other.getPhoneNumber() &&
            this.password === other.password &&
            this.location === other.getLocationTag()
        );
    }

    static from({id, username, password, email, phoneNumber, role, locationTag}: ProfilePrisma & { locationTag: LocationTagPrisma }): Profile {
        return new Profile({
            id,
            username,
            password,
            email,
            phoneNumber,
            role,
            locationTag: LocationTag.from(locationTag)
        });
    }
}