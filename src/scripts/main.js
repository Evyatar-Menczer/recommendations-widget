import { getRecommendations } from "/src/api/getRecommedations.js";
import Recommendations from "/src/components/Recommendations/Recommendations.js";
import RecommendationItem from "/src/components/RecommendationItem/RecommendationItem.js";
import MoreForYou from "/src/components/MoreForYou/MoreForYou.js";
import SlideBar from "/src/components/SlideBar/SlideBar.js";
import Loader from "/src/components/Loader.js";
customElements.define("recommendations-component", Recommendations);
customElements.define("recommendation-item", RecommendationItem);
customElements.define("more-for-you", MoreForYou);
customElements.define("slide-bar", SlideBar);
customElements.define("loader-component", Loader);

const main = (async () => {
    const recommendations = await getRecommendations();
    renderRecommedations(recommendations);
})();

const renderRecommedations = (recommendations) => {
    const mainContainer = getMainContainer();
    const slideBar = document.createElement("slide-bar");
    const recommendationsComponent = document.createElement(
        "recommendations-component"
    );
    mainContainer.appendChild(slideBar);
    mainContainer.appendChild(recommendationsComponent);
    const { sliderItems, listItems } =
        getFilteredRecommendations(recommendations);
    slideBar.items = sliderItems;
    recommendationsComponent.recommendations = listItems;
};

export const getMainContainer = () => {
    const divId =
        document.getElementById("scr").attributes["div-id"]?.nodeValue;
    if (divId) return document.getElementById(divId);
    const mainContainer = document.createElement("div");
    mainContainer.id = "rcm-main";
    return mainContainer;
};

const getFilteredRecommendations = (recommendations) => {
    const filteredSlider = recommendations.list.filter((item) => {
        const thumbnail = item.thumbnail && item.thumbnail[0];
        return (
            thumbnail &&
            parseInt(thumbnail.width, 10) > parseInt(thumbnail.height, 10)
        );
    });
    const sliderItems = filteredSlider.slice(0, 10);
    const sliderIds = sliderItems.map((item) => item.id);
    const listItems = recommendations.list.filter(
        (item) => !sliderIds.includes(item.id)
    );
    return { sliderItems, listItems };
};
