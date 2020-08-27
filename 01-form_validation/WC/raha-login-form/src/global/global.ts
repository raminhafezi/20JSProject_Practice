export const FORM_TITLE = 'Register With Us';
export const MIN_USERNAME_LENGTH = 5;
export const MIN_PASS_STRONG = 10;
export const MIN_PASS_ACCEPTABLE = 6;
export const CHECK_EMAIL_RE = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const STRONG_PASS = new RegExp(`^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{${MIN_PASS_STRONG},})`);
export const MEDIUM_PASS = new RegExp(`^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{${MIN_PASS_ACCEPTABLE},})`);
export const USERNAME = /^[a-zA-Z][a-zA-Z0-9]+$/;
export const MSG = {
  PASSWORD_CHECK_ERROR_MSG: 'use more than 10 chars include !@#$%^&*',
  PASSWORD_CHECK_SUCCESS_MSG: 'password check passed',
  PASSWORD_LENGTH_ERROR_MSG: 'password length < 10',
  USERNAME_MIN_LENGTH_MSG: `minimum length is ${MIN_USERNAME_LENGTH} chars`,
  PASSWORD_MATCH_ERROR_MSG: 'passwords does not match',
  PASSWORD_MATCH_SUCCESS_MSG: 'passwords match',
  EMAIL_CHECK_ERROR_MSG: 'Email is not valid',
  EMAIL_CHECK_PASS_MSG: 'Email check passed',
  USERNAME_CHECK_ERROR_MSG: 'not in a valid format',
  USERNAME_CHECK_PASS_MSG: 'username check passed',
};
