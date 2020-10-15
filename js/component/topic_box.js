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
        margin: 100px 30px;
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
    .topic {
        display: flex;
        flex-wrap: wrap;
    }
    .graphic-design,
    .photography,
    .motion-graphic,
    .illustration,
    .product-design {
        margin: 15px;
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
                    <div class="photography">
                        <img src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/c754d8105632873.5f7d793a4053e.jpg" alt="img" class="photography.">
                        <p class="photography">Photography</p>
                    </div>
                    <div class="illustration">
                        <img src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/09fe00103576499.5f4ff3c12acb1.png" alt="img" class="illustration.">
                        <p class="illustration">Illustration</p>
                    </div>
                    <div class="motion-graphic">
                        <img src="https://mir-s3-cdn-cf.behance.net/project_modules/1400_opt_1/ccf58797207565.5ebfbaf487582.png" alt="img" class="motion-graphic.">
                        <p class="motion-graphic">Motion Graphic</p>
                    </div>
                    <div class="product-design">
                        <img src="https://mir-s3-cdn-cf.behance.net/project_modules/1400_opt_1/ea08de85581595.5d8070f4ce83d.jpg" alt="img" class="product-design.">
                        <p class="product-design">Product Design</p>
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

        this.$photography = this._shadowRoot.querySelector('.photography');
        this.$photography.onclick = async () => {
            let response = await firebase.firestore().collection('user').where('userName', '==', 'photography').get();
            let data = getDataFromDocs(response.docs)[0]; 
            let list = data.project.toString();
            list += ',';      
            setHomeList(list);
            this.$container.style = 'display: ';
        }

        this.$illustration = this._shadowRoot.querySelector('.illustration');
        this.$illustration.onclick = async () => {
            let response = await firebase.firestore().collection('user').where('userName', '==', 'illustration').get();
            let data = getDataFromDocs(response.docs)[0]; 
            let list = data.project.toString();
            list += ',';      
            setHomeList(list);
            this.$container.style = 'display: ';
        }

        this.$motionGraphic = this._shadowRoot.querySelector('.motion-graphic');
        this.$motionGraphic.onclick = async () => {
            let response = await firebase.firestore().collection('user').where('userName', '==', 'motion-graphic').get();
            let data = getDataFromDocs(response.docs)[0]; 
            let list = data.project.toString();
            list += ',';      
            setHomeList(list);
            this.$container.style = 'display: ';
        }

        this.$productDesign = this._shadowRoot.querySelector('.product-design');
        this.$productDesign.onclick = async () => {
            let response = await firebase.firestore().collection('user').where('userName', '==', 'product-designc').get();
            let data = getDataFromDocs(response.docs)[0]; 
            let list = data.project.toString();
            list += ',';      
            setHomeList(list);
            this.$container.style = 'display: ';
        }
    }
}

window.customElements.define('topic-box', TopicBox);