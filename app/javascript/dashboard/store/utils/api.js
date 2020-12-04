/* eslint no-param-reassign: 0 */
import moment from 'moment';
import Cookies from 'js-cookie';
import { frontendURL } from '../../helper/URLHelper';

Cookies.defaults = { sameSite: 'Lax' };

const hostname = window.location.hostname.split('.');
const cookieDomain = hostname[2]
  ? '.' + hostname[1] + '.' + hostname[2]
  : '.' + window.location.hostname;

export const getLoadingStatus = state => state.fetchAPIloadingStatus;
export const setLoadingStatus = (state, status) => {
  state.fetchAPIloadingStatus = status;
};

export const setUser = (userData, expiryDate) =>
  Cookies.set('user', userData, {
    expires: expiryDate.diff(moment(), 'days'),
    domain: cookieDomain,
  });

export const getHeaderExpiry = response => moment.unix(response.headers.expiry);

export const setAuthCredentials = response => {
  const expiryDate = getHeaderExpiry(response);
  Cookies.set('auth_data', response.headers, {
    expires: expiryDate.diff(moment(), 'days'),
    domain: cookieDomain,
  });
  setUser(response.data.data, expiryDate);
};

export const clearCookiesOnLogout = () => {
  Cookies.remove('auth_data', {
    domain: cookieDomain,
  });
  Cookies.remove('user', {
    domain: cookieDomain,
  });
  window.location = frontendURL('login');
};
