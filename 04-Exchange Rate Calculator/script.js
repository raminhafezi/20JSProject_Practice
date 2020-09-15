const currencyEl_one = document.getElementById("currency-one");
const amount_one = document.getElementById("amount-one");
const currencyEl_two = document.getElementById("currency-two");
const amount_two = document.getElementById("amount-two");
const swap = document.getElementById("swap");

const rateEl = document.getElementById("rate");

function calculate() {
  let currency_one = currencyEl_one.value;
  let currency_two = currencyEl_two.value;
  fetch(`https://api.exchangeratesapi.io/latest?base=${currency_one}`)
    .then((res) => res.json())
    .then((resp) => {
      let rate = resp.rates[currency_two];
      rateEl.innerHTML = `1 ${currency_one} = ${rate.toFixed(
        3
      )} ${currency_two}`;
      am_two_value = (amount_one.value * rate).toFixed(4);
      updateUI(amount_one.value, am_two_value);
    });
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
swap.addEventListener("click", () => {
  currencyEl_one.value = [
    currencyEl_two.value,
    (currencyEl_two.value = currencyEl_one.value),
  ][0];
  calculate();
});
calculate();
