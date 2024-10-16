class LocationTag {
    private displayName: string;
    private longtitude: number;
    private latitude: number;

    constructor(p: {
        displayName: string,
        longtitude: number,
        latitude: number,
    }) {
        this.displayName = p.displayName;
        this.longtitude = p.longtitude;
        this.latitude = p.latitude;
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