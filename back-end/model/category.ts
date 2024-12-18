import { Category as CategoryPrisma } from '@prisma/client';

export class Category {
    private id?: number;
    private name: string;

    private parents: Category[];
    private children: Category[];

    constructor({ name, parents, children, id }: { name: string, parents?: Category[], children?: Category[], id?: number }) {
        this.name = name;
        this.parents = parents ?? [];
        this.children = children ?? [];
        this.id = id;
    }

    public getId(): number | undefined {
        return this.id;
    }

    public getName(): string {
        return this.name;
    }

    public setName(name: string) {
        this.name = name;
    }

    public getParents(): Category[] | null {
        return this.parents;
    }

    public setParents(parents: Category[]) {
        this.parents = parents;
    }

    public getChildren(): Category[] {
        return this.children;
    }

    public setChildren(children: Category[]) {
        this.children = children;
    }

    public equals(other: Category): boolean {
        return (
            this.id === other.getId() &&
            this.name === other.getName()
        );
    }

    static from({ id, name }: CategoryPrisma): Category {
        return new Category({ name, id });
    }
}