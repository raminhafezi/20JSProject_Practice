'use strict';

const index = require('./index-6cfb0f7d.js');
const patch = require('./patch-ee303fa6.js');

patch.patchBrowser().then(options => {
  return index.bootstrapLazy([["raha-ticket-booking.cjs",[[1,"raha-ticket-booking",{"rows":[1538],"columns":[1538],"defaultSeatsPosition":[16],"currentSeatPosition":[1040],"selectedMovieIndex":[32],"bookedSeats":[32],"count":[32],"total":[32]}]]]], options);
});
