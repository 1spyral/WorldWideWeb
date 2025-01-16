import { useContext, useState } from "react";
import { CitiesContext } from "../context/CitiesContext";

function Controls() {
    const [layers, setLayers] = useState(1);

    const { grow, generate } = useContext(CitiesContext);
    const API_URL = import.meta.env.VITE_API_URL

    async function handleGrow() {
        const response = await fetch(API_URL + "/city", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                layers
            })
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
            <input type="number" defaultValue={1} onChange={e => setLayers(parseInt(e.target.value))}></input>
            <button onClick={handleGrow}>Grow</button>
            <button onClick={handleGenerate}>Generate</button>
        </>
    )
}

export default Controls;