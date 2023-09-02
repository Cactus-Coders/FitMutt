export const baseUrl = () => {
    if (process.env.NODE_ENV === "development") {
        return "http://localhost:3000";
    } else if (process.env.VERCEL_URL !== undefined) {
        return "https://" + process.env.VERCEL_URL;
    } else {
        console.error("Unable to determine URL");
        return null;
    }
};
