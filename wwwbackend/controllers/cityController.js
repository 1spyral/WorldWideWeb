import cityService from "../services/cityService.js";

async function get(req, res) {
    res.json(cityService.get());
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

    const cities = await cityService.generate(layers, start);
    
    await res.json(cities);
}

async function grow(req, res) {
    const { layers = undefined } = req.body;

    let cities;

    if (req.body.layers) {
        cities = cityService.grow(layers);
    } else {
        cities = cityService.grow();
    }

    res.json(cities);
}

export default {
    get,
    generate,
    grow
}