import { useState, ReactNode } from "react";

import { City } from "../types/City";
import { CitiesContext } from "./CitiesContext";

interface CitiesContextProviderProps {
    children: ReactNode;
}

export const CitiesContextProvider = ({ children }: CitiesContextProviderProps) => {
    const [cities, setCities] = useState<City[][]>([]);

    const grow = (newCities: City[][]) => {
        setCities((prevCities) => [...prevCities, ...newCities]);
    }

    const generate = (cities: City[][]) => {
        setCities(() => cities);
    }

    return (
        <CitiesContext.Provider value={{ cities, grow, generate }}>
            {children}
        </CitiesContext.Provider>
    )
}