// import { exhangeRate_API_KEY as key } from "./general.js";
// exxhangeRate_API_KEY = require("./general.js");
const exhangeRate_API_KEY = "4a9416c555fb34cf0aa1d59d";
let currencyEl_one = document.getElementById("currency-one");
let amount_one = document.getElementById("amount-one");
let currencyEl_two = document.getElementById("currency-two");
let amount_two = document.getElementById("amount-two");

const rateEl = document.getElementById("rate");
const swap = document.getElementById("swap");

// Fetch exchange rates and update DOM
function fetch() {
  fetch(`https://api.exchangeratesapi.io/latest`)
    .then((res) => res.json())
    .then((resp) => {
      console.log(resp);
      // return rate;
    });
}

function calculate() {
  let currency_one = currencyEl_one.value;
  let currency_two = currencyEl_two.value;
  const rate = fetch(currency_one, currency_two);
  rateEl.innerHTML = `1 ${currency_one} = ${rate} ${currency_two}`;
  am_two_value = (amount_one.value * rate).toFixed(4);
  updateUI(amount_one.value, am_two_value);
}

function updateUI(am_one_value, am_two_value) {
  amount_one.value = am_one_value;
  amount_two.value = am_two_value;
}

//Event listeners
currencyEl_one.addEventListener("change", calculate);
amount_one.addEventListener("input", calculate);
currencyEl_two.addEventListener("change", calculate);
amount_two.addEventListener("input", calculate);

calculate();
