import { baseUrl } from "./api";

export const health_calc = async (
    height,
    height_units,
    weight,
    weight_units,
    breed
) => {
    const base_url = baseUrl();
    const res = await fetch(
        `${base_url}/api/health?height=${height}&height_units=${height_units}&weight=${weight}&weight_units=${weight_units}&breed=${breed}`,
        {
            method: "GET",
        }
    );
    const result = await res.json();

    return result;
};
