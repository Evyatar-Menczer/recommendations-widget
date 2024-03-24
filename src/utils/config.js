import { getSecrets } from "../api/getSecrets.js";

const secrets = getSecrets();
export const config = {
    TABOOLA_API_KEY: secrets.TABOOLA_API_KEY,
    BASE_URL:
        "https://api.taboola.com/1.0/json/taboola-templates/recommendations.get",
};
