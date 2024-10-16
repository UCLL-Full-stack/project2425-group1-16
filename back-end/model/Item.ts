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

    public addCategory(category: Category) {
        this.categories.push(category);
    }

    public getName(): string {
        return this.name;
    }

    public setName(name: string) {
        this.name = name;
    }

    public getDescription(): string {
        return this.description;
    }

    public setDescription(description: string) {
        this.description = description;
    }

    public getPrice(): number {
        return this.price;
    }

    public setPrice(price: number) {
        this.price = price;
    }

    public getLocation(): LocationTag {
        return this.location;
    }

    public setLocation(location: LocationTag) {
        this.location = location;
    }

    public getOwner(): Profile {
        return this.owner;
    }

    public setOwner(owner: Profile) {
        this.owner = owner;
    }

    public getCategories(): Category[] {
        return this.categories;
    }

    public setCategories(categories: Category[]) {
        this.categories = categories;
    }
}