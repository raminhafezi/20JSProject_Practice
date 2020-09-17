import { p as promiseResolve, b as bootstrapLazy } from './index-b3bc482f.js';

/*
 Stencil Client Patch Esm v2.0.3 | MIT Licensed | https://stenciljs.com
 */
const patchEsm = () => {
    return promiseResolve();
};

const defineCustomElements = (win, options) => {
  if (typeof window === 'undefined') return Promise.resolve();
  return patchEsm().then(() => {
  return bootstrapLazy([["raha-random-users",[[1,"raha-random-users",{"data":[32]}]]]], options);
  });
};

export { defineCustomElements };
