const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");

const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");
const ticketPrice = +movieSelect.value;

const seatSelectHandler = (event) => {
  event.target.classList.contains("seat") &&
  !event.target.classList.contains("occupied")
    ? event.target.classList.toggle("selected")
    : "";
};

container.addEventListener("click", seatSelectHandler);

console.log(ticketPrice);
