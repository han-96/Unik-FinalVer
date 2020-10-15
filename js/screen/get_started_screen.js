import { BaseComponent } from "../component/base_component.js";

const style = /*html*/ `
<style>
    .bg {
        width: 100%;
        z-index: -1;
    }
    .btn {
        display: flex;
        justify-content: flex-end;
    }
    .sign-in {
        margin: 20px;
        margin-right: 8px;
        background-color: #0000cc;
    }
    .sign-up {
        margin: 20px;
        margin-left: 8px;
    }
    .logo {
        width: 100px;
        position: fixed;
        left: 15px;
        top: -15px;
    }
    .top {
        position: fixed;
        top: 0px;
        right: 0px;
    }
    .text {
        position: fixed;
        top: 30%;
        width: 100%;
        text-align: center;
        font-family: 'Ubuntu', sans-serif;
        font-size: 50px;
        font-weight: 900;
        color: black;
    }
    span {
        color: #0000cc;
        background-color: #ffff00;
        padding: 10px;
    }
    button {
        background-color: black;
        width: 120px;
        height: 36px;
        text-decoration: none;
        color: white;
        border: none;
        border-radius: 18px;
        font-family: 'Ubuntu', sans-serif;
        font-size: 15px;
    }
    .sign-up:hover {
        background-color: #333333;
        cursor: pointer;
    }
    .sign-in:hover {
        background-color: #3333ff;
        cursor: pointer;
    }
</style>
`;

class GetStartedScreen extends BaseComponent {
    constructor() {
        super();
    }

    render() {
        this._shadowRoot.innerHTML = /*html*/ `
            ${style}
            <div class="top">
                <img class="logo" src="../../img/logo/brand.png" alt="logo">
                <div class="btn">
                    <button class="sign-in">Sign in</button>
                    <button class="sign-up">Sign up</button>
                </div>
            </div>
            <p class="text">Get you to the <span>Design World</span></p>
            <footer-box></footer-box>
            <img class="bg" src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/c0766136467217.571e457d7ccd4.jpg" alt="background">
        `;

        this.$signIn = this._shadowRoot.querySelector('.sign-in');
        this.$signIn.onclick = () => {
            router.navigate('/sign-in');
        }

        this.$signUp = this._shadowRoot.querySelector('.sign-up');
        this.$signUp.onclick = () => {
            router.navigate('/sign-up');
        }
    }
}

window.customElements.define('get-started-screen', GetStartedScreen);