import { LocationTag as LocationTagPrisma } from '@prisma/client';

export class LocationTag {
    private id?: number;
    private displayName: string;
    private longitude: number;
    private latitude: number;

    constructor({ displayName, longitude, latitude, id }: { displayName: string, longitude: number, latitude: number, id?: number }) {
        this.validate({ displayName, longitude, latitude });

        this.id = Number(id);
        this.displayName = displayName;
        this.longitude = Number(longitude);
        this.latitude = Number(latitude);
    }

    validate({ displayName, longitude, latitude }: { displayName: string, longitude: number, latitude: number }) {
        if (!displayName?.trim()) throw new Error('Display name has to be given.');
        if (Math.abs(longitude) > 180.0 || Math.abs(latitude) > 180.0) throw new Error('Longitude and latitude must be between -180 and 180 degrees.');
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

    public getLongitude(): number {
        return this.longitude;
    }

    public setLongitude(longitude: number) {
        this.longitude = longitude;
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
            this.longitude === other.getLongitude() &&
            this.displayName === other.getDisplayName()
        );
    }

    static from({ displayName, longitude, latitude, id }: LocationTagPrisma): LocationTag {
        return new LocationTag({ displayName, longitude, latitude, id });        
    }
}