import { BaseComponent } from "../component/base_component.js";
import { validateEmail, getDataFromDocs, setCurrentUser } from "../utility.js";

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
    .sign-in-form {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 5px;
    }
    .btn {
        width: 271px;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 10px;
    }
    .btn-sign-in {
        background-color: #0000cc;
        cursor: pointer;
    }
    .btn-sign-in:hover {
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
    .password-error {
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
</style>
`;

class SignInForm extends BaseComponent {
    constructor() {
        super();
        this.state = {
            error: {
                email: '',
                password: ''
            },
            data: {
                email: '',
                password: ''
            }
        }
    }

    render() {
        this._shadowRoot.innerHTML = /*html*/ `
            ${style}
            <div class="wrapper">
                <div class="top">
                    <img class="logo" src="../../img/logo/logo.png" alt="logo">
                    <p class="welcome">Welcome back...</p>
                    <p class="sth">Find new ideas to try</p>
                </div>
                <form class="sign-in-form">
                    <!--<label for="email">Email address</label><br>-->
                    <input type="email" class="email" name="email" value="${this.state.data.email}" placeholder="Email">
                    <p class="email-error">${this.state.error.email}</p>
                    <!--<label for="password">Password</label><br>-->
                    <input type="password" class="password" name="password" value="${this.state.data.password}" placeholder="Password">
                    <p class="password-error">${this.state.error.password}</p>
                </form>
                <div class="btn">
                    <button class="btn-sign-in">Sign In</button>
                    <button class="btn-cancel">Cancel</button>
                </div>
                <a href="#!/sign-up">New user? Create an account</a>
            </div>
        `;

        this.$btnCancel = this._shadowRoot.querySelector('.btn-cancel');
        this.$btnCancel.onclick = () => {
            router.navigate('/');
        }

        this.$btnSignUp = this._shadowRoot.querySelector('.btn-sign-in');
        this.$btnSignUp.onclick = async () => {
            // lay du lieu tu cac form
            let email = this._shadowRoot.querySelector('.email').value;
            let password = this._shadowRoot.querySelector('.password').value;

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
                if (response.empty) {
                    this.state.error.email = 'Your email has not been registered!';
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

            // update len local storage
            if (isValid) {
                let response = await firebase
                    .firestore()
                    .collection('user')
                    .where('email', '==', email)
                    .where('password', '==', password)
                    .get();
                if (response.empty) {
                    swal("Oops...", "Email or password is not correct!", "error");
                } else {
                    let currentUser = getDataFromDocs(response.docs)[0];
                    setCurrentUser(currentUser);
                    if (currentUser.newbie) {
                        router.navigate('/choose-first-topic');
                        currentUser.newbie = false;
                        await firebase.firestore().collection('user').doc(currentUser.id).update({
                            newbie: currentUser.newbie
                        });
                    } else {
                        router.navigate('/home');
                    }
                }
            } else {
                swal("Oops...", "Something is not correct!", "error");
            }
            this.setState(this.state);
        }
    }
}

window.customElements.define('sign-in-form', SignInForm);