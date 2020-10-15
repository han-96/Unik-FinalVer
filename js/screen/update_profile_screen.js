import { BaseComponent } from "../component/base_component.js";

class UpdateProfileScreen extends BaseComponent {
    constructor() {
        super();
    }

    render() {
        this._shadowRoot.innerHTML = /*html*/ `
            <profile-editor></profile-editor>
            <footer-box></footer-box>
        `;
    }
}

window.customElements.define('update-profile-screen', UpdateProfileScreen);