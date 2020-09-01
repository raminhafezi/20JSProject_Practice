import { Component, h, State, Prop, Watch, EventEmitter, Event } from '@stencil/core';
import { FORM_TITLE, MIN_USERNAME_LENGTH, USERNAME, MIN_PASS_STRONG, MIN_PASS_ACCEPTABLE, CHECK_EMAIL_RE, STRONG_PASS, MEDIUM_PASS, MSG } from '../../global/global';

@Component({
  tag: 'raha-login-form',
  styleUrl: 'raha-login-form.css',
  shadow: true,
})
export class MyComponent {
  @Prop({ reflectToAttr: true, mutable: true }) formTitle: String = FORM_TITLE;

  username: HTMLInputElement;
  @Prop() userNameValue: string = null;
  @State() usernameIsValid: boolean = false;
  @State() usernameRe: RegExp = USERNAME;
  @Prop() minUsernameLength: number = MIN_USERNAME_LENGTH;

  email: HTMLInputElement;
  @Prop() emailValue: string = null;
  @State() checkEmailRe: RegExp = CHECK_EMAIL_RE;
  @Prop({ reflectToAttr: true, mutable: true }) emailIsValid: boolean = false;

  password: HTMLInputElement;
  password2: HTMLInputElement;
  @Prop() passwordValue: string = null;
  @Prop() password2Value: string = null;
  @State() mediumPassRe: RegExp = MEDIUM_PASS;
  @State() strongPassRe: RegExp = STRONG_PASS;
  @State() passwordIsValid: boolean = false;
  @Prop() minPassLength: number = MIN_PASS_ACCEPTABLE;
  @Prop() strongPassLegth: number = MIN_PASS_STRONG;
  @Prop({ reflectToAttr: true, mutable: true }) passwordsMatch: boolean = false;
  @Prop({ reflectToAttr: true, mutable: true }) strongPass: boolean = false;
  @Prop({ reflectToAttr: true, mutable: true }) mediumPass: boolean = false;

  @Prop({ reflectToAttr: true, mutable: true }) submitBtn: HTMLElement;

  @Event({ bubbles: true, composed: true }) rahaLoginEvent: EventEmitter;

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

  @Watch('userNameValue')
  onUsernameValueChanges() {
    let classList = null;
    let msg = null;
    if (this.userNameValue === '' || +this.userNameValue.length < MIN_USERNAME_LENGTH) {
      classList = { success: false, error: true };
      this.usernameIsValid = false;
      msg = MSG['USERNAME_MIN_LENGTH_MSG'];
    } else if (this.usernameRe.test(String(this.userNameValue))) {
      classList = { success: true, error: false };
      this.usernameIsValid = true;
      msg = MSG['USERNAME_CHECK_PASS_MSG'];
    } else {
      this.usernameIsValid = false;
      classList = { success: false, error: true };
      msg = MSG['USERNAME_CHECK_ERROR_MSG'];
    }
    this.toggleCssClassAndHint(this.username, classList, msg);
  }

  // check Email with imported RE and change CSS Style and hint accordingly
  @Watch('emailValue')
  emailValidation() {
    let classList = null;
    if (this.checkEmailRe.test(this.emailValue)) {
      this.emailIsValid = true;
      classList = { success: true, error: false };
      this.toggleCssClassAndHint(this.email, classList, MSG['EMAIL_CHECK_PASS_MSG']);
    } else {
      this.emailIsValid = false;
      classList = { error: true, success: false };
      this.toggleCssClassAndHint(this.email, classList, MSG['EMAIL_CHECK_ERROR_MSG']);
    }
  }

  @Watch('passwordValue')
  passPowHandler() {
    let classList,
      msg = null;

    if (this.strongPassRe.test(this.passwordValue.trim())) {
      classList = { 'success': true, 'error': false, 'password-strong': true, 'password-medium': false };
      this.strongPass = true;
      this.passwordIsValid = true;
      msg = MSG['PASSWORD_CHECK_SUCCESS_MSG'];
    } else {
      if (this.mediumPassRe.test(this.passwordValue.trim())) {
        classList = { 'error': true, 'success': false, 'password-strong': false, 'password-medium': true };
        this.mediumPass = true;
        this.strongPass = false;
        this.passwordIsValid = false;
        msg = MSG['PASSWORD_LENGTH_ERROR_MSG'];
      } else {
        this.mediumPass = this.strongPass = false;
        classList = { 'success': false, 'error': true, 'passowrd-strong': false, 'passord-medium': false };
        this.passwordIsValid = false;
        msg = MSG['PASSWORD_CHECK_ERROR_MSG'];
      }
    }
    this.toggleCssClassAndHint(this.password, classList, msg);
    this.passConfirmationHandler();
  }

  @Watch('password2Value')
  passConfirmationHandler() {
    let classList,
      msg = null;

    if (this.passwordValue === this.password2Value) {
      classList = { success: true, error: false };
      msg = MSG['PASSWORD_MATCH_SUCCESS_MSG'];
      this.passwordsMatch = true;
    } else {
      classList = { success: false, error: true };
      msg = MSG['PASSWORD_MATCH_ERROR_MSG'];
      this.passwordsMatch = false;
    }
    this.toggleCssClassAndHint(this.password2, classList, msg);
  }

  toggleCssClassAndHint(element: HTMLInputElement, classList: Object, hintUpdate: string) {
    for (let className in classList) {
      classList[className] ? element.parentElement.classList.add(className) : element.parentElement.classList.remove(className);
    }

    element.nextElementSibling.textContent = hintUpdate;
    this.submitform();
  }

  submitform() {
    if (this.usernameIsValid && this.emailIsValid && this.passwordIsValid && this.passwordsMatch) {
      this.submitBtn.removeAttribute('disabled');
    } else {
      this.submitBtn.setAttribute('disabled', '');
    }
  }

  formSubmit(event: Event) {
    event.preventDefault();
    let loginObject = { username: this.userNameValue, email: this.emailValue, password: this.passwordValue };
    // console.log('Clicked!!!!');
    this.rahaLoginEvent.emit(loginObject);
  }

  render() {
    return [
      <div class="container">
        <form id="form" class="form" onSubmit={this.formSubmit.bind(this)}>
          <h2>{this.formTitle}</h2>
          <div class="form-control">
            <label id="username">Username</label>
            <input id="username" type="text" class="username" placeholder="Enter Username" ref={el => (this.username = el)} onInput={this.usernameValidationHandler.bind(this)} />
            <small>hint</small>
          </div>
          <div class="form-control">
            <label id="Email">Email</label>
            <input id="email" type="text" class={{ email: true }} placeholder="Enter Email" ref={el => (this.email = el)} onInput={this.emailValidationHandler.bind(this)} />
            <small>hint</small>
          </div>
          <div class="form-control">
            <label id="password">Password</label>
            <input
              id="password"
              type="password"
              class={{ password: true }}
              placeholder="Enter Password"
              ref={el => {
                this.password = el;
              }}
              onInput={this.passwordValidatorHandler.bind(this)}
            />
            <small>hint</small>
          </div>
          <div class="form-control">
            <label id="password2">Confirm Password</label>
            <input
              id="password2"
              type="password"
              class="password2"
              placeholder="Enter password again"
              ref={el => {
                this.password2 = el;
              }}
              onInput={this.passwordsMatchHandler.bind(this)}
            />
            <small>hint</small>
          </div>
          <button ref={el => (this.submitBtn = el)} disabled>
            Submit
          </button>
        </form>
      </div>,
    ];
  }
}
