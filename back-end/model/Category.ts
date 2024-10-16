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
}