/*
 * @Author: xiaoyu 
 * @Date: 2019-09-03 16:37:18 
 * @Last Modified by: xiaoyu
 * @Last Modified time: 2019-09-15 19:20:07
 */
import request from "@/util/request";

/**
 * @name 获取试卷列表
 */
export function getTestList() {
    const url = '/exam/exam';
    return request.get(url)
}

/**
 * @name 获取试卷分类
 */
export function getTestClass(id) {
    const url = `/exam/type?id=${id}`;
    return request.get(url)
}

/**
 * @name 搜索考试类型
 */
export function getTestType(obj) {
    const url = '/exam/search';
    return request.post(url, obj)
}
/**
 * @name 添加考试
 */
export function addTest(obj) {
    const url = '/exam/addtest';
    return request.post(url, obj)
}
/**
 * @name 获取课程列表
 */
export function getSubject() {
    const url = '/exam/subject';
    return request.get(url)
}
/**
 * @name 获取详情试题数据
 */
export function getDetailTest(obj) {
    const url = '/exam/detailtest';
    return request.post(url, obj)
}
