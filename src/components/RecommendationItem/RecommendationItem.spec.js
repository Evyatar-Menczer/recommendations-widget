/**
 * @jest-environment jsdom
 */

import RecommendationItem from "./RecommendationItem.js";

beforeEach(() => {
    window.customElements.define("recommendation-item", RecommendationItem);
});

describe("RecommendationItem Web Component", () => {
    it("renders content correctly", () => {
        const itemData = {
            thumbnail: [{ url: "image.jpg" }],
            name: "Test Item",
            url: "https://example.com",
            description: "Description here",
            branding: "BrandName",
        };

        const component = new RecommendationItem();
        component.item = itemData;
        component.render();

        const shadowRoot = component.shadowRoot;
        expect(shadowRoot.querySelector(".link").textContent).toBe("Test Item");
        expect(shadowRoot.querySelector(".link").getAttribute("href")).toBe(
            "https://example.com"
        );
        expect(shadowRoot.querySelector(".sponsor").textContent).toContain(
            "BrandName"
        );
    });

    it("handles image error correctly", () => {
        const component = new RecommendationItem();
        component.item = {
            /* ... item data ... */
        };
        component.render();

        const shadowRoot = component.shadowRoot;
        const img = shadowRoot.querySelector("img");

        // Simulate an image error
        img.dispatchEvent(new Event("error"));

        expect(shadowRoot.querySelector(".alt-text").textContent).toBe(img.alt);
    });
});
