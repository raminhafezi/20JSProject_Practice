import { Component, h, Prop, getAssetPath, State, Watch } from '@stencil/core';

@Component({
  tag: 'raha-exchange-rate',
  styleUrl: 'raha-exchange-rate.css',
  shadow: true,
  assetsDirs: ['assets'],
})
export class MyComponent {
  symbols = 'AUD BGN BRL CAD CHF CNY CZK DKK EUR GBP HKD HRK HUF IDR ILS INR ISK JPY KRW MXN MYR NOK NZD PHP PLN RON RUB SEK SGD THB TRY USD ZAR'.split(' ');
  @Prop() image = 'money.png';
  @State() currenyOneSymbol: string = 'AUD';
  @State() currenyTwoSymbol: string = 'USD';
  @State() rate: number;
  @State() amountOneValue = '1';
  @State() amountTwoValue = '0';
  @State() whoChanged: number;
  @Prop() exchangeText: string = '';
  exchangeRate: HTMLDivElement;
  inputOne: HTMLInputElement;
  inputTwo: HTMLInputElement;

  @Watch('currenyOneSymbol')
  @Watch('currenyTwoSymbol')
  calculateExchangeRate() {
    if (this.whoChanged == 1) {
      fetch(`https://api.exchangeratesapi.io/latest?base=${this.currenyOneSymbol}`)
        .then(res => res.json())
        .then(resp => {
          this.rate = resp.rates[this.currenyTwoSymbol].toFixed(3);
          this.amountTwoValue = (+(this.inputOne as HTMLInputElement).value * this.rate).toFixed(3);
          console.log(this.numberWithCommas(this.amountTwoValue));
        });
    } else {
      fetch(`https://api.exchangeratesapi.io/latest?base=${this.currenyTwoSymbol}`)
        .then(res => res.json())
        .then(resp => {
          this.rate = resp.rates[this.currenyOneSymbol].toFixed(3);
          this.amountOneValue = (+(this.inputTwo as HTMLInputElement).value * this.rate).toFixed(3);
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

    return <div>{this.exchangeText}</div>;
  }

  private flagFix(whatCurrency) {
    if (whatCurrency == 1) {
      this.whoChanged = 1;
      this.inputOne.value = '1';
      this.amountOneValue = '1';
    } else {
      this.whoChanged = 2;
      this.inputTwo.value = '1';
      this.amountTwoValue = '1';
    }
  }

  //Catch raise event from child under Container parent.
  private stateUpdate = e => {
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
        if (+(e.target as HTMLInputElement).value <= 0) {
          this.flagFix(1);
        }
        this.calculateExchangeRate();
        break;
      case 'amount-two':
        this.whoChanged = 2;
        if (+(e.target as HTMLInputElement).value <= 0) {
          this.flagFix(2);
        }
        this.calculateExchangeRate();
        break;
    }
  };

  // Generate currency <option>, wrap them in <select> on return
  private currencyListGen(selectId, selectedSymbol) {
    let options = [];
    this.symbols.forEach(item => {
      if (item.length > 1) {
        options.push(
          item == selectedSymbol ? (
            <option value={item} selected>
              {item}
            </option>
          ) : (
            <option value={item}>{item}</option>
          ),
        );
      }
    });

    return <select id={selectId}>{options}</select>;
  }
  render() {
    return [
      <img src={getAssetPath(`./assets/${this.image}`)} />,
      <h1>Exchange Rate Calculator</h1>,
      <p>Choose the currency and the amonts to get the exchange rate</p>,
      <div class="container" onChange={this.stateUpdate.bind(event)}>
        <div class="currency">
          {/* Generate list of currency for currency one */}
          {this.currencyListGen('currency-one', 'AUD')}
          {/* Currency One value */}
          <input type="number" id="amount-one" placeholder="0" min="0" value={this.amountOneValue} ref={el => (this.inputOne = el)} />
        </div>
        <div class="swap-rate-container">{this.showExchangeRate()}</div>
        <div class="currency">
          {/* Generate list of currency for currency two */}
          {this.currencyListGen('currency-two', 'USD')}
          {/* Currency Two value */}
          <input type="number" id="amount-two" min="0" value={this.amountTwoValue} placeholder="0" ref={el => (this.inputTwo = el)} />
        </div>
      </div>,
    ];
  }
}
