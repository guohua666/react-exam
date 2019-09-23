/*
 * @Author: xub
 * @Date: 2019-09-03 11:19:38
 * @Last Modified by: jiaze
 * @Last Modified time: 2019-09-12 09:30:26
 */

import "@/assets/css/grade/student.css";
import { student } from '@/api/setClass';
import React, { Component } from "react";
import { Form, Input, Select, Button, Table, message, Popconfirm } from "antd";
import { serchStudent, delStudent, getClass, getRoomList } from '@/api/classManage';

const { Option } = Select;
@Form.create({ name: "horizontal_login" })
class Student extends Component {
  state = {
    list: [],
    rooms: [],
    grade: []
  };

  componentDidMount() {
    getClass().then(res => {
      this.setState({
        grade: res.data.result
      })
    })
    //room列表
    getRoomList().then(res => {
      this.setState({
        rooms: res.data.result
      });
    });
    this.props.form.validateFields();
    student().then(res => {
      this.setState({
        list: res.data.user
      });
    });
  }
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      serchStudent(values).then(res => {
        this.setState({
          list: res.data.result
        })
      })
    });
  };
  confirm = (rec) => {
    console.log(rec)
    delStudent(rec).then(res => {
      student().then(res => {
        this.setState({
          list: res.data.user
        });
      });
    })
    message.success('删除成功');
  }

  cancel = (e) => {
    message.error('取消删除');
  }

  render() {
    const columns = [
      {
        title: "姓名",
        dataIndex: "name",
        key: "name"
      },
      {
        title: "学号",
        dataIndex: "student_number",
        key: "student_number"
      },
      {
        title: "班级",
        dataIndex: "class_number",
        key: "class_number"
      },
      {
        title: "教室",
        dataIndex: "classroom",
        key: "classroom"
      },
      {
        title: "密码",
        dataIndex: "password",
        key: "password"
      },
      {
        title: "操作",
        dataIndex: "operation",
        key: "operation",
        render: (text, record) => (
          <span>
            <Popconfirm
              title="确定删除吗?"
              onConfirm={() => this.confirm(record)}
              onCancel={this.cancel}
              okText="Yes"
              cancelText="No"
            >
              <span className="cus" >{text}</span>
            </Popconfirm>

          </span>
        )
      }
    ];
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="studentManage">
        <h3 className="h3">学生管理</h3>
        <div className="top">
          <Form layout="inline" onSubmit={this.handleSubmit} >
            <Form.Item>
              {getFieldDecorator("name", {
              })(<Input placeholder="输入学生姓名" style={{ height: 32 }} />)
              }
            </Form.Item>
            <Form.Item className="wid">
              {getFieldDecorator("room", {

              })(
                <Select
                  className="select1"
                  placeholder="教室号"
                  onChange={this.handleSelectChange}
                >
                  {
                    this.state.rooms.map((item, index) => {
                      return <Option value={item.room_name} key={item.room_id}>{item.room_name}</Option>
                    })
                  }
                </Select>
              )}
            </Form.Item>
            <Form.Item className="wid">
              {getFieldDecorator("banji", {

              })(<Select
                className="select1"
                placeholder="班级号"
                onChange={this.handleSelectChange}
              >
                {
                  this.state.grade.map((item, index) => {
                    return <Option value={item.class} key={item.id}>{item.class}</Option>
                  })
                }
              </Select>)
              }
            </Form.Item>
            <Form.Item>
              <Button htmlType='submit' type="primary">搜索</Button>
            </Form.Item>
            <Form.Item>
              <Button type="primary" onClick={() => {
                this.props.form.resetFields();
                student().then(res => {
                  this.setState({
                    list: res.data.user
                  });
                });
              }}>重置</Button>
            </Form.Item>
          </Form>
        </div>
        <div className="button">
          <Table columns={columns} dataSource={this.state.list} />
        </div>
      </div>
    );
  }
}

export default Student;
