import axios from 'axios';

let service = axios.create({
  baseUrl: process.env.BASE_API,
  timeout: 5000
});

service.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    Promise.reject(error);
  }
);

service.interceptors.response.use(
  response => {
    let res = response.data;
    if (res.code === 0) {
      return Promise.resolve(res);
    } else if (res.code === 200) {
      return Promise.resolve(res);
    }
  },
  error => {
    return Promise.resolve(error.response);
  }
);

export default service;
