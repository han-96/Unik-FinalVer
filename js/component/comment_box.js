import { BaseComponent } from "./base_component.js";
import { getCurrentUser, getCurrentProject, setCurrentProject } from "../utility.js";

const style = /*html*/ `
<style>
    .wrapper {
        margin: 5px;
    }
    .cmt-owner {
        object-fit: cover;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        margin-right: 5px;
    }
    .cmt-wrapper {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 5px 0px;
    }
    button {
        background-color: #0000cc;
        cursor: pointer;
        width: 125px;
        height: 36px;
        color: white;
        border: none;
        border-radius: 18px;
        text-decoration: none;
        font-family: 'Ubuntu', sans-serif;
        font-size: 15px;
        margin: 10px;
    }
    button:hover {
        background-color: #3333ff;
    }
</style>
`;

class CommentBox extends BaseComponent {
    constructor() {
        super();
        this.state = {
            html: '',
            isLoading: true
        }
    }

    render() {
        this._shadowRoot.innerHTML = /*html*/ `
            ${style}
            <div class="wrapper">
                <create-form>
                    <form class="comment-form">
                        <input name="content" class="input" placeholder="Type your comment here..."></input>
                        <button>Post</button>
                    </form>
                </create-form>
                <div class="comment">${this.state.html}</div>
            </div>
        `;

        if (this.state.isLoading) {
            let currentProject = getCurrentProject();
            let currentUser = getCurrentUser();

            let getData = async () => {
                let response = await firebase.firestore().collection('project').doc(currentProject.id).get();
                let comment = response.data().comment;
                for (let x of comment) {
                    let display = 'display: none';
                    if (currentProject.owner == currentUser.id) display = 'display: ';
                    this.state.html += /*html*/ `
                        <div class="cmt-wrapper">
                            <div class="cmt">
                                <img class="cmt-owner" src="${x.ownerAvatar}" alt="owner-avatar">
                                <p class="content">${x.content}</p>
                            </div>
                            <button id="${x.content}" class="delete" style="${display}" 
                            onclick="let del = async () => {
                                let currentProject = JSON.parse(localStorage.getItem('currentProject'));
                                let comment = currentProject.comment;
                                console.log(comment)
                                for (let i = 0; i < comment.length; i++) {
                                    if (comment[i].content == this.id) {
                                        comment.splice(i, 1);
                                        break;
                                    }
                                }
                                currentProject.comment = comment;
                                localStorage.setItem('currentProject', JSON.stringify(currentProject));
                                await firebase.firestore().collection('project').doc(currentProject.id).update({comment: currentProject.comment});
                                }; 
                                del();
                                ">Delete comment</button>
                        </div>
                    `;
                }
                
                this.state.isLoading = false;
                this.setState(this.state);
            }
            getData();
        }

        this.$commentForm = this._shadowRoot.querySelector('.comment-form');
        this.$commentForm.onsubmit = async (event) => {
            event.preventDefault();
            let content = this.$commentForm.content.value.trim();
            if (content == '') {
                alert('You need to type something!');
            }
            else {
                let currentUser = getCurrentUser();
                let currentProject = getCurrentProject();

                let comment = {
                    content: content,
                    owner: currentUser.ID,
                    ownerName: currentUser.userName,
                    ownerAvatar: currentUser.avatar,
                    createDate: new Date().toLocaleString()
                };
                currentProject.comment.push(comment);
                setCurrentProject(currentProject);

                this.state.html = /*html*/ `
                    <div class="cmt">
                        <img class="cmt-owner" src="${comment.ownerAvatar}" alt="owner-avatar">
                        <p class="content">${comment.content}</p>
                    </div>
                ` + this.state.html;

                await firebase.firestore().collection('project').doc(currentProject.id).update({
                    comment: currentProject.comment
                });

                this.setState(this.state);
            }  
        }
    }
}

window.customElements.define("comment-box", CommentBox);