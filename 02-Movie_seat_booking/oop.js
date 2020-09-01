class UpdateUi {
  constructor() {
    this.movieIndex = 0;
    this.bookedSeats = null;
    this._reservedSeats = null;
    this._displayScreen = null;
    this.seats = document.querySelectorAll(".row .seat");
    this._displayScreen = document.querySelector(".ticketsSummary");
  }

  //Clean CSS class to make it raedy for a new Selected movie
  cleanCssClass = () => {
    this.seats.forEach((seat) => {
      seat.classList.remove("booked");
      seat.classList.remove("reserved");
    });
  };

  //Apply new CSS Class based on currentSeatStatus based on a new selected movie
  updateCssClass = (seatStatus) => {
    this._reservedSeats = seatStatus[this.movieIndex].reserved;
    this._reservedSeats.forEach((seatIndex) => {
      this.seats[seatIndex].classList.add("reserved");
    });
    this.bookedSeats = seatStatus[this.movieIndex].booked;
    this.bookedSeats.forEach((seatIndex) => {
      this.seats[seatIndex].classList.add("booked");
    });
  };

  updateBookedSeatCscClass = (event) => {
    console.log(event);
    if (
      event.target.classList.contains("seat") &&
      !event.target.classList.contains("reserved")
    ) {
      if (event.target.classList.contains("booked")) {
        event.target.classList.remove("booked");
      } else {
        event.target.classList.add("booked");
      }
      return true;
    }
  };

  // In case of new selecred movie, wiped out previous and apply new style
  renderUI(seatFormation) {
    this.cleanCssClass();
    this.updateCssClass(seatFormation);
  }

  displayOnScreen(text) {
    this._displayScreen.innerHTML = text;
  }
}

class App extends UpdateUi {
  constructor() {
    super();
    this._container = document.querySelector(".container");
    this._movieSelect = document.getElementById("movie");
    this._currentSeatStatus = [
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
    this.addEventListener();
    this.updateCssClass(this._currentSeatStatus);
  }

  addEventListener = () => {
    this._container.addEventListener(
      "click",
      this.bookedSeatHandler.bind(event)
    );

    this._movieSelect.addEventListener(
      "change",
      this.changeMovieHandler.bind(event)
    );
  };

  bookedSeatHandler = (event) => {
    this.updateBookedSeatCscClass(event) ? this.updateCurretSeatStatus() : null;
  };

  changeMovieHandler = (event) => {
    this.movieIndex = event.target.selectedIndex;
    this.renderUI(this._currentSeatStatus);
  };

  updateCurretSeatStatus = () => {
    //Save booked seats into the _currentSeatStatus
    this.bookedSeats = document.querySelectorAll(".row .seat.booked");
    let seatIndex = [...this.bookedSeats].map((seat) =>
      [...this.seats].indexOf(seat)
    );
    this._currentSeatStatus[this._movieSelect.selectedIndex].booked = [
      ...seatIndex,
    ];

    //saved on the localStorage
    localStorage.setItem(
      "_currentSeatStatus",
      JSON.stringify(this._currentSeatStatus)
    );

    this.renderUI(this._currentSeatStatus);
    this.calculateReceipt();
  };

  //calculate receipts and update on the screen
  // screen update should be implemented in the updateUI
  calculateReceipt = () => {
    this.receiptText = null;

    //generate each line on the receipt based on currentSeatState.movieIndex.booked if length > 0, generate an <li> for each movie.
    this._currentSeatStatus.forEach((movie) => {
      if (movie.booked.length > 0) {
        this.receiptText += `<li> <strong>${movie.name} </strong>${
          movie.booked.length
        } * ${movie.price} = ${movie.booked.length * movie.price} $</li>`;
      }
    });

    // Calculate total cost of the tickets.
    let totalCost = this._currentSeatStatus.reduce((total, movie) => {
      movie.booked.length > 0
        ? (total += +movie.price * movie.booked.length)
        : total;
      return total;
    }, 0);

    // calculate Tickets Qty
    let totalTickets = this._currentSeatStatus.reduce((total, movie) => {
      movie.booked.length > 0 ? (total += movie.booked.length) : total;
      return total;
    }, 0);

    //Update the Summary line at the end of the page:
    count.innerText = totalTickets;
    total.innerText = totalCost;

    //update last line of the receipt, total cost
    totalCost > 0
      ? (this.receiptText += `<li> TOTAL Cost = ${totalCost} $</li>`)
      : null;

    // display receipt in the screen, attached to the <ul> via innerHMTL tag
    this.displayOnScreen(this.receiptText);
  };
}

new App();
