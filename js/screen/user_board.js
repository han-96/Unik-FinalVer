import { BaseComponent } from "../component/base_component.js";
import { getCurrentUser, setHomeList } from "../utility.js";
const style = /*html*/ `
<style>
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
</style>
`
class UserBoard extends BaseComponent {
    constructor() {
        super();
        this.state = {
            isLoading: true
        }
    }

    render() {
        this._shadowRoot.innerHTML = /*html*/ `
        ${style}
            <user-profile-card></user-profile-card>
            <content-container class="container" style="display: none"></content-container>
            <div class="btn">
                <button class="project">Project</button>
                <button class="saved">Saved Project</button>
            </div>
            
            <footer-box></footer-box>
            
        `;

        this.$container = this._shadowRoot.querySelector('.container');

        this.$project = this._shadowRoot.querySelector('.project');
        this.$project.onclick = () => {
            let currentUser = getCurrentUser();
            let list = currentUser.project.toString();
            list += ',';
            setHomeList(list);
            this.$container.style = 'display: ';
        }

        this.$saved = this._shadowRoot.querySelector('.saved');
        this.$saved.onclick = () => {
            let currentUser = getCurrentUser();
            let list = currentUser.saved.toString();
            list += ',';
            setHomeList(list);
            this.$container.style = 'display: ';
        }
    }
}

window.customElements.define('user-board', UserBoard);