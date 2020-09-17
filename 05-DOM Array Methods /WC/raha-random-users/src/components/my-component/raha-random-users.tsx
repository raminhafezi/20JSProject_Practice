import { Component, h, State } from '@stencil/core';

@Component({
  tag: 'raha-random-users',
  styleUrl: 'raha-random-users.css',
  shadow: true,
})
export class MyComponent {
  @State() data = [];
  main: HTMLElement;

  getRandomUser = () => {
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

  private updateDOM() {
    // console.log(this.data);
    // let result = [];
    this.main.innerHTML = '<h2>Person<strong>Wealth</strong></h2>';
    this.data.forEach(person => {
      const element = document.createElement('div');
      element.classList.add('person');
      element.innerHTML = `<strong>${person.name}</strong> $${this.numberWithCommas(person.money)}`;
      // result.push(element);
      this.main.appendChild(element);
    });
    // console.log(result);
    // return result;
  }

  //   double the wealth of each person in the list inplace.
  doubleMoney = () => {
    this.data.forEach(person => (person.money += person.money));
    this.updateDOM();
  };

  //   filter out all non millioners from the list and replace the data
  showMillionersOnly = () => {
    this.data = this.data.filter(person => person.money > 1000000);
    this.updateDOM();
  };

  //   Sort in ascending order, sort in place
  sortData = () => {
    this.data.sort((p1, p2) => {
      return p1.money > p2.money ? -100 : p1.money == p2.money ? 0 : 100;
    });
    this.updateDOM();
  };

  //   calculate total welath of the people on data and display as in an h3 tag, at the end of the list
  calculateTotalWelth = () => {
    const total = this.data.reduce((total, person) => {
      return (total += person.money);
    }, 0);
    const wealthEl = document.createElement('div');
    wealthEl.innerHTML = `<h3>Total Wealth : <strong>$${this.numberWithCommas(total)}</storng></h3>`;
    this.main.appendChild(wealthEl);
  };

  removeUser = event => {
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
  render() {
    return [
      <h1>Dom Array Methods</h1>,
      <div class="container">
        <aside>
          <button id="add-user" onClick={this.getRandomUser}>
            Add User 🤗
          </button>
          <button id="double" onClick={this.doubleMoney}>
            Double Money 💰
          </button>
          <button id="show-millioners" onClick={this.showMillionersOnly}>
            Show Only Millioners💎
          </button>
          <button id="sort" onClick={this.sortData}>
            Sort by Richest 😲
          </button>
          <button id="calculate-wealth" onClick={this.calculateTotalWelth}>
            Calculate entire Wealth 👑
          </button>
        </aside>
        <main id="main" ref={el => (this.main = el)} onClick={this.removeUser}>
          <h2>
            Person<strong>Wealth</strong>
          </h2>
        </main>
      </div>,
    ];
  }
}
