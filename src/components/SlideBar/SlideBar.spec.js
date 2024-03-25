import SlideBar from "./SlideBar.js";
import { testItem1, testItem2 } from "../../utils/test-utils.js";

window.customElements.define("slide-bar", SlideBar);

describe("SlideBar Component", () => {
    let element;
    let testItems;

    beforeEach(() => {
        element = document.createElement("slide-bar");
        testItems = [testItem1, testItem2];
        document.body.appendChild(element);
        element.items = testItems;
    });

    it("should initializes correctly", () => {
        expect(element).toBeDefined();
        expect(element.currentSlideIndex).toBe(0);
    });

    it("should set items correctly and update the slide", () => {
        expect(element.items).toEqual(testItems);
        expect(element.currentItem).toEqual(testItems[0]);

        const slideImage = element.shadowRoot.querySelector(".slide-image");
        expect(slideImage.style.backgroundImage).toContain(
            testItems[0].thumbnail[0].url
        );
    });

    it("should navigate slides correctly", () => {
        const rightArrow = element.shadowRoot.querySelector(".right-arrow");
        rightArrow.dispatchEvent(new MouseEvent("click"));
        expect(element.currentSlideIndex).toBe(1);
        expect(element.currentItem.id).toEqual(testItem2.id);

        const leftArrow = element.shadowRoot.querySelector(".left-arrow");
        leftArrow.dispatchEvent(new MouseEvent("click"));
        expect(element.currentSlideIndex).toBe(0);
        expect(element.currentItem.id).toEqual(testItem1.id);
    });

    it("should update slide content correctly", () => {
        element.navigate(1);

        const description = element.shadowRoot.querySelector(".description");
        const sponsor = element.shadowRoot.querySelector(".sponsor");
        const slideImage = element.shadowRoot.querySelector(".slide-image");

        expect(description.innerHTML).toBe(testItems[1].name);
        expect(sponsor.innerHTML).toBe(testItems[1].branding);
        expect(slideImage.style.backgroundImage).toContain(
            testItems[1].thumbnail[0].url
        );
    });

    afterEach(() => {
        document.body.removeChild(element);
    });
});
