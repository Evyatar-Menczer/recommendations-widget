const TABOOLA_API_KEY = "f9040ab1b9c802857aa783c469d0e0ff7e7366e4";
const BASE_URL =
  "http://api.taboola.com/1.0/json/taboola-templates/recommendations.get";
const REQUEST_PARAMS = {
  "app.type": "desktop",
  "app.apikey": TABOOLA_API_KEY,
  count: 40,
  "source.type": "video",
  "source.id": crypto.randomUUID(),
};

export const getRecommendations = async () => {
  const url = new URL(BASE_URL);
  Object.keys(REQUEST_PARAMS).forEach((key) =>
    url.searchParams.append(key, REQUEST_PARAMS[key])
  );
  try {
    const response = await fetch(url);
    console.log(response);
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};
