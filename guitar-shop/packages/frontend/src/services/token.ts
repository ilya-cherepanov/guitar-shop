import {AUTH_TOKEN_KEY_NAME} from '../constants';
import {Token} from '../types/token';


const getToken = (): Token => (
  localStorage.getItem(AUTH_TOKEN_KEY_NAME) ?? ''
);


const saveToken = (token: Token): void => (
  localStorage.setItem(AUTH_TOKEN_KEY_NAME, token)
);


const dropToken = (): void => (
  localStorage.removeItem(AUTH_TOKEN_KEY_NAME)
);


export {getToken, saveToken, dropToken};
