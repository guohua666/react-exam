/*
 * @Author: xiaoyu 
 * @Date: 2019-09-03 22:18:42 
 * @Last Modified by: xiaoyu
 * @Last Modified time: 2019-09-15 19:23:02
 */
'use strict';

const Controller = require('egg').Controller;

class ExamController extends Controller {
  async examList() {
    const result = await this.ctx.service.exam.examList();
    const nowDate = +new Date();
    result.forEach(item => {
      if (item.endtDate < nowDate) {
        this.ctx.service.exam.settype(item.uid);
      }
    })
    this.ctx.body = {
      code: 1,
      result
    }
  }
  async type() {
    const {
      id
    } = this.ctx.request.query;
    const result = await this.ctx.service.exam.type(id);
    this.ctx.body = {
      code: 1,
      result
    }
  }
  async search() {
    const {
      testType,
      testObject
    } = this.ctx.request.body;
    const result = await this.ctx.service.exam.search(testType, testObject);
    this.ctx.body = {
      code: 1,
      result
    }
  }
  async addtest() {
    const {
      info,
      createman,
      startdate,
      enddate,
      action,
      type,
      key,
      examtype,
      course,
      cont
    } = this.ctx.request.body;
    const result_cont = await this.ctx.service.exam.addCont(examtype, course);
    const result_class = await this.ctx.service.exam.addClass(course);
    const uid = +new Date();
    if (result_cont.length) {
      if (result_cont.length < cont) {
        this.ctx.body = {
          code: 0,
          msg: `试题仅有${result_cont.length}道,请去添加试题！`
        }
      } else {
        if (result_class.length) {
          const str_class = result_class.reduce((prev, item) => {
            return prev + ' ' + item.class;
          }, '')
          const class_test = `考试班级${str_class}`;
          const result = await this.ctx.service.exam.addtest(info, uid, class_test, createman, startdate, enddate, action, type, key, examtype, course, cont);
          this.ctx.body = {
            code: 1,
            msg: '添加成功',
            result
          }
        } else {
          this.ctx.body = {
            code: 0,
            msg: '暂无考试班级，请前去添加考试班级'
          }
        }

      }
    } else {
      this.ctx.body = {
        code: 0,
        msg: '暂无试题'
      }
    }

  }
  async subject() {
    const result = await this.ctx.service.exam.subject();
    this.ctx.body = {
      code: 1,
      result
    }
  }
  async detailtest() {
    const { examtype, course } = this.ctx.request.body;
    const result = await this.ctx.service.exam.detailtest(examtype, course);
    if (result.length) {
      this.ctx.body = {
        code: 1,
        msg: '获取试题成功',
        result
      }
    } else {
      this.ctx.body = {
        code: 0,
        msg: '暂无试题，请前去添加试题！'
      }
    }

  }
}

module.exports = ExamController;