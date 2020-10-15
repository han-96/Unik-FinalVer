import { BaseComponent } from "./base_component.js";
import { getCurrentGuest, setCurrentGuest, getCurrentUser, setCurrentUser } from "../utility.js";
const style = /*html*/ `
<style>
    .wrapper {
        display: flex;
        flex-flow: column;
        width: 550px;
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
        height: 20%;
        width: 100%;
        overflow: hidden;
        position: absolute;
        top: 0;
        z-index: -1;
    }
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
class GuestProfileCard extends BaseComponent {
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
                <img class="cover" src="${this.state.data.cover}" alt="cover">
            </div>
            <div class="wrapper">
                <img src="${this.state.data.avatar}" alt="avatar">
                <div class="info">
                    <p class="guestName">Name ${this.state.data.userName}</p>
                    <p class="age">Age ${this.state.data.age}</p>
                    <p class="jobTitle">Job ${this.state.data.jobTitle}</p>
                    <p class="description">Description  ${this.state.data.description}</p>
                    <p class="location">Location    ${this.state.data.location}</p>
                    <p class="follower">Followers   ${this.state.data.follower.length}</p>
                    <p class="following">Following  ${this.state.data.following.length}</p>
                    <p class="label">${this.state.data.label}</p>
                </div>
                <button class="follow">Follow</button>
            </div>
        `;


        if (this.state.isLoading) {
            let currentGuest = getCurrentGuest();
            this.state.data.age = currentGuest.age;
            this.state.data.avatar = currentGuest.avatar;
            this.state.data.cover = currentGuest.cover;
            this.state.data.description = currentGuest.description;
            this.state.data.follower = currentGuest.follower;
            this.state.data.following = currentGuest.following;
            this.state.data.jobTitle = currentGuest.jobTitle;
            this.state.data.label = currentGuest.label;
            this.state.data.location = currentGuest.location;
            this.state.data.userName = currentGuest.userName;

            this.state.isLoading = false;
            this.setState(this.state);
        }

        this.$follow = this._shadowRoot.querySelector('.follow');
        this.$follow.onclick = async () => {
            let currentUser = getCurrentUser();
            let guest = getCurrentGuest();
            
            if (currentUser.following.indexOf(guest.ID) == -1) {
                currentUser.following.push(guest.ID);
                setCurrentUser(currentUser);
                guest.follower.push(currentUser.ID);
                setCurrentGuest(guest);
            }
            else {
                currentUser.following.splice(currentUser.following.indexOf(guest.ID), 1);
                setCurrentUser(currentUser);
                guest.follower.splice(guest.follower.indexOf(currentUser.ID), 1);
                setCurrentGuest(guest);
            }

            await firebase
                .firestore()
                .collection('user')
                .doc(currentUser.id)
                .update({following: currentUser.following});

            await firebase
                .firestore()
                .collection('user')
                .doc(guest.id)
                .update({follower: guest.follower});
        }
    }
}

window.customElements.define('guest-profile-card', GuestProfileCard);