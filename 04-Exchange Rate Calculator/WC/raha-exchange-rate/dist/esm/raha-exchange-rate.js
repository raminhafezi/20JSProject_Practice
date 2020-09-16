import { p as promiseResolve, b as bootstrapLazy } from './index-9195fd94.js';

/*
 Stencil Client Patch Browser v2.0.3 | MIT Licensed | https://stenciljs.com
 */
const patchBrowser = () => {
    const importMeta = import.meta.url;
    const opts =  {};
    if ( importMeta !== '') {
        opts.resourcesUrl = new URL('.', importMeta).href;
    }
    return promiseResolve(opts);
};

patchBrowser().then(options => {
  return bootstrapLazy([["raha-exchange-rate",[[1,"raha-exchange-rate",{"image":[1],"exchangeText":[1,"exchange-text"],"currenyOneSymbol":[32],"currenyTwoSymbol":[32],"rate":[32],"amountOneValue":[32],"amountTwoValue":[32],"whoChanged":[32]}]]]], options);
});
