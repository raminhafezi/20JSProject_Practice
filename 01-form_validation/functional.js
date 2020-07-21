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

/// get element from DOM
function getUserInput(elementId) {
  return document.getElementById(elementId);
}

// chane CSS color and show error hints
function cssClassReplace(element, newClass) {
  element.classList = "";
  element.classList.add(newClass);
}
// update hint fields under each input elements
function updateHints(hint) {
  const parent = hint.type.parentElement;
  const small = hint.type.nextElementSibling;

  if (hint.result === SUCCESS) {
    parent.className = "form-control success";
    small.innerText = hint.message;
    return;
  }
  parent.className = "form-control error";
  small.innerText = hint.message;
}

// username must be above 6 chars and not empty
function checkUsername(userNameObj) {
  const uName = userNameObj.value.trim();
  let hintObj = {
    type: userNameObj,
    result: "",
    message: "",
  };

  usernameLenghtcheckFail = (hintObj) => {
    hintObj.result = ERROR;
    hintObj.message = USERNAME_MIN_LENGTH_MSG;
    return hintObj;
  };

  usernameFormatCheckPass = (hintObj) => {
    hintObj.result = SUCCESS;
    hintObj.message = USERNAME_CHECK_PASS_MSG;
    return hintObj;
  };

  usernameFormatCheckFail = (hintObj) => {
    hintObj.result = ERROR;
    hintObj.message = USERNAME_CHECK_ERROR_MSG;
    return hintObj;
  };

  uName === "" || uName.length < MIN_USERNAME_LENGTH
    ? (hintObj = usernameLenghtcheckFail(hintObj))
    : usernameRe.test(String(userNameObj.value))
    ? (hintObj = usernameFormatCheckPass(hintObj))
    : (hintObj = usernameFormatCheckFail(hintObj));
  updateHints(hintObj);
}

// check email format based on RE
function checkEmailHandler(email) {
  let hintObj = {
    type: email,
    result: "",
    message: "",
  };

  mailCheckFormatPass = (hintObj) => {
    hintObj.result = SUCCESS;
    hintObj.message = EMAIL_CHECK_PASS_MSG;
    return hintObj;
  };

  mailCheckFormatFail = (hintObj) => {
    hintObj.result = ERROR;
    hintObj.message = EMAIL_CHECK_ERROR_MSG;
    return hintObj;
  };

  checkEmailRe.test(String(email.value.trim()).toLowerCase())
    ? (hintObj = mailCheckFormatPass(hintObj))
    : (hintObj = mailCheckFormatFail(hintObj));

  updateHints(hintObj);
}

// check password length, and strength based on defined REs
function passPowerCheck() {
  let hintObj = {
    type: password,
    result: "",
    message: "",
  };

  strongPassswordPass = (hintObj) => {
    cssClassReplace(hintObj.type, "password-strong");
    hintObj.result = SUCCESS;
    hintObj.message = PASSWORD_CHECK_SUCCESS_MSG;
    return hintObj;
  };

  mediumPasswordPass = (hintObj) => {
    cssClassReplace(hintObj.type, "password-medium");
    cssClassReplace(hintObj.type, "password-weak");
    hintObj.result = ERROR;
    hintObj.message = PASSWORD_LENGTH_ERROR_MSG;
    return hintObj;
  };

  passwordCheckFail = (hintObj) => {
    hintObj.result = ERROR;
    hintObj.message = PASSWORD_CHECK_ERROR_MSG;
    return hintObj;
  };

  strongPass.test(password.value)
    ? (hintObj = strongPassswordPass(hintObj))
    : mediumPass.test(password.value)
    ? (hintObj = mediumPasswordPass(hintObj))
    : (hintObj = passwordCheckFail(hintObj));

  updateHints(hintObj);
}

// check if confirmation pass-phrase passed
function passConfirmationHandler() {
  let hintObj = {
    type: password2,
    result: "",
    message: "",
  };

  successCase = () => {
    cssClassReplace(password2, "password-strong");
    hintObj.result = SUCCESS;
    hintObj.message = PASSWORD_MATCH_SUCCESS_MSG;
  };

  failureCase = () => {
    cssClassReplace(password2, "password-weak");
    hintObj.result = ERROR;
    hintObj.message = PASSWORD_MATCH_ERROR_MSG;
  };

  password2.value === password.value ? successCase() : failureCase();

  updateHints(hintObj);
}

function oninputHandler(e) {
  e.preventDefault();
  const focusEl = e.target;
  focusEl.id === "username"
    ? checkUsername(focusEl)
    : focusEl.id === "email"
    ? checkEmailHandler(focusEl)
    : focusEl.id === "password"
    ? passPowerCheck(focusEl)
    : focusEl.id === "password2"
    ? passConfirmationHandler(focusEl)
    : null;
}

function onlineCheck(elementId, eventHandler) {
  const form = getUserInput(elementId);
  form.oninput = (e) => {
    eventHandler(e);
  };
}

onlineCheck("form", oninputHandler);
