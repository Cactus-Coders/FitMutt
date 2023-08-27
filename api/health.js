import { object, string, number } from "yup";
import units from "../lib/units";

let dogSchema = object({
    height: number().integer().required(),
    height_units: string().required().oneOf(["cm", "in"]),
    weight: number().integer().required(),
    weight_units: string().required().oneOf(["kg", "lb"]),
    breed: string().required(),
});

export default async function handler(request, response) {
    switch (request.method) {
        case "GET":
            return handleGet(request, response);
        default:
            return response
                .status(405)
                .end(`Method ${request.method} Not Allowed`);
    }
}

const handleGet = async (request, response) => {
    try {
        await dogSchema.validate(request.query);

        const height = units.convertHeight(
            request.query.height,
            request.query.height_units
        );
        const weight = units.convertWeight(
            request.query.weight,
            request.query.weight_units
        );

        const bmi = units.BMI(weight, height);
        const { min_bmi, max_bmi } = await getBMIRange(request.query.breed);

        if (bmi < min_bmi) {
            return response.status(200).json({
                message: "underweight",
            });
        } else if (bmi > max_bmi) {
            return response.status(200).json({
                message: "overweight",
            });
        } else {
            return response.status(200).json({
                message: "healthy",
            });
        }
    } catch (err) {
        return response.status(400).json({ error: err.message });
    }
};

const getBMIRange = async (breed) => {
    const base_url = "https://api.thedogapi.com/v1";

    const response = await fetch(`${base_url}/breeds/search?q=${breed}`, {
        method: "GET",
        headers: {
            "x-api-key": process.env.API_KEY ?? "",
        },
    });
    const data = await response.json();

    const result = data[0];

    const min_weight = result.weight.metric.split(" - ")[0];
    const min_height = units.convertHeight(
        result.height.metric.split(" - ")[0],
        "cm"
    );

    const max_weight = result.weight.metric.split(" - ")[1];
    const max_height = units.convertHeight(
        result.height.metric.split(" - ")[1],
        "cm"
    );

    const min_bmi = units.BMI(min_weight, max_height);
    const max_bmi = units.BMI(max_weight, min_height);

    return { min_bmi, max_bmi };
};
