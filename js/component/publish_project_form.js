import { BaseComponent } from "../component/base_component.js";
import { getCurrentUser, renderID } from "../utility.js";

const style = /*html*/ `
<style>
    .wrapper {
        background-color: white;
        width: 800px;
        font-family: 'Ubuntu', sans-serif;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        border-radius: 15px;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)
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
    .btn-publish {
        background-color: #0000cc;
        cursor: pointer;
        margin-left: 5px;
    }
    .btn-publish:hover {
        background-color: #3333ff;
    }
    .btn-cancel {
        background-color: black;
        cursor: pointer;
        margin-right: 5px;
    }
    .btn-cancel:hover {
        background-color: #333333;
    }
    .section-1,
    .section-2,
    .btn {
        margin: 15px;
    }
    .demo-cover {
        width: 100px;
    }
    .demo-content {
        width: 765px;
    }
</style>
`;

class PublishProjectForm extends BaseComponent {
    constructor() {
        super();
        this.state = {
            html: '<img src="" alt="">',
            error: {
                content: '',
                cover: '',
                tag: '',
                title: ''
            },
            data: {
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
            }
        }
    }

    render() {
        this._shadowRoot.innerHTML = /*html*/ `
            ${style}
            <div class="wrapper">
                <div class="btn">
                    <button class="btn-cancel">Cancel</button>
                    <button class="btn-publish">Publish</button>
                </div>
                <div class="section-1">
                    <!-- upload cover -->
                    <div class="section-1-1">
                        <p class="cover-error">${this.state.error.cover}</p>
                        <progress value="0" max="100" class="cover-uploader" style="display:none"></progress>
                        <form class="upload-cover">
                            <label for="cover">Project cover</label><br>
                            <input type="file" class="cover" name="cover">
                        </form>
                        <img class="demo-cover" src="${this.state.data.cover}" alt="">
                    </div>
                    <!-- nhap title, description,... -->
                    <div class="section-1-2">
                        <form class="upload-info">
                            <label for="title">Project title</label><br>
                            <input type="text" class="title" name="title" value="${this.state.data.title}"  placeholder="Enter your project title">
                            <p class="title-error">${this.state.error.title}</p>
                            <label for="title">Project description</label><br>
                            <input type="text" class="description" name="description" value="${this.state.data.description}" placeholder="Tell something about your project">
                        </form>
                        <div class="choose-tag-form">
                            <p class="tag-error">${this.state.error.tag}</p>
                            <form class="choose-tag">
                                <input type="checkbox" class="graphic-design" name="tag" value="graphic-design">
                                <label for="graphic-design">Graphic design</label>
                                <input type="checkbox" class="photography" name="tag" value="photography">
                                <label for="photography">Photography</label>
                                <input type="checkbox" class="illustration" name="tag" value="illustration">
                                <label for="illustration">Illustration</label>
                                <input type="checkbox" class="motion" name="tag" value="motion-graphic">
                                <label for="motion">Motion</label>
                                <input type="checkbox" class="product-design" name="tag" value="product-design">
                                <label for="product-design">Product design</label>
                            </form>
                        </div>
                    </div>
                </div>

                <!-- upload image -->
                <div class="section-2">
                    <p class="content-error">${this.state.error.content}</p>
                    <progress value="0" max="100" class="content-uploader" style="display:none"></progress>
                    <form class="upload-content">
                        <label for="content">Add content</label><br>
                        <input type="file" class="content" name="content">
                    </form>
                    <div class="image-box-container">
                        ${this.state.html}
                    </div>
                </div>
            </div>
        `;

        let coverUploader = this._shadowRoot.querySelector('.cover-uploader');
        let coverUploadButton = this._shadowRoot.querySelector('.cover');
        coverUploadButton.onchange = (e) => {
            let file = e.target.files[0];

            let currentUser = getCurrentUser();

            let storageRef = firebase.storage().ref(`${currentUser.id}/project/cover/${renderID()}.${file.name.split('.')[1]}`);

            let task = storageRef.put(file);

            let that = this;

            coverUploader.style = "display:";

            task.on('state_changed',
                function progress(snapshot) {
                    let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    if (percentage == 100) percentage = 0;
                    coverUploader.value = percentage;
                },
                function error(err) {

                },
                async function complete() {
                    coverUploader.style = "display:none";
                    let imageLink = await storageRef.getDownloadURL();
                    that.state.data.cover = imageLink;
                    that.state.error.cover = '';

                    let title = that._shadowRoot.querySelector('.title').value;
                    let description = that._shadowRoot.querySelector('.description').value;
                    let tag = [];
                    for (let x of that._shadowRoot.querySelector('.choose-tag').elements['tag']) {
                        if (x.checked) tag.push(x.value);
                    }

                    that.state.data.description = description;
                    that.state.data.title = title;
                    that.state.data.tag = tag;

                    that.setState(that.state);

                    for (let x of tag) {
                        that._shadowRoot.querySelector(`.${x}`).checked = true;
                    }
                }
            );
        };

        let contentUploader = this._shadowRoot.querySelector('.content-uploader');
        let contentUploadButton = this._shadowRoot.querySelector('.content');

        contentUploadButton.onchange = (e) => {
            let file = e.target.files[0];
            let currentUser = getCurrentUser();
            let storageRef = firebase.storage().ref(`${currentUser.id}/project/content/${renderID()}.${file.name.split('.')[1]}`);
            let task = storageRef.put(file);

            let that = this;

            contentUploader.style = "display:";
            task.on('state_changed',
                function progress(snapshot) {
                    let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    if (percentage == 100) percentage = 0;
                    contentUploader.value = percentage;
                },
                function error(err) {


                },
                async function complete() {
                    contentUploader.style = "display:none";
                    let imageLink = await storageRef.getDownloadURL();
                    let content = that.state.data.content;
                    content.push(imageLink);
                    that.state.html = '';
                    for (let i = content.length - 1; i >= 0; i--) {
                        that.state.html += `<img class="demo-content" src="${content[i]}" alt="content">`;
                    }
                    that.state.error.content = '';

                    let title = that._shadowRoot.querySelector('.title').value;
                    let description = that._shadowRoot.querySelector('.description').value;
                    let tag = [];
                    for (let x of that._shadowRoot.querySelector('.choose-tag').elements['tag']) {
                        if (x.checked) tag.push(x.value);
                    }

                    that.state.data.description = description;
                    that.state.data.title = title;

                    that.state.data.tag = tag;

                    that.setState(that.state);

                    for (let x of tag) {
                        that._shadowRoot.querySelector(`.${x}`).checked = true;
                    }
                }
            );
        };

        this.$btnCancel = this._shadowRoot.querySelector('.btn-cancel');
        this.$btnCancel.onclick = () => {
            router.navigate('/home');
        }

        this.$btnPublish = this._shadowRoot.querySelector('.btn-publish');
        this.$btnPublish.onclick = async () => {
            // lay du lieu tu cac form
            let cover = this.state.data.cover;
            let title = this._shadowRoot.querySelector('.title').value;
            let description = this._shadowRoot.querySelector('.description').value;
            let content = this.state.data.content;
            let tag = [];
            for (let x of this._shadowRoot.querySelector('.choose-tag').elements['tag']) {
                if (x.checked) tag.push(x.value);
            }

            // kiem tra du lieu duoc nhap vao
            let isValid = true;

            this.state.data.description = description;

            if (title == '') {
                this.state.error.title = 'Your title is invalid!';
                isValid = false;
            } else {
                this.state.data.title = title;
                this.state.error.title = '';
            }

            if (cover == '') {
                this.state.error.cover = 'Your cover is required!';
                isValid = false;
            }

            if (tag.length == 0) {
                this.state.error.tag = 'Your gotta choose one tag at least!';
                isValid = false;
            } else {
                this.state.data.tag = tag;
                this.state.error.tag = '';
            }

            if (content.length == 0) {
                this.state.error.content = 'Your gotta publish something!';
                isValid = false;
            }

            if (isValid) {
                this.state.data.publishDate = new Date().toLocaleString();
                this.state.data.owner = getCurrentUser().id;
                this.state.data.ID = renderID();

                await firebase.firestore().collection('project').add(
                    this.state.data
                );

                let response = await firebase.firestore().collection('user').doc(`${this.state.data.owner}`).get();
                let oldProject = response.data().project;
                oldProject.push(this.state.data.ID);

                await firebase.firestore().collection('user').doc(`${this.state.data.owner}`).update({
                    project: oldProject
                });

                swal("Done", "Publish successfully!", "success");
            } else {
                swal("Oops...", "Something is not correct!", "error");
            }

            this.setState(this.state);

            for (let x of tag) {
                this._shadowRoot.querySelector(`.${x}`).checked = true;
            }
        }
    }
}

window.customElements.define('publish-project-form', PublishProjectForm);