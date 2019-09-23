/*
 * @Author: xiaoyu 
 * @Date: 2019-09-03 22:18:32 
 * @Last Modified by: xiaoyu
 * @Last Modified time: 2019-09-15 19:21:26
 */
'use strict';

const Service = require('egg').Service;

class ExamService extends Service {
  async examList() {
    const $sql = `select * from testlist`;
    const result = await this.app.mysql.query($sql);
    return result;
  }
  async type(id) {
    const $sql = `select * from testlist where type=?`;
    const result = await this.app.mysql.query($sql, [id]);
    return result;
  }
  async settype(uid) {
    const $sql = `update testlist set type='2' where uid='${uid}'`;
    const result = await this.app.mysql.query($sql);
    return result;
  }
  async search(testType, testObject) {
    const $sql = `select * from testlist where examtype=? and course=?`;
    const result = await this.app.mysql.query($sql, [testType, testObject]);
    return result;
  }
  async addCont(examtype, course) {
    const $sql = 'select * from question where question_exam_type=? and question_class_type=?';
    const result = await this.app.mysql.query($sql, [examtype, course]);
    return result;
  }
  async addClass(course) {
    const $sql = 'select * from grade where courseName=?'
    const result = await this.app.mysql.query($sql, [course]);
    return result;
  }
  async addtest(info, uid, class_test, createman, startdate, enddate, action, type, key, examtype, course, cont) {
    const $sql = `insert into testlist (info,uid,classtest,createman,startDate,endtDate,action,type,examtype,course,cont) values (?,?,?,?,?,?,?,?,?,?,?)`;
    const result = await this.app.mysql.query($sql, [info, uid, class_test, createman, startdate, enddate, action, type, examtype, course, cont]);
    return result;
  }
  async subject() {
    const $sql = `select * from subject`;
    const result = await this.app.mysql.query($sql);
    return result;
  }
  async detailtest(examtype, course) {
    const $sql = `select * from question where question_exam_type=? and question_class_type=?`;
    const result = await this.app.mysql.query($sql, [examtype, course]);
    return result;
  }

}

module.exports = ExamService;