import { BaseComponent } from "../component/base_component.js";

const style = /*html*/ `
<style>
    .bg {
        width: 100%;
        z-index: -1;
        position: relative;
    }
    .logo {
        width: 100px;
        position: fixed;
        left: 15px;
        top: -15px;
    }
    sign-in-form {
        position: fixed;
        left: 50%;
        top: 15%;
    }
</style>
`;

class SignInScreen extends BaseComponent {
    constructor() {
        super();
    }

    render() {
        this._shadowRoot.innerHTML = /*html*/ `
        ${style}
        <img class="logo" src="../../img/logo/brand.png" alt="logo">
        <sign-in-form></sign-in-form>
        <footer-box></footer-box> 
        <img class="bg" src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/c0766136467217.571e457d7ccd4.jpg" alt="background">
        `;
    }
}

window.customElements.define('sign-in-screen', SignInScreen);