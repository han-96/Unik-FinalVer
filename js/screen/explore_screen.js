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
    topic-box {
        width: 100%;
        position: fixed;
        left: 0;
        top: 3px;
    }
    button {
        margin: 10px;
        background-color: #0000cc;
        cursor: pointer;
        width: 120px;
        height: 36px;
        text-decoration: none;
        color: white;
        border: none;
        border-radius: 18px;
        font-family: 'Ubuntu', sans-serif;
        font-size: 15px;
        z-index: 2;
        position: fixed;
        top: 500px;
    }
    button:hover {
        background-color: #3333ff;
    }
</style>
`;

class ExploreScreen extends BaseComponent {
    constructor() {
        super();
    }

    render() {
        this._shadowRoot.innerHTML = /*html*/ `
        ${style}
            <img class="logo" src="../../img/logo/brand.png" alt="logo">
            <navigation-bar></navigation-bar>
            <topic-box></topic-box>
            
            <footer-box></footer-box> 
            <button class="home">Home</button>
            <img class="bg" src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/c0766136467217.571e457d7ccd4.jpg" alt="background">
        `;

        this.$home = this._shadowRoot.querySelector('.home');
        this.$home.onclick = () => {
            router.navigate('/home');
        }
    }
}

window.customElements.define('explore-screen', ExploreScreen);