import { BaseComponent } from "./base_component.js";
import { getCurrentUser } from "../utility.js";
const style = /*html*/ `
<style>
    .wrapper {
        display: flex;
        flex-flow: column;
        width: 300px;
        font-family: 'Ubuntu', sans-serif;
        padding: 15px;
        margin: 10px;
        border-radius: 10px;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    }
    .cover-container .cover {
        left: 50%;
        position: relative;
        transform: translate(-50%, 0);
        min-height: 100%;
        min-width: 100%; 
    }
    .cover-container {
        background-color: orange;
        height: 25%;
        width: 100%;
        overflow: hidden;
        position: absolute;
        top: 0;
        z-index: -1;
    }

</style>
`
class UserProfile extends BaseComponent {
    constructor() {
        super();
        this.state = {
            data: {
                age: '',
                avatar: '',
                cover: '',
                description: '',
                follower: [],
                following: [],
                jobTitle: '',
                label: '',
                location: '',
                userName: '',
            },
            isLoading: true
        }
    }

    render() {
        this._shadowRoot.innerHTML = /*html*/ `
        ${style}
            <div class="cover-container">
                    <img class ="cover" src="${this.state.data.cover}" alt="cover">
            </div>
            <div class="wrapper">
                    <img src="${this.state.data.avatar}" alt="avatar">
                <div class="info">
                    <p class="userName">Name    ${this.state.data.userName}</p>
                    <p class="age">Age  ${this.state.data.age}</p>
                    <p class="jobTitle">Job ${this.state.data.jobTitle}</p>
                    <p class="description">Description  ${this.state.data.description}</p>
                    <p class="location">Location    ${this.state.data.location}</p>
                    <p class="follower">Followers   ${this.state.data.follower.length}</p>
                    <p class="following">Following  ${this.state.data.following.length}</p>
                    <p class="label">${this.state.data.label}</p>
                </div>
            </div>
        `;

        if (this.state.isLoading) {
            let currentUser = getCurrentUser();
            this.state.data.age = currentUser.age;
            this.state.data.avatar = currentUser.avatar;
            this.state.data.cover = currentUser.cover;
            this.state.data.description = currentUser.description;
            this.state.data.follower = currentUser.follower;
            this.state.data.following = currentUser.following;
            this.state.data.jobTitle = currentUser.jobTitle;
            this.state.data.label = currentUser.label;
            this.state.data.location = currentUser.location;
            this.state.data.userName = currentUser.userName;

            this.state.isLoading = false;
            this.setState(this.state);
        }
    }
}

window.customElements.define('user-profile-card', UserProfile);