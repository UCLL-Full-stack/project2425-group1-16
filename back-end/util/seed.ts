import { Category } from "../model/Category";
import { LocationTag } from "../model/LocationTag";

const locationLeuven = new LocationTag({
    displayName: "Martelarenplein, Leuven",
    longitude: 50.8811884,
    latitude: 4.7144443,
});

const locationHeist = new LocationTag({
    displayName: "Kerkplein, Heist-op-den-Berg",
    longitude: 51.0761674,
    latitude: 4.7289136
});

const categoryElectronics = new Category({ name: 'Electronics' });
const categoryLamps       = new Category({ name: 'Lamps', parents: [categoryElectronics] });
const categoryGardening   = new Category({ name: 'Gardening' });
