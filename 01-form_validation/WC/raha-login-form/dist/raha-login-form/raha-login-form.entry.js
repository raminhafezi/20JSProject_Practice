import { r as registerInstance, e as createEvent, h } from './index-56226c7b.js';

const FORM_TITLE = 'Register With Us';
const MIN_USERNAME_LENGTH = 5;
const MIN_PASS_STRONG = 10;
const MIN_PASS_ACCEPTABLE = 6;
const CHECK_EMAIL_RE = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const STRONG_PASS = new RegExp(`^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{${MIN_PASS_STRONG},})`);
const MEDIUM_PASS = new RegExp(`^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{${MIN_PASS_ACCEPTABLE},})`);
const USERNAME = /^[a-zA-Z][a-zA-Z0-9]+$/;
const MSG = {
    PASSWORD_CHECK_ERROR_MSG: 'use more than 10 chars include !@#$%^&*',
    PASSWORD_CHECK_SUCCESS_MSG: 'password check passed',
    PASSWORD_LENGTH_ERROR_MSG: 'password length < 10',
    USERNAME_MIN_LENGTH_MSG: `minimum length is ${MIN_USERNAME_LENGTH} chars`,
    PASSWORD_MATCH_ERROR_MSG: 'passwords does not match',
    PASSWORD_MATCH_SUCCESS_MSG: 'passwords match',
    EMAIL_CHECK_ERROR_MSG: 'Email is not valid',
    EMAIL_CHECK_PASS_MSG: 'Email check passed',
    USERNAME_CHECK_ERROR_MSG: 'not in a valid format',
    USERNAME_CHECK_PASS_MSG: 'username check passed',
};

const rahaLoginFormCss = "@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300&display=swap');*{box-sizing:border-box}:host{--success-color:hsla(145, 63%, 49%, 1);--small-success-color:rgb(39, 116, 71);--medium-color:hsla(145, 63%, 49%, 0.3);--error-color:hsla(6, 78%, 57%, 1);--submit-button-bg-color:#3498db;--submit-button-bg-color-disabled:rgba(255, 0, 0, 0.322);--submit-button-border-color:#0f5b8d;--submit-button-text-color:#eaf0f3;--form-control-label-color:rgba(36, 35, 35, 0.6);--form-control-hint-color:rgba(221, 213, 213, 0.6);--form-control-input-focus-border-color:#777;--container-bg-color:rgba(239, 240, 230, 0.692);--container-box-shadow-color:rgba(0, 0, 0, 0.3);--body-bg-color:#f9fafb}body{background-color:var(--body-bg-color, white);font-family:'open sans', 'sans-serif';display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0}.container{background-color:var(--container-bg-color, whiesmoky);border-radius:5px;box-shadow:0 2px 10px var(--container-box-shadow-color);width:400px}h2{text-align:center;margin:0 0 20px}.form{padding:25px 55px}.form-control{margin-bottom:10px;padding-bottom:20px;position:relative}.form-control label{color:var(--form-control-label-color, black);display:block;margin-bottom:5px}.form-control input{border:2px solid #f0f0f0;border-radius:4px;display:block;width:100%;padding:10px;font-size:14px}.form-control input:focus{outline:0;border-color:var(--form-control-input-focus-border-color, lightgray)}.form-control.success input{border-color:var(--success-color)}.form-control.error input{border-color:var(--error-color)}.form-control small{position:absolute;color:var(--form-control-hint-color, lightgray);bottom:0;left:0}.form-control.error small{color:var(--error-color);text-transform:capitalize}.form-control.success,.form-control.success small{color:var(--small-success-color) !important}.password-strong{border-color:var(--success-color) !important}.password-medium{border-color:var(--medium-color) !important}.password-weak{border-color:var(--error-color) !important}.form button{cursor:pointer;background-color:var(--submit-button-bg-color, #3498db);border:2px solid var(--submit-button-border-color, #3498db);border-radius:4px;color:var(--submit-button-text-color, #fff);display:block;font-size:16px;padding:10px;margin-top:20px;width:100%}.form button[disabled]{background-color:var(--submit-button-bg-color-disabled, grey);border-color:lightslategrey;cursor:not-allowed;color:black}";

