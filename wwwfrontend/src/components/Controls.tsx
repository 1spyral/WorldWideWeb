import { useContext } from "react";
import { CitiesContext } from "../context/CitiesContext";

function Controls() {
    const { grow, generate } = useContext(CitiesContext);
    const API_URL = import.meta.env.VITE_API_URL

    async function handleGrow() {
        const response = await fetch(API_URL + "/city", {
            method: "POST",
        })

        const data = await response.json();

        grow(data);
    }

    async function handleGenerate() {
        const response = await fetch(API_URL + "/city", {
            method: "DELETE",
        })

        const data = await response.json();

        generate(data);
    }

    return (
        <>
            <button onClick={handleGrow}>Grow</button>
            <button onClick={handleGenerate}>Generate</button>
        </>
    )
}

export default Controls;