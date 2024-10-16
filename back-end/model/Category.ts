class Category {
    private name: string;

    private parent: Category | null;

    constructor(p: {
        name: string;
        parent: Category | null;
    }) {
        this.name = p.name;
        this.parent = p.parent;
    }

    public getName(): string {
        return this.name;
    }

    public setName(name: string) {
        this.name = name;
    }

    public getParent(): Category | null {
        return this.parent;
    }

    public setParent(parent: Category | null) {
        this.parent = parent;
    }
}