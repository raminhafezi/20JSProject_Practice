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
