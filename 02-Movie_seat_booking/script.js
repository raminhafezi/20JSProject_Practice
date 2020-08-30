const container = document.querySelector(".container");
const allSeats = document.querySelectorAll(".row .seat");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");
let ticketPrice = +movieSelect.value;
let movieIndex = movieSelect.selectedIndex;

let currentSeatStatus = [
  {
    name: "Avengers: Engdame",
    price: 10,
    reserved: [1, 2, 3, 4, 5],
    booked: [],
  },
  { name: "Joker ", price: 12, reserved: [15, 16, 9, 2], booked: [] },
  { name: "Toy Story 4", price: 8, reserved: [1], booked: [] },
  {
    name: "The Lion King",
    price: 9,
    reserved: [24, 25, 26, 27, 28],
    booked: [],
  },
];

const seatSelectHandler = (event) => {
  if (
    event.target.classList.contains("seat") &&
    !event.target.classList.contains("reserved")
  ) {
    if (event.target.classList.contains("booked")) {
      event.target.classList.remove("booked");
    } else {
      event.target.classList.add("booked");
    }
  }

  updateSelectedCount();
};

// Save selected seat on localStorage,
const updateSelectedCount = () => {
  const bookedSeat = document.querySelectorAll(".row .seat.booked");
  const selectedSeatsCount = +bookedSeat.length;

  //Save booked seat into the currentSeatStatus
  const seatIndex = [...bookedSeat].map((seat) => [...allSeats].indexOf(seat));
  currentSeatStatus[movieSelect.selectedIndex].booked = [...seatIndex];

  //saved on the localStorage
  localStorage.setItem("currentSeatStatus", JSON.stringify(currentSeatStatus));

  //update booked property of the selected movie in currentSeatStatus
  calculateReceipt();
};

const calculateReceipt = () => {
  //final HTML lookalike string passed for display on the screendisplayed in the screen
  let receiptText = null;

  //generate each line on the receipt based on booked ticker for each movie unequal to 0, generate an <li> for each movie
  currentSeatStatus.forEach((movie) => {
    if (movie.booked.length > 0) {
      receiptText += `<li> <strong>${movie.name} </strong>${
        movie.booked.length
      } * ${movie.price} = ${movie.booked.length * movie.price} $</li>`;
    }
  });

  // Calculate total cost of the tickets.
  let totalCost = currentSeatStatus.reduce((total, movie) => {
    movie.booked.length > 0
      ? (total += +movie.price * movie.booked.length)
      : total;
    return total;
  }, 0);

  // calculate Tickets Qty
  let totalTickets = currentSeatStatus.reduce((total, movie) => {
    movie.booked.length > 0 ? (total += movie.booked.length) : total;
    return total;
  }, 0);

  //Update the Summary line at the end of the page:
  count.innerText = totalTickets;
  total.innerText = totalCost;

  //update last line of the receipt, total cost
  totalCost > 0
    ? (receiptText += `<li> TOTAL Cost = ${totalCost} $</li>`)
    : null;

  // display receipt in the screen, attached to the <ul> via innerHMTL tag
  displayOnScreen(receiptText);
};

const displayOnScreen = (text) => {
  document.querySelector(".ticketsSummary").innerHTML = text;
};

const changeMovieHandler = (event) => {
  ticketPrice = +event.target.value;
  updateSeats();
  updateSelectedCount();
};

const updateSeats = () => {
  //movieSelect.selectedIndex return selected movie index

  movieIndex = movieSelect.selectedIndex;
  updateUI();
};

//change CSS class of the reseved seat, based on the selected movie
const updateUI = () => {
  let reservedSeat = currentSeatStatus[movieIndex].reserved;
  let bookedSeat = currentSeatStatus[movieIndex].booked;

  //remove booked and reserved Seat CSS class
  let bookedSeats = document.querySelectorAll(".row .seat");
  bookedSeats.forEach((seat) => {
    seat.classList.remove("booked");
    seat.classList.remove("reserved");
  });

  // Update reserved seat CSS class
  reservedSeat.forEach((seatIndex) => {
    allSeats[seatIndex].classList.add("reserved");
  });

  // Update booked seat CSS class
  bookedSeat.forEach((seatIndex) => {
    allSeats[seatIndex].classList.add("booked");
  });
};

// seat select event
container.addEventListener("click", seatSelectHandler);

//movie select event
movieSelect.addEventListener("change", changeMovieHandler.bind(event));
document.addEventListener("onload", updateSeats());
