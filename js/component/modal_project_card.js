import { BaseComponent } from "../component/base_component.js";
import { getCurrentUser, getCurrentGuest, getCurrentProject, getDataFromDocs, setCurrentUser, setCurrentGuest, setCurrentProject } from "../utility.js";

const style = /*html*/ `
    <style>
        .wrapper {
            font-family: 'Ubuntu', sans-serif;
        }
        .modal {
            display: none;
            position: fixed;
            z-index: 2;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            overflow: auto;
            background-color: rgb(0, 0, 0);
            background-color: rgba(0, 0, 0, 0.5);
            
        }
        .modal-content {
            background-color: white;
            margin: 10% auto;
            padding: 10px;
            width: 90%;
            border: none;
            border-radius: 15px;
            position: relative;
        }
        .close {
            color: white;
            position: relative;
            right: 30px;
            top: 80px;
            float: right;
            font-size: 25px;
            font-weight: bold;
        }
        .close:hover,
        .close:focus {
            color: black;
            text-decoration: none;
            cursor: pointer;
        }
        .btn {
            background-color: #0000cc;
            cursor: pointer;
            width: 100%;
            height: 36px;
            color: white;
            border: none;
            border-radius: 18px;
            text-decoration: none;
            font-family: 'Ubuntu', sans-serif;
            font-size: 15px;
            margin-top: 5px;
        }
        .btn:hover {
            background-color: #3333ff;
        }
        .project-owner,
        .user-info,
        .project-info,
        .tag {
            display: flex;
            align-items: center;
        }
        .owner-avatar,
        .user-avatar {
            object-fit: cover;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            margin: 10px;
        }
        .owner-name,
        .user-name,
        .user-age,
        .user-location,
        .project-title,
        .project-description,
        .project-total-respect,
        .project-publish-date,
        .project-tag {
            margin: 10px;
        }
        button {
            width: 125px;
            height: 36px;
            color: white;
            border: none;
            border-radius: 18px;
            text-decoration: none;
            font-family: 'Ubuntu', sans-serif;
            font-size: 15px;
            margin-bottom: 5px;
        }
        .follow {
            background-color: #0000cc;
            cursor: pointer;
            margin: 10px;
        }
        .follow:hover {
            background-color: #3333ff;
        }
        .save {
            background-color: #0000cc;
            cursor: pointer;
            margin: 10px;
        }
        .save:hover {
            background-color: #3333ff;
        }
        .respect {
            background-color: #0000cc;
            cursor: pointer;
            margin: 10px;
        }
        .respect:hover {
            background-color: #3333ff;
        }
        .delete {
            background-color: #0000cc;
            cursor: pointer;
            margin: 10px;
        }
        .delete:hover {
            background-color: #3333ff;
        }
        .content {
            margin: 10px;
        }
        .side-bar {
            display: flex;
            flex-direction: column;
            position: absolute;
            z-index: 2;
            top: 150px;
            right: -50px;
        }
        i {
            margin: 5px;
        }
    </style>
`;

class ModalProjectCard extends BaseComponent {
    constructor() {
        super();
        this.props = {
            ID: ''
        }
        this.state = {
            'project-data': {
                ID: '',
                comment: [],
                content: [],
                cover: '',
                description: '',
                owner: '',
                publishDate: '',
                tag: [],
                title: '',
                totalRespect: []
            },
            'owner-data': {
                ID: '',
                age: '',
                avatar: '',
                cover: '',
                description: '',
                email: '',
                follower: [],
                following: [],
                jobTitle: '',
                joinDate: '',
                label: '',
                location: '',
                project: [],
                savedProject: [],
                totalRespect: 0,
                userName: '',
                webReference: '',
                workExperience: ''
            },
            html: '',
            tag: '',
            isLoading: true
        }
    }

