import axios from 'axios';

let storeUrl;

const getParameterByName = (name, url = window.location.href) => {
  name = name.replace(/[[]]/g, '\\$&');

  const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)')
  const results = regex.exec(url);

  if (!results) return null;
  if (!results[2]) return '';

  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

const getStoreUrl = () => {
  if (storeUrl) {
    return storeUrl;
  }

  let url = getParameterByName('storeUrl');

  if (!url && window.location.href.match(/.+?\/displays\/(.+)/)) {
    return 'https://s3.amazonaws.com/store.getchute.com/' + window.location.href.match(/.+?\/displays\/(.+)/)[1];
  }

  return url;
}

export const setStoreUrl = value => {
  storeUrl = value;
}

export const getChuteConfig = () => {
  const url = getStoreUrl();

  if (!url) {
    return new Promise((resolve, reject) => reject('No storeUrl'));
  }

  return axios.get(url).then(response => response.data);
}
