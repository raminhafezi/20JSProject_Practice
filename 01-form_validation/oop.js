const MIN_PASS_STRONG = 10;
const MIN_PASS_ACCEPTABLE = 6;
const MIN_USERNAME_LENGTH = 7;
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

    if (errorOrSsuccess === "success") {
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
      resObj.result = "error";
      resObj.message = "minimum length is 7 chars";
    } else if (usernameRe.test(String(userNameObj.value))) {
      resObj.result = "success";
      resObj.message = "passed";
    } else {
      resObj.result = "error";
      resObj.message = "not in a valid format";
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
      resObj.result = "success";
      resObj.message = "Email is valid";
    } else {
      resObj.result = "error";
      resObj.message = "Email is not valid";
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
      resObj.result = "success";
      resObj.message = "Password Check passed";
    } else {
      if (mediumPass.test(password.value)) {
        this.cssClassReplace(password, "password-medium");
        this.cssClassReplace(password, "password-weak");
        resObj.result = "error";
        resObj.message = "password length < 10";
      } else {
        resObj.result = "error";
        resObj.message = "password is weak or not in correct foramt";
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
      resObj.result = "success";
      resObj.message = "passwords match";
    } else {
      this.cssClassReplace(password2, "password-weak");
      resObj.result = "error";
      resObj.message = "passwords does not match";
    }
    this
      .updateHints`Passwords check: ${resObj.type} res: ${resObj.result}  msg: ${resObj.message}`;
  };

  //  switch case to call checkers
  onlineErrorChecking = (e) => {
    e.target.id === "username" && e.target.value.trim() !== ""
      ? this.checkUsername(e.target)
      : null;
    e.target.id === "email" && e.target.value.trim() !== ""
      ? this.checkEmailHandler(e.target)
      : null;
    e.target.id === "password" && e.target.value.trim() !== ""
      ? this.passPowerCheck(e.target)
      : null;

    e.target.id === "password2" && e.target.value.trim() !== ""
      ? this.passConfirmationHandler(e.target)
      : null;
  };
}

class Form extends Validator {
  constructor() {
    super();
    this.username = document.getElementById("username");
    this.email = document.getElementById("email");
    this.password = document.getElementById("password");
    this.password2 = document.getElementById("password2");
    this.data = {
      username: this.username.value,
      email: this.email.value,
      password: this.password.value,
      password2: this.password2.value,
    };

    this.password.addEventListener(
      "input",
      Validator.passPowerCheck.bind(this.password)
    );

    this.password2.addEventListener(
      "input",
      Validator.passConfHandler.bind(this.password2)
    );
  }

  static cssClassReplace = (element, newClass) => {
    element.classList = "";
    element.classList.add(newClass);
  };
}

class User extends Form {
  constructor() {
    super();
    console.log(this.data);
  }
  static greeting = () => {
    console.log(
      `Hello Mr/Mrs ${this.data.sername}, I've got your email as ${this.data.email}, please keep your credential ${this.data.password} on a safe place.`
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
