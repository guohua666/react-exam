/*
 * @Author: jiaze 
 * @Date: 2019-09-03 11:53:07 
 * @Last Modified by: jiaze
 * @Last Modified time: 2019-09-07 11:56:16
 */

import axios from 'axios';

import {
    getSession
} from '@/util';

const defaultParams = {
    type: 1
}

/**
 *@name 用户登录接口
 * @param {payload} Object
 */
export function userLogin(payload) {
    const url = '/user/login';
    return axios.post(url, {
        ...defaultParams,
        ...payload
    });
}

/**
 * @name 获取用户列表
 */
export async function getShow() {
    const url = '/api/list';
    const token = getSession('token');
    const id = getSession('id');
    const result = await axios.post(url, null, {
        headers: {
            token,
            id
        }
    });
    return result;
}