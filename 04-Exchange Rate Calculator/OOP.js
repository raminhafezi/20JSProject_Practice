class App {
  constructor() {
    this.currencyEl_one = document.getElementById("currency-one");
    this.amount_one = document.getElementById("amount-one");
    this.currencyEl_two = document.getElementById("currency-two");
    this.amount_two = document.getElementById("amount-two");
    this.swap = document.getElementById("swap");
    this.rateEl = document.getElementById("rate");
    this.addEventListeners();
    this.calculate();
  }

  addEventListeners() {
    this.currencyEl_one.addEventListener("change", this.calculate);
    this.amount_one.addEventListener("input", this.calculate);
    this.currencyEl_two.addEventListener("change", this.calculate);
    this.amount_two.addEventListener("input", this.calculate);
    swap.addEventListener("click", this.swapBtnHandler);
  }

  calculate = () => {
    let currency_one = this.currencyEl_one.value;
    let currency_two = this.currencyEl_two.value;
    fetch(`https://api.exchangeratesapi.io/latest?base=${currency_one}`)
      .then((res) => res.json())
      .then((resp) => {
        let rate = resp.rates[currency_two];
        this.rateEl.innerHTML = `1 ${currency_one} = ${rate.toFixed(
          3
        )} ${currency_two}`;
        this.amount_two.value = (this.amount_one.value * rate).toFixed(4);
        // updateUI(amount_one.value, am_two_value);
      });
  };

  swapBtnHandler = () => {
    this.currencyEl_one.value = [
      this.currencyEl_two.value,
      (this.currencyEl_two.value = this.currencyEl_one.value),
    ][0];
    this.calculate();
  };
}

new App();
