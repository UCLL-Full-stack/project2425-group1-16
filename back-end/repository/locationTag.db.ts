import database from "./database";
import { LocationTag } from "../model/locationTag";

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

export default {
    getAllLocationTags,
    getLocationTagById
}