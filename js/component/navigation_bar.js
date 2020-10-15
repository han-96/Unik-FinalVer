import { BaseComponent } from "../component/base_component.js";
import { getCurrentUser } from "../utility.js";

const style = /*html*/ `
    <style>
        a {
            text-decoration: none;
            margin: 0px 20px;
        }
        .nav-bar {
            font-family: 'Ubuntu', sans-serif;
            position: fixed;
            width: 100%;
            top: 0;
            left: 0;
            z-index: 1;
            display: flex;
            justify-content: space-between;
            align-items: center;
            background-color: white;
            height: 60px;
            box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1);
        }
        .brand {
            width: 80px;
            height: auto;
            margin: 0px 20px;
        }
        .brand:hover {
            cursor: pointer;
        }
        .user-avatar {
            object-fit: cover;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            margin: 0px 20px;
        }
        .user-avatar {
            cursor: pointer;
        }
        button {
        margin: 10px;
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
    .user-board {
        display: flex;
        align-items: center;
    }
    </style>
`;

class NavigationBar extends BaseComponent {
    constructor() {
        super();
        this.state = {
            data: {
                userAvatar: ''
            }
        }
    }

    render() {
        this._shadowRoot.innerHTML = /*html*/ `
            ${style}
            <div class="nav-bar">
                <img class="brand" src="../../img/logo/brand.png" alt="">
                <div class="tab">
                    <a href="index.html#!/explore">Explore</a>
                    <a href="index.html#!/search">Search</a>
                    <a href="index.html#!/publish-project">Publish project</a>
                    
                </div>
                <div class="user-board">
                    <img class="user-avatar" src="${this.state.data.userAvatar}" alt="user-avatar">
                    <button class="sign-out">Sign out</p>
                </div>
            </div>
        `;

        if (this.state.data.userAvatar == '') {
            this.state.data.userAvatar = getCurrentUser().avatar;
            this.setState(this.state);
        }

        this.$user = this._shadowRoot.querySelector('.user-board');
        this.$user.onclick = () => {
            router.navigate('/user-board');
        }

        this.$brand = this._shadowRoot.querySelector('.brand');
        this.$brand.onclick = () => {
            router.navigate('/home');
        }

        this.$signout = this._shadowRoot.querySelector('.sign-out');
        this.$signout.onclick = () => {
            router.navigate('/');
        }
    }
}

window.customElements.define('navigation-bar', NavigationBar);