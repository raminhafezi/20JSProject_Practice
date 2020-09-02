import { b as bootstrapLazy } from './index-5f037e66.js';
import { a as patchEsm } from './patch-89a80d38.js';

const defineCustomElements = (win, options) => {
  if (typeof window === 'undefined') return Promise.resolve();
  return patchEsm().then(() => {
  return bootstrapLazy([["raha-ticket-booking",[[1,"raha-ticket-booking",{"rows":[1538],"columns":[1538],"defaultSeatsPosition":[16],"currentSeatPosition":[1040],"selectedMovieIndex":[32],"bookedSeats":[32],"count":[32],"total":[32]}]]]], options);
  });
};

export { defineCustomElements };
