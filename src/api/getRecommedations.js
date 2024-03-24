import { config } from "../utils/config.js";

const REQUEST_PARAMS = {
    "app.type": "web",
    "app.apikey": config.TABOOLA_API_KEY,
    count: 100,
    "source.type": "video",
    "source.id": crypto.randomUUID(),
};

export const getRecommendations = async () => {
    const url = new URL(config.BASE_URL);
    Object.keys(REQUEST_PARAMS).forEach((key) =>
        url.searchParams.append(key, REQUEST_PARAMS[key])
    );
    try {
        const response = await fetch(url);
        return await response.json();
    } catch (err) {
        console.log(err);
    }
};
