const container = document.querySelector(".container");
const allSeats = document.querySelectorAll(".row .seat");
const notOccupiedSeats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");
let ticketPrice = +movieSelect.value;

let preOccupiedSeats = [
  { name: "Avengers: Engdame", reserved: [1, 2, 3, 4, 5] },
  { name: "Joker ", reserved: [15, 16, 9, 2] },
  { name: "Toy Story 4", reserved: [1] },
  { name: "The Lion King", reserved: [20, 21, 22, 23, 24, 25, 26, 27, 28] },
];

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

  // fetch and save selected seat on localStorage
  const seatIndex = [...selectedSeat].map((seat) =>
    [...allSeats].indexOf(seat)
  );
};

const seatSelectHandler = (event) => {
  event.target.classList.contains("seat") &&
  !event.target.classList.contains("occupied")
    ? event.target.classList.toggle("selected")
    : "";

  updateSelectedCount();
};

const changeMovieHandler = (event) => {
  ticketPrice = +event.target.value;
  let reservedSeat =
    preOccupiedSeats[event.target.options.selectedIndex].reserved;
  //remove occupied Seat
  let occupiedSeats = document.querySelectorAll(".row .seat.occupied");
  occupiedSeats.forEach((seat) => {
    seat.classList.remove("occupied");
  });
  // change CSS class of the occupied seat
  reservedSeat.forEach((seatIndex) => {
    allSeats[seatIndex].classList.add("occupied");
  });

  updateSelectedCount();
};

// seat select event
container.addEventListener("click", seatSelectHandler);

//movie select event
movieSelect.addEventListener("change", changeMovieHandler.bind(event));
