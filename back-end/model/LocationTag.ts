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
}