import axios from "axios";
import TokenUtils from "@/util/token";

const APP_ENV = {
    BASIC_AUTH_HEADER: 'Basic dGVzdF9jbGllbnQ6c2NyaXQ=',
};

const urls = {
    dev: '',
    test: 'http://192.168.10.65:9527',
    pro: 'http://gateway.zdjcyun.com'
}

APP_ENV.API_BASE_URL = urls.test;

const request = axios.create({baseURL: APP_ENV.API_BASE_URL})

// Add a request interceptor
request.interceptors.request.use(config => {
    config.headers.Authorization = `Bearer ${TokenUtils.getToken()}`;
    // Do something before request is sent
    return config;
}, function (error) {
    return Promise.reject(error);
});

request.interceptors.response.use(function (response) {
    const {code, msg} = response.data;
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
})

export default request;


const login = axios.create({
    baseURL: APP_ENV.API_BASE_URL,
    headers: {
        Authorization: APP_ENV.BASIC_AUTH_HEADER
    }
})

login.interceptors.response.use(function (response) {
    const {code} = response.data;
    if (`${code}` === '401') {
        TokenUtils.removeToken();
        return Promise.reject(new Error('登录过期'));
    }
    return response.data;

}, function (error) {
    return Promise.reject(error);
})

export {
    login
};