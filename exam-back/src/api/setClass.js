/*
 * @Author: zgh 
 * @Date: 2019-09-03 21:11:05 
 * @Last Modified by: jiaze
 * @Last Modified time: 2019-09-07 11:55:35
 */

import request from "@/util/request";

export const getClass = () => {
    return request.get('/user/grade');
};
export const classnumber = () => {
    return request.get('/user/classnumber');
};
export const student = () => {
    return request.get('/user/student');
};

export const removeApi = params => {
    return request.post('/class/remove', { params });
};
export const addApi = params => {
    return request.post('/class/add', { ...params });
};
