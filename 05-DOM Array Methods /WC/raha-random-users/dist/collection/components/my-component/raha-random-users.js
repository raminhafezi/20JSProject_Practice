import { Component, h, State } from '@stencil/core';
export class MyComponent {
  constructor() {
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
      h("h1", null, "Dom Array Methods"),
      h("div", { class: "container", onClick: this.catchRaisedEvent.bind(event) },
        h("aside", null,
          h("button", { id: "add-user" }, "Add User \uD83E\uDD17"),
          h("button", { id: "double" }, "Double Money \uD83D\uDCB0"),
          h("button", { id: "show-millioners" }, "Show Only Millioners\uD83D\uDC8E"),
          h("button", { id: "sort" }, "Sort by Richest \uD83D\uDE32"),
          h("button", { id: "calculate-wealth" }, "Calculate entire Wealth \uD83D\uDC51")),
        h("main", { id: "main", ref: el => (this.main = el) },
          h("h2", null,
            "Person",
            h("strong", null, "Wealth")))),
    ];
  }
  static get is() { return "raha-random-users"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() { return {
    "$": ["raha-random-users.css"]
  }; }
  static get styleUrls() { return {
    "$": ["raha-random-users.css"]
  }; }
  static get states() { return {
    "data": {}
  }; }
}
