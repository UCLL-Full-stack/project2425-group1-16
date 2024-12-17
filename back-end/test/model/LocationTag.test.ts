import { LocationTag } from "../../model/LocationTag"

const validDisplayName: string = "Leuven";
const validLatitude: number = 50.8775;
const validLongitude: number = 4.70444;

const validDisplayName2: string = "Brussel";
const validLatitude2: number = 50.84667;
const validLongitude2: number = 4.35472;


const validLocation: LocationTag = new LocationTag({
    displayName: validDisplayName,
    latitude: validLatitude,
    longitude: validLongitude
})

test(`given: valid values for locationTag; when: locationTag is created; then: locationTag is created with those values`, () => {
    const location: LocationTag = new LocationTag({displayName: validDisplayName, latitude: validLatitude, longitude: validLongitude});
    expect(location.getId()).toBeUndefined();
    expect(location.getDisplayName()).toEqual(validDisplayName);
    expect(location.getLatitude()).toEqual(validLatitude);
    expect(location.getLongtitude()).toEqual(validLongitude);
})

test(`given: a valid locationTag and valid locationTag values; when: locationTag is edited with those values; then: locationTag now has these new values`, () => {
    validLocation.setDisplayName(validDisplayName2);
    validLocation.setLatitude(validLatitude2);
    validLocation.setLongtitude(validLongitude2);
    expect(validLocation.getId()).toBeUndefined();
    expect(validLocation.getDisplayName()).toEqual(validDisplayName2);
    expect(validLocation.getLatitude()).toEqual(validLatitude2);
    expect(validLocation.getLongtitude()).toEqual(validLongitude2);
})