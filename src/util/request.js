import axios from 'axios';
import TokenUtils from '@/util/token';

let blogBaseUrl = 'http://localhost:9002';

if (APP_EVN === 'dev') {
  blogBaseUrl = 'http://localhost:9002';
} else {
  blogBaseUrl = 'http://106.15.249.68:7001';
}

const blog = axios.create({
  baseURL: blogBaseUrl
});

blog.interceptors.request.use(config => {
  return config;
}, function (error) {
  return Promise.reject(error);
});

blog.interceptors.response.use(function (response) {
  const {
    code,
    data
  } = response.data;
  if (code === 200) {
    return data;
  } else {
    return Promise.reject(data);
  }
}, function (error) {
  return Promise.reject(error);
});

// ---------------------------------------------
// 个人网站axios实例
let baseUrl = 'http://localhost:7001';
if (APP_EVN === 'dev') {
  // baseUrl = 'http://localhost:7001';
  baseUrl = 'http://106.15.249.68:7001';
} else {
  baseUrl = 'http://106.15.249.68:7001';
}

const request = axios.create({
  baseURL: baseUrl
});

request.interceptors.request.use(config => {
  return config;
}, function (error) {
  return Promise.reject(error);
});

request.interceptors.response.use(function (response) {
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

const dataRequest = axios.create({ baseURL: APP_ENV.API_BASE_URL });

// Add a request interceptor
dataRequest.interceptors.request.use(config => {
  config.headers.Authorization = `Bearer ${TokenUtils.getToken()}`;
  // Do something before request is sent
  return config;
}, function (error) {
  return Promise.reject(error);
});

dataRequest.interceptors.response.use(function (response) {
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

export default dataRequest;

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
  request,
  blog
};

