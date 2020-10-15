import { BaseComponent } from "../component/base_component.js";

const style = /*html*/ `
<style>
    .bg {
        width: 100%;
        z-index: -1;
        position: relative;
    }
    choose-first-topic-box {
        position: fixed;
        left: 13%;
        top: 0px;
    }
</style>
`;


class ChooseFirstTopic extends BaseComponent {
    constructor() {
        super();
    }

    render() {
        this._shadowRoot.innerHTML = /*html*/ `
            ${style}
            <choose-first-topic-box></choose-first-topic-box>
            <footer-box></footer-box>
            <img class="bg" src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/c0766136467217.571e457d7ccd4.jpg" alt="background">
        `;
    }
}

window.customElements.define('choose-first-topic', ChooseFirstTopic);