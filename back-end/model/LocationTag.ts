import { LocationTag as LocationTagPrisma } from '@prisma/client';

export class LocationTag {
    private id?: number;
    private displayName: string;
    private longitude: number;
    private latitude: number;

    constructor({ displayName, longitude, latitude, id }: { displayName: string, longitude: number, latitude: number, id?: number }) {
        this.id = id;
        this.displayName = displayName;
        this.longitude = longitude;
        this.latitude = latitude;
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
        return this.longitude;
    }

    public setLongtitude(longtitude: number) {
        this.longitude = longtitude;
    }

    public getLatitude(): number {
        return this.latitude;
    }

    public setLatitude(latitude: number) {
        this.latitude = latitude;
    }

    public equals(other: LocationTag): boolean {
        return (
            this.id === other.getId() &&
            this.latitude === other.getLatitude() &&
            this.longitude === other.getLongtitude() &&
            this.displayName === other.getDisplayName()
        );
    }

    static from({ displayName, longitude, latitude, id }: LocationTagPrisma): LocationTag {
        return new LocationTag({ displayName, longitude, latitude, id });        
    }
}