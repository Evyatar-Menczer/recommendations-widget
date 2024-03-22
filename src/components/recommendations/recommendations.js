export default class Recommendations extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
  }

  set recommendations(data) {
    this._recommendations = data;
    this.updateComponent();
  }

  get recommendations() {
    return this._recommendations;
  }

  updateComponent() {
    const container = this.shadow.querySelector("#container");
    const items = this.recommendations.list.map((item) => {
      const recommendationItem = document.createElement("recommendation-item");
      recommendationItem.item = item;
      return recommendationItem;
    });
    container.append(...items);
  }

  render() {
    this.shadow.innerHTML = `
      <style>
        #container {
          display: grid;
          row-gap: 15px;
          column-gap: 20px;
          grid-template-columns: repeat(4, minmax(120px, 1fr));
          grid-template-rows: masonry;
        }
        </style>
        <div id="container">
        
        </div> 
    `;
  }

  connectedCallback() {
    this.render();
  }

  disconnectedCallback() {}

  attributeChangedCallback(name, oldValue, newValue) {
    // Update the attribute changes here.
  }

  static get observedAttributes() {
    return ["name", "image"]; // List of attributes to observe for changes
  }
}
