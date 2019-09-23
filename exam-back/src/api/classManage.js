
import request from "@/util/request";
export const getRoom = () => {
    return request.get('/grade/getRoom');
};
export const getRoomList = () => {
    return request.get('/grade/getRoomList');
};
export const getSubject = () => {
    return request.get('/grade/getSubject');
};
export const getClass = () => {
    return request.get('/grade/getClass');
};
export const addBanClass = (params) => {
    return request.post('/grade/addBanClass',params);
};
export const delGrade = (id) => {
    return request.post('/grade/delGrade',{id});
};
export const updateGrade = (params) => {
    return request.post('/grade/updateGrade',params);
};
export const addRoom = (room) => {
    return request.post('/grade/addRoom',{room});
};
export const delRoom = (room) => {
    return request.post('/grade/delRoom',{room});
};
export const serchStudent = (params) => {
    return request.post('/grade/serchStudent',params);
};
export const delStudent = (params) => {
    return request.post('/grade/delStudent',params);
};