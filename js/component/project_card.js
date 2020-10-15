import { BaseComponent } from "../component/base_component.js";
import { getDataFromDocs, setCurrentGuest, setCurrentProject } from "../utility.js";

const style = /*html*/ `
<style>
    .wrapper {
        width: 300px;
        font-family: 'Ubuntu', sans-serif;
        padding: 15px;
        margin: 10px;
        border-radius: 10px;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    }
    .cover {
        width: 300px;
        height: 200px;
        object-fit: cover;
        border-radius: 10px;
    }
    .owner-avatar {
        object-fit: cover;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        margin-right: 5px;
    }
    .owner-info {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 5px 0px;
    }
    .section-1,
    .section-2 {
        display: flex;
        align-items: center;
    }
    .owner-info:hover {
        cursor: pointer;
    }
    .project-info {
        position: relative;
    }
    .title {
        position: absolute;
        left: 10px;
        bottom: 15px;
        color: white;
    }
    p {
        margin: 0px;
    }
    i {
        margin-right: 5px;
    }
</style>
`;

class ProjectCard extends BaseComponent {
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
            isLoading: true
        }
    }

    static get observedAttributes() {
        return ['id'];
    }

    render() {
        this._shadowRoot.innerHTML = /*html*/ `
            <link rel="stylesheet" href="../../fontawesome-free-5.15.1-web/css/all.css">
            ${style}
            <div class="wrapper">
                <div class="project-info">
                    <img class="cover" src="${this.state["project-data"].cover}" alt="cover">
                    <p class="title">${this.state["project-data"].title}</p>
                    <p class="label">${this.state["owner-data"].label}</p>
                </div>
                <div class="owner-info">
                    <div class="section-1">
                        <img class="owner-avatar" src="${this.state["owner-data"].avatar}" alt="owner-avatar">
                        <p class="owner-name">${this.state["owner-data"].userName}</p>
                    </div>
                    <div class="section-2">
                        <i class="far fa-heart"></i>
                        <p class="total-respect">${this.state["project-data"].totalRespect.length}</p>
                    </div>
                </div>

                <modal-project-card id="${this.props.ID}"></modal-project-card>
            </div>
        `;

        if (this.state.isLoading) {
            this.props.ID = this.id;
            let getData = async () => {
                let project = await firebase.firestore().collection('project').where('ID', '==', this.props.ID).get();
                this.state["project-data"] = getDataFromDocs(project)[0];
                let owner = await firebase.firestore().collection('user').doc(this.state["project-data"].owner).get();
                this.state["owner-data"] = owner.data();
                this.state.isLoading = false;
                this.setState(this.state);
            }
            getData();
        }

        this.$ownerInfo = this._shadowRoot.querySelector('.owner-info');
        this.$ownerInfo.onclick = async () => {
            let response = await firebase
                .firestore()
                .collection('user')
                .where('email', '==', this.state["owner-data"].email)
                .get();
            let currentGuest = getDataFromDocs(response.docs)[0];
            setCurrentGuest(currentGuest);

            router.navigate('/view-board');
        }
    }
}

window.customElements.define('project-card', ProjectCard);