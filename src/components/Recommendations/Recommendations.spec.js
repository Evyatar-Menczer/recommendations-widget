import Recommendations from "./Recommendations.js";
import { testItem1 } from "../../utils/test-utils.js";
window.customElements.define("recommendations-component", Recommendations);

describe("Recommendations Component", () => {
    let element;

    beforeEach(() => {
        element = document.createElement("recommendations-component");
        document.body.appendChild(element);
    });

    it("should initialize correctly", () => {
        expect(element.pageSize).toBe(8);
        expect(element.currentPage).toBe(0);
    });

    it("should render correctly", () => {
        const shadowRoot = element.shadowRoot;
        expect(shadowRoot.querySelector("#container")).not.toBeNull();
    });

    it("should handle recommendations prop", () => {
        element.recommendations = [testItem1];
        expect(element.recommendations).toHaveLength(1);
    });

    it.skip("should handle load more functionality", () => {
        element.recommendations = new Array(20).fill(testItem1);
        const initialLength = element.currentDisplaying.length;
        element.loadMoreItems();
        const newLength = element.currentDisplaying.length;
        expect(newLength).toBeGreaterThan(initialLength);
        expect(element.currentPage).toBe(1);
    });

    it("should render item components correctly", () => {
        element.recommendations = new Array(20).fill(testItem1);
        const items = element.shadowRoot.querySelectorAll(
            "recommendation-item"
        );
        expect(items).toHaveLength(element.pageSize);
    });

    afterEach(() => {
        document.body.removeChild(element);
    });
});
