import { BaseComponent } from "../component/base_component.js";

const style = /*html*/ `
<style>
    .footer-wrapper {
        position: fixed;
        bottom: -10px;
        right: 0px;
    }
    img {
        width: 25px;
        margin: 10px;
    }
</style>
`;

class FooterBox extends BaseComponent {
    constructor() {
        super();
    }

    render() {
        this._shadowRoot.innerHTML = /*html*/ `
            ${style}
            <div class="footer-wrapper">
                <footer>
                    <img class="logo" src="../../img/logo/logo.png" alt="logo">
                </footer>
            </div>
        `;
    }
}

window.customElements.define('footer-box', FooterBox);