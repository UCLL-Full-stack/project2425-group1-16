class Item {
    private name: string;
    private description: string;
    private price: number;

    private location: LocationTag;
    private owner: Profile;
    private categories: Category[];

    constructor(p: {
        name: string;
        description: string;
        price: number;

        location: LocationTag,
        owner: Profile,
        categories: Category[],
    }) {
        this.name = p.name;
        this.description = p.description;
        this.price = p.price;

        this.location = p.location;
        this.owner = p.owner;
        this.categories = p.categories;
    }
}