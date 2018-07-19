import axios from 'axios';

export const HTTP = axios.create({
  baseURL: `https://api.getchute.com/v2`
});
