import cityService from "../services/cityService.js";

async function get(req, res) {
    res.json(cityService.get());
}

async function generate(req, res) {
    const { layers = undefined, start = undefined } = req.body;
    
    let params = {};

    if (layers) {
        params.layer = layers;
    }

    if (start) {
        params.start = start;
    }

    const cities = cityService.generate(params)

    res.json(cities);
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