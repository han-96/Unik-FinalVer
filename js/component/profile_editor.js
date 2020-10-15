import { BaseComponent } from "./base_component.js";
import { setCurrentUser, getCurrentUser, renderID } from "../utility.js";
const style = /*html*/ `
<style>
    h1 {
        display: flex;
        justify-content: center;
        font-family: 'Ubuntu', sans-serif;
    }
    .edit-form {
        background: #f0f0f0;
        margin: 0 auto;
        margin-top: -500px;
        margin-bottom: 2%;
        transition: opacity 1s;
        -webkit-transition: opacity 1s;
        padding: 6% 4%;
        width: 300px;
        font-family: 'Ubuntu', sans-serif;
        padding: 15px;
        border-radius: 10px;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    }
    .edit-form input {
        width: 92%;
        background: #fff;
        margin-bottom: 4%;
        border: 1px solid #ccc;
        padding: 4%;
        font-family: 'Open Sans', sans-serif;
        font-size: 95%;
        color: #555;
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
    .cancel {
        margin-left: 810px;
        margin-right: 40px;
    }
    .section-1-1 {
    }
    .section-1-2 {
        display: flex;
    }
    .section-1-1 {
        display: inline-block;
        text-align: left;
        background: #fff;
        padding: 16px;
        width: 450px;
        position: relative;
        border-radius: 3px;
}

.section-1-1 > [type='file'] {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
        z-index: 10;
        cursor: pointer;
}



.section-1-2 {
        display: inline-block;
        text-align: left;
        background: #fff;
        padding: 16px;
        width: 450px;
        position: relative;
        border-radius: 3px;
}

.avatar {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
        z-index: 10;
        cursor: pointer;
}
.profile-editor {
    display: flex;
    flex-direction: column;
}
.photos {
    display:flex;
    flex-direction: column;
}
</style>
`
class ProfileEditor extends BaseComponent {
    constructor() {
        super();
        this.state = {
            error: {
                userName: '',
                age: '',
                avatar: '',
                cover: '',
                description: '',
                jobTitle: '',
                location: '',
                password: '',
                webReference: '',
                workExperience: '',
            },
            data: {
                userName: '',
                age: '',
                avatar: '',
                cover: '',
                description: '',
                jobTitle: '',
                location: '',
                password: '',
                webReference: '',
                workExperience: '',
            },
            isLoading: true,
        }
    }

    saveProfile(oldProfile, newProfile) {
        let foundData = this.state.data.find(function (data) {
            return data.content == oldProfile;
        });
        foundData.content = newProfile;
    }

