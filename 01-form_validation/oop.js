const MIN_PASS_STRONG = 10;
const MIN_PASS_ACCEPTABLE = 6;
const MIN_USERNAME_LENGTH = 7;

const SUCCESS = "success";
const ERROR = "error";

const PASSWORD_CHECK_ERROR_MSG = "use more than 10 chars include !@#$%^&*";
const PASSWORD_CHECK_SUCCESS_MSG = "password check passed";
const PASSWORD_LENGTH_ERROR_MSG = "password length < 10";
const USERNAME_MIN_LENGTH_MSG = `minimum length is ${MIN_USERNAME_LENGTH} chars`;
const PASSWORD_MATCH_ERROR_MSG = "passwords does not match";
const PASSWORD_MATCH_SUCCESS_MSG = "passwords match";
const EMAIL_CHECK_ERROR_MSG = "Email is not valid";
const EMAIL_CHECK_PASS_MSG = "Email check passed";
const USERNAME_CHECK_ERROR_MSG = "not in a valid format";
const USERNAME_CHECK_PASS_MSG = "username check passed";

const HTML_ELEMENT_ID = ["username", "email", "password", "password2"];
const usernameRe = /^[a-zA-Z][a-zA-Z0-9]+$/;
const checkEmailRe = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const strongPass = new RegExp(
  `^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{${MIN_PASS_STRONG},})`
);
const mediumPass = new RegExp(
  `^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{${MIN_PASS_ACCEPTABLE},})`
);

class Validator {
  // update hint fields under each input elements
  updateHints = (_, input, errorOrSsuccess, message) => {
    const parent = input.parentElement;
    const small = input.nextElementSibling;

    if (errorOrSsuccess === SUCCESS) {
      parent.className = "form-control success";
      small.innerText = message;
      return;
    }
    parent.className = "form-control error";
    small.innerText = message;
  };
  // username must be above 6 chars and not empty
  checkUsername = (userNameObj) => {
    const uName = userNameObj.value.trim();
    let resObj = {
      type: userNameObj,
      result: "",
      message: "",
    };
    if (uName === "" || uName.length < MIN_USERNAME_LENGTH) {
      resObj.result = ERROR;
      resObj.message = USERNAME_MIN_LENGTH_MSG;
    } else if (usernameRe.test(String(userNameObj.value))) {
      resObj.result = SUCCESS;
      resObj.message = USERNAME_CHECK_PASS_MSG;
    } else {
      resObj.result = ERROR;
      resObj.message = USERNAME_CHECK_ERROR_MSG;
    }
    this
      .updateHints`Username : ${resObj.type} res: ${resObj.result} msg: ${resObj.message}`;
  };
  // check email format based on RE
  checkEmailHandler = (input) => {
    let resObj = {
      type: input,
      result: "",
      message: "",
    };
    if (checkEmailRe.test(String(input.value.trim()).toLowerCase())) {
      resObj.result = SUCCESS;
      resObj.message = EMAIL_CHECK_PASS_MSG;
    } else {
      resObj.result = ERROR;
      resObj.message = EMAIL_CHECK_ERROR_MSG;
    }
    this
      .updateHints`Email-check: ${resObj.type} res: ${resObj.result} msg: ${resObj.message}`;
  };

  // chane CSS color and show error hints
  cssClassReplace = (element, newClass) => {
    element.classList = "";
    element.classList.add(newClass);
  };

  // check password length, and strength based on defined REs
  passPowerCheck = () => {
    let resObj = {
      type: password,
      result: "",
      message: "",
    };

    if (strongPass.test(password.value)) {
      this.cssClassReplace(password, "password-strong");
      resObj.result = SUCCESS;
      resObj.message = PASSWORD_CHECK_SUCCESS_MSG;
    } else {
      if (mediumPass.test(password.value)) {
        this.cssClassReplace(password, "password-medium");
        this.cssClassReplace(password, "password-weak");
        resObj.result = ERROR;
        resObj.message = PASSWORD_LENGTH_ERROR_MSG;
      } else {
        resObj.result = ERROR;
        resObj.message = PASSWORD_CHECK_ERROR_MSG;
      }
    }
    this
      .updateHints`Password validation: ${resObj.type} res: ${resObj.result}  msg : ${resObj.message}`;
  };

  // check if confirmation pass-phrase passed
  passConfirmationHandler = () => {
    let resObj = {
      type: password2,
      result: "",
      message: "",
    };

    if (password2.value === password.value) {
      this.cssClassReplace(password2, "password-strong");
      resObj.result = SUCCESS;
      resObj.message = PASSWORD_MATCH_SUCCESS_MSG;
    } else {
      this.cssClassReplace(password2, "password-weak");
      resObj.result = ERROR;
      resObj.message = PASSWORD_MATCH_ERROR_MSG;
    }
    this
      .updateHints`Passwords check: ${resObj.type} res: ${resObj.result}  msg: ${resObj.message}`;
  };

  //  switch case to call checkers
  onlineErrorChecking = (e) => {
    e.target.id === "username" //&& e.target.value.trim() !== ""
      ? this.checkUsername(e.target)
      : null;
    e.target.id === "email" //&& e.target.value.trim() !== ""
      ? this.checkEmailHandler(e.target)
      : null;
    e.target.id === "password" //&& e.target.value.trim() !== ""
      ? this.passPowerCheck(e.target)
      : null;

    e.target.id === "password2" //&& e.target.value.trim() !== ""
      ? this.passConfirmationHandler(e.target)
      : null;
  };
}

class User {
  constructor() {
    console.log(this.data);
  }
  static greeting = () => {
    console.log(
      `Hello Mr/Mrs ${this.data.sername}, I've got your email as ${this.data.email}, please keep your credential ${this.data.password} in a safe place.`
    );
  };
}

class App extends Validator {
  constructor() {
    super();
    this.form = document.getElementById("form");
    this.form.oninput = (e) => {
      this.onlineErrorChecking(e);
    };
    this.form.addEventListener("submit", this.submitHandler.bind(this));
  }
  submitHandler = (e) => {
    e.preventDefault();
    new User();
  };
}
new App();