    render() {
        this._shadowRoot.innerHTML = /*html*/ `
            <link rel="stylesheet" href="../../fontawesome-free-5.15.1-web/css/all.css">
            ${style}
            <div class="wrapper">
                
                <button class="btn">View detail</button>

                <div class="modal">
                    <span class="close">x</span>
                    <div class="modal-content">
                        <div class="project-owner">
                            <img class="owner-avatar" src="${this.state["owner-data"].avatar}" alt="owner-avatar">
                            <p class="owner-name">${this.state["owner-data"].userName}</p>
                            <button class="follow">Follow</button>
                        </div>

                        <div class="content">${this.state.html}</div>

                        <div class="side-bar">
                            <button class="follow">Follow</button>
                            <button class="save">Save</button>
                            <button class="respect">Respect</button>
                        </div>

                        <div class="user-info">
                            <img src="${this.state["owner-data"].avatar}" alt="user-info" class="user-avatar">
                            <p class="user-name">${this.state["owner-data"].userName}</p>
                            <p class="user-age">${this.state["owner-data"].age}</p>
                            <p class="user-location">${this.state["owner-data"].location}</p>
                            <button class="follow">Follow</button>
                        </div>

                        <div class="project-info">
                            <p class="project-title">${this.state["project-data"].title} |</p>
                            <p class="project-description">${this.state["project-data"].description} |</p>
                            
                            <p class="project-total-respect"><i class="far fa-heart"></i>${this.state["project-data"].totalRespect.length} |</p>
                            <p class="project-publish-date">${this.state["project-data"].publishDate}</p>
                        </div>

                        <div class="tag">${this.state.tag}</div>

                        <button class="delete" style="display: none">Delete</button>

                        <hr>

                        <comment-box></comment-box>
                    </div>
                </div>
            </div>
        `;

        this.$btn = this._shadowRoot.querySelector('.btn');
        this.$modal = this._shadowRoot.querySelector('.modal');
        this.$span = this._shadowRoot.querySelector('.close');
        this.$content = this._shadowRoot.querySelector('.modal-content');
        this.$follow = this._shadowRoot.querySelector('.follow');
        this.$save = this._shadowRoot.querySelector('.save');
        this.$respect = this._shadowRoot.querySelector('.respect');
        this.$delete = this._shadowRoot.querySelector('.delete');

        if (this.state.isLoading) {
            this.props.ID = this.id;
            
            let getData = async () => {
                let project = await firebase.firestore().collection('project').where('ID', '==', this.props.ID).get();
                this.state["project-data"] = getDataFromDocs(project)[0];

                let owner = await firebase.firestore().collection('user').doc(this.state["project-data"].owner).get();
                this.state["owner-data"] = owner.data();

                for (let i = 0; i < this.state["project-data"].content.length; i++) {
                    this.state.html += `<img src="${this.state["project-data"].content[i]}" alt="content" style="width: 100%">`;
                }

                for (let i = 0; i < this.state["project-data"].tag.length; i++) {
                    this.state.tag += `<p class="project-tag">${this.state["project-data"].tag[i]}</p>`;
                }

                this.state.isLoading = false;
                this.setState(this.state);
            }
            getData();
        }

        this.$btn.onclick = async () => {
            this.$modal.style.display = 'block';

            let response = await firebase
                .firestore()
                .collection('user')
                .where('email', '==', this.state["owner-data"].email)
                .get();
            let currentGuest = getDataFromDocs(response.docs)[0];
            setCurrentGuest(currentGuest);

            let responseProject = await firebase
                .firestore()
                .collection('project')
                .where('ID', '==', this.props.ID)
                .get();
            let currentProject = getDataFromDocs(responseProject.docs)[0];
            setCurrentProject(currentProject);

            let currentUser = getCurrentUser();
            if (currentUser.id == this.state["project-data"].owner) this.$delete.style = 'display: ';
        }

        this.$span.onclick = () => {
            this.$modal.style.display = 'none';
        }

        this.$modal.onclick = (event) => {
            if (event.target == this.$modal) {
                this.$modal.style.display = 'none';
            }
        }

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

        this.$save.onclick = async () => {
            let currentUser = getCurrentUser();
            
            if (currentUser.savedProject.indexOf(this.props.ID) == -1) {
                currentUser.savedProject.push(this.props.ID);
                setCurrentUser(currentUser);
            }
            else {
                currentUser.savedProject.splice(currentUser.savedProject.indexOf(this.props.ID), 1);
                setCurrentUser(currentUser);
            }

            await firebase
                .firestore()
                .collection('user')
                .doc(currentUser.id)
                .update({savedProject: currentUser.savedProject});
        }

        this.$respect.onclick = async () => {
            let currentUser = getCurrentUser();
            let currentProject = getCurrentProject();
            
            if (currentProject.totalRespect.indexOf(currentUser.ID) == -1) {
                currentProject.totalRespect.push(currentUser.ID);
                setCurrentProject(currentProject);
            }
            else {
                currentProject.totalRespect.splice(currentProject.totalRespect.indexOf(currentUser.ID), 1);
                setCurrentProject(currentProject);
            }

            await firebase
                .firestore()
                .collection('project')
                .doc(currentProject.id)
                .update({totalRespect: currentProject.totalRespect});
        }

        this.$delete.onclick = async () => {
            let currentProject = getCurrentProject();
            await firebase.firestore().collection('project').doc(currentProject.id).delete();
        }
    }
}

window.customElements.define('modal-project-card', ModalProjectCard);