const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");

const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");
movieSelect.seatIndex = 3;
let ticketPrice = +movieSelect.value;

// get data from localStorange and update UI
const populateUI = () => {
  //Retrive and Update Selected Seat
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));
  selectedSeats !== null && selectedSeats.length > 0;
  seats.forEach((seat, index) => {
    selectedSeats.indexOf(index) > -1 ? seat.classList.add("selected") : null;
  });

  // Retrive and Update Selected Movie
  const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");
  selectedMovieIndex !== null
    ? (movieSelect.selectedIndex = selectedMovieIndex)
    : null;

  // update count and total price
  updateSelectedCount();
};

// saved selected movie data and price
const setMovieData = (movieIndex, moviePrice) => {
  localStorage.setItem("selectedMovieIndex", movieIndex);
};

const updateSelectedCount = () => {
  const selectedSeat = document.querySelectorAll(".row .seat.selected");
  const seatIndex = [...selectedSeat].map((seat) => [...seats].indexOf(seat));

  localStorage.setItem("selectedSeats", JSON.stringify(seatIndex));

  // console.log(seatIndex);
  const selectedSeatsCount = +selectedSeat.length;
  count.innerText = selectedSeatsCount;
  total.innerText = +selectedSeatsCount * ticketPrice;
};

const seatSelectHandler = (event) => {
  event.target.classList.contains("seat") &&
  !event.target.classList.contains("occupied")
    ? event.target.classList.toggle("selected")
    : "";
  updateSelectedCount();
};

const updateTickerPrice = (event) => {
  ticketPrice = +event.target.value;
  updateSelectedCount();
  setMovieData(event.target.selectedIndex, ticketPrice);
  // setMovieData(event.target);
};

container.addEventListener("click", seatSelectHandler);
movieSelect.addEventListener("change", updateTickerPrice);

populateUI();
