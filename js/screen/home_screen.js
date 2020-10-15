import { BaseComponent } from "../component/base_component.js";
import { setHomeList } from "../utility.js";

const style =  /*html*/ `
<style>
    * {
        font-family: 'Ubuntu', sans-serif;
    }
    content-container {
        position: relative;
        top: 80px;
    }
    p {
        position: relative;
        top: 70px;
        left: 10px;
    }
</style>
`;

class HomeScreen extends BaseComponent {
    constructor() {
        super();
        this.state = {
            data: '',
            isLoading: true
        }
    }

    render() {
        this._shadowRoot.innerHTML = /*html*/ `
            ${style}
            <navigation-bar></navigation-bar>
            <p>Projects from creatives you follow and more</p>
            <content-container></content-container>
            <footer-box></footer-box>
        `;

        if (this.state.isLoading) {
            let getData = async() => {
                let response = await firebase.firestore().collection('project').get();
                let data = response.docs;

                for (let doc of data) {
                    this.state.data += `${doc.data().ID},`;
                }
                setHomeList(this.state.data);

                this.state.isLoading = false;
                this.setState(this.state);
            }
            getData();
        }
    }
}

window.customElements.define('home-screen', HomeScreen);