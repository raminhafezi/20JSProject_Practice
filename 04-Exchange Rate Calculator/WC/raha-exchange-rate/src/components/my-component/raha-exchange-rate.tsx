import { Component, h, Prop, getAssetPath, State, Watch } from '@stencil/core';

@Component({
  tag: 'raha-exchange-rate',
  styleUrl: 'raha-exchange-rate.css',
  shadow: true,
  assetsDirs: ['assets'],
})
export class MyComponent {
  symbols = 'AUD BGN BRL CAD CHF CNY CZK DKK GBP HKD HRK HUF IDR ILS INR ISK JPY KRW MXN MYR NOK NZD PHP PLN RON RUB SEK SGD THB TRY USD ZAR'.split(' ');
  @Prop() image = 'money.png';
  @State() currenyOneSymbol: string = 'AUD';
  @State() currenyTwoSymbol: string = 'USD';
  @State() rate: number;
  @Prop({ reflect: true, mutable: true }) amountOne;
  @Prop({ reflect: true, mutable: true }) amountTwo;
  exchangeRate: HTMLDivElement;
  rateEl: HTMLDivElement;

  @Watch('currenyOneSymbol')
  @Watch('currenyTwoSymbol')
  @Watch('amountOne')
  @Watch('amountTwo')
  calculate() {
    fetch(`https://api.exchangeratesapi.io/latest?base=${this.currenyOneSymbol}`)
      .then(res => res.json())
      .then(resp => {
        this.rate = resp.rates[this.currenyTwoSymbol];
        // this.amountTwo.value = this.amountOne.value * this.rate;
        console.log(this.rate);
      });
  }

  showExchangeRate() {
    let text = `1 ${this.currenyOneSymbol} = ${this.rate} ${this.currenyTwoSymbol}`;
    console.log(text);
    return <div>{text}</div>;
  }

  private stateUpdate = e => {
    switch (e.target.id) {
      case 'currency-one':
        this.currenyOneSymbol = e.target.value;
        break;
      case 'currency-two':
        this.currenyTwoSymbol = e.target.value;
        break;
      case 'amount-one':
        this.amountOne.value = e.target.value;
        break;
      case 'amount-two':
        this.amountTwo.value = e.target.value;
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
          {this.currencyListGen('currency-one', 'AUD')}
          <input type="number" id="amount-one" placeholder="0" value="1" ref={el => (this.amountOne = el)} />
        </div>
        <div class="swap-rate-container">
          <button class="btn" id="swap">
            Swap
          </button>
          {this.showExchangeRate()}
        </div>
        <div class="currency">
          {this.currencyListGen('currency-two', 'USD')}
          <input
            type="number"
            id="amount-two"
            placeholder="0"
            ref={el => {
              this.amountTwo = el;
            }}
          />
        </div>
      </div>,
    ];
  }
}
