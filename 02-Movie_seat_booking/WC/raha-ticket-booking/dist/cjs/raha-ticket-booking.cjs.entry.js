'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-6cfb0f7d.js');

const rahaTicketBookingCss = "@import url('https://fonts.googleapis.com/css2?family=Lato&display=swap');*{-webkit-box-sizing:border-box;box-sizing:border-box;}:host{--background-color:#242333;--seat-reserved-color:whitesmoke;--seat-booked-color:#6feaf6;--show-case-bg-color:rgba(0, 0, 0, 0.1);--screen-bg-color:rgb(205 203 203);--cancel-btn-color:rgb(201 79 79);--confirm-btn-color:rgb(28, 184, 65);background-color:var(--background-color, lightgrey);display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;color:white;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;min-height:100vh;font-family:'lato', 'sans-serif';margin:0}.movie-container{margin:20px 0}.movie-container select{background:var(--seat-reserved-color, white);border:0;border-radius:5px;font-size:14px;margin-left:10px;padding:5px 15px;-moz-appearance:none;-webkit-appearance:none;appearance:none}.container{-webkit-perspective:800px;perspective:800px;margin-bottom:30px}.seat{background:#444451;height:12px;width:15px;margin:3px;border-top-left-radius:10px;border-top-right-radius:10px}.seat.booked{background:var(--seat-booked-color, lightblue)}.seat.reserved{background:white}.seat:nth-of-type(2){margin-right:18px}.seat:nth-last-of-type(2){margin-left:18px}.seat:not(.reserved):hover{cursor:pointer;-webkit-transform:scale(1.3);transform:scale(1.3)}.showcase .seat:not(.reserved):hover{cursor:default;-webkit-transform:scale(1);transform:scale(1)}.showcase{background:var(--show-case-bg-color, darkgrey);padding:5px 10px;border-radius:5px;color:#777;list-style-type:none;display:-ms-flexbox;display:flex;-ms-flex-pack:justify;justify-content:space-between}.showcase li{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;margin:0px 10px}.showcase li small{margin-left:5px}.screen{background:var(--screen-bg-color, lightgrey);height:170px;width:100%;margin:15px 0;-webkit-transform:rotateX(-60deg);transform:rotateX(-60deg);-webkit-box-shadow:0 3px 10px rgba(255, 255, 255, 0.7);box-shadow:0 3px 10px rgba(255, 255, 255, 0.7)}p.text{margin:5px o}p.text span{color:#6feaf6}.row{display:-ms-flexbox;display:flex}.ticketsSummary{margin-top:2px;padding:2px 10px;}.screen li{color:black;border-left:1px solid red;list-style-type:none;padding:8px 0px;padding-left:10px;font-size:x-small}.screen li:last-child{color:red;font-style:oblique;-moz-text-align-last:end;text-align-last:end;text-decoration:underline;font-size:smaller}.button{border-radius:4px;text-shadow:0 1px 1px rgba(0, 0, 0, 0.12)}.button:hover{cursor:pointer}.button.success{background:var(--confirm-btn-color, lightgreen)}.button.error{background:var(--cancel-btn-color, red)}";

