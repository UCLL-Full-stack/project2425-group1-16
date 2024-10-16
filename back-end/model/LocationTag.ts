export class LocationTag {
    private id?: number;
    private displayName: string;
    private longtitude: number;
    private latitude: number;

    constructor(p: {
        displayName: string,
        longtitude: number,
        latitude: number,
        id?: number
    }) {
        this.id = p.id;
        this.displayName = p.displayName;
        this.longtitude = p.longtitude;
        this.latitude = p.latitude;
    }

    public getId(): number | undefined {
        return this.id;
    }

    public getDisplayName(): string {
        return this.displayName;
    }

    public setDisplayName(displayName: string) {
        this.displayName = displayName;
    }

    public getLongtitude(): number {
        return this.longtitude;
    }

    public setLongtitude(longtitude: number) {
        this.longtitude = longtitude;
    }

    public getLatitude(): number {
        return this.latitude;
    }

    public setLatitude(latitude: number) {
        this.latitude = latitude;
    }
}