import { Component, Prop, h, State, Watch, Event } from '@stencil/core';
// import { format } from '../../utils/utils';
export class MyComponent {
    constructor() {
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
                columnList.push(h("div", { class: { seat: true } }));
            }
            rowList.push(h("div", { class: "row" }, columnList));
            columnList = [];
        }
        return rowList;
    }
    //Generate Movie Drop Down based on name and price
    movieDropDownElement() {
        let optionElement = [];
        let arr = Object.entries(this.currentSeatPosition);
        arr.forEach(el => {
            optionElement.push(h("option", null,
                el[1].name,
                " ",
                h("strong", null,
                    "(",
                    el[1].price,
                    "$)")));
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
            h("div", { class: "movie-container" },
                h("label", null, " Pick a Movie"),
                h("select", { name: "movie", id: "movie", onChange: event => this.movieChangeandler(event) }, this.movieDropDownElement())),
            h("ul", { class: "showcase" },
                h("li", null,
                    h("div", { class: "seat" }),
                    h("small", null, "N/A")),
                h("li", null,
                    h("div", { class: "seat booked" }),
                    h("small", null, "Select")),
                h("li", null,
                    h("div", { class: "seat reserved" }),
                    h("small", null, "Reserved"))),
            h("div", { class: "container", ref: el => {
                    this.container = el;
                }, onClick: event => this.toggleBookedCssClass(event) },
                h("div", { class: "screen" },
                    h("ul", { class: "ticketsSummary", ref: el => (this.screen = el) })),
                this.seatPositionElement()),
            h("p", { class: "text" },
                "You Select ",
                h("span", { id: "count" },
                    " ",
                    this.count),
                " seats for the TOTAL price of",
                h("span", { id: "total" },
                    " ",
                    this.total,
                    " "),
                "$"),
            h("div", null,
                h("button", { id: "cancel", class: " button error", onClick: this.cancelBtnHandler.bind(this) }, "Cancel"),
                h("button", { id: "confirm", class: "button success", onClick: this.confirmBtnHandler.bind(this) }, "Confirm")),
        ];
    }
    static get is() { return "raha-ticket-booking"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["raha-ticket-booking.css"]
    }; }
    static get styleUrls() { return {
        "$": ["raha-ticket-booking.css"]
    }; }
    static get properties() { return {
        "rows": {
            "type": "number",
            "mutable": true,
            "complexType": {
                "original": "number",
                "resolved": "number",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "rows",
            "reflect": true,
            "defaultValue": "8"
        },
        "columns": {
            "type": "number",
            "mutable": true,
            "complexType": {
                "original": "number",
                "resolved": "number",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "columns",
            "reflect": true,
            "defaultValue": "9"
        },
        "defaultSeatsPosition": {
            "type": "unknown",
            "mutable": false,
            "complexType": {
                "original": "{ name: string; price: number; reserved: number[]; booked: any[]; }[]",
                "resolved": "{ name: string; price: number; reserved: number[]; booked: any[]; }[]",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "defaultValue": "[\n    {\n      name: 'Avengers: Engdame',\n      price: 10,\n      reserved: [1, 2, 3, 4, 5],\n      booked: [],\n    },\n    { name: 'Joker ', price: 12, reserved: [15, 16, 9, 2], booked: [] },\n    { name: 'Toy Story 4', price: 8, reserved: [1], booked: [] },\n    {\n      name: 'The Lion King',\n      price: 9,\n      reserved: [24, 25, 26, 27, 28],\n      booked: [],\n    },\n  ]"
        },
        "currentSeatPosition": {
            "type": "unknown",
            "mutable": true,
            "complexType": {
                "original": "object",
                "resolved": "object",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "defaultValue": "JSON.parse(JSON.stringify(this.defaultSeatsPosition))"
        }
    }; }
    static get states() { return {
        "selectedMovieIndex": {},
        "bookedSeats": {},
        "count": {},
        "total": {}
    }; }
    static get events() { return [{
            "method": "bookingConfirm",
            "name": "bookingConfirm",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": ""
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }]; }
    static get watchers() { return [{
            "propName": "rows",
            "methodName": "seatPositionElement"
        }, {
            "propName": "columns",
            "methodName": "seatPositionElement"
        }]; }
}
