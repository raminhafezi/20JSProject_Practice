const MIN_PASS_STRONG = 10;
const MIN_PASS_ACCEPTABLE = 6;
const MIN_USERNAME_LENGTH = 7;

const SUCCESS = "success";
const ERROR = "error";

const PASSWORD_CHECK_ERROR_MSG = "password is weak or not in correct foramt";
const PASSWORD_CHECK_SUCCESS_MSG = "password check passed";
const PASSWORD_LENGTH_ERROR_MSG = "password length < 10";
const USERNAME_MIN_LENGTH_MSG = `minimum length is ${MIN_USERNAME_LENGTH} chars`;
const PASSWORD_MATCH_ERROR_MSG = "passwords does not match";
const PASSWORD_MATCH_SUCCESS_MSG = "passwords match";
const EMAIL_CHECK_ERROR_MSG = "Email is not valid";
const EMAIL_CHECK_PASS_MSG = "Email check passed";
const USERNAME_CHECK_ERROR_MSG = "not in a valid format";
const USERNAME_CHECK_PASS_MSG = "not in a valid format";

const HTML_ELEMENT_ID = ["username", "email", "password", "password2"];
const usernameRe = /^[a-zA-Z][a-zA-Z0-9]+$/;
const checkEmailRe = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const strongPass = new RegExp(
  `^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{${MIN_PASS_STRONG},})`
);
const mediumPass = new RegExp(
  `^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{${MIN_PASS_ACCEPTABLE},})`
);

// update hint fields under each input elements
const updateHints = (hint) => {
  const parent = hint.input.parentElement;
  const small = hint.input.nextElementSiblinghint;

  if (hint.errorOrSsuccess === SUCCESS) {
    parent.className = "form-control success";
    small.innerText = hint.message;
    return;
  } else {
    parent.className = "form-control error";
    small.innerText = hint.message;
  }
};

// username must be above 6 chars and not empty
const checkUsername = (userNameObj) => {
  const uName = userNameObj.value.trim();
  let hintObj = {
    type: userNameObj,
    result: "",
    message: "",
  };
  if (uName === "" || uName.length < MIN_USERNAME_LENGTH) {
    hintObj.result = ERROR;
    hintObj.message = USERNAME_MIN_LENGTH_MSG;
  } else if (usernameRe.test(String(userNameObj.value))) {
    hintObj.result = SUCCESS;
    hintObj.message = USERNAME_CHECK_PASS_MSG;
  } else {
    hintObj.result = ERROR;
    hintObj.message = USERNAME_CHECK_ERROR_MSG;
  }
  updateHints(hintObj);
};

// check email format based on RE
const checkEmailHandler = (email) => {
  let hintObj = {
    type: email,
    result: "",
    message: "",
  };
  if (checkEmailRe.test(String(email.value.trim()).toLowerCase())) {
    hintObj.result = SUCCESS;
    hintObj.message = EMAIL_CHECK_PASS_MSG;
  } else {
    hintObj.result = ERROR;
    hintObj.message = EMAIL_CHECK_ERROR_MSG;
  }
  updateHints(hintObj);
};

// chane CSS color and show error hints
const cssClassReplace = (element, newClass) => {
  element.classList = "";
  element.classList.add(newClass);
};

// check password length, and strength based on defined REs
const passPowerCheck = () => {
  let hintObj = {
    type: password,
    result: "",
    message: "",
  };

  if (strongPass.test(password.value)) {
    cssClassReplace(password, "password-strong");
    hintObj.result = SUCCESS;
    hintObj.message = PASSWORD_CHECK_SUCCESS_MSG;
  } else {
    if (mediumPass.test(password.value)) {
      cssClassReplace(password, "password-medium");
      cssClassReplace(password, "password-weak");
      hintObj.result = ERROR;
      hintObj.message = PASSWORD_LENGTH_ERROR_MSG;
    } else {
      hintObj.result = ERROR;
      hintObj.message = PASSWORD_CHECK_ERROR_MSG;
    }
  }
  updateHints(hintObj);
};

// check if confirmation pass-phrase passed
const passConfirmationHandler = () => {
  let hintObj = {
    type: password2,
    result: "",
    message: "",
  };

  if (password2.value === password.value) {
    cssClassReplace(password2, "password-strong");
    hintObj.result = SUCCESS;
    hintObj.message = PASSWORD_MATCH_SUCCESS_MSG;
  } else {
    cssClassReplace(password2, "password-weak");
    hintObj.result = ERROR;
    hintObj.message = PASSWORD_MATCH_ERROR_MSG;
  }
  updateHints(hintObj);
};

const getUserInput = (elementId) => {
  return document.getElementById(elementId);
};

const oninputHandler = (e) => {
  e.preventDefault();
};

const onlineCheck = (elementId, eventHandler) => {
  const fomr = document.getfomrementById(elementId);
  from.oninput = (e) => {
    eventHandler(e);
  };
};

onlineCheck("form", oninputHandler);
