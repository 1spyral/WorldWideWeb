import { createContext } from "react";

import { City } from "../types/City";

export const CitiesContext = createContext<{
    cities: City[][],
    grow: (newCities: City[][]) => void,
    generate: (cities: City[][]) => void
}>({
    cities: [],
    grow: () => {},
    generate: () => {}
});
