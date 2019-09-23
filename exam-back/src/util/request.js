/*
 * @Author: xiaoyu 
 * @Date: 2019-09-03 15:11:00 
 * @Last Modified by: jiaze
 * @Last Modified time: 2019-09-07 12:01:02
 */

import qs from 'qs';
import axios from 'axios';
import { message } from 'antd';
import Cookies from "js-cookie"
import { responseText } from './config';

const getToken = () => (Cookies.get('token') == null ? '' : Cookies.get('token'));
const request = axios.create({
    timeout: 5000
});

//拦截请求
request.interceptors.request.use(config => {
    const token = getToken();
    config.method === 'post'
        ? (config.data = qs.stringify({ ...config.data }))
        : (config.params = { ...config.params });
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    config.headers['authorization'] = token;
    if (!token.length) {
        message.error('你还没有登录，没有权限访问');
        window.location.href = '#/login';
    }
    return config;
});

//拦截响应
request.interceptors.response.use(
    res => {
        if (res.status === 401 || res.status === 500) {
            message[responseText[res.status].type](
                responseText[res.status].message
            );
        }
        return res;
    },
    err => {
        return Promise.reject(err);
    }
);

export default request;
