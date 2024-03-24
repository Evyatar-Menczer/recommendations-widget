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

    connectedCallback() {
        this.render();
        this.attachOnContainerClick();
        this.addImgAltErrorHandler();
    }

    attachOnContainerClick() {
        const itemContainer = this.shadowRoot.querySelector(".item-container");
        itemContainer.addEventListener("click", () => {
            const url = itemContainer.getAttribute("data-url");
            this._item.origin === "sponsored"
                ? window.open(url, "_blank")
                : (window.location.href = url);
        });
    }

    addImgAltErrorHandler() {
        const img = this.shadow.querySelector("img");
        img.onerror = () => {
            const altTextContainer = document.createElement("div");
            altTextContainer.classList.add("alt-text");
            const altText = document.createElement("span");
            altText.textContent = img.alt;
            altTextContainer.appendChild(altText);
            img.parentNode.replaceChild(altTextContainer, img);
        };
    }

    render() {
        const { url: imgUrl } = this.item.thumbnail[0];
        const { name, url, description, branding, type } = this.item;
        const imgDescription = description ? description : "";
        this.shadow.innerHTML = `
      <style>
        .item-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          border-radius: 6px;
          background-color: #fff;
          box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
          height: 100%;
          overflow: hidden;
        }

        .item-container:hover {
          cursor: pointer;
        }

        .item-container:hover .link {
          text-decoration: underline;
        }

        .item-container img {
          transition: transform 0.2s ease-in-out;
        }
        .item-container:hover img {
          transform: scale(1.03);
        }

        .image-container{
          width: 100%;
          height: 200px;
          overflow: hidden;
        }

        img {
          border-radius: 6px 6px 0 0;
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

        .alt-text {
          background-color: #f0f0f0;
          justify-content: center;
          align-items: center;
          padding: 10px;
          font-size: 0.8rem;
          height: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      </style>

      <div class="item-container" data-url="${url}">
          <div class="image-container">
            <img src="${imgUrl}" alt="${imgDescription}" loading="lazy"/>
          </div>
          <div class="link-contianer">
            <a class="link" href="${url}" title="${name}">${name} </a>
          </div>
        <div class="sponsor">
          Sponsored by ${branding}
        </div>
      </div>
  `;
    }
}
