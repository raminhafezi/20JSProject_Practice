import { Component, h, Prop, getAssetPath, State, Watch } from '@stencil/core';
export class MyComponent {
  constructor() {
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
      h("div", { class: "container", onChange: this.stateUpdate.bind(event) },
        h("div", { class: "currency" },
          this.currencyListGen('currency-one', 'AUD'),
          h("input", { type: "number", id: "amount-one", placeholder: "0", min: "0", value: this.amountOneValue, ref: el => (this.inputOne = el) })),
        h("div", { class: "swap-rate-container" }, this.showExchangeRate()),
        h("div", { class: "currency" },
          this.currencyListGen('currency-two', 'USD'),
          h("input", { type: "number", id: "amount-two", min: "0", value: this.amountTwoValue, placeholder: "0", ref: el => (this.inputTwo = el) }))),
    ];
  }
  static get is() { return "raha-exchange-rate"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() { return {
    "$": ["raha-exchange-rate.css"]
  }; }
  static get styleUrls() { return {
    "$": ["raha-exchange-rate.css"]
  }; }
  static get assetsDirs() { return ["assets"]; }
  static get properties() { return {
    "image": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "string",
        "resolved": "string",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": ""
      },
      "attribute": "image",
      "reflect": false,
      "defaultValue": "'money.png'"
    }
  }; }
  static get states() { return {
    "currenyOneSymbol": {},
    "currenyTwoSymbol": {},
    "rate": {},
    "amountOneValue": {},
    "amountTwoValue": {},
    "whoChanged": {},
    "exchangeText": {}
  }; }
  static get watchers() { return [{
      "propName": "currenyOneSymbol",
      "methodName": "calculateExchangeRate"
    }, {
      "propName": "currenyTwoSymbol",
      "methodName": "calculateExchangeRate"
    }]; }
}
