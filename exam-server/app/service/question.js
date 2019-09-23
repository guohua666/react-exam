/*
 * @Author: xiaoyu 
 * @Date: 2019-09-06 21:33:34 
 * @Last Modified by: zhujiahui
 * @Last Modified time: 2019-09-10 20:04:55
 */

'use strict';

let md5 = require('md5');
const Service = require('egg').Service;

class QuestionService extends Service {
    /**
     * 考试类型
     */
    async examType() {
        let find = `select * from  exam_type `;
        let result = await this.app.mysql.query(find);
        return result;
    }
    /**
     * 课程类型
     */
    async subjectType() {
        let find = `select * from  subject `;
        let result = await this.app.mysql.query(find);
        return result;
    }
    /**
     * 题目类型
     */
    async topicType() {
        let find = `select * from  shiti `;
        let result = await this.app.mysql.query(find);
        return result;
    }
    /**
     * 添加试题
     * @param {*} topic 试题内容
     * @param {*} answer 试题答案
     * @param {*} select_subject 课程类型
     */
    async addquestion(
        iptval,
        topic,
        answer,
        select_exam,
        select_subject,
        select_topic,
        username
    ) {
        answer = md5(answer);
        let find = `select * from  subject where subject_name='${select_subject}'  `;
        let result = await this.app.mysql.query(find);
        let uid = result[0].uid;
        if (result.length) {
            let insert = `insert into question (question_name, question_type,question_class_type,question_exam_type,question_body,question_answer,user) values('${iptval}','${select_topic}','${select_subject}','${select_exam}','${topic}','${answer}','${username}') `;
            let result = await this.app.mysql.query(insert);
            return result;
        }
    }
    /**
     * 添加试题类型
     * @param {*} topic 试题内容
     * @param {*} answer 试题答案
     * @param {*} select_subject 课程类型
     */
    async addquestiontype(val) {
        let insert = `insert into shiti (typename) values('${val}') `;
        let result = await this.app.mysql.query(insert);
        return result;
    }
    /**
     * 查询的课程
     * @param {*} 
     */
    async findquestion(select_exam, select_topic, id) {
        let $find = `select * from  subject where id='${id}' `;
        let $result = await this.app.mysql.query($find);
        let subject_name = $result[0].subject_name;
        if (subject_name && select_topic && select_exam) {
            let find = `select * from  question where question_class_type='${subject_name}' and question_type='${select_topic}' and question_exam_type='${select_exam}' `;
            let result = await this.app.mysql.query(find);
            return result;
        }
        else if (subject_name && select_exam) {
            let find = `select * from  question where question_class_type='${subject_name}' and question_exam_type='${select_exam}' `;
            let result = await this.app.mysql.query(find);
            console.log(result)
            return result;
        }
        else if (subject_name && select_topic) {
            let find = `select * from  question where question_class_type='${subject_name}' and question_type='${select_topic}' `;
            let result = await this.app.mysql.query(find);

            return result;
        } else if (subject_name) {
            let find = `select * from  question where question_class_type='${subject_name}' `;
            let result = await this.app.mysql.query(find);
            return result;
        }
    }
    /**
     * 获取试题列表
     * @param {*} 
     */
    async getquestiontype() {
        let $find = `select * from  question  `;
        let $result = await this.app.mysql.query($find);
        return $result;
    }
    /**
     * 跳详情修改试题
     * @param {*} id 试题的id,
     *  @param {*} topic 试题内容
     * @param {*} answer 试题答案
     * @param {*} select_subject 课程类型
     */
    async detail(
        id,
        iptval,
        topic,
        answer,
        select_exam,
        select_subject,
        select_topic) {
        let find = `select * from  question where id='${id}'  `;
        let result = await this.app.mysql.query(find);
        const $sql = `update question set question_name='${iptval}',question_body='${topic}',question_answer='${answer}',question_exam_type='${select_exam}',question_class_type='${select_subject}',question_type='${select_topic}' where id=${id}`;
        let $result = await this.app.mysql.query($sql);
        return $result;
    }
}

module.exports = QuestionService;
