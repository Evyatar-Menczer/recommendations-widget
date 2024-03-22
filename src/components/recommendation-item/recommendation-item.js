export default class RecommendationItem extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
  }

  set item(data) {
    this._item = data;
  }

  get item() {
    return this._item;
  }

  render() {
    const { url: imgUrl } = this.item.thumbnail[0];
    const { name, url, description, branding } = this.item;
    const imgDescription = description ? description : "";
    this.shadow.innerHTML = `
      <style>
        .item-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          border-radius: 10px;
          background-color: #f0f0f0;
          box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
          height: 100%;
        }

        .item-container:hover {
          cursor: pointer;
        }

        .item-container:hover .link {
          text-decoration: underline;
        }

        .image-container{
          width: 100%;
          height: 200px;
          overflow: hidden;
        }

        img {
          border-radius: 10px 10px 0 0;
          width: 100%;
        }

        .link-contianer{
          padding: 10px;
        }

        img {
          font-size: 1rem;
        }
        .link {
          text-decoration: none;
          color: #000;
          font-size: 1rem;
        }


        .sponsor {
          padding: 10px;
          font-size: 12px;
          font-style: italic;
          color: #777;
        }
        </style>
        <div class="item-container" data-url="${url}">
          <div class="">
          <div class="image-container">
          <img src="${imgUrl}" alt="${imgDescription}" loading="lazy"/>
          </div>
            <div class="link-contianer">
              <a class="link" href="${url}">${name}</a>
            </div>
          </div>
          <div class="sponsor">

          Sponsored by ${branding}
          </div>
        </div>
    `;
  }

  //add eventlistener function

  //add alt image handler when fails to load

  connectedCallback() {
    this.render();
    const itemContianer = this.shadowRoot.querySelector(".item-container");
    itemContianer.addEventListener("click", () => {
      const url = itemContianer.getAttribute("data-url");
      window.open(url, "_blank");
    });
  }
  disconnectedCallback() {}
}
