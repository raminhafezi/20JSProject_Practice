import { Component, h, State, Prop } from '@stencil/core';
import { MIN_USERNAME_LENGTH, USERNAME, MIN_PASS_STRONG, MIN_PASS_ACCEPTABLE, CHECK_EMAIL_RE, STRONG_PASS, MEDIUM_PASS, MSG } from '../../global/global';

@Component({
  tag: 'raha-login-form',
  styleUrl: 'raha-login-form.css',
  shadow: true,
})
export class MyComponent {
  @Prop({ reflectToAttr: true, mutable: true }) formTitle: String = 'Register with Us';
  @State()
  usernameRe: RegExp = USERNAME;
  @State() usernameIsValid: boolean = false;
  @Prop({ reflectToAttr: true, mutable: true }) minUsernameLength: number = MIN_USERNAME_LENGTH;
  username: HTMLInputElement;

  @State() checkEmailRe: RegExp = CHECK_EMAIL_RE;
  @Prop({ reflectToAttr: true, mutable: true }) emailIsValid: boolean = false;
  email: HTMLInputElement;

  @State() mediumPassRe: RegExp = MEDIUM_PASS;
  @State() passwordIsValid: boolean = false;
  @Prop({ reflectToAttr: true, mutable: true }) passwordsMatch: boolean = false;
  @Prop({ reflectToAttr: true, mutable: true }) strongPass: boolean = false;
  @State() strongPassRe: RegExp = STRONG_PASS;
  @Prop({ reflectToAttr: true, mutable: true }) mediumPass: boolean = false;
  @Prop() minPassLength: number = MIN_PASS_ACCEPTABLE;
  @Prop() strongPassLegth: number = MIN_PASS_STRONG;
  password: HTMLInputElement;
  password2: HTMLInputElement;
  @Prop({ reflectToAttr: true, mutable: true }) submitBtn: HTMLElement;

  usernameLengthCheck() {
    let classList = null;
    let msg = null;
    if (this.username.value === '' || +this.username.value.length < MIN_USERNAME_LENGTH) {
      classList = { success: false, error: true };
      this.usernameIsValid = false;
      msg = MSG['USERNAME_MIN_LENGTH_MSG'];
    } else if (this.usernameRe.test(String(this.username.value))) {
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
  emailValidation() {
    let classList = null;
    if (this.checkEmailRe.test(this.email.value.trim().toLocaleLowerCase())) {
      this.emailIsValid = true;
      classList = { success: true, error: false };
      this.toggleCssClassAndHint(this.email, classList, MSG['EMAIL_CHECK_PASS_MSG']);
    } else {
      this.emailIsValid = false;
      classList = { error: true, success: false };
      this.toggleCssClassAndHint(this.email, classList, MSG['EMAIL_CHECK_ERROR_MSG']);
    }
  }

  passPowHandler() {
    let classList,
      msg = null;

    if (this.strongPassRe.test(this.password.value.trim())) {
      classList = { 'success': true, 'error': false, 'password-strong': true, 'password-medium': false };
      this.strongPass = true;
      this.passwordIsValid = true;
      msg = MSG['PASSWORD_CHECK_SUCCESS_MSG'];
    } else {
      if (this.mediumPassRe.test(this.password.value.trim())) {
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
  }

  passConfirmationHandler() {
    let classList,
      msg = null;

    if (this.password.value === this.password2.value) {
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
    // event.preventDefault();
    // console.log('mouse enter button area');
    if (this.usernameIsValid && this.emailIsValid && this.passwordIsValid && this.passwordsMatch) {
      console.log('remove disabled');
      this.submitBtn.removeAttribute('disabled');
    } else {
      console.log('add disbaled');
      this.submitBtn.setAttribute('disabled', '');
    }
  }

  formSublit(event: Event) {
    event.preventDefault();
  }

  render() {
    return [
      <div class="container">
        <form id="form" class="form" onSubmit={this.formSublit.bind(this)}>
          <h2>{this.formTitle}</h2>
          <div class="form-control">
            <label id="username">Username</label>
            <input id="username" type="text" class="username" placeholder="Enter Username" ref={el => (this.username = el)} onInput={this.usernameLengthCheck.bind(this)} />
            <small>hint</small>
          </div>
          <div class="form-control">
            <label id="Email">Email</label>
            <input id="email" type="text" class={{ email: true }} placeholder="Enter Email" ref={el => (this.email = el)} onInput={this.emailValidation.bind(this)} />
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
              onInput={this.passPowHandler.bind(this)}
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
              onInput={this.passConfirmationHandler.bind(this)}
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