const MyComponent = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.rahaLoginEvent = createEvent(this, "rahaLoginEvent", 7);
        this.formTitle = FORM_TITLE;
        this.userNameValue = null;
        this.usernameIsValid = false;
        this.usernameRe = USERNAME;
        this.minUsernameLength = MIN_USERNAME_LENGTH;
        this.emailValue = null;
        this.checkEmailRe = CHECK_EMAIL_RE;
        this.emailIsValid = false;
        this.passwordValue = null;
        this.password2Value = null;
        this.mediumPassRe = MEDIUM_PASS;
        this.strongPassRe = STRONG_PASS;
        this.passwordIsValid = false;
        this.minPassLength = MIN_PASS_ACCEPTABLE;
        this.strongPassLegth = MIN_PASS_STRONG;
        this.passwordsMatch = false;
        this.strongPass = false;
        this.mediumPass = false;
    }
    usernameValidationHandler() {
        this.userNameValue = this.username.value;
    }
    emailValidationHandler() {
        this.emailValue = this.email.value.trim().toLowerCase();
    }
    passwordValidatorHandler() {
        this.passwordValue = this.password.value;
    }
    passwordsMatchHandler() {
        this.password2Value = this.password2.value;
    }
    onUsernameValueChanges() {
        let classList = null;
        let msg = null;
        if (this.userNameValue === '' || +this.userNameValue.length < MIN_USERNAME_LENGTH) {
            classList = { success: false, error: true };
            this.usernameIsValid = false;
            msg = MSG['USERNAME_MIN_LENGTH_MSG'];
        }
        else if (this.usernameRe.test(String(this.userNameValue))) {
            classList = { success: true, error: false };
            this.usernameIsValid = true;
            msg = MSG['USERNAME_CHECK_PASS_MSG'];
        }
        else {
            this.usernameIsValid = false;
            classList = { success: false, error: true };
            msg = MSG['USERNAME_CHECK_ERROR_MSG'];
        }
        this.toggleCssClassAndHint(this.username, classList, msg);
    }
    // check Email with imported RE and change CSS Style and hint accordingly
    emailValidation() {
        let classList = null;
        if (this.checkEmailRe.test(this.emailValue)) {
            this.emailIsValid = true;
            classList = { success: true, error: false };
            this.toggleCssClassAndHint(this.email, classList, MSG['EMAIL_CHECK_PASS_MSG']);
        }
        else {
            this.emailIsValid = false;
            classList = { error: true, success: false };
            this.toggleCssClassAndHint(this.email, classList, MSG['EMAIL_CHECK_ERROR_MSG']);
        }
    }
    passPowHandler() {
        let classList, msg = null;
        if (this.strongPassRe.test(this.passwordValue.trim())) {
            classList = { 'success': true, 'error': false, 'password-strong': true, 'password-medium': false };
            this.strongPass = true;
            this.passwordIsValid = true;
            msg = MSG['PASSWORD_CHECK_SUCCESS_MSG'];
        }
        else {
            if (this.mediumPassRe.test(this.passwordValue.trim())) {
                classList = { 'error': true, 'success': false, 'password-strong': false, 'password-medium': true };
                this.mediumPass = true;
                this.strongPass = false;
                this.passwordIsValid = false;
                msg = MSG['PASSWORD_LENGTH_ERROR_MSG'];
            }
            else {
                this.mediumPass = this.strongPass = false;
                classList = { 'success': false, 'error': true, 'passowrd-strong': false, 'passord-medium': false };
                this.passwordIsValid = false;
                msg = MSG['PASSWORD_CHECK_ERROR_MSG'];
            }
        }
        this.toggleCssClassAndHint(this.password, classList, msg);
        this.passConfirmationHandler();
    }
    passConfirmationHandler() {
        let classList, msg = null;
        if (this.passwordValue === this.password2Value) {
            classList = { success: true, error: false };
            msg = MSG['PASSWORD_MATCH_SUCCESS_MSG'];
            this.passwordsMatch = true;
        }
        else {
            classList = { success: false, error: true };
            msg = MSG['PASSWORD_MATCH_ERROR_MSG'];
            this.passwordsMatch = false;
        }
        this.toggleCssClassAndHint(this.password2, classList, msg);
    }
    toggleCssClassAndHint(element, classList, hintUpdate) {
        for (let className in classList) {
            classList[className] ? element.parentElement.classList.add(className) : element.parentElement.classList.remove(className);
        }
        element.nextElementSibling.textContent = hintUpdate;
        this.submitform();
    }
    submitform() {
        if (this.usernameIsValid && this.emailIsValid && this.passwordIsValid && this.passwordsMatch) {
            this.submitBtn.removeAttribute('disabled');
        }
        else {
            this.submitBtn.setAttribute('disabled', '');
        }
    }
    formSublit(event) {
        event.preventDefault();
        let loginObject = { username: this.userNameValue, email: this.emailValue, password: this.passwordValue };
        // console.log('Clicked!!!!');
        this.rahaLoginEvent.emit(loginObject);
    }
    render() {
        return [
            h("div", { class: "container" }, h("form", { id: "form", class: "form", onSubmit: this.formSublit.bind(this) }, h("h2", null, this.formTitle), h("div", { class: "form-control" }, h("label", { id: "username" }, "Username"), h("input", { id: "username", type: "text", class: "username", placeholder: "Enter Username", ref: el => (this.username = el), onInput: this.usernameValidationHandler.bind(this) }), h("small", null, "hint")), h("div", { class: "form-control" }, h("label", { id: "Email" }, "Email"), h("input", { id: "email", type: "text", class: { email: true }, placeholder: "Enter Email", ref: el => (this.email = el), onInput: this.emailValidationHandler.bind(this) }), h("small", null, "hint")), h("div", { class: "form-control" }, h("label", { id: "password" }, "Password"), h("input", { id: "password", type: "password", class: { password: true }, placeholder: "Enter Password", ref: el => {
                    this.password = el;
                }, onInput: this.passwordValidatorHandler.bind(this) }), h("small", null, "hint")), h("div", { class: "form-control" }, h("label", { id: "password2" }, "Confirm Password"), h("input", { id: "password2", type: "password", class: "password2", placeholder: "Enter password again", ref: el => {
                    this.password2 = el;
                }, onInput: this.passwordsMatchHandler.bind(this) }), h("small", null, "hint")), h("button", { ref: el => (this.submitBtn = el), disabled: true }, "Submit"))),
        ];
    }
    static get watchers() { return {
        "userNameValue": ["onUsernameValueChanges"],
        "emailValue": ["emailValidation"],
        "passwordValue": ["passPowHandler"],
        "password2Value": ["passConfirmationHandler"]
    }; }
};
MyComponent.style = rahaLoginFormCss;

export { MyComponent as raha_login_form };
