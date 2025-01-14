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

async function generate({ layers, start } = {
    layers: 0,
    start: {
        city: "Toronto",
        country: "Canada",
        coordinates: {
            lat: 43.65,
            long: 79.38
        }
    }
}) {
    cityList.push([start]);
    grow(layers);

    return cityList;
}

async function grow(layers = 1) {
    if (layers == 0) {
        return cityList;
    }

    let newLayer = [];

    for (let city of cityList[cityList.length - 1]) {   
        const completion = await openai.beta.chat.completions.parse({
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: `Generate 5 cities that match the user's criteria.`},
                { role: "user", content: `Close to ${city}`}
            ],
            response_format: citiesSchema
        });
        console.log(completion.choices[0].message.parsed);
        newLayer.push(...completion.choices[0].message.parsed.cities);
    }

    cityList.push(newLayer);

    return grow(layers - 1);
}

export default {
    get,
    generate,
    grow
}