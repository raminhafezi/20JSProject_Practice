const main = document.getElementById("main");
const addUserBtn = document.getElementById("add-user");
const doubleBtn = document.getElementById("double");
const sortBtn = document.getElementById("sort");
const showMillionesBtn = document.getElementById("show-millioners");
const calculateWealthBtn = document.getElementById("calculate-wealth");

let data = [];

// fetch random user and add money
async function getRandomUser() {
  const res = await fetch("https://randomuser.me/api");
  const response = await res.json();
  const user = response.results[0];

  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000),
  };

  addData(newUser);
}

// Add new User to the data
addData = (user) => {
  data.push(user);
  updateDOM();
};

// Double money of each user and change it inplace
doubleMoney = () => {
  data.forEach((user) => (user.money += user.money));
  updateDOM();
};

// sort our users based on their wealth
sortData = () => {
  data.sort((person1, person2) => {
    return person1.money < person2.money
      ? 10
      : person1.money == person2.money
      ? 0
      : -10;
  });
  updateDOM();
};

// Filter and remove users which has less than 1.B in their wealth
showMillionersOnly = () => {
  data = data.filter((person) => person.money >= 1000000);
  updateDOM();
};

// Summation of the total wealth of the users in the data
calculateTotalWelth = () => {
  const totalWelth = data.reduce((Total, person) => {
    return (Total += person.money);
  }, 0);
  const wealthEl = document.createElement("div");
  wealthEl.innerHTML = `<h3>Total Wealth<strong> $${numberWithCommas(
    totalWelth
  )}</strong></h3>`;
  main.appendChild(wealthEl);
};

removeUser = () => {
  if (event.target.nodeName == "STRONG") {
    data = data.filter((person) => {
      return person.name !== event.target.innerHTML;
    });
  }
  updateDOM();
};

// Show numers in thiusand seprator commas and return as string
numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

// Updateing DOM user navigate thorugh each data, make div elements, add class and show based on their full name and wealth in the second column, then append to the main tag
function updateDOM(providedData = data) {
  main.innerHTML = "<h2>Person<strong>Wealth</strong></h2>";
  providedData.forEach((person) => {
    const element = document.createElement("div");
    element.classList.add("person");
    element.innerHTML = `<strong>${person.name}</strong> $${numberWithCommas(
      person.money
    )}`;
    main.appendChild(element);
  });
}

// Add all event listeners to this function, then just call this function in the root program body
function addEventListeners() {
  addUserBtn.addEventListener("click", getRandomUser);
  doubleBtn.addEventListener("click", doubleMoney);
  sortBtn.addEventListener("click", sortData);
  showMillionesBtn.addEventListener("click", showMillionersOnly);
  calculateWealthBtn.addEventListener("click", calculateTotalWelth);
  main.addEventListener("click", removeUser.bind(this));
}

addEventListeners();
