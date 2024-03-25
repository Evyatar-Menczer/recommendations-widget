export default class SlideBar extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: "open" });
        this.currentSlideIndex = 0;
    }

    set items(data) {
        this._items = data;
        this.preloadImages();
        this.currentSlideIndex = 0;
        this.updateSlide();
        this.createDots();
    }

    get items() {
        return this._items;
    }

    connectedCallback() {
        this.render();
        this.attachEventListeners();
    }

    updateSlide() {
        this.currentItem = this._items[this.currentSlideIndex];
        const description = this.shadow.querySelector(".description");
        const sponsor = this.shadow.querySelector(".sponsor");
        const slideImage = this.shadow.querySelector(".slide-image");
        slideImage.innerHTML = "";
        description.innerHTML = this.currentItem.name;
        sponsor.innerHTML = this.currentItem.branding;

        const img = this.createImgElement();
        slideImage.appendChild(img);
    }

    createImgElement() {
        const img = document.createElement("img");
        img.src = this.currentItem.thumbnail[0].url;
        img.alt = this.currentItem.description || "";
        img.style.width = "100%";
        img.style.height = "100%";
        img.onerror = () => {
            const altTextContainer = document.createElement("div");
            altTextContainer.classList.add("alt-text");
            const altText = document.createElement("span");
            altText.textContent = img.alt;
            altTextContainer.appendChild(altText);
            img.parentNode.replaceChild(altTextContainer, img);
        };
        return img;
    }

    attachEventListeners() {
        this.attachArrowClick();
        this.attachContainerClick();
    }

    attachContainerClick() {
        const container = this.shadowRoot.querySelector(".slider-container");
        container.addEventListener("click", () => {
            window.open(this.currentItem.url, "_blank");
        });
    }

    attachArrowClick() {
        const leftArrow = this.shadow.querySelector(".left-arrow");
        const rightArrow = this.shadow.querySelector(".right-arrow");
        leftArrow.addEventListener("click", (event) => {
            event.stopPropagation();
            this.navigate(-1);
        });
        rightArrow.addEventListener("click", (event) => {
            event.stopPropagation();
            this.navigate(1);
        });
    }

    preloadImages() {
        this._items.forEach((item) => {
            const img = new Image();
            img.src = item.thumbnail[0].url;
        });
    }

    toggleDot(index, toggle) {
        this.shadow
            .getElementById(`dot-${index}`)
            .classList.toggle("active", toggle);
    }

    navigate(direction) {
        this.toggleDot(this.currentSlideIndex, false);
        this.currentSlideIndex += direction;
        if (this.currentSlideIndex < 0) {
            this.currentSlideIndex = this._items.length - 1;
        } else if (this.currentSlideIndex >= this._items.length) {
            this.currentSlideIndex = 0;
        }
        this.toggleDot(this.currentSlideIndex, true);
        this.currentItem = this._items[this.currentSlideIndex];
        this.updateSlide();
    }

    createDots() {
        const dotsContainer = this.shadow.querySelector(".dots");
        this._items.forEach((item, index) => {
            const dot = document.createElement("span");
            dot.classList.add("dot");
            dot.id = `dot-${index}`;
            item.id === this.currentItem.id && dot.classList.add("active");
            dotsContainer.appendChild(dot);
        });
    }

    render() {
        this.shadow.innerHTML = `
          <style>
            .slider-container {
                position: relative;
                margin: 0.5rem auto;
                max-width: 62.5rem;
                height: 300px;
                background: linear-gradient(to top, black, white);
                border-radius: 4px;
            }
    
            .slider-container:hover {
                cursor: pointer;
            }
        
            .slider-container:hover .description {
                text-decoration: underline;
            }
            

            .slide-image {
                width: 100%;
                height: 100%;
                background-size: cover;
                background-position: center;
            }

            .slide-image::before {
                content: "";
                position: absolute;
                top: 0;
                right: 0;
                bottom: 0;
                left: 0;
                background-image: inherit;
                background-size: cover;
                background-position: center;
                transform: scale(0.8); /* zoom out the image to 80% */
                z-index: -1;
            }

            .alt-text {
                padding: 20px;
                font-size: 1rem;
                height: 100%;
                overflow: hidden;
                text-overflow: ellipsis;
              }

            .slider-arrow {
                position: absolute;
                top: 50%;
                background-color: #ffffff;
                transform: translateY(-50%);
                opacity: 0.3;
                transition: opacity 0.2s ease-in-out;
                height: 3.5rem;
                width: 1.875rem;
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 1.5rem;
                z-index: 1;
            }
            
            .slider-arrow:hover {
                opacity: 1;
                cursor: pointer;
            }

            .left-arrow {
              left: 0;
            }
    
            .right-arrow {
              right: 0;
            }

            .footer {
                padding: 1rem;
                display: flex;
                flex-direction: column;
                position: absolute;
                bottom: 0;
                width: 100%;
                background-color: transparent;
            }

            .description {
                text-decoration: none;
                color: #fff;
                font-size: 1.8rem;
            }

            .sponsor {
                padding: 10px;
                font-size: 16px;
                font-style: italic;
                color: #fff;
            }

            .dots {
                display: flex;
                justify-content: center;
                padding: 1rem 0;
                position: absolute;
                bottom: 0;
                left: 50%;
                transform: translateX(-50%);
            }
    
            .dot {
                height: 7px;
                width: 7px;
                margin: 0 2px;
                background-color: #717171;
                border-radius: 25px;
                display: inline-block;
            }
    
            .dot.active {
                background-color: #fff;
                width: 1.5rem;
            }
          </style>
    
          <div class="slider-container">
            <div class="slide-image"></div>
            <div class="slider-arrow left-arrow">&#10094;</div>
            <div class="slider-arrow right-arrow">&#10095;</div>
            <div class="footer">
                <div class="description"></div>
                <div class="sponsor"></div>
            </div>
            <div class="dots"></div>
          </div>
        `;
    }
}
