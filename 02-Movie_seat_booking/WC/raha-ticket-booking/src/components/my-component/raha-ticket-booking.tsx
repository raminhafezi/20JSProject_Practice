import { Component, Prop, h, State, Watch } from '@stencil/core';
// import { format } from '../../utils/utils';

@Component({
  tag: 'raha-ticket-booking',
  styleUrl: 'raha-ticket-booking.css',
  shadow: true,
})
export class MyComponent {
  @Prop({ reflectToAttr: true, mutable: true }) rows: number = 8;
  @Prop({ reflectToAttr: true, mutable: true }) columns: number = 9;
  @Prop({ reflectToAttr: true, mutable: true }) defaultSeatsPosition: Array<Object> = [
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
  @State() selectedMovieIndex: number = 0;
  @Prop({ reflectToAttr: true, mutable: true }) currentSeatPosition: object = this.defaultSeatsPosition;
  @State() bookedSeats = [];
  @State() count: number = 0;
  @State() total: number = 0;
  container: HTMLElement;
  screen: HTMLElement;

  // Add-Remove booked-clicked seat color to blue by toggling CSS class!.
  private toggleBookedCssClass(event) {
    if (event.target.classList.contains('seat') && !event.target.classList.contains('reserved')) {
      event.target.classList.toggle('booked');
      this.currentSeatPosition[this.selectedMovieIndex].booked = this.bookedSeatsIndex();
      this.calculateReceipt();
      localStorage.setItem('currentSeatsPosition', JSON.stringify(this.currentSeatPosition));
      return true;
    }
  }

  // update reserved, booked seats CSS class based on a new selected movie
  private movieChangeandler(event) {
    this.selectedMovieIndex = event.target.selectedIndex;
    this.updateUI();
  }

  // responde to change, when new movie selected
  private updateUI() {
    this.cleanCssClass();
    this.updateCssClass();
  }

  // clean booked and reserved seats CSS class,
  private cleanCssClass() {
    // user Array.from() so we can use spread(...) operator on it
    let seats = Array.from(this.container.querySelectorAll('.row .seat'));
    seats.forEach(seat => {
      seat.classList.remove('booked');
      seat.classList.remove('reserved');
    });
  }

  // based on the selected movie, retrieve from currentSeatPosition, booked and reserved seat index and update their CSS class accordingly.
  private updateCssClass() {
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

  private bookedSeatsIndex() {
    // get index of the booked seat
    let seats = Array.from(this.container.querySelectorAll('.row .seat'));
    let bookedSeats = Array.from(this.container.querySelectorAll('.row .seat.booked'));
    const bookedSeatIndex = [...bookedSeats].map(seat => [...Array.from(seats)].indexOf(seat));

    return bookedSeatIndex;
  }

  componentDidLoad() {
    this.updateUI();
  }

  //Generate Seat Formation and passed as JSX to display on render method.
  @Watch('rows')
  @Watch('columns')
  private generateSeatPosition() {
    let rowList = [];
    let columnList = [];
    for (let row = 0; row < this.rows; row++) {
      for (let column = 0; column < this.columns; column++) {
        columnList.push(<div class={{ seat: true }}></div>);
      }
      rowList.push(<div class="row">{columnList}</div>);
      columnList = [];
    }
    return rowList;
  }

  calculateReceipt() {
    let receiptText = '';

    //generate each line on the receipt based on currentSeatState.movieIndex.booked if length > 0, generate an <li> for each movie.
    let newArr = Object.entries(this.currentSeatPosition);
    newArr.forEach(el => {
      if (el[1].booked.length > 0) {
        receiptText += `<li> <strong> ${el[1].name} </strong>${el[1].booked.length} * ${el[1].price} = ${el[1].booked.length * el[1].price}</li>`;
      }
    });
    // Calculate total cost of the tickets.
    this.total = newArr.reduce((total, el) => {
      el[1].booked.length > 0 ? (total += +el[1].price * el[1].booked.length) : total;
      return total;
    }, 0);

    // calculate Tickets Qty
    this.count = newArr.reduce((total, el) => {
      el[1].booked.length > 0 ? (total += el[1].booked.length) : total;
      return total;
    }, 0);

    //Update the Summary line at the end of the page:
    // this.count = this.count;
    // this.total = this.total;

    //update last line of the receipt, total cost
    this.total > 0 ? (receiptText += `<li> TOTAL Cost = ${this.total} $</li>`) : null;
    this.displayOnScreen(receiptText);
  }

  displayOnScreen(receipt) {
    this.screen.innerHTML = receipt;
  }

  render() {
    return [
      <div class="movie-container">
        <label> Pick a Movie</label>
        <select name="movie" id="movie" onChange={event => this.movieChangeandler(event)}>
          <option>
            Avengers: Endgame <strong> (10$)</strong>
          </option>
          <option>
            Joker <strong>(12$)</strong>
          </option>
          <option>
            Toy Story 4 <strong> (8$)</strong>
          </option>
          <option>
            The Lion King <strong> ($9)</strong>
          </option>
        </select>
      </div>,
      <ul class="showcase">
        <li>
          <div class="seat"></div>
          <small>N/A</small>
        </li>
        <li>
          <div class="seat booked"></div>
          <small>Select</small>
        </li>
        <li>
          <div class="seat reserved"></div>
          <small>Reserved</small>
        </li>
      </ul>,
      <div
        class="container"
        ref={el => {
          this.container = el;
        }}
        onClick={event => this.toggleBookedCssClass(event)}
      >
        <div class="screen">
          <ul class="ticketsSummary" ref={el => (this.screen = el)}></ul>
        </div>
        {this.generateSeatPosition()}
      </div>,
      <p class="text">
        You Select <span id="count"> {this.count}</span> seats for the price of
        <span id="total"> {this.total} </span>$
      </p>,
    ];
  }
}
