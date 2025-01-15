import { OpenAI } from "openai";
import { zodResponseFormat } from "openai/helpers/zod";
import { z } from "zod";

const openai = new OpenAI();

const citiesSchema = zodResponseFormat(z.object({
    cities: z.array(z.object({
        city: z.string(),
        country: z.string(),
        coordinates: z.object({
            lat: z.number(),
            long: z.number()
        })
    })
)}), "cities")

let cityList = [];

async function get() {
    return cityList;
}

async function generate(layers, start) {
    cityList = [];
    cityList.push([start]);
    await grow(layers);

    return cityList;
}

async function grow(layers, newLayers = []) {
    if (layers == 0) {
        return;
    }

    let layer = [];

    for (let city of cityList[cityList.length - 1]) {
        const completion = await openai.beta.chat.completions.parse({
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: `Generate 5 cities that match the user's criteria.`},
                { role: "user", content: `Close to ${city.city}, ${city.country}`}
            ],
            response_format: citiesSchema
        });
        console.log(completion.choices[0].message.parsed);
        layer.push(...completion.choices[0].message.parsed.cities);
    }

    cityList.push(layer);
    newLayers.push(layer);

    await grow(layers - 1, newLayers);

    return newLayers;
}

export default {
    get,
    generate,
    grow
}