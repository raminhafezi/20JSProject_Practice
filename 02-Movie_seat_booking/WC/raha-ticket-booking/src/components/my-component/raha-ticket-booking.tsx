import { Component, Prop, h, State } from '@stencil/core';
// import { format } from '../../utils/utils';

@Component({
  tag: 'raha-ticket-booking',
  styleUrl: 'raha-ticket-booking.css',
  shadow: true,
})
export class MyComponent {
  @Prop({ reflectToAttr: true, mutable: true }) rows: number = 6;
  @Prop({ reflectToAttr: true, mutable: true }) columns: number = 8;
  @State() isReserved: boolean = false;
  @State() isBooked: boolean = true;

  private changeCssClass(event) {
    console.log(event);
    this.isBooked != this.isBooked;
  }
  render() {
    let columScript = `<div class="seat"></div>`.repeat(this.columns);
    let final = `<div class="row">${columScript}</div>`.repeat(this.rows);
    let document = new DOMParser().parseFromString(final, 'text/html');
    let main = document.querySelector('body').innerHTML;
    return [
      <div class="movie-container">
        <label> Pick a Movie</label>
        <select name="movie" id="movie">
          <option value="10">
            Avengers: Endgame <strong> (10$)</strong>
          </option>
          <option value="12">
            Joker <strong>(12$)</strong>
          </option>
          <option value="8">
            Toy Story 4 <strong> (8$)</strong>
          </option>
          <option value="9">
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
      <div class="container" onClick={event => this.changeCssClass(event)}>
        <div class="screen">
          <ul class="ticketsSummary"></ul>
        </div>
        {console.log(main)}

        <div class="row">
          <div class={{ seat: true, booked: true }}></div>
          <div class="seat"></div>
          <div class="seat"></div>
          <div class="seat"></div>
          <div class="seat"></div>
          <div class="seat"></div>
          <div class="seat"></div>
          <div class="seat"></div>
        </div>
        <div class="row">
          <div class="seat"></div>
          <div class="seat"></div>
          <div class="seat"></div>
          <div class="seat"></div>
          <div class="seat"></div>
          <div class="seat"></div>
          <div class="seat"></div>
          <div class="seat"></div>
        </div>
        <div class="row">
          <div class="seat"></div>
          <div class="seat"></div>
          <div class="seat"></div>
          <div class="seat"></div>
          <div class="seat"></div>
          <div class="seat"></div>
          <div class="seat"></div>
          <div class="seat"></div>
        </div>
        <div class="row">
          <div class="seat"></div>
          <div class="seat"></div>
          <div class="seat"></div>
          <div class="seat"></div>
          <div class="seat"></div>
          <div class="seat"></div>
          <div class="seat"></div>
          <div class="seat"></div>
        </div>
        <div class="row">
          <div class="seat"></div>
          <div class="seat"></div>
          <div class="seat"></div>
          <div class="seat"></div>
          <div class="seat"></div>
          <div class="seat"></div>
          <div class="seat"></div>
          <div class="seat"></div>
        </div>
        <div class="row">
          <div class="seat"></div>
          <div class="seat"></div>
          <div class="seat"></div>
          <div class="seat"></div>
          <div class="seat"></div>
          <div class="seat"></div>
          <div class="seat"></div>
          <div class="seat"></div>
        </div>
      </div>,
      <p class="text">
        You Select <span id="count"> 0</span> seats for the price of
        <span id="total"> 0 </span>$
      </p>,
    ];
  }
}
