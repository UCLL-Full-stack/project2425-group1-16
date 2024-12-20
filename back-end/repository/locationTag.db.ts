import database from "./database";
import { LocationTag } from "../model/locationTag";
import { LocationTag as LocationTagPrisma } from '@prisma/client';

const LOCATION_TAG_ERROR = 0.000265;

const getAllLocationTags = async (): Promise<LocationTag[]> => {
    try {
        const locationTagsPrisma = await database.locationTag.findMany({});
        return locationTagsPrisma.map((locationTagPrisma) => LocationTag.from(locationTagPrisma));
    } catch (error) {
        console.error(`Database error: ${error}`);
        throw new Error(`Database error: ${error}`);
    }
}

const getLocationTagById = async ({ id }: { id: number }): Promise<LocationTag | null> => {
    try {
        const locationTagPrisma = await database.locationTag.findUnique({
            where: {
                id
            }
        });
        return locationTagPrisma ? LocationTag.from(locationTagPrisma) : null;
    } catch (error) {
        console.error(`Database error: ${error}`);
        throw new Error(`Database error: ${error}`);
    }
};

const getLocationTagByCoords = async ({ longitude, latitude }: { longitude: number, latitude: number }): Promise<LocationTag | null> => {
    try {
        // Get all where longitude & latitude are +- LOCATION_TAG_ERROR
        const locationTagsPrisma = await database.locationTag.findMany({
            where: {
                longitude: {
                    gte: longitude - LOCATION_TAG_ERROR,
                    lte: longitude + LOCATION_TAG_ERROR
                },
                latitude: {
                    gte: latitude - LOCATION_TAG_ERROR,
                    lte: latitude + LOCATION_TAG_ERROR
                }
            }
        });
        
        // Get the one that's the closest when there are multiple in this tiny range.
        const getError = (x: LocationTagPrisma) => Math.abs(x.latitude - latitude) * Math.abs(x.longitude - longitude);
        locationTagsPrisma.sort((a, b) => getError(a) - getError(b));
        return locationTagsPrisma[0] ? LocationTag.from(locationTagsPrisma[0]) : null;
    } catch (error) {
        console.error(`Database error: ${error}`);
        throw new Error(`Database error: ${error}`);
    }
}

const getDefault = async (): Promise<LocationTag> => {
    try {
        const defaultLocation = await database.locationTag.findFirst({
            where: {
                longitude: 0,
                latitude: 0
            }
        });
        if (!defaultLocation) throw new Error('No default location present in the database.');
        return LocationTag.from(defaultLocation);
    } catch (error) {
        console.error(`Database error: ${error}`);
        throw new Error(`Database error: ${error}`);
    }
};

export default {
    getAllLocationTags,
    getLocationTagById,
    getLocationTagByCoords,
    getDefault,
}