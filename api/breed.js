import { object, string } from "yup";

let dogSchema = object({
    name: string().required(),
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

        const breed = await getBreedInformation(request.query.name);

        return response.status(200).json(breed);
    } catch (err) {
        return response.status(400).json({ error: err.message });
    }
};

const getBreedInformation = async (breed) => {
    const base_url = "https://api.thedogapi.com/v1";

    const response = await fetch(`${base_url}/breeds/search?q=${breed}`, {
        method: "GET",
        headers: {
            "x-api-key": process.env.API_KEY ?? "",
        },
    });
    const data = await response.json();
    const result = data[0];

    return result;
};
