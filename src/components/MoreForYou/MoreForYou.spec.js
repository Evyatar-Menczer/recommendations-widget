import MoreForYou from "./MoreForYou.js";

window.customElements.define("more-for-you", MoreForYou);

describe("MoreForYou Component", () => {
    it("should be defined as a custom element", () => {
        expect(customElements.get("more-for-you")).toBe(MoreForYou);
    });

    it("should render its content correctly", () => {
        const component = document.createElement("more-for-you");
        document.body.appendChild(component);

        const shadowRoot = component.shadowRoot;
        expect(shadowRoot.querySelector("#mfy-container")).not.toBeNull();
        expect(shadowRoot.querySelector("#mfy").textContent).toBe(
            "More for you"
        );
        expect(shadowRoot.querySelector("#powered-by").textContent).toBe(
            "Powered By Taboola"
        );

        const style = shadowRoot.querySelector("style").textContent;
        expect(style).toContain("#mfy-container {");
        expect(style).toContain("display: flex;");
    });
});
