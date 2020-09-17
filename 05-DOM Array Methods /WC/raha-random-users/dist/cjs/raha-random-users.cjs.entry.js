'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-a5ef87e0.js');

const rahaRandomUsersCss = ":host{background:#f4f4f4;font-family:Aril, Helvetica, sans-serif;display:flex;flex-direction:column;align-items:center;min-height:100vh;margin:0}.container{display:flex;padding:20px;margin:0 auto;max-width:100%;width:800px}aside{padding:10px 30px;width:250px;border-right:1px solid #111}button{cursor:pointer;background-color:#fff;border:solid 1px #111;border-radius:5px;display:block;width:100%;padding:10px;margin-bottom:20px;font-family:bold;font-size:14px}main{flex:1;padding:10px 20px}h2{border-bottom:1px solid #111;padding-bottom:10px;display:flex;justify-content:space-between;font-weight:300;margin:0 0 20px}h3{background-color:#fff;border-bottom:1px solid #111;padding:10px;display:flex;justify-content:space-between;font-weight:300;margin:20px 0 0}.person{display:flex;justify-content:space-between;font-size:20px;margin-bottom:10px}strong{cursor:pointer}";

const MyComponent = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.data = [];
    this.getRandomUser = () => {
      fetch('https://randomuser.me/api')
        .then(res => res.json())
        .then(resp => {
        const user = resp.results[0];
        const newUser = {
          name: `${user.name.first} ${user.name.last}`,
          money: Math.floor(Math.random() * 1000000),
        };
        this.data.push(newUser);
        this.updateDOM();
      });
    };
    //   double the wealth of each person in the list inplace.
    this.doubleMoney = () => {
      this.data.forEach(person => (person.money += person.money));
      this.updateDOM();
    };
    //   filter out all non millioners from the list and replace the data
    this.showMillionersOnly = () => {
      this.data = this.data.filter(person => person.money > 1000000);
      this.updateDOM();
    };
    //   Sort in ascending order, sort in place
    this.sortData = () => {
      this.data.sort((p1, p2) => {
        return p1.money > p2.money ? -100 : p1.money == p2.money ? 0 : 100;
      });
      this.updateDOM();
    };
    //  calculate total welath of the people on data and display as in an h3 tag, at the end of the list. First double check if we alreay calculate and print total wealth at the end of the list, in case user click on "calculate Total Welath" more than once
    this.calculateTotalWelth = () => {
      let lastChild = this.main.lastChild;
      if (lastChild.className != 'person') {
        this.main.removeChild(lastChild);
      }
      const total = this.data.reduce((total, person) => {
        return (total += person.money);
      }, 0);
      const wealthEl = document.createElement('div');
      wealthEl.innerHTML = `<h3>Total Wealth : <strong>$${this.numberWithCommas(total)}</storng></h3>`;
      this.main.appendChild(wealthEl);
    };
    this.removeUser = event => {
      if (event.target.nodeName === 'STRONG') {
        this.data = this.data.filter(person => {
          return person.name !== event.target.innerHTML;
        });
      }
      this.updateDOM();
    };
    // Show numers in thiusand seprator commas and return as string
    this.numberWithCommas = x => {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };
    // Experimental for removing all event listeners from tags and assign only one to the parent element with swtich-case
    this.catchRaisedEvent = e => {
      switch (e.path[0].id) {
        case 'add-user':
          this.getRandomUser();
          break;
        case 'double':
          this.doubleMoney();
          break;
        case 'show-millioners':
          this.showMillionersOnly();
          break;
        case 'sort':
          this.sortData();
          break;
        case 'calculate-wealth':
          this.calculateTotalWelth();
          break;
        case 'record':
          this.removeUser(e);
          break;
      }
    };
  }
  updateDOM(providedData = this.data) {
    this.main.innerHTML = '<h2>Person<strong>Wealth</strong></h2>';
    providedData.forEach(person => {
      const element = document.createElement('div');
      element.classList.add('person');
      element.innerHTML = `<strong id="record">${person.name}</strong> $${this.numberWithCommas(person.money)}`;
      this.main.appendChild(element);
    });
  }
  render() {
    return [
      index.h("h1", null, "Dom Array Methods"),
      index.h("div", { class: "container", onClick: this.catchRaisedEvent.bind(event) }, index.h("aside", null, index.h("button", { id: "add-user" }, "Add User \uD83E\uDD17"), index.h("button", { id: "double" }, "Double Money \uD83D\uDCB0"), index.h("button", { id: "show-millioners" }, "Show Only Millioners\uD83D\uDC8E"), index.h("button", { id: "sort" }, "Sort by Richest \uD83D\uDE32"), index.h("button", { id: "calculate-wealth" }, "Calculate entire Wealth \uD83D\uDC51")), index.h("main", { id: "main", ref: el => (this.main = el) }, index.h("h2", null, "Person", index.h("strong", null, "Wealth")))),
    ];
  }
};
MyComponent.style = rahaRandomUsersCss;

exports.raha_random_users = MyComponent;