    render() {
        this._shadowRoot.innerHTML = /*html*/ `
        ${style}
        <h1>About Yourself</h1>
        <form class="profile-editor">
        <div class="photos">
            <div class="section-1-1">
                <p class="cover-error">${this.state.error.cover}</p>
                <progress value="0" max="100" class="cover-uploader" style="display:none"></progress>
                <form class="upload-cover">
                    <label for="cover">Your cover</label><br>
                    <input type="file" class="cover" name="cover">
                </form>
                <img src="${this.state.data.cover}" alt="cover">
            </div>
            <div class="section-1-2">
                <p class="avatar-error">${this.state.error.avatar}</p>
                <progress value="0" max="100" class="avatar-uploader" style="display:none"></progress>
                <form class="upload-avatar">
                    <label for="avatar">Your avatar</label><br>
                    <input type="file" class="avatar" name="avatar">
                </form>
                <img src="${this.state.data.avatar}" alt="avatar">
            </div>
        </div>
            <div class="edit-form">
            <label for="userName">Your name</label><br>
            <input type="text" class="userName" name="userName" value="${this.state.data.userName}" placeholder="unik@unik.com">
            <p class="userName-error">${this.state.error.userName}</p>

            <label for="password">Your password</label><br>
            <input type="text" class="password" name="password" value="${this.state.data.password}" placeholder="12345">
            <p class="password-error">${this.state.error.password}</p>
            
            <label for="age">Your age</label><br>
            <input type="text" class="age" name="age" value="${this.state.data.age}" placeholder="18">
            <p class="age-error">${this.state.error.age}</p>
            
            <label for="description">Your description</label><br>
            <input type="text" class="description" name="description" value="${this.state.data.description}" placeholder="...">
            <p class="description-error">${this.state.error.description}</p>

            <label for="jobTitle">Your job title</label><br>
            <input type="text" class="jobTitle" name="jobTitle" value="${this.state.data.jobTitle}" placeholder="desginer">
            <p class="jobTitle-error">${this.state.error.jobTitle}</p>

            <label for="location">Your location</label><br>
            <input type="text" class="location" name="location" value="${this.state.data.location}" placeholder="Vietnam">
            <p class="location-error">${this.state.error.location}</p>

            <label for="webReference">Your website</label><br>
            <input type="url" class="webReference" name="webReference" value="${this.state.data.webReference}" placeholder="yourname.com">
            <p class="webReference-error">${this.state.error.webReference}</p>

            <label for="workExperience">Your work experience</label><br>
            <input type="text" class="workExperience" name="workExperience" value="${this.state.data.workExperience}" placeholder="5 years experience">
            <p class="workExperience-error">${this.state.error.workExperience}</p>
            </div>
            <div class="btn">
                <button class='cancel'>Cancel</button>
                <button class='save'>Save</button>
            </div>
            
        </form>
        `;

        let avatarUploader = this._shadowRoot.querySelector('.avatar-uploader');
        let avatarUploadButton = this._shadowRoot.querySelector('.avatar');
        avatarUploadButton.onchange = (e) => {
            let file = e.target.files[0];

            let currentUser = getCurrentUser();

            let storageRef = firebase.storage().ref(`${currentUser.id}/user/avatar/${renderID()}.${file.name.split('.')[1]}`);

            let task = storageRef.put(file);

            let that = this;

            avatarUploader.style = "display:";

            task.on('state_changed',
                function progress(snapshot) {
                    let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    if (percentage == 100) percentage = 0;
                    avatarUploader.value = percentage;
                },
                function error(err) {

                },
                async function complete() {
                    avatarUploader.style = "display:none";
                    let imageLink = await storageRef.getDownloadURL();
                    that.state.data.avatar = imageLink;
                    that.state.error.avatar = '';

                    let userName = that._shadowRoot.querySelector('.userName').value;
                    let password = that._shadowRoot.querySelector('.password').value;
                    let age = that._shadowRoot.querySelector('.age').value;
                    let description = that._shadowRoot.querySelector('.description').value;
                    let jobTitle = that._shadowRoot.querySelector('.jobTitle').value;
                    let location = that._shadowRoot.querySelector('.location').value;
                    let webReference = that._shadowRoot.querySelector('.webReference').value;
                    let workExperience = that._shadowRoot.querySelector('.workExperience').value;

                    that.state.data.userName = userName;
                    that.state.data.password = password;
                    that.state.data.age = age;
                    that.state.data.description = description;
                    that.state.data.jobTitle = jobTitle;
                    that.state.data.location = location;
                    that.state.data.webReference = webReference;
                    that.state.data.workExperience = workExperience;

                    let currentUser = getCurrentUser();
                    currentUser.avatar = imageLink;
                    setCurrentUser(currentUser);

                    let response = await firebase.firestore().collection('user').doc(currentUser.id).get();
                    let avatar = response.data().avatar;
                    avatar = imageLink;

                    await firebase.firestore().collection('user').doc(currentUser.id).update({
                        avatar: avatar
                    });

                    that.setState(that.state);
                }
            );
        };

        let coverUploader = this._shadowRoot.querySelector('.cover-uploader');
        let coverUploadButton = this._shadowRoot.querySelector('.cover');
        coverUploadButton.onchange = (e) => {
            let file = e.target.files[0];

            let currentUser = getCurrentUser();

            let storageRef = firebase.storage().ref(`${currentUser.id}/user/cover/${renderID()}.${file.name.split('.')[1]}`);

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

                    let userName = that._shadowRoot.querySelector('.userName').value;
                    let password = that._shadowRoot.querySelector('.password').value;
                    let age = that._shadowRoot.querySelector('.age').value;
                    let description = that._shadowRoot.querySelector('.description').value;
                    let jobTitle = that._shadowRoot.querySelector('.jobTitle').value;
                    let location = that._shadowRoot.querySelector('.location').value;
                    let webReference = that._shadowRoot.querySelector('.webReference').value;
                    let workExperience = that._shadowRoot.querySelector('.workExperience').value;

                    that.state.data.userName = userName;
                    that.state.data.password = password;
                    that.state.data.age = age;
                    that.state.data.description = description;
                    that.state.data.jobTitle = jobTitle;
                    that.state.data.location = location;
                    that.state.data.webReference = webReference;
                    that.state.data.workExperience = workExperience;

                    let currentUser = getCurrentUser();
                    currentUser.cover = imageLink;
                    setCurrentUser(currentUser);

                    let response = await firebase.firestore().collection('user').doc(currentUser.id).get();
                    let cover = response.data().cover;
                    cover = imageLink;

                    await firebase.firestore().collection('user').doc(currentUser.id).update({
                        cover: cover
                    });

                    that.setState(that.state);
                }
            );
        };


        this.$formProfileEditor = this._shadowRoot.querySelector('.profile-editor');
        this.$formProfileEditor.addEventListener('profile-editor', (event) => {
            this.saveProfile(event.detail.oldProfile, event.detail.newProfile)
        });

        if (this.state.isLoading) {
            let profile = () => {
                let currentUser = getCurrentUser();
                this.state.data = currentUser;
                this.state.isLoading = false;
                this.setState(this.state);
            }
            profile();
        }

        this.$saveBtn = this._shadowRoot.querySelector('.save');
        this.$saveBtn.onclick = async () => {
            let currentUser = getCurrentUser();

            let userName = this._shadowRoot.querySelector('.userName').value;
            let password = this._shadowRoot.querySelector('.password').value;
            let age = this._shadowRoot.querySelector('.age').value;
            let location = this._shadowRoot.querySelector('.location').value;

            let isValid = true;

            if (userName == '') {
                this.state.error.userName = 'Your name is invalid!';
                isValid = false;
            } else {
                this.state.data.userName = userName;
            }

            if (password == '') {
                this.state.error.password = 'Your password is invalid!';
                isValid = false;
            } else {
                this.state.data.password = password;
            }

            if (age == '' || Number(age) <= 0) {
                this.state.error.age = 'Your age is invalid!';
                isValid = false;
            } else {
                this.state.data.age = age;
            }

            if (location == '') {
                this.state.error.location = 'Your location is invalid!';
                isValid = false;
            } else {
                this.state.data.location = location;
            }

            // update len firebase
            if (isValid) {
                // up du lieu len firebase
                await firebase.firestore().collection('user').doc(currentUser.id).update(this.state.data);
                setCurrentUser(this.state.data);
                alert('Update profile successfully!');
            } else {
                alert('Oops... Something is not correct!');
            }
            this.setState(this.state);
        }

        this.$cancelBtn = this._shadowRoot.querySelector('.cancel');
        this.$cancelBtn.onclick = () => {
            router.navigate('/home');
        }
    }
}

window.customElements.define('profile-editor', ProfileEditor);