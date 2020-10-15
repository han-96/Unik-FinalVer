import { BaseComponent } from "../component/base_component.js";
import { getDataFromDocs, setHomeList } from "../utility.js";
const style = /*html*/ `
<style>
    .wrapper {
        background-color: white;
        width: 100%;
        height: 500px;
        font-family: 'Ubuntu', sans-serif;
        display: flex;
        flex-direction: column;
        align-items: center;
        border-radius: 15px;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    }
    .container {
        display: flex;
        flex-wrap: wrap;
        margin-bottom: 15px;
    }
    .graphic-design {
        display: flex;
        flex-direction: column;
        align-items: center;
        border-radius: 0px 0px 10px 10px;
    }
        img {
        width: 200px;
    }
</style>
`
class TopicBox extends BaseComponent {
    constructor() {
        super();
    }

    render() {
        this._shadowRoot.innerHTML = /*html*/ `
        ${style}
            <div class="wrapper">
                <div class="topic">
                    <div class="graphic-design">
                        <img src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/c0766136467217.571e457d7ccd4.jpg" alt="graphic-design" class="img-graphic-design">
                        <p class="p-graphic-design">Graphic Design</p>
                    </div>
                </div>
                <content-container class="container" style="display: none"></content-container>
            </div>
        `;

        this.$container = this._shadowRoot.querySelector('.container')

        this.$graphicDesgin = this._shadowRoot.querySelector('.graphic-design');
        this.$graphicDesgin.onclick = async () => {
            let response = await firebase.firestore().collection('user').where('userName', '==', 'graphic-design').get();
            let data = getDataFromDocs(response.docs)[0]; 
            let list = data.project.toString();
            list += ',';      
            setHomeList(list);
            this.$container.style = 'display: ';
        }
    }
}

window.customElements.define('topic-box', TopicBox);