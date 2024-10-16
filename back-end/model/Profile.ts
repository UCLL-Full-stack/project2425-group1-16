import { LocationTag } from "./LocationTag";

export class Profile {
    private id?: number;
    private username: string;
    private password: string;
    private email: string;
    private phoneNumber: string;

    private location: LocationTag;

    constructor(p: {
        id?: number,
        username: string,
        password: string,
        email: string,
        phoneNumber: string,

        location: LocationTag,
    }) {
        this.id = p.id
        this.username = p.username;
        this.password = p.password;
        this.email = p.email;
        this.phoneNumber = p.phoneNumber;

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
}