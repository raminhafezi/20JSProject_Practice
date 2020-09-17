'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-a5ef87e0.js');

/*
 Stencil Client Patch Esm v2.0.3 | MIT Licensed | https://stenciljs.com
 */
const patchEsm = () => {
    return index.promiseResolve();
};

const defineCustomElements = (win, options) => {
  if (typeof window === 'undefined') return Promise.resolve();
  return patchEsm().then(() => {
  return index.bootstrapLazy([["raha-random-users.cjs",[[1,"raha-random-users",{"data":[32]}]]]], options);
  });
};

exports.defineCustomElements = defineCustomElements;
