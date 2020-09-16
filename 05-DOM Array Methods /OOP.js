class DOMFunction {
  constructor() {
    this.main = document.getElementById("main");
    this.addUserBtn = document.getElementById("add-user");
    this.doubleBtn = document.getElementById("double");
    this.sortBtn = document.getElementById("sort");
    this.showMillionesBtn = document.getElementById("show-millioners");
    this.calculateWealthBtn = document.getElementById("calculate-wealth");
    this.data = [];
  }
  getRandomUser = () => {
    fetch("https://randomuser.me/api")
      .then((res) => res.json())
      .then((resp) => {
        const user = resp.results[0];
        const newUser = {
          name: `${user.name.first} ${user.name.last}`,
          money: Math.floor(Math.random() * 1000000),
        };
        this.data.push(newUser);
        this.updateDOM();
      });
  };

  removeUser = (event) => {
    if (event.target.nodeName === "STRONG") {
      this.data = this.data.filter((person) => {
        return person.name !== event.target.innerHTML;
      });
    }
    this.updateDOM();
  };
  // Updateing DOM user navigate thorugh each data, make div elements, add class and show based on their full name and wealth in the second column, then append to the main tag
  updateDOM = () => {
    this.main.innerHTML = "<h2>Person<strong>Wealth</strong></h2>";
    this.data.forEach((person) => {
      const element = document.createElement("div");
      element.classList.add("person");
      element.innerHTML = `<strong>${
        person.name
      }</strong> $${this.numberWithCommas(person.money)}`;
      this.main.appendChild(element);
    });
  };
  // Show numers in thiusand seprator commas and return as string
  numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
}

class App extends DOMFunction {
  constructor() {
    super();
    this.addEventListeners();
  }

  addEventListeners() {
    this.doubleBtn.addEventListener("click", this.doubleMoney);
    this.addUserBtn.addEventListener("click", this.getRandomUser);
    this.sortBtn.addEventListener("click", this.sortData);
    this.showMillionesBtn.addEventListener("click", this.showMillionersOnly);
    this.calculateWealthBtn.addEventListener("click", this.calculateTotalWelth);
    this.main.addEventListener("click", this.removeUser.bind(this));
  }

  //   double the wealth of each person in the list inplace.
  doubleMoney = () => {
    this.data.forEach((person) => {
      person.money += person.money;
    });
    this.updateDOM();
  };

  //   Sort in ascending order, sort in place
  sortData = () => {
    this.data.sort((p1, p2) => {
      return p1.money > p2.money ? -100 : p1.money == p2.money ? 0 : 100;
    });

    this.updateDOM();
  };

  //   filter out all non millioners from the list and replace the data
  showMillionersOnly = () => {
    this.data = this.data.filter((person) => person.money > 1000000);
    this.updateDOM();
  };

  //   calculate total welath of the people on data and display as in an h3 tag, at the end of the list
  calculateTotalWelth = () => {
    const total = this.data.reduce((total, person) => {
      return (total += person.money);
    }, 0);
    const wealthEl = document.createElement("div");
    wealthEl.innerHTML = `<h3>Total Wealth : <strong>$${this.numberWithCommas(
      total
    )}</storng></h3>`;
    this.main.appendChild(wealthEl);
  };
}

new App();
