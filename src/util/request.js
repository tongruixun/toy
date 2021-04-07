import axios from 'axios';
import TokenUtils from '@/util/token';

// 个人网站axios实例
const baseUrl = {
  dev: 'http://localhost:7001',
  pro: 'http://106.15.249.68:7001/'
};

const trxRequest = axios.create({
  baseURL: baseUrl.pro
});

trxRequest.interceptors.request.use(config => {
  return config;
}, function (error) {
  return Promise.reject(error);
});

trxRequest.interceptors.response.use(function (response) {
  const {
    success,
    data
  } = response.data;
  if (success) {
    return data;
  } else {
    return Promise.reject(data);
  }
}, function (error) {
  return Promise.reject(error);
});

// ------------------------------------------------------------------------------

// 监测云平台数据录入相关
const APP_ENV = {
  BASIC_AUTH_HEADER: 'Basic dGVzdF9jbGllbnQ6c2NyaXQ=',
};

const urls = {
  dev: '',
  test: 'http://192.168.10.65:9527',
  pro: 'http://gateway.zdjcyun.com'
};

APP_ENV.API_BASE_URL = urls.pro;

const request = axios.create({ baseURL: APP_ENV.API_BASE_URL });

// Add a request interceptor
request.interceptors.request.use(config => {
  config.headers.Authorization = `Bearer ${TokenUtils.getToken()}`;
  // Do something before request is sent
  return config;
}, function (error) {
  return Promise.reject(error);
});

request.interceptors.response.use(function (response) {
  const {
    code,
    msg
  } = response.data;
  console.log(code, msg);
  if (`${code}` === '401') {
    return Promise.reject(new Error('登录过期'));
  }

  if (`${code}` === '403') {
    return Promise.reject(new Error('无权限访问'));
  }

  if (`${code}` !== '200') {
    const err = new Error(msg || '请求错误');
    err.response = response;

    return Promise.reject(err);
  }

  return response.data;

}, function (error) {
  return Promise.reject(error);
});

export default request;

const login = axios.create({
  baseURL: APP_ENV.API_BASE_URL,
  headers: {
    Authorization: APP_ENV.BASIC_AUTH_HEADER
  }
});

login.interceptors.response.use(function (response) {
  const { code } = response.data;
  if (`${code}` === '401') {
    TokenUtils.removeToken();
    return Promise.reject(new Error('登录过期'));
  }
  return response.data;

}, function (error) {
  return Promise.reject(error);
});

export {
  login,
  trxRequest
};

