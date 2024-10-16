export class Category {
    private id?: number;
    private name: string;

    private parents: Category[] | null;

    constructor(p: {
        name: string,
        parents: Category[] | null,
        id?: number
    }) {
        this.name = p.name;
        this.parents = p.parents;
        this.id = p.id;
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

    public setParents(parents: Category[] | null) {
        this.parents = parents;
    }
}