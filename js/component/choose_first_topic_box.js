import { BaseComponent } from "../component/base_component.js";
import { getCurrentUser } from "../utility.js";

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
    .graphic-design,
    .photography,
    .motion-graphic,
    .illustration,
    .product-design {
        display: flex;
        flex-direction: column;
        align-items: center;
        border-radius: 0px 0px 10px 10px;
    }
    .complete {
        background-color: #0000cc;
        cursor: pointer;
    }
    button {
        width: 250px;
        height: 36px;
        color: white;
        border: none;
        border-radius: 18px;
        text-decoration: none;
        font-family: 'Ubuntu', sans-serif;
        font-size: 15px;
        margin: 20px 0;
    }
    button:hover {
        background-color: #3333ff;
    }
    img {
        width: 200px;
    }
</style>
`;

class ChooseFirstTopicBox extends BaseComponent {
    constructor() {
        super();
        this.state = {
            topic: []
        }
    }

    render() {
        this._shadowRoot.innerHTML = /*html*/ `
            ${style}
            <div class="wrapper">
                <div class="container">
                    <div class="graphic-design">
                        <img src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/460cc880576629.5ceba4e60ec40.jpg" alt="img" class="graphic-design.">
                        <p class="graphic-design">Graphic Design</p>
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

                <div class="btn">
                    <button class="complete">Complete</button>
                </div>
            </div>
        `;
    
        let check = false;

        this.$graphicDesign = this._shadowRoot.querySelector('.graphic-design');
        this.$graphicDesign.onclick = () => {
            if (!check) {
                this.state.topic.push('graphic-design');
                check = true;
                this.$graphicDesign.style.border = '2px solid red';
            }
            else {
                for (let i = 0; i < this.state.topic.length; i++) {
                    if (this.state.topic[i] == 'graphic-design') this.state.topic.splice(i, 1);
                    check = false;
                }
                this.$graphicDesign.style.border = '';
            }
        }

        this.$photography = this._shadowRoot.querySelector('.photography');
        this.$photography.onclick = () => {
            if (!check) {
                this.state.topic.push('photography');
                check = true;
                this.$photography.style.border = '2px solid red';
            }
            else {
                for (let i = 0; i < this.state.topic.length; i++) {
                    if (this.state.topic[i] == 'photography') this.state.topic.splice(i, 1);
                    check = false;
                    this.$photography.style.border = '';
                }
            }
        }

        this.$illustration = this._shadowRoot.querySelector('.illustration');
        this.$illustration.onclick = () => {
            if (!check) {
                this.state.topic.push('illustration');
                check = true;
                this.$illustration.style.border = '2px solid red';
            }
            else {
                for (let i = 0; i < this.state.topic.length; i++) {
                    if (this.state.topic[i] == 'illustration') this.state.topic.splice(i, 1);
                    check = false;
                    this.$illustration.style.border = '';
                }
            }
        }

        this.$motionGraphic = this._shadowRoot.querySelector('.motion-graphic');
        this.$motionGraphic.onclick = () => {
            if (!check) {
                this.state.topic.push('motion-graphic');
                check = true;
                this.$motionGraphic.style.border = '2px solid red';
            }
            else {
                for (let i = 0; i < this.state.topic.length; i++) {
                    if (this.state.topic[i] == 'motion-graphic') this.state.topic.splice(i, 1);
                    check = false;
                    this.$motionGraphic.style.border = '';
                }
            }
        }

        this.$productDesign = this._shadowRoot.querySelector('.product-design');
        this.$productDesign.onclick = () => {
            if (!check) {
                this.state.topic.push('product-design');
                check = true;
                this.$productDesign.style.border = '2px solid red';
            }
            else {
                for (let i = 0; i < this.state.topic.length; i++) {
                    if (this.state.topic[i] == 'product-design') this.state.topic.splice(i, 1);
                    check = false;
                    this.$productDesign.style.border = '';
                }
            }
        }

        this.$btn = this._shadowRoot.querySelector('.complete');
        this.$btn.onclick = async () => {
            if (this.state.topic.length >= 5) {
                let currentUser = getCurrentUser();
                await firebase.firestore().collection('user').doc(currentUser.id).update({
                    following: this.state.topic
                });
                router.navigate('/home');
            }
            else {
                swal("Oops...", "Please choose at lease 5 topic!", "warning");
            }
        }
    }
}

window.customElements.define('choose-first-topic-box', ChooseFirstTopicBox);