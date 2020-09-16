'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-337108d5.js');

/*
 Stencil Client Patch Esm v2.0.3 | MIT Licensed | https://stenciljs.com
 */
const patchEsm = () => {
    return index.promiseResolve();
};

const defineCustomElements = (win, options) => {
  if (typeof window === 'undefined') return Promise.resolve();
  return patchEsm().then(() => {
  return index.bootstrapLazy([["raha-exchange-rate.cjs",[[1,"raha-exchange-rate",{"image":[1],"exchangeText":[1,"exchange-text"],"currenyOneSymbol":[32],"currenyTwoSymbol":[32],"rate":[32],"amountOneValue":[32],"amountTwoValue":[32],"whoChanged":[32]}]]]], options);
  });
};

exports.defineCustomElements = defineCustomElements;
