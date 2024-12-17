import { Category } from "./Category";
import { LocationTag } from "./LocationTag";
import { Profile } from "./Profile";

import { 
    Item as ItemPrisma,
    Profile as ProfilePrisma,
    LocationTag as LocationTagPrisma,
    Category as CategoryPrisma
} from '@prisma/client';

export class Item {
    private id?: number;
    private name: string;
    private description: string;
    private price: number;

    private location: LocationTag;
    private owner: Profile;
    private categories: Category[];

    constructor(
        { id, name, description, price, location, owner, categories }
    : {
        id?: number,
        name: string,
        description: string,
        price: number,

        location: LocationTag,
        owner: Profile,
        categories: Category[],
    }) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;

        this.location = location;
        this.owner = owner;
        this.categories = categories;
    }

    public getId(): number | undefined {
        return this.id;
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

    public equals(other: Item): boolean {
        return (
            this.id === other.getId() &&
            this.name === other.getName() &&
            this.price === other.getPrice() &&
            this.description === other.getDescription() &&
            this.location === other.getLocation() &&
            this.owner === other.getOwner()
        );
    }

    static from({ id, name, description, price, owner, location, categories }: ItemPrisma & { owner: ProfilePrisma, location: LocationTagPrisma, categories: CategoryPrisma[] }) {
        return new Item({
            id,
            name,
            description,
            price,
            location: LocationTag.from(location),
            owner: Profile.from({ ...owner, location }),
            categories: categories.map((category) => Category.from(category))
        });
    }
}