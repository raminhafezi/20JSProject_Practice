const container = document.querySelector(".container");
const allSeats = document.querySelectorAll(".row .seat");
const count = document.getElementById("count");
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

// save selected movie index on DropDown for page reload.
const setMovieData = (movieIndex, moviePrice) => {
  localStorage.setItem("selectedMovieIndex", movieIndex);
};

// Save selected seat on localStorage,
const updateSelectedCount = () => {
  const bookedSeat = document.querySelectorAll(".row .seat.booked");
  const selectedSeatsCount = +bookedSeat.length;
  count.innerText = selectedSeatsCount;
  total.innerText = +selectedSeatsCount * ticketPrice;

  //Save booked seat into the currentSeatStatus
  const seatIndex = [...bookedSeat].map((seat) => [...allSeats].indexOf(seat));
  currentSeatStatus[movieSelect.selectedIndex].booked = [...seatIndex];

  //update booked property of the selected movie in currentSeatStatus
  receipt();
};

const receipt = () => {
  // let receipt = document.querySelector(".ticketsSummary");
  let receiptText = null;

  //generate each line on the receipt, displayed in the screen
  currentSeatStatus.forEach((movie) => {
    if (movie.booked.length > 0) {
      receiptText += `<li> <strong>${movie.name} </strong>${
        movie.booked.length
      } * ${movie.price} = ${movie.booked.length * movie.price} $</li>`;
    }
  });

  // Calculate total cost of the tickets.
  let total = currentSeatStatus.reduce((total, movie) => {
    movie.booked.length > 0
      ? (total += +movie.price * movie.booked.length)
      : total;
    return total;
  }, 0);

  //update last line of the receipt, total cost
  receiptText += `<li> TOTAL Cost = ${total} $</li>`;

  // display receipt in the screen, attached to the <ul> via innerHMTL tag
  document.querySelector(".ticketsSummary").innerHTML = receiptText;
};

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

const updateSeats = () => {
  //movieSelect.selectedIndex return selected movie index

  movieIndex = movieSelect.selectedIndex;
  updateUI();
};

const changeMovieHandler = (event) => {
  ticketPrice = +event.target.value;
  updateSeats();
  updateSelectedCount();
};

// seat select event
container.addEventListener("click", seatSelectHandler);

//movie select event
movieSelect.addEventListener("change", changeMovieHandler.bind(event));
document.addEventListener("onload", updateSeats());

// movieSelect.options[0].innerHTML
// sample.substring(0, sample.indexOf("(")).trim()
