/*
 * @Author: heinan
 * @Date: 2019-09-03 09:59:36
 * @Last Modified by: xiaoyu
 * @Last Modified time: 2019-09-15 19:29:00
 */

import 'antd/dist/antd.css';
import moment from 'moment';
import 'moment/locale/zh-cn';
import Cookies from 'js-cookie';
import React, { Component } from 'react';
import { addTest, getSubject } from '@/api/exam';
import { Form, Input, Button, Select, InputNumber, DatePicker, message } from 'antd';

moment.locale('zh-cn');
const { Option } = Select;
const { RangePicker } = DatePicker;
@Form.create({ name: 'normal_login' })

class addExam extends Component {
  state = {
    subjectList: [],
    startdate: null,
    enddate: null
  };

  handleSunject = () => {
    getSubject().then(res => {
      this.setState({
        subjectList: res.data.result
      })
    })
  };
  range = (start, end) => {
    const result = [];
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
  }
  disabledDate = (current) => {
    return current && current < moment().endOf('day');
  };
  disabledRangeTime = (_, type) => {
    if (type === 'start') {
      return {
        disabledHours: () => this.range(0, 60).splice(4, 20),
        disabledMinutes: () => this.range(30, 60),
        disabledSeconds: () => [55, 56],
      };
    }
    return {
      disabledHours: () => this.range(0, 60).splice(20, 4),
      disabledMinutes: () => this.range(0, 31),
      disabledSeconds: () => [55, 56],
    };
  };
  handleChange = (date, dateString) => {
    this.setState({
      startdate: dateString[0],
      enddate: dateString[1]
    })
  }
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const username = Cookies.get('username');
        const nowDate = +new Date();
        const active = nowDate > +new Date(this.state.enddate) ? '2' : '1';
        values.startdate = +new Date(this.state.startdate);
        values.enddate = +new Date(this.state.enddate);
        values.createman = username;
        values.action = '详情';
        values.type = active;
        addTest(values).then(({ data }) => {
          if (data.code) {
            message.success("添加成功");
            this.props.form.resetFields();
          } else {
            message.success(`${data.msg}`);
          }
        })
      }
    });
  };

  componentDidMount() {
    this.handleSunject();
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { subjectList } = this.state;
    return (
      <div className="addExam">
        <h2 className="top">添加考试</h2>
        <div className="bottom" style={{ paddingLeft: 30 }}>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Item label="试卷名称">
              {getFieldDecorator('info', {
                rules: [{ required: true, message: '请输入考试名称!' }],
              })(
                <Input />,
              )}
            </Form.Item>
            <Form.Item label="选择考试类型:" hasFeedback>
              {getFieldDecorator('examtype', {
                rules: [{ required: true, message: '请选择考试类型!' }],
              })(
                <Select className="select">
                  <Option value="周考一">周考一</Option>
                  <Option value="周考二">周考二</Option>
                  <Option value="周考三">周考三</Option>
                  <Option value="月考">月考</Option>
                </Select>,
              )}
            </Form.Item>
            <Form.Item label="选择课程:" hasFeedback>
              {getFieldDecorator('course', {
                rules: [{ required: true, message: '请选择课程!' }],
              })(
                <Select className="select">
                  {
                    subjectList.map(item => (
                      <Option value={item.subject_name} key={item.id}>{item.subject_name}</Option>
                    ))
                  }
                </Select>
              )}
            </Form.Item>
            <Form.Item label="设置题量:" hasFeedback>
              {getFieldDecorator('cont', {
                rules: [{ required: true, message: '请设置题量!' }],
              })(<InputNumber min={3} max={9} />)}
            </Form.Item>
            <Form.Item label="考试时间:" className="date" >
              {getFieldDecorator('dateTime', {
                rules: [{ required: true, message: '请设置题量!' }],
              })(<RangePicker
                disabledDate={this.disabledDate}
                disabledTime={this.disabledRangeTime}
                onChange={this.handleChange}
                showTime={{
                  hideDisabledOptions: true,
                  defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('11:59:59', 'HH:mm:ss')],
                }}
                format="YYYY-MM-DD HH:mm:ss"
              />)}

            </Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button" style={{ marginBottom: '30px' }}>
              创建试卷
            </Button>
          </Form>
        </div>
      </div>
    );
  }
}
export default addExam;
