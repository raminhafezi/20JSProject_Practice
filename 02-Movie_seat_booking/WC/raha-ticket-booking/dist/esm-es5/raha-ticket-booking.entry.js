var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import { r as registerInstance, c as createEvent, h } from './index-5f037e66.js';
var rahaTicketBookingCss = "@import url('https://fonts.googleapis.com/css2?family=Lato&display=swap');*{-webkit-box-sizing:border-box;box-sizing:border-box;}:host{--background-color:#242333;--seat-reserved-color:whitesmoke;--seat-booked-color:#6feaf6;--show-case-bg-color:rgba(0, 0, 0, 0.1);--screen-bg-color:rgb(205 203 203);--cancel-btn-color:rgb(201 79 79);--confirm-btn-color:rgb(28, 184, 65);background-color:var(--background-color, lightgrey);display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;color:white;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;min-height:100vh;font-family:'lato', 'sans-serif';margin:0}.movie-container{margin:20px 0}.movie-container select{background:var(--seat-reserved-color, white);border:0;border-radius:5px;font-size:14px;margin-left:10px;padding:5px 15px;-moz-appearance:none;-webkit-appearance:none;appearance:none}.container{-webkit-perspective:800px;perspective:800px;margin-bottom:30px}.seat{background:#444451;height:12px;width:15px;margin:3px;border-top-left-radius:10px;border-top-right-radius:10px}.seat.booked{background:var(--seat-booked-color, lightblue)}.seat.reserved{background:white}.seat:nth-of-type(2){margin-right:18px}.seat:nth-last-of-type(2){margin-left:18px}.seat:not(.reserved):hover{cursor:pointer;-webkit-transform:scale(1.3);transform:scale(1.3)}.showcase .seat:not(.reserved):hover{cursor:default;-webkit-transform:scale(1);transform:scale(1)}.showcase{background:var(--show-case-bg-color, darkgrey);padding:5px 10px;border-radius:5px;color:#777;list-style-type:none;display:-ms-flexbox;display:flex;-ms-flex-pack:justify;justify-content:space-between}.showcase li{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;margin:0px 10px}.showcase li small{margin-left:5px}.screen{background:var(--screen-bg-color, lightgrey);height:170px;width:100%;margin:15px 0;-webkit-transform:rotateX(-60deg);transform:rotateX(-60deg);-webkit-box-shadow:0 3px 10px rgba(255, 255, 255, 0.7);box-shadow:0 3px 10px rgba(255, 255, 255, 0.7)}p.text{margin:5px o}p.text span{color:#6feaf6}.row{display:-ms-flexbox;display:flex}.ticketsSummary{margin-top:2px;padding:2px 10px;}.screen li{color:black;border-left:1px solid red;list-style-type:none;padding:8px 0px;padding-left:10px;font-size:x-small}.screen li:last-child{color:red;font-style:oblique;-moz-text-align-last:end;text-align-last:end;text-decoration:underline;font-size:smaller}.button{border-radius:4px;text-shadow:0 1px 1px rgba(0, 0, 0, 0.12)}.button:hover{cursor:pointer}.button.success{background:var(--confirm-btn-color, lightgreen)}.button.error{background:var(--cancel-btn-color, red)}";
var MyComponent = /** @class */ (function () {
    function MyComponent(hostRef) {
        registerInstance(this, hostRef);
        this.bookingConfirm = createEvent(this, "bookingConfirm", 7);
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
    MyComponent.prototype.toggleBookedCssClass = function (event) {
        if (event.target.classList.contains('seat') && !event.target.classList.contains('reserved')) {
            event.target.classList.toggle('booked');
            this.currentSeatPosition[this.selectedMovieIndex].booked = this.bookedSeatsIndex();
            this.calculateReceipt();
            localStorage.setItem('currentSeatsPosition', JSON.stringify(this.currentSeatPosition));
        }
    };
    MyComponent.prototype.bookedSeatsIndex = function () {
        // get index of the booked seat
        var seats = Array.from(this.container.querySelectorAll('.row .seat'));
        var bookedSeats = Array.from(this.container.querySelectorAll('.row .seat.booked'));
        var bookedSeatIndex = __spreadArrays(bookedSeats).map(function (seat) { return __spreadArrays(Array.from(seats)).indexOf(seat); });
        return bookedSeatIndex;
    };
    // update reserved, booked seats CSS class based on a new selected movie
    MyComponent.prototype.movieChangeandler = function (event) {
        this.selectedMovieIndex = event.target.selectedIndex;
        this.updateUI();
    };
    // responde to change, when new movie selected
    MyComponent.prototype.updateUI = function () {
        this.cleanCssClass();
        this.updateCssClass();
    };
    // clean booked and reserved seats CSS class,
    MyComponent.prototype.cleanCssClass = function () {
        // user Array.from() so we can use spread(...) operator on it
        var seats = Array.from(this.container.querySelectorAll('.row .seat'));
        seats.forEach(function (seat) {
            seat.classList.remove('booked');
            seat.classList.remove('reserved');
        });
    };
    // based on the selected movie, retrieve from currentSeatPosition, booked and reserved seat index and update their CSS class accordingly.
    MyComponent.prototype.updateCssClass = function () {
        var seats = Array.from(this.container.querySelectorAll('.seat'));
        var reservedSeatsIndex = this.currentSeatPosition[this.selectedMovieIndex].reserved;
        var bookedSeatsIndex = this.currentSeatPosition[this.selectedMovieIndex].booked;
        reservedSeatsIndex.forEach(function (seatIndex) {
            seats[seatIndex].classList.add('reserved');
        });
        bookedSeatsIndex.forEach(function (seatIndex) {
            seats[seatIndex].classList.add('booked');
        });
        this.calculateReceipt();
    };
    MyComponent.prototype.componentDidLoad = function () {
        this.updateUI();
    };
    MyComponent.prototype.calculateReceipt = function () {
        var receiptText = '';
        //generate each line on the receipt based on currentSeatState.movieIndex.booked if length > 0, generate an <li> for each movie. Object.entries makes an array from an Object, so we can user forEach()
        var currentSeatPositionArray = Object.entries(this.currentSeatPosition);
        currentSeatPositionArray.forEach(function (el) {
            if (el[1].booked.length > 0) {
                receiptText += "<li> <strong> " + el[1].name + ", </strong>" + el[1].booked.length + " * " + el[1].price + "$ = " + el[1].booked.length * el[1].price + "$</li>";
            }
        });
        // Calculate total cost of the tickets.
        this.total = currentSeatPositionArray.reduce(function (total, el) {
            el[1].booked.length > 0 ? (total += +el[1].price * el[1].booked.length) : total;
            return total;
        }, 0);
        // calculate Tickets Qty
        this.count = currentSeatPositionArray.reduce(function (total, el) {
            el[1].booked.length > 0 ? (total += el[1].booked.length) : total;
            return total;
        }, 0);
        //update last line of the receipt, total cost
        this.total > 0 ? (receiptText += "<li> TOTAL Cost = " + this.total + " $</li>") : null;
        this.displayOnScreen(receiptText);
    };
    // update screen li elements with new receipt.
    MyComponent.prototype.displayOnScreen = function (receipt) {
        this.screen.innerHTML = receipt;
    };
    //Generate Seat Formation and passed as JSX to display on render method.
    MyComponent.prototype.seatPositionElement = function () {
        var rowList = [];
        var columnList = [];
        for (var row = 0; row < this.rows; row++) {
            for (var column = 0; column < this.columns; column++) {
                columnList.push(h("div", { class: { seat: true } }));
            }
            rowList.push(h("div", { class: "row" }, columnList));
            columnList = [];
        }
        return rowList;
    };
    //Generate Movie Drop Down based on name and price
    MyComponent.prototype.movieDropDownElement = function () {
        var optionElement = [];
        var arr = Object.entries(this.currentSeatPosition);
        arr.forEach(function (el) {
            optionElement.push(h("option", null, el[1].name, " ", h("strong", null, "(", el[1].price, "$)")));
        });
        return optionElement;
    };
    // return currentSeatPosition to its original from defaultSeatPosition, wiped-out every booked seat and update UI
    MyComponent.prototype.cancelBtnHandler = function () {
        this.currentSeatPosition = JSON.parse(JSON.stringify(this.defaultSeatsPosition));
        this.updateUI();
    };
    //Clone currentSeatStaus, merge booked seat into reserved seat, re-write currentSeatPosition, and update UI, the next step is user go through payment gate
    MyComponent.prototype.confirmBtnHandler = function () {
        var eventBody = [];
        var tempArr = Object.entries(this.currentSeatPosition);
        tempArr.forEach(function (el) {
            if (+el[1].booked.length > 0) {
                eventBody.push({ name: el[1].name, Quantity: el[1].booked.length, Seat_Number: __spreadArrays(el[1].booked), Cost: el[1].booked.length * el[1].price });
            }
        });
        eventBody.unshift({ Number_of_tickets: this.count, Total_Cost: this.total });
        this.bookingConfirm.emit(eventBody);
        console.log(eventBody);
        var arr = JSON.parse(JSON.stringify(this.currentSeatPosition));
        arr.forEach(function (el) {
            el.reserved = JSON.parse(JSON.stringify(el.reserved.concat(el.booked)));
            el.booked = [];
        });
        this.currentSeatPosition = JSON.parse(JSON.stringify(arr));
        this.updateUI();
    };
    MyComponent.prototype.render = function () {
        var _this = this;
        return [
            h("div", { class: "movie-container" }, h("label", null, " Pick a Movie"), h("select", { name: "movie", id: "movie", onChange: function (event) { return _this.movieChangeandler(event); } }, this.movieDropDownElement())),
            h("ul", { class: "showcase" }, h("li", null, h("div", { class: "seat" }), h("small", null, "N/A")), h("li", null, h("div", { class: "seat booked" }), h("small", null, "Select")), h("li", null, h("div", { class: "seat reserved" }), h("small", null, "Reserved"))),
            h("div", { class: "container", ref: function (el) {
                    _this.container = el;
                }, onClick: function (event) { return _this.toggleBookedCssClass(event); } }, h("div", { class: "screen" }, h("ul", { class: "ticketsSummary", ref: function (el) { return (_this.screen = el); } })), this.seatPositionElement()),
            h("p", { class: "text" }, "You Select ", h("span", { id: "count" }, " ", this.count), " seats for the TOTAL price of", h("span", { id: "total" }, " ", this.total, " "), "$"),
            h("div", null, h("button", { id: "cancel", class: " button error", onClick: this.cancelBtnHandler.bind(this) }, "Cancel"), h("button", { id: "confirm", class: "button success", onClick: this.confirmBtnHandler.bind(this) }, "Confirm")),
        ];
    };
    Object.defineProperty(MyComponent, "watchers", {
        get: function () {
            return {
                "rows": ["seatPositionElement"],
                "columns": ["seatPositionElement"]
            };
        },
        enumerable: false,
        configurable: true
    });
    return MyComponent;
}());
MyComponent.style = rahaTicketBookingCss;
export { MyComponent as raha_ticket_booking };
