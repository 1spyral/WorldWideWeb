import cityService from "../services/cityService.js";

async function get(req, res) {
    const response = await cityService.get()
    
    await res.json(response);
}

async function generate(req, res) {
    let { layers, start } = req.body;
    
    if (!layers) {
        layers = 0;
    }

    if (!start) {
        start = {
            city: "Toronto",
            country: "Canada",
            coordinates: {
                lat: 43.65,
                long: -79.38
            }
        }
    };

    const response = await cityService.generate(layers, start)

    await res.json(response);
}

async function grow(req, res) {
    let { layers } = req.body;

    if (!layers) {
        layers = 1;
    }

    const response = await cityService.grow(layers)

    await res.json(response);
}

export default {
    get,
    generate,
    grow
}