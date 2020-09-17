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
