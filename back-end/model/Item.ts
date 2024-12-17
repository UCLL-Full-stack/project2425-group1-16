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

    private locationTag: LocationTag;
    private owner: Profile;
    private categories: Category[];

    constructor(
        { id, name, description, price, locationTag, owner, categories }
    : {
        id?: number,
        name: string,
        description: string,
        price: number,

        locationTag: LocationTag,
        owner: Profile,
        categories: Category[],
    }) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;

        this.locationTag = locationTag;
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

    public getLocationTag(): LocationTag {
        return this.locationTag;
    }

    public setLocationTag(location: LocationTag) {
        this.locationTag = location;
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
            this.locationTag === other.getLocationTag() &&
            this.owner === other.getOwner()
        );
    }

    static from(
        {id, name, description, price, locationTag, owner, categories}
        : ItemPrisma & {
            owner: ProfilePrisma & { locationTag: LocationTagPrisma }, 
            locationTag: LocationTagPrisma, 
            categories: CategoryPrisma[]
        }) {
        return new Item({
            id,
            name,
            description,
            price,
            locationTag: LocationTag.from(locationTag),
            owner: Profile.from(owner),
            categories: categories.map((category) => Category.from(category))
        })
    }
}