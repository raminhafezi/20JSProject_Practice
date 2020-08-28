const container = document.querySelector(".container");
const allSeats = document.querySelectorAll(".row .seat");
const notOccupiedSeats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");
let ticketPrice = +movieSelect.value;

// save selected movie index on DropDown for page reload.
const setMovieData = (movieIndex, moviePrice) => {
  localStorage.setItem("selectedMovieIndex", movieIndex);
};

// Save selected seat on localStorage,
const updateSelectedCount = () => {
  const selectedSeat = document.querySelectorAll(".row .seat.selected");
  const selectedSeatsCount = +selectedSeat.length;
  count.innerText = selectedSeatsCount;
  total.innerText = +selectedSeatsCount * ticketPrice;

  const seatIndex = [...selectedSeat].map((seat) =>
    [...allSeats].indexOf(seat)
  );
  console.log(seatIndex);
};

const seatSelectHandler = (event) => {
  event.target.classList.contains("seat") &&
  !event.target.classList.contains("occupied")
    ? event.target.classList.toggle("selected")
    : "";

  updateSelectedCount();
};

const updateTickerPrice = (event) => {
  ticketPrice = event.target.value;
  updateSelectedCount();
};

// seat select event
container.addEventListener("click", seatSelectHandler);

//movie select event
movieSelect.addEventListener("change", updateTickerPrice.bind(event));
