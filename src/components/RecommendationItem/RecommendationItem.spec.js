import RecommendationItem from "./RecommendationItem.js";
import { testItem1 } from "../../utils/test-utils.js";

window.customElements.define("recommendation-item", RecommendationItem);

describe("RecommendationItem Component", () => {
    let element;

    beforeEach(() => {
        element = document.createElement("recommendation-item");
        element.item = testItem1;
        document.body.appendChild(element);
    });

    it("should renders content correctly", async () => {
        await new Promise((resolve) => setTimeout(resolve));
        const shadowRoot = element.shadowRoot;
        expect(shadowRoot.querySelector(".link").textContent.trim()).toBe(
            testItem1.name
        );
        expect(shadowRoot.querySelector(".link").getAttribute("href")).toBe(
            testItem1.url
        );
        expect(
            shadowRoot.querySelector(".sponsor").textContent.trim()
        ).toContain(testItem1.branding);
    });

    it("should handles image error correctly", async () => {
        const shadowRoot = element.shadowRoot;
        const img = shadowRoot.querySelector("img");
        img.dispatchEvent(new Event("error"));

        expect(shadowRoot.querySelector(".alt-text").textContent).toBe(img.alt);
    });

    afterEach(() => {
        document.body.removeChild(element);
    });
});
