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

    constructor(p: {
        id?: number,
        username: string,
        password: string,
        email: string,
        phoneNumber: string,
        role: Role,

        location: LocationTag,
    }) {
        this.id = p.id
        this.username = p.username;
        this.password = p.password;
        this.email = p.email;
        this.phoneNumber = p.phoneNumber;
        this.role = p.role;

        this.location = p.location;
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

    public getLocation(): LocationTag {
        return this.location;
    }

    public setLocation(location: LocationTag) {
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
            this.location === other.getLocation()
        );
    }

    static from({ id, username, password, email, phoneNumber, role, location }: ProfilePrisma & { location: LocationTagPrisma }) {
        return new Profile({
            id,
            username,
            password,
            email,
            phoneNumber,
            role,
            location: LocationTag.from(location)
        });
    }
}