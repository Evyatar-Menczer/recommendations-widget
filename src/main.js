import { getRecommendations } from "./api/getRecommedations.js";
import Recommendations from "./components/recommendations/recommendations.js";
import RecommendationItem from "./components/recommendation-item/recommendation-item.js";
customElements.define("recommendations-component", Recommendations);
customElements.define("recommendation-item", RecommendationItem);

const main = (async () => {
  const recommendations = await getRecommendations();
  renderRecommedations(recommendations);
  console.log(recommendations);
})();

const renderRecommedations = (recommendations) => {
  const mainContainer = document.getElementById("main-container");
  const recommendationsComponent = document.createElement(
    "recommendations-component"
  );
  mainContainer.appendChild(recommendationsComponent);
  recommendationsComponent.recommendations = recommendations;
};
