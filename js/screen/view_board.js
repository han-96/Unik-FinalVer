import { BaseComponent } from "../component/base_component.js";
import { getCurrentGuest, setHomeList } from "../utility.js";
const style = /*html*/ `
<style>
.demo {
        display: flex;
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
</style>
`
class ViewBoard extends BaseComponent {
    constructor() {
        super();
        this.state = {
            isLoading: true
        }
    }

    render() {
        this._shadowRoot.innerHTML = /*html*/ `
        ${style}
            <div class="demo">
            <guest-profile-card></guest-profile-card>
            <content-container class="container" style="display: none"></content-container>
            <div class="btn">
                <button class="project">Project</button>
                <button class="saved">Saved Project</button>
            </div>
            </div>
            <footer-box></footer-box>  
        `;

        this.$container = this._shadowRoot.querySelector('.container');

        this.$project = this._shadowRoot.querySelector('.project');
        this.$project.onclick = () => {
            let currentGuest = getCurrentGuest();
            let list = currentGuest.project.toString();
            setHomeList(list);
            this.$container.style = 'display: ';
        }

        this.$saved = this._shadowRoot.querySelector('.saved');
        this.$saved.onclick = () => {
            let currentGuest = getCurrentGuest();
            let list = currentGuest.saved.toString();
            setHomeList(list);
            this.$container.style = 'display: ';
        }
    }
}

window.customElements.define('view-board', ViewBoard);