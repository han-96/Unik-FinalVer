import { BaseComponent } from "../component/base_component.js";
import { renderID, validateEmail } from "../utility.js";

const style = /*html*/ `
<style>
    .wrapper {
        background-color: white;
        width: 500px;
        font-family: 'Ubuntu', sans-serif;
        display: flex;
        flex-direction: column;
        align-items: center;
        border-radius: 15px;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    }
    .logo {
        width: 50px;
    }
    .welcome {
        font-size: 40px;
        font-weight: 700;
    }
    .top {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 10px;
    }
    .sign-up-form {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 5px;
    }
    .container {
        position: relative;
    }
    .btn {
        width: 271px;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 10px;
    }
    .btn-sign-up {
        background-color: #0000cc;
        cursor: pointer;
    }
    .btn-sign-up:hover {
        background-color: #3333ff;
    }
    .btn-cancel {
        background-color: black;
        cursor: pointer;
    }
    .btn-cancel:hover {
        background-color: #333333;
    }
    .email-error,
    .password-error,
    .name-error,
    .age-error,
    .location-error {
        color: red;
        font-size: 12px;
    }
    input {
        font-size: 15px;
        width: 250px;
        height: 50px;
        border: 1px solid black;
        border-radius: 20px;
        padding-left: 20px;
        margin: 5px;
    }
    button {
        width: 100%;
        height: 36px;
        color: white;
        border: none;
        border-radius: 18px;
        text-decoration: none;
        font-family: 'Ubuntu', sans-serif;
        font-size: 15px;
        margin-bottom: 5px;
    }
    p {
        margin: 0px;
    }
    a {
        font-size: 12px;
        text-decoration: none;
        margin-bottom: 20px;
    }
    i {
        position: absolute;
        top: 24px;
        left: 240px;
    }
    i:hover {
        cursor: pointer;
    }
</style>
`;

class SignUpForm extends BaseComponent {
    constructor() {
        super();
        this.state = {
            error: {
                email: '',
                password: '',
                userName: '',
                age: '',
                location: ''
            },
            data: {
                age: '',
                avatar: 'https://www.flaticon.com/premium-icon/icons/svg/2550/2550260.svg',
                cover: '',
                description: '',
                email: '',
                follower: [],
                following: [],
                jobTitle: '',
                joinDate: '',
                label: '',
                location: '',
                password: '',
                project: [],
                savedProject: [],
                totalRespect: 0,
                userName: '',
                webReference: [],
                workExperience: '',
                newbie: true
            }
        }
    }

    render() {
        this._shadowRoot.innerHTML = /*html*/ `
            <link rel="stylesheet" href="../../fontawesome-free-5.15.1-web/css/all.css">
            ${style}
            <div class="wrapper">
                <div class="top">
                    <img class="logo" src="../../img/logo/logo.png" alt="logo">
                    <p class="welcome">Welcome to Unik</p>
                    <p class="sth">Find new ideas to try</p>
                </div>
                <form class="sign-up-form">
                    <!--<label for="email">Email address</label><br>-->
                    <input type="email" class="email" name="email" value="${this.state.data.email}" placeholder="Email">
                    <p class="email-error">${this.state.error.email}</p>
                    <!--<label for="password">Password</label><br>-->
                    <div class="container">
                        <input type="password" class="password" name="password" value="${this.state.data.password}" placeholder="Create a password">
                        <i id="eye" class="fas fa-eye"></i>
                    </div>
                    <p class="password-error">${this.state.error.password}</p>
                    <!--<label for="name">Your name</label><br>-->
                    <input type="text" class="name" name="name" value="${this.state.data.userName}" placeholder="Your name">
                    <p class="name-error">${this.state.error.userName}</p>
                    <!--<label for="age">Your age</label><br>-->
                    <input type="text" class="age" name="age" value="${this.state.data.age}" placeholder="Your age">
                    <p class="age-error">${this.state.error.age}</p>
                    <!--<label for="location">Your location</label><br>-->
                    <input type="text" class="location" name="location" value="${this.state.data.location}" placeholder="Your location">
                    <p class="location-error">${this.state.error.location}</p>
                </form>
                <div class="btn">
                    <button class="btn-sign-up">Sign Up</button>
                    <button class="btn-cancel">Cancel</button> 
                </div>
                <a href="#!/sign-in">Already have an account? Sign in</a>
            </div>
        `;

        this.$eye = this._shadowRoot.querySelector('#eye');
        this.$eye.onclick = () => {
            this.$password = this._shadowRoot.querySelector('.password');
            if (this.$password.type == 'password') this.$password.type = 'text';
            else this.$password.type = 'password';
        }

        this.$btnCancel = this._shadowRoot.querySelector('.btn-cancel');
        this.$btnCancel.onclick = () => {
            router.navigate('/');
        }

        this.$btnSignUp = this._shadowRoot.querySelector('.btn-sign-up');
        this.$btnSignUp.onclick = async () => {
            // lay du lieu tu cac form
            let email = this._shadowRoot.querySelector('.email').value;
            let password = this._shadowRoot.querySelector('.password').value;
            let name = this._shadowRoot.querySelector('.name').value;
            let age = this._shadowRoot.querySelector('.age').value;
            let location = this._shadowRoot.querySelector('.location').value;

            // kiem tra du lieu duoc nhap vao
            let isValid = true;

            if (email == '' || !validateEmail(email)) {
                this.state.error.email = 'Your email is invalid!';
                isValid = false;
            } else {
                let response = await firebase
                    .firestore()
                    .collection('user')
                    .where('email', '==', email)
                    .get();
                if (!response.empty) {
                    this.state.error.email = 'Your email has already been used!';
                    isValid = false;
                } else {
                    this.state.data.email = email;
                }
            }

            if (password == '') {
                this.state.error.password = 'Your password is invalid!';
                isValid = false;
            } else {
                this.state.data.password = password;
            }

            if (name == '') {
                this.state.error.userName = 'Your name is invalid!';
                isValid = false;
            } else {
                this.state.data.userName = name;
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
                // set ID va joinDate
                this.state.data.joinDate = new Date().toLocaleString();
                this.state.data.ID = renderID();
                // up du lieu len firebase
                await firebase.firestore().collection('user').add(this.state.data);
                swal("Done", "Sign up successfully!", "success");
            } else {
                swal("Oops...", "Something is not correct!", "error");
            }
            this.setState(this.state);
        }
    }
}

window.customElements.define('sign-up-form', SignUpForm);