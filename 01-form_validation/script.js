const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");
const MIN_PASS_STRONG = 10;
const MIN_PASS_ACCEPTABLE = 6;
const checkEmailRe = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const strongPass = new RegExp(
  `^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{${MIN_PASS_STRONG},})`
);
const mediumPass = new RegExp(
  `^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{${MIN_PASS_ACCEPTABLE},})`
);

const showResult = (_, input, errorOrSsuccess, message) => {
  const parent = input.parentElement;
  if (errorOrSsuccess === "success") {
    parent.className = "form-control success";
    return;
  }
  parent.className = "form-control error";
  const small = input.nextElementSibling;
  small.innerText = message;
};

const checkEmail = (input) => {
  checkEmailRe.test(String(input.value).toLowerCase())
    ? (resultObj = {
        type: input,
        result: "success",
        message: "Email is valid",
      })
    : (resultObj = {
        type: input,
        result: "error",
        message: "Email is not valid",
      });
  showResult`Email check result for ${resultObj.type} is ${resultObj.result}  so the message is ${resultObj.message}`;
};

// check required fields not empty, using Tagged Templates
const checkRequired = (inputArray) => {
  inputArray.forEach((input) => {
    input.value.trim() === ""
      ? (resultObj = {
          type: input,
          result: "error",
          message: `${input.id} is required`,
        })
      : (resultObj = { type: input, result: "success", message: "passed" });
    showResult`Value check result for ${resultObj.type} is ${resultObj.result} so the message is ${resultObj.message}`;

    input.id === "email" && input.value.trim() !== ""
      ? checkEmail(input)
      : null;
  });
};

const cssClassReplace = (element, newClass) => {
  element.classList = "";
  element.classList.add(newClass);
};

const passPowHandler = () => {
  strongPass.test(password.value)
    ? cssClassReplace(password, "password-strong")
    : mediumPass.test(password.value)
    ? cssClassReplace(password, "password-medium")
    : cssClassReplace(password, "password-weak");
};

const passConfHandler = () => {
  password2.value === password.value
    ? cssClassReplace(password2, "password-strong")
    : cssClassReplace(password2, "password-weak");
};

// Event Listener
form.addEventListener("submit", function (e) {
  e.preventDefault();
  checkRequired([username, email, password, password2]);
});

password.addEventListener("input", passPowHandler.bind(password));
password2.addEventListener("input", passConfHandler.bind(password2));
