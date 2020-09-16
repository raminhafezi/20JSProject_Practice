'use strict';

const index = require('./index-337108d5.js');

/*
 Stencil Client Patch Browser v2.0.3 | MIT Licensed | https://stenciljs.com
 */
const patchBrowser = () => {
    const importMeta = (typeof document === 'undefined' ? new (require('u' + 'rl').URL)('file:' + __filename).href : (document.currentScript && document.currentScript.src || new URL('raha-exchange-rate.cjs.js', document.baseURI).href));
    const opts =  {};
    if ( importMeta !== '') {
        opts.resourcesUrl = new URL('.', importMeta).href;
    }
    return index.promiseResolve(opts);
};

patchBrowser().then(options => {
  return index.bootstrapLazy([["raha-exchange-rate.cjs",[[1,"raha-exchange-rate",{"image":[1],"exchangeText":[1,"exchange-text"],"currenyOneSymbol":[32],"currenyTwoSymbol":[32],"rate":[32],"amountOneValue":[32],"amountTwoValue":[32],"whoChanged":[32]}]]]], options);
});
