import { Component, h, State } from '@stencil/core';

@Component({
  tag: 'raha-random-users',
  styleUrl: 'raha-random-users.css',
  shadow: true,
})
export class MyComponent {
  @State() data = [];
  main: HTMLElement;

  private getRandomUser = () => {
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

  private updateDOM(providedData = this.data) {
    this.main.innerHTML = '<h2>Person<strong>Wealth</strong></h2>';
    providedData.forEach(person => {
      const element = document.createElement('div');
      element.classList.add('person');
      element.innerHTML = `<strong id="record">${person.name}</strong> $${this.numberWithCommas(person.money)}`;
      this.main.appendChild(element);
    });
  }

  //   double the wealth of each person in the list inplace.
  private doubleMoney = () => {
    this.data.forEach(person => (person.money += person.money));
    this.updateDOM();
  };

  //   filter out all non millioners from the list and replace the data
  private showMillionersOnly = () => {
    this.data = this.data.filter(person => person.money > 1000000);
    this.updateDOM();
  };

  //   Sort in ascending order, sort in place
  private sortData = () => {
    this.data.sort((p1, p2) => {
      return p1.money > p2.money ? -100 : p1.money == p2.money ? 0 : 100;
    });
    this.updateDOM();
  };

  //  calculate total welath of the people on data and display as in an h3 tag, at the end of the list. First double check if we alreay calculate and print total wealth at the end of the list, in case user click on "calculate Total Welath" more than once
  private calculateTotalWelth = () => {
    let lastChild = this.main.lastChild;
    if ((lastChild as HTMLDivElement).className != 'person') {
      this.main.removeChild(lastChild);
    }
    const total = this.data.reduce((total, person) => {
      return (total += person.money);
    }, 0);
    const wealthEl = document.createElement('div');
    wealthEl.innerHTML = `<h3>Total Wealth : <strong>$${this.numberWithCommas(total)}</storng></h3>`;
    this.main.appendChild(wealthEl);
  };

  private removeUser = event => {
    if (event.target.nodeName === 'STRONG') {
      this.data = this.data.filter(person => {
        return person.name !== event.target.innerHTML;
      });
    }
    this.updateDOM();
  };
  // Show numers in thiusand seprator commas and return as string
  numberWithCommas = x => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  // Experimental for removing all event listeners from tags and assign only one to the parent element with swtich-case
  private catchRaisedEvent = e => {
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

  render() {
    return [
      <h1>Dom Array Methods</h1>,
      <div class="container" onClick={this.catchRaisedEvent.bind(event)}>
        <aside>
          <button id="add-user">Add User 🤗</button>
          <button id="double">Double Money 💰</button>
          <button id="show-millioners">Show Only Millioners💎</button>
          <button id="sort">Sort by Richest 😲</button>
          <button id="calculate-wealth">Calculate entire Wealth 👑</button>
        </aside>
        <main id="main" ref={el => (this.main = el)}>
          <h2>
            Person<strong>Wealth</strong>
          </h2>
        </main>
      </div>,
    ];
  }
}
