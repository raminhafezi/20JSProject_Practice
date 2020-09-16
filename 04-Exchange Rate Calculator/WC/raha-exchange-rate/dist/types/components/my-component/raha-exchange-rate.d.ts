export declare class MyComponent {
  symbols: string[];
  image: string;
  currenyOneSymbol: string;
  currenyTwoSymbol: string;
  rate: number;
  amountOneValue: string;
  amountTwoValue: string;
  whoChanged: number;
  exchangeText: string;
  exchangeRate: HTMLDivElement;
  inputOne: HTMLInputElement;
  inputTwo: HTMLInputElement;
  calculateExchangeRate(): void;
  numberWithCommas(x: any): any;
  showExchangeRate(): any;
  private flagFix;
  private stateUpdate;
  private currencyListGen;
  render(): any[];
}
