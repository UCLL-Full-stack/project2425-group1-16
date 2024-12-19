import { LocationTag } from '../../model/locationTag';

describe('LocationTag', () => {
    it('should create a LocationTag instance', () => {
        const locationTag = new LocationTag({ displayName: 'Test Location', longitude: 50, latitude: 50 });
        expect(locationTag.getDisplayName()).toBe('Test Location');
        expect(locationTag.getLongitude()).toBe(50);
        expect(locationTag.getLatitude()).toBe(50);
    });

    it('should throw an error if displayName is not provided', () => {
        expect(() => new LocationTag({ displayName: '', longitude: 50, latitude: 50 })).toThrow('Display name has to be given.');
    });

    it('should throw an error if longitude or latitude is out of range', () => {
        expect(() => new LocationTag({ displayName: 'Test Location', longitude: 200, latitude: 50 })).toThrow('Longitude and latitude must be between -180 and 180 degrees.');
        expect(() => new LocationTag({ displayName: 'Test Location', longitude: 50, latitude: 200 })).toThrow('Longitude and latitude must be between -180 and 180 degrees.');
    });

    it('should set and get displayName', () => {
        const locationTag = new LocationTag({ displayName: 'Test Location', longitude: 50, latitude: 50 });
        locationTag.setDisplayName('New Location');
        expect(locationTag.getDisplayName()).toBe('New Location');
    });

    it('should set and get longitude', () => {
        const locationTag = new LocationTag({ displayName: 'Test Location', longitude: 50, latitude: 50 });
        locationTag.setLongitude(100);
        expect(locationTag.getLongitude()).toBe(100);
    });

    it('should set and get latitude', () => {
        const locationTag = new LocationTag({ displayName: 'Test Location', longitude: 50, latitude: 50 });
        locationTag.setLatitude(100);
        expect(locationTag.getLatitude()).toBe(100);
    });

    it('should check equality of two LocationTag instances', () => {
        const locationTag1 = new LocationTag({ displayName: 'Test Location', longitude: 50, latitude: 50, id: 1 });
        const locationTag2 = new LocationTag({ displayName: 'Test Location', longitude: 50, latitude: 50, id: 1 });
        const locationTag3 = new LocationTag({ displayName: 'Another Location', longitude: 60, latitude: 60, id: 2 });

        expect(locationTag1.equals(locationTag2)).toBe(true);
        expect(locationTag1.equals(locationTag3)).toBe(false);
    });

    it('should create a LocationTag from LocationTagPrisma', () => {
        const locationTagPrisma = { id: 1, displayName: 'Test Location', longitude: 50, latitude: 50 };
        const locationTag = LocationTag.from(locationTagPrisma);

        expect(locationTag.getId()).toBe(1);
        expect(locationTag.getDisplayName()).toBe('Test Location');
        expect(locationTag.getLongitude()).toBe(50);
        expect(locationTag.getLatitude()).toBe(50);
    });
});