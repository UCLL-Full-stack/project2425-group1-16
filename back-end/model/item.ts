import { Category } from "./category";
import { LocationTag } from "./locationTag";
import { Profile } from "./profile";

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
        this.validate({ name, description, price, locationTag, owner, categories });

        this.id = id;
        this.name = name;
        this.description = description;
        this.price = Number(price);

        this.locationTag = locationTag;
        this.owner = owner;
        this.categories = categories;
    }

    validate({ name, description, price, locationTag, owner, categories }
    : {
        name: string,
        description: string,
        price: number,

        locationTag: LocationTag,
        owner: Profile,
        categories: Category[],
    }) {
       if (!name?.trim())                   throw new Error('Name cannot be empty.');
       if (description?.trim().length < 10) throw new Error('The description has to be at least ten characters long.');
       if (price <= 0)                      throw new Error('Price cannot be negative or zero.');
       if (!locationTag)                    throw new Error('A location is needed for this item.');
       if (!owner)                          throw new Error('An owner is needed for this item.');
       if (categories?.length < 1)          throw new Error('There need to be at least one category for this item.');
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
            this.locationTag.equals(other.getLocationTag()) &&
            this.owner.equals(other.getOwner())
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