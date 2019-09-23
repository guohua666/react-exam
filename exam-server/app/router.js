/*
 * @Author: xiaoyu
 * @Date: 2019-09-03 16:42:46
 * @Last Modified by: jiaze
 * @Last Modified time: 2019-09-15 22:51:40
 */
'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
   const {
      router,
      controller
   } = app;
   //const oAuth = app.middleware.auth();
   /** 
    * @name 登录接口
    */
   router.post("/user/login", controller.userApi.login);
   /** 
    * @name 学生管理
    */
   router.get("/user/student", controller.grade.student);
   /** 
    * @name 教室管理
    */
   router.get("/user/classnumber", controller.grade.classnumber);
   /** 
    * @name 班级管理
    */
   router.get("/user/grade", controller.grade.grade);
   /** 
    * @name 班级管理页面删除
    */
   router.post('/class/remove', controller.classApi.remove);
   /** 
    * @name 班级管理添加数据
    */
   router.post('/class/add', controller.classApi.add);
   /** 
    * @name 获取考试列表
    */
   router.get('/exam/exam', controller.exam.examList);
   /** 
    * @name 试题分类
    */
   router.get('/exam/type', controller.exam.type);
   /** 
    * @name 考试类型/模糊搜索
    */
   router.post('/exam/search', controller.exam.search);
   /** 
    * @name 添加考试信息
    */
   router.post('/exam/addtest', controller.exam.addtest);
   /** 
    * @name 获取课程列表
    */
   router.get('/exam/subject', controller.exam.subject);
   /** 
   * @name 添加考试信息
   */
   router.post('/exam/addtest', controller.exam.addtest);
   /** 
    * @name 考试类型信息
    */
   router.get('/exam/examtype', controller.question.examType);
   /** 
   * @name 课程类型信息
   */
   router.get('/subject/type', controller.question.subjectType);
   /** 
    * @name 题目类型信息
    */
   router.get('/topic/type', controller.question.topicType);
   /** 
    * @name 添加考试试题
    */
   router.post('/question/addquestion', controller.question.addquestion);
   /** 
   * @name 添加试题类型
   */
   router.post('/question/addquestiontype', controller.question.addquestiontype);
   /** 
    * @name 获取试题列表
    */
   router.get('/question/questionList', controller.question.getquestion);
   /** 
   * @name 查询试题
   */
   router.post('/question/findquestion', controller.question.findquestion);
   /** 
  * @name 修改试题
  */
   router.post('/question/detail', controller.question.detail);
   /** 
    * @name 获取用户身份类型
    */
   router.post('/user/identityId', controller.userApi.identityId);
	/**
	 * @name 添加用户
	 */
   router.post('/user/addUser', controller.userApi.addUser);
	/**
	 * @name 查询所有用户
	 */
   router.get('/user/userInfo', controller.userApi.userInfo);
	/**
	 * @name 更新用户
	 */
   router.post('/user/updateUser', controller.userApi.updateUser);
	/**
	 * @name 添加api接口
	 */
   router.post('/user/addApi', controller.userApi.addApi);
	/**
	 * @name 查询用户身份权限
	 */
   router.get('/user/userIdentity', controller.userApi.userIdentity);
	/**
	 * @name 查询用api接口
	 */
   router.get('/user/apiAuthority', controller.userApi.apiAuthority);
   /**
     * @name 查询身份与api接口关系
     */
   router.get('/user/identityApiAuthority', controller.userApi.identityApiAuthority)
   /**
     * @name 查询视图接口
     */
   router.get('/user/viewAuthority', controller.userApi.viewAuthority);
	/**
	 * @name 查询身份与视图接口关系
	 */
  router.get(
    '/user/identityViewAuthority',
    controller.userApi.identityViewAuthority
  );
  /** xub
  * @name 获取课程列表
  */
  router.get('/grade/getSubject', controller.grade.getSubject);
  /**  xub
  * @name 获取教室
  */
  router.get('/grade/getRoom', controller.grade.getRoom);
  /**  xub
  * @name 获取教室
  */
 router.get('/grade/getRoomList', controller.grade.getRoomList);
   /**  xub
    * @name 获取班级列表
    */
   router.get('/grade/getClass', controller.grade.getClass);
   /**  xub
      * @name 添加班级
      */
   router.post('/grade/addBanClass', controller.grade.addBanClass);
   /**  xub
      * @name 删除班级
      */
   router.post('/grade/delGrade', controller.grade.delGrade);
   /**  xub
      * @name 删除班级
      */
   router.post('/grade/updateGrade', controller.grade.updateGrade);

   /**  xub
      * @name 添加教室
      */
   router.post('/grade/addRoom', controller.grade.addRoom);
   /**  xub
      * @name 删除教室
      */
   router.post('/grade/delRoom', controller.grade.delRoom);
   /**  xub
      * @name 搜索学生
      */
   router.post('/grade/serchStudent', controller.grade.serchStudent);
   /**  xub
      * @name 删除学生
      */
   router.post('/grade/delStudent', controller.grade.delStudent);
   /** 
    * @name 身份返回视图
    */
   router.get('/user/identityView/:id', controller.userApi.identityView);
   /** 
    * @name 获取详情试题数据
    */
   router.post('/exam/detailtest', controller.exam.detailtest);
};
