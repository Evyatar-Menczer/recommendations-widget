export default class MoreForYou extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
  }

  render() {
    this.shadow.innerHTML = `
        <style>
          #mfy-container {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            width: 100%;
          }

          #mfy-container::after {
            content: "";
            flex: 1;
            border-bottom: 1px solid #000;
            margin: 10px 0;
          }

          #mfy-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
          }

          #mfy{
            text-transform: uppercase;
            font-weight: 600;
          }

          #powered-by {
            font-size: 0.8rem;
            font-weight: 300;

          }

          </style>
          <div id="mfy-container">
            <span id="mfy-content">
                <span id="mfy">More for you</span>
                <span id="powered-by">Powered By Taboola</span>
            </span>
          </div>

      `;
  }

  connectedCallback() {
    this.render();
  }

  disconnectedCallback() {}
}
