import { b as bootstrapLazy } from './index-56226c7b.js';
import { p as patchBrowser, g as globalScripts } from './app-globals-f66dd5fd.js';

patchBrowser().then(options => {
  globalScripts();
  return bootstrapLazy([["raha-login-form",[[1,"raha-login-form",{"formTitle":[1040],"userNameValue":[1,"user-name-value"],"minUsernameLength":[2,"min-username-length"],"emailValue":[1,"email-value"],"emailIsValid":[1540,"email-is-valid"],"passwordValue":[1,"password-value"],"password2Value":[1,"password-2-value"],"minPassLength":[2,"min-pass-length"],"strongPassLegth":[2,"strong-pass-legth"],"passwordsMatch":[1540,"passwords-match"],"strongPass":[1540,"strong-pass"],"mediumPass":[1540,"medium-pass"],"submitBtn":[1040],"usernameIsValid":[32],"usernameRe":[32],"checkEmailRe":[32],"mediumPassRe":[32],"strongPassRe":[32],"passwordIsValid":[32]}]]]], options);
});
