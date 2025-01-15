import { useContext } from "react";
import { CitiesContext } from "../context/CitiesContext";

function Controls() {
    const { generate } = useContext(CitiesContext);
    const API_URL = import.meta.env.VITE_API_URL

    async function handleGenerate() {
        const response = await fetch(API_URL + "/city", {
            method: "DELETE",
        })

        const data = await response.json()

        generate(data);
    }

    return (
        <>
            <button onClick={handleGenerate}>Generate</button>
        </>
    )
}

export default Controls;