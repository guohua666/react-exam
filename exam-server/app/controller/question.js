'use strict';

const Controller = require('egg').Controller;

class QuestionController extends Controller {
    /**
     * 考试类型
     */
    async examType() {
        let result = await this.ctx.service.question.examType();
        this.ctx.body = {
            result
        };
    }
    /**
     * 课程类型
     */
    async subjectType() {
        let result = await this.ctx.service.question.subjectType();
        this.ctx.body = {
            result
        };
    }
    /**
     * 题目类型
     */
    async topicType() {
        let result = await this.ctx.service.question.topicType();
        this.ctx.body = {
            result
        };
    }
    /**
     * 添加试题
     */
    async addquestion() {
        let {
            iptval,
            topic,
            answer,
            select_exam,
            select_subject,
            select_topic,
            username,
        } = this.ctx.request.body;
        let result = await this.ctx.service.question.addquestion(
            iptval,
            topic,
            answer,
            select_exam,
            select_subject,
            select_topic,
            username
        );
        if (result) {
            this.ctx.body = {
                code: 1,
                msg: '添加成功'
            };
        } else {
            this.ctx.body = {
                code: 0,
                msg: '添加失败'
            };
        }
    }
    /**
     * 添加试题类型
     */
    async addquestiontype() {
        let { val } = this.ctx.request.body;
        let result = await this.ctx.service.question.addquestiontype(val);
        if (result) {
            this.ctx.body = {
                code: 1,
                msg: '添加类型成功'
            };
        } else {
            this.ctx.body = {
                code: 0,
                msg: '添加类型失败'
            };
        }
    }
    /**
    *获取试题列表
    */
    async getquestion() {
        let result = await this.ctx.service.question.getquestiontype()
        this.ctx.body = {
            result
        }
    }
    /**
     * 查询试题
     */
    async findquestion() {
        let { select_exam, select_topic, id } = this.ctx.request.body;
        let result = await this.ctx.service.question.findquestion(select_exam, select_topic, id);
        if (result.length) {
            this.ctx.body = {
                code: 1,
                result,
                msg: '找到相关试题'
            };
        } else {
            this.ctx.body = {
                code: 0,
                msg: '没有查到相关试题'
            };
        }
    }
    /**
    *跳详情修改试题列表
    */
    async detail() {
        let {
            id,
            iptval,
            topic,
            answer,
            select_exam,
            select_subject,
            select_topic
        } = this.ctx.request.body;
        let result = await this.ctx.service.question.detail(
            id,
            iptval,
            topic,
            answer,
            select_exam,
            select_subject,
            select_topic);
        if (result) {
            this.ctx.body = {
                code: 1,
                msg: '编辑试题成功'
            };
        } else {
            this.ctx.body = {
                code: 0,
                msg: '编辑试题失败'
            };
        }
    }
}
module.exports = QuestionController;
