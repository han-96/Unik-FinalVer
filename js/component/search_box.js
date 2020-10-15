import { BaseComponent } from "../component/base_component.js";
import { getDataFromDocs } from "../utility.js";
const style = /*html*/ `
<style>
    .search-box {
        width: 100%;
        display: flex;
        justify-content: center;
    }
    .search {
        width: 1000px;
        border: 3px solid #101010;
        border-right: none;
        padding: 5px;
        height: 20px;
        border-radius: 5px 0 0 5px;
        outline: none;
        color: #101010;
    }
    .search:focus{
        color: #101010;
    }
    .btn {
        width: 100px;
        height: 36px;
        border: 1px solid #101010;
        background: #101010;
        text-align: center;
        color: #fff;
        border-radius: 0 5px 5px 0;
        cursor: pointer;
        font-size: 20px;
    }
    .result {
        display: flex;
        margin-top: 20px;
        margin-left: 20px;
        margin-right: 20px;
        flex-flow: row wrap;
        justify-content: space-around;

    }
    .profile {
        margin-right: 20px;
        background-color: white;
        display: flex;
        flex-flow: column;
        width: 500px;
        font-family: 'Ubuntu', sans-serif;
        padding: 15px;
        margin: 10px;
        border-radius: 10px;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
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

</style>
`
class SearchBox extends BaseComponent {
    constructor() {
        super();

    }

    render() {
        this._shadowRoot.innerHTML = /*html*/ `
        ${style}
            <div class="wrapper">
            <div class="search-wrapper">
                <div class="search-box">
                    <form class="input">
                        <input type="text" placeholder="type something here..." class="search">      
                    </form>    
                    <button class="btn">Search</button>
            </div>
            <button class="home">Home</button>
                </div>
                <div class="result"></div>
            </div>
        `;

        this.$searchBox = this._shadowRoot.querySelector('.search');
        this.$result = this._shadowRoot.querySelector('.result');

        this.$btn = this._shadowRoot.querySelector('.btn');
        this.$btn.onclick = async () => {
            let userName = this.$searchBox.value;
            let response = await firebase.firestore().collection('user').where('userName', '==', userName).get();
            let result = getDataFromDocs(response);
            for (let doc of result) {
                this.$result.innerHTML += `
                    ${style}
                    <div class="profile" onclick="function view() {router.navigate('/view-board')}; view();">
                        <img class="avatar" src="${doc.avatar}" alt="avatar">
                        <p class="name">${doc.userName}</p>
                    </div>
                `;
            }
        }

        this.$home = this._shadowRoot.querySelector('.home');
        this.$home.onclick = () => {
            router.navigate('/home');
        }
    }
}

window.customElements.define('search-box', SearchBox);