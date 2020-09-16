import { r as registerInstance, h, g as getAssetPath } from './index-9195fd94.js';

const rahaExchangeRateCss = ":host{font-family:Arial, Helvetica, sans-serif;background-color:#f4f4f4;--primary-color:#5fbaa7;display:flex;flex-direction:column;align-items:center;justify-content:center;height:100vh;margin:0;padding:20px}h1{color:var(--primary-color)}p{text-align:#fff}.container{display:flex;flex-direction:column;align-items:center;align-content:center}.swap-rate-container{display:flex;align-items:center;justify-content:space-between;color:black;background-color:var(--primary-color);border-radius:15px;font-size:20px;padding:15px 12px}.money-img{width:150px}.currency{padding:40px 0;display:flex;align-items:center;justify-content:space-between}.input{-moz-appearance:none;-webkit-appearance:none}.currency select{padding:10px 20px 10px 10px;-moz-appearance:none;-webkit-appearance:none;appearance:none;border:1px solid #dedede;font-size:12px;background:transparent;background-image:url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%20000002%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E');background-position:right 10px top 50%, 0, 0;background-size:12px auto, 100%;background-repeat:no-repeat}.currency input{border:0;background:transparent;font-size:30px;text-align:right}.rate{color:var(--primary-color);font-size:14px;padding:1 10px}select:focus,input:focus,button:focus{outline:0}@media (max-width: 600px){.currency input{width:200px}}";

const MyComponent = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.symbols = 'AUD BGN BRL CAD CHF CNY CZK DKK EUR GBP HKD HRK HUF IDR ILS INR ISK JPY KRW MXN MYR NOK NZD PHP PLN RON RUB SEK SGD THB TRY USD ZAR'.split(' ');
    this.image = 'money.png';
    this.currenyOneSymbol = 'AUD';
    this.currenyTwoSymbol = 'USD';
    this.amountOneValue = '1';
    this.amountTwoValue = '0';
    this.whoChanged = 1;
    this.exchangeText = '';
    //Catch raise event from child under Container parent.
    this.stateUpdate = e => {
      switch (e.target.id) {
        case 'currency-one':
          this.flagFix(1);
          this.currenyOneSymbol = e.target.value;
          break;
        case 'currency-two':
          this.flagFix(2);
          this.currenyTwoSymbol = e.target.value;
          break;
        case 'amount-one':
          this.whoChanged = 1;
          if (+e.target.value <= 0) {
            this.flagFix(1);
          }
          this.calculateExchangeRate();
          break;
        case 'amount-two':
          this.whoChanged = 2;
          if (+e.target.value <= 0) {
            this.flagFix(2);
          }
          this.calculateExchangeRate();
          break;
      }
    };
  }
  calculateExchangeRate() {
    if (this.whoChanged == 1) {
      fetch(`https://api.exchangeratesapi.io/latest?base=${this.currenyOneSymbol}`)
        .then(res => res.json())
        .then(resp => {
        this.rate = resp.rates[this.currenyTwoSymbol].toFixed(3);
        this.amountTwoValue = (+this.inputOne.value * this.rate).toFixed(3);
        console.log(this.numberWithCommas(this.amountTwoValue));
      });
    }
    else {
      fetch(`https://api.exchangeratesapi.io/latest?base=${this.currenyTwoSymbol}`)
        .then(res => res.json())
        .then(resp => {
        this.rate = resp.rates[this.currenyOneSymbol].toFixed(3);
        this.amountOneValue = (+this.inputTwo.value * this.rate).toFixed(3);
        console.log(this.numberWithCommas(this.amountOneValue));
      });
    }
    this.showExchangeRate();
  }
  // Cannot use this function because in the HTML section, in input area,
  // we define type=number
  // so any attempt to display it as text with thusand comma separator, will raise an erro
  // if we change it to type=text, then we will lose arrow-up and arrow-down to
  // change numbers in the input HTML tag elements
  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
  showExchangeRate() {
    this.whoChanged == 1
      ? (this.exchangeText = `1 ${this.currenyOneSymbol} = ${this.rate} ${this.currenyTwoSymbol}`)
      : (this.exchangeText = `1 ${this.currenyTwoSymbol} = ${this.rate} ${this.currenyOneSymbol}`);
    return h("div", null, this.exchangeText);
  }
  flagFix(whatCurrency) {
    if (whatCurrency == 1) {
      this.whoChanged = 1;
      this.inputOne.value = '1';
      this.amountOneValue = '1';
    }
    else {
      this.whoChanged = 2;
      this.inputTwo.value = '1';
      this.amountTwoValue = '1';
    }
  }
  // Generate currency <option>, wrap them in <select> on return
  currencyListGen(selectId, selectedSymbol) {
    let options = [];
    this.symbols.forEach(item => {
      if (item.length > 1) {
        options.push(item == selectedSymbol ? (h("option", { value: item, selected: true }, item)) : (h("option", { value: item }, item)));
      }
    });
    return h("select", { id: selectId }, options);
  }
  render() {
    return [
      h("img", { src: getAssetPath(`./assets/${this.image}`) }),
      h("h1", null, "Exchange Rate Calculator"),
      h("p", null, "Choose the currency and the amonts to get the exchange rate"),
      h("div", { class: "container", onChange: this.stateUpdate.bind(event) }, h("div", { class: "currency" }, this.currencyListGen('currency-one', 'AUD'), h("input", { type: "number", id: "amount-one", placeholder: "0", min: "0", value: this.amountOneValue, ref: el => (this.inputOne = el) })), h("div", { class: "swap-rate-container" }, this.showExchangeRate()), h("div", { class: "currency" }, this.currencyListGen('currency-two', 'USD'), h("input", { type: "number", id: "amount-two", min: "0", value: this.amountTwoValue, placeholder: "0", ref: el => (this.inputTwo = el) }))),
    ];
  }
  static get assetsDirs() { return ["assets"]; }
  static get watchers() { return {
    "currenyOneSymbol": ["calculateExchangeRate"],
    "currenyTwoSymbol": ["calculateExchangeRate"]
  }; }
};
MyComponent.style = rahaExchangeRateCss;

export { MyComponent as raha_exchange_rate };