const MyComponent = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.bookingConfirm = index.createEvent(this, "bookingConfirm", 7);
        this.rows = 8;
        this.columns = 9;
        this.defaultSeatsPosition = [
            {
                name: 'Avengers: Engdame',
                price: 10,
                reserved: [1, 2, 3, 4, 5],
                booked: [],
            },
            { name: 'Joker ', price: 12, reserved: [15, 16, 9, 2], booked: [] },
            { name: 'Toy Story 4', price: 8, reserved: [1], booked: [] },
            {
                name: 'The Lion King',
                price: 9,
                reserved: [24, 25, 26, 27, 28],
                booked: [],
            },
        ];
        this.selectedMovieIndex = 0;
        this.currentSeatPosition = JSON.parse(JSON.stringify(this.defaultSeatsPosition));
        this.bookedSeats = [];
        this.count = 0;
        this.total = 0;
    }
    // Add-Remove booked-clicked seat color to blue by toggling CSS class!.
    toggleBookedCssClass(event) {
        if (event.target.classList.contains('seat') && !event.target.classList.contains('reserved')) {
            event.target.classList.toggle('booked');
            this.currentSeatPosition[this.selectedMovieIndex].booked = this.bookedSeatsIndex();
            this.calculateReceipt();
            localStorage.setItem('currentSeatsPosition', JSON.stringify(this.currentSeatPosition));
        }
    }
    bookedSeatsIndex() {
        // get index of the booked seat
        let seats = Array.from(this.container.querySelectorAll('.row .seat'));
        let bookedSeats = Array.from(this.container.querySelectorAll('.row .seat.booked'));
        const bookedSeatIndex = [...bookedSeats].map(seat => [...Array.from(seats)].indexOf(seat));
        return bookedSeatIndex;
    }
    // update reserved, booked seats CSS class based on a new selected movie
    movieChangeandler(event) {
        this.selectedMovieIndex = event.target.selectedIndex;
        this.updateUI();
    }
    // responde to change, when new movie selected
    updateUI() {
        this.cleanCssClass();
        this.updateCssClass();
    }
    // clean booked and reserved seats CSS class,
    cleanCssClass() {
        // user Array.from() so we can use spread(...) operator on it
        let seats = Array.from(this.container.querySelectorAll('.row .seat'));
        seats.forEach(seat => {
            seat.classList.remove('booked');
            seat.classList.remove('reserved');
        });
    }
    // based on the selected movie, retrieve from currentSeatPosition, booked and reserved seat index and update their CSS class accordingly.
    updateCssClass() {
        let seats = Array.from(this.container.querySelectorAll('.seat'));
        let reservedSeatsIndex = this.currentSeatPosition[this.selectedMovieIndex].reserved;
        let bookedSeatsIndex = this.currentSeatPosition[this.selectedMovieIndex].booked;
        reservedSeatsIndex.forEach(seatIndex => {
            seats[seatIndex].classList.add('reserved');
        });
        bookedSeatsIndex.forEach(seatIndex => {
            seats[seatIndex].classList.add('booked');
        });
        this.calculateReceipt();
    }
    componentDidLoad() {
        this.updateUI();
    }
    calculateReceipt() {
        let receiptText = '';
        //generate each line on the receipt based on currentSeatState.movieIndex.booked if length > 0, generate an <li> for each movie. Object.entries makes an array from an Object, so we can user forEach()
        let currentSeatPositionArray = Object.entries(this.currentSeatPosition);
        currentSeatPositionArray.forEach(el => {
            if (el[1].booked.length > 0) {
                receiptText += `<li> <strong> ${el[1].name}, </strong>${el[1].booked.length} * ${el[1].price}$ = ${el[1].booked.length * el[1].price}$</li>`;
            }
        });
        // Calculate total cost of the tickets.
        this.total = currentSeatPositionArray.reduce((total, el) => {
            el[1].booked.length > 0 ? (total += +el[1].price * el[1].booked.length) : total;
            return total;
        }, 0);
        // calculate Tickets Qty
        this.count = currentSeatPositionArray.reduce((total, el) => {
            el[1].booked.length > 0 ? (total += el[1].booked.length) : total;
            return total;
        }, 0);
        //update last line of the receipt, total cost
        this.total > 0 ? (receiptText += `<li> TOTAL Cost = ${this.total} $</li>`) : null;
        this.displayOnScreen(receiptText);
    }
    // update screen li elements with new receipt.
    displayOnScreen(receipt) {
        this.screen.innerHTML = receipt;
    }
    //Generate Seat Formation and passed as JSX to display on render method.
    seatPositionElement() {
        let rowList = [];
        let columnList = [];
        for (let row = 0; row < this.rows; row++) {
            for (let column = 0; column < this.columns; column++) {
                columnList.push(index.h("div", { class: { seat: true } }));
            }
            rowList.push(index.h("div", { class: "row" }, columnList));
            columnList = [];
        }
        return rowList;
    }
    //Generate Movie Drop Down based on name and price
    movieDropDownElement() {
        let optionElement = [];
        let arr = Object.entries(this.currentSeatPosition);
        arr.forEach(el => {
            optionElement.push(index.h("option", null, el[1].name, " ", index.h("strong", null, "(", el[1].price, "$)")));
        });
        return optionElement;
    }
    // return currentSeatPosition to its original from defaultSeatPosition, wiped-out every booked seat and update UI
    cancelBtnHandler() {
        this.currentSeatPosition = JSON.parse(JSON.stringify(this.defaultSeatsPosition));
        this.updateUI();
    }
    //Clone currentSeatStaus, merge booked seat into reserved seat, re-write currentSeatPosition, and update UI, the next step is user go through payment gate
    confirmBtnHandler() {
        let eventBody = [];
        let tempArr = Object.entries(this.currentSeatPosition);
        tempArr.forEach(el => {
            if (+el[1].booked.length > 0) {
                eventBody.push({ name: el[1].name, Quantity: el[1].booked.length, Seat_Number: [...el[1].booked], Cost: el[1].booked.length * el[1].price });
            }
        });
        eventBody.unshift({ Number_of_tickets: this.count, Total_Cost: this.total });
        this.bookingConfirm.emit(eventBody);
        console.log(eventBody);
        let arr = JSON.parse(JSON.stringify(this.currentSeatPosition));
        arr.forEach(el => {
            el.reserved = JSON.parse(JSON.stringify(el.reserved.concat(el.booked)));
            el.booked = [];
        });
        this.currentSeatPosition = JSON.parse(JSON.stringify(arr));
        this.updateUI();
    }
    render() {
        return [
            index.h("div", { class: "movie-container" }, index.h("label", null, " Pick a Movie"), index.h("select", { name: "movie", id: "movie", onChange: event => this.movieChangeandler(event) }, this.movieDropDownElement())),
            index.h("ul", { class: "showcase" }, index.h("li", null, index.h("div", { class: "seat" }), index.h("small", null, "N/A")), index.h("li", null, index.h("div", { class: "seat booked" }), index.h("small", null, "Select")), index.h("li", null, index.h("div", { class: "seat reserved" }), index.h("small", null, "Reserved"))),
            index.h("div", { class: "container", ref: el => {
                    this.container = el;
                }, onClick: event => this.toggleBookedCssClass(event) }, index.h("div", { class: "screen" }, index.h("ul", { class: "ticketsSummary", ref: el => (this.screen = el) })), this.seatPositionElement()),
            index.h("p", { class: "text" }, "You Select ", index.h("span", { id: "count" }, " ", this.count), " seats for the TOTAL price of", index.h("span", { id: "total" }, " ", this.total, " "), "$"),
            index.h("div", null, index.h("button", { id: "cancel", class: " button error", onClick: this.cancelBtnHandler.bind(this) }, "Cancel"), index.h("button", { id: "confirm", class: "button success", onClick: this.confirmBtnHandler.bind(this) }, "Confirm")),
        ];
    }
    static get watchers() { return {
        "rows": ["seatPositionElement"],
        "columns": ["seatPositionElement"]
    }; }
};
MyComponent.style = rahaTicketBookingCss;

exports.raha_ticket_booking = MyComponent;
