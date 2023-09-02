export const health_calc = async (
    height,
    height_units,
    weight,
    weight_units,
    breed
) => {
    const node_env = process.env.NODE_ENV;
    const public_site_url = process.env.NEXT_PUBLIC_SITE_URL;
    const public_vercel_url = process.env.NEXT_PUBLIC_VERCEL_URL;

    let url;

    if (node_env === "development") {
        url = "http://localhost:3000";
    } else if (public_site_url !== undefined) {
        url = public_site_url;
    } else if (public_vercel_url !== undefined) {
        // eslint-disable-next-line no-unused-vars
        url = public_vercel_url;
    } else {
        console.error("Unable to determine URL");
        return null;
    }

    console.log(`node_env: ${node_env}`);
    const res = await fetch(
        `${url}/api/health?height=${height}&height_units=${height_units}&weight=${weight}&weight_units=${weight_units}&breed=${breed}`,
        {
            method: "GET",
        }
    );
    console.log(res.json());
};
