import { p as promiseResolve, b as bootstrapLazy } from './index-9195fd94.js';

/*
 Stencil Client Patch Esm v2.0.3 | MIT Licensed | https://stenciljs.com
 */
const patchEsm = () => {
    return promiseResolve();
};

const defineCustomElements = (win, options) => {
  if (typeof window === 'undefined') return Promise.resolve();
  return patchEsm().then(() => {
  return bootstrapLazy([["raha-exchange-rate",[[1,"raha-exchange-rate",{"image":[1],"currenyOneSymbol":[32],"currenyTwoSymbol":[32],"rate":[32],"amountOneValue":[32],"amountTwoValue":[32],"whoChanged":[32],"exchangeText":[32]}]]]], options);
  });
};

export { defineCustomElements };
