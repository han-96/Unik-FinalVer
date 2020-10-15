import { BaseComponent } from "../component/base_component.js";

class ExploreScreen extends BaseComponent {
    constructor() {
        super();
    }

    render() {
        this._shadowRoot.innerHTML = /*html*/ `
            <topic-box></topic-box>
            <footer-box></footer-box>
        `;
    }
}

window.customElements.define('explore-screen', ExploreScreen);