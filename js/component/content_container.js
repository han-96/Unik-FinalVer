import { BaseComponent } from "../component/base_component.js";
import { getCurrentUser, getDataFromDocs, getHomeList } from "../utility.js";

const style = /*html*/ `
<style>
    .wrapper {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
    }
</style>
`;

class ContentContainer extends BaseComponent {
    constructor() {
        super();
        this.props = {
            data: ''
            // data: ['MmChzgGlUO3GRl5ISaRu']
        }
        this.state = {
            html: '',
            isLoading: true
        }
    }

    render() {
        this._shadowRoot.innerHTML = /*html*/ `
            ${style}
            <div class="wrapper">
                ${this.state.html}
            </div>
        `;

        if (this.state.isLoading) {
            let homeList = getHomeList();
            let list = homeList.split(',');
            list.splice(list.length - 1, 1);

            this.props.data = list;

            let getData = async () => {
                // let response = await firebase.firestore().collection('project').get();
                // let data = response.docs;
                // for (let doc of data) {
                //     this.state.html += `<project-card id="${doc.data().ID}"></project-card>`;
                // }

                for (let doc of this.props.data) {
                    this.state.html += `<project-card id="${doc}"></project-card>`;
                }

                this.state.isLoading = false;
                this.setState(this.state);
            }
            getData();
        }
    }
}

window.customElements.define('content-container', ContentContainer);