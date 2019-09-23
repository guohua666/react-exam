/*
 * @Author: jiaze 
 * @Date: 2019-09-03 15:00:01 
 * @Last Modified by: jiaze
 * @Last Modified time: 2019-09-09 08:00:34
 */


import { Table } from 'antd';
import "@/assets/css/paper/paper.css";
import React, { Component } from 'react';

export class Paper extends Component {
  render() {
    const columns = [
      {
        title: '班级名',
        dataIndex: 'name_class',
        key: 'name_class',
      },
      {
        title: '课程名称',
        dataIndex: 'name_lesson',
        key: 'name_lesson',
      },
      {
        title: '阅卷状态',
        dataIndex: 'Marking_status',
        key: 'Marking_status',
      },
      {
        title: '成才率',
        dataIndex: 'talent',
        key: 'talent',
      }, {
        title: '操作',
        key: 'action',
        render: (text, record) => (
          <a href="/#/main/paper">
            批卷
          </a>
        ),
      },
    ];

    const data = [
      {
        key: '1',
        name_class: '1610C',
        name_lesson: "渐进式开发(react)",
        Marking_status: "",
        talent: '80%',
      }, {
        key: '2',
        name_class: '1610C',
        name_lesson: "渐进式开发(react)",
        Marking_status: "",
        talent: '80%',
      }, {
        key: '3',
        name_class: '1610C',
        name_lesson: "渐进式开发(react)",
        Marking_status: "",
        talent: '80%',
      },
    ];
    return (
      <>
        <h2 className="title">待批班级</h2>
        <div className="table">
          <Table columns={columns} dataSource={data} />
        </div>
      </>
    );
  }
}

export default Paper;
