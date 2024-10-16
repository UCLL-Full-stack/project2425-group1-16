class Profile {
    private username: string;
    private password: string;
    private email: string;
    private phoneNumber: string;

    private location: LocationTag;

    constructor(p: {
        username: string,
        password: string,
        email: string,
        phoneNumber: string,

        location: LocationTag,
    }) {
        this.username = p.username;
        this.password = p.password;
        this.email = p.email;
        this.phoneNumber = p.phoneNumber;

        this.location = p.location;
    }
}