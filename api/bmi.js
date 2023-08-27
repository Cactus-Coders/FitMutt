import { object, string, number } from "yup";
import units from "../lib/units";

let dogSchema = object({
    height: number().integer().required(),
    height_units: string().required().oneOf(["cm", "in"]),
    weight: number().integer().required(),
    weight_units: string().required().oneOf(["kg", "lb"]),
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

        return response.status(200).json({ bmi: units.BMI(weight, height) });
    } catch (err) {
        return response.status(400).json({ error: err.message });
    }
};
