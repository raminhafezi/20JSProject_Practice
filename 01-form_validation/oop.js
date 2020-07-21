const MIN_PASS_STRONG = 10;
const MIN_PASS_ACCEPTABLE = 6;
const MIN_USERNAME_LENGTH = 7;
const HTML_ELEMENT_ID = ["username", "email", "password", "password2"];
const checkEmailRe = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const strongPass = new RegExp(
  `^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{${MIN_PASS_STRONG},})`
);
const mediumPass = new RegExp(
  `^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{${MIN_PASS_ACCEPTABLE},})`
);

class Validator {
  showResult = (_, input, errorOrSsuccess, message) => {
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

  checkUsername = (userNameObj) => {
    let resObj = {
      type: userNameObj,
      result: "",
      message: "",
    };
    if (userNameObj.value.trim() === "") {
      resObj.result = "error";
      resObj.message = `${input.id} is required`;
    } else if (userNameObj.value.trim().length < MIN_USERNAME_LENGTH) {
      resObj.result = "error";
      resObj.message = "minimum length is 7 characters";
    } else {
      resObj.result = "success";
      resObj.message = "passed";
    }
    this
      .showResult`Username : ${resObj.type} res: ${resObj.result} msg: ${resObj.message}`;
  };

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
      .showResult`Email-check: ${resObj.type} res: ${resObj.result} msg: ${resObj.message}`;
  };

  cssClassReplace = (element, newClass) => {
    element.classList = "";
    element.classList.add(newClass);
  };
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
      .showResult`Password validation: ${resObj.type} res: ${resObj.result}  msg : ${resObj.message}`;
  };

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
      .showResult`Passwords check: ${resObj.type} res: ${resObj.result}  msg: ${resObj.message}`;
  };

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

    let elementId = HTML_ELEMENT_ID.indexOf(e.target.id);
    elementId < 0 ? null : {};
    const typedValue = e.target.value;
    let textArea = e.target.nextSibling.nodeValue;
    // console.warn(e.target.id);
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
      `Hellow Mr/Mrs ${this.data.sername}, I've got your email as ${this.data.email}, please keep your credential ${this.data.password} on a safe place.`
    );
  };
}

class App extends Validator {
  constructor() {
    super();
    this.form = document.getElementById("form");
    this.form.oninput = (e) => {
      //   console.log((e.target.nextSibling.nodeValue ));
      this.onlineErrorChecking(e);
    };
    this.form.addEventListener("submit", this.submitHandler.bind(this));
  }
  submitHandler = (e) => {
    e.preventDefault();
    console.log(e);
    new User();
  };
}
new App();
