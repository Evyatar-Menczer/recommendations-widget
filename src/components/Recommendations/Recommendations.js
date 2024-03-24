import { createObserver } from "../../utils/scroll-observer.js";

export default class Recommendations extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: "open" });
        this.currentDisplaying = [];
        this.pageSize = 8;
        this.currentPage = 0;
    }

    set recommendations(data) {
        this._recommendations = data;
        this.maxPages = Math.ceil(this.recommendations.length / this.pageSize);
        this.updateComponent();
    }

    get recommendations() {
        return this._recommendations;
    }

    loadMoreItems() {
        if (this.currentPage >= this.maxPages) return;
        const loader = this.shadow.querySelector("loader-component");
        loader.style.display = "block";
        setTimeout(() => {
            loader.style.display = "none";
            this.currentPage++;
            this.updateComponent();
        }, 500);
    }

    updateComponent() {
        const container = this.shadow.querySelector("#grid-container");
        const items = [];
        const start = this.currentPage * this.pageSize;
        const end = start + this.pageSize;
        for (let i = start; i < end; i++) {
            if (i >= this.recommendations.length) break;

            const recommendationItem = document.createElement(
                "recommendation-item"
            );
            recommendationItem.item = this.recommendations[i];
            items.push(recommendationItem);
        }
        container.append(...items);
    }

    render() {
        this.shadow.innerHTML = `
      <style>
        #container {
          max-width: 62.5rem;
          margin: 0 auto;
        }

        #grid-container {
          display: grid;
          row-gap: 15px;
          column-gap: 20px;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        }
        </style>

        <div id="container">
          <more-for-you></more-for-you>
          <div id="grid-container"></div>
          <loader-component></loader-component>
        </div> 
    `;
    }

    connectedCallback() {
        this.render();
        const container = this.shadow.querySelector("#container");
        container.addEventListener("loadMoreItems", () => this.loadMoreItems());
        createObserver(container);
    }
}
