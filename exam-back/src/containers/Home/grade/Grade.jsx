/*
 * @Author: xub 
 * @Date: 2019-09-07 07:24:55 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-09-12 09:15:23
 */

import "@/assets/css/grade/grade.css";
import React, { Component } from 'react'
import { Form, Input, Select, Table, Divider, Button, Modal, Popconfirm, message } from 'antd';
import { getRoom, getSubject, getClass, addBanClass, delGrade, updateGrade } from '@/api/classManage';

const { Option } = Select;
const { Column } = Table;

@Form.create({ name: 'class' })
class Grade extends Component {
    state = {
        size: 'large',
        visible: false,
        visible2: false,
        rooms: [],
        subjects: [],
        data: [],
        guard: '',
        sub: '',
        rom: ''
    };

    componentDidMount() {
        getClass().then(res => {
            this.setState({
                data: res.data.result.map((item, index) => {
                    item.key = index
                    return item
                })
            })
        })
        //room列表
        getRoom().then(res => {
            this.setState({
                rooms: res.data.result
            });
        });
        //课程列表
        getSubject().then(res => {
            this.setState({
                subjects: res.data.result
            });
        });
    }

    //添加班级
    addGuade(params) {
        console.log(params)
        addBanClass(params).then(res => {
            if (res.data.result === "no") {
                message.error("班级已存在，请勿重复添加")
            } else {
                getClass().then(res => {
                    this.setState({
                        data: res.data.result.map((item, index) => {
                            item.key = index
                            return item
                        })
                    })
                })
            }
        });
    }

    showModal = () => {
        getRoom().then(res => {
            this.setState({
                rooms: res.data.result,
                visible: true,
                confirmDirty: false
            });
        });
    };
 
    handleOk = e => {
        getRoom().then(res => {
            this.setState({
                rooms: res.data.result
            });
        });
        this.setState({
            visible: false
        });
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.addGuade(values);
            }
        });
    };

    handleCancel = e => {
        this.setState({
            visible: false,
        });
    };
    confirm = (rec) => {
        this.delBan(rec)
        message.success('删除成功');
    }

    cancel = (e) => {
        message.error('取消删除');
    }
    //删除
    delBan(record) {
        delGrade(record.id).then(res => {
            getClass().then(res => {
                this.setState({
                    data: res.data.result.map((item, index) => {
                        item.key = index
                        return item
                    })
                })
            })
        })
    }

    //修改
    alter(record) {
        this.setState({
            visible2: true,
            guard: record.class,
            sub: record.courseName,
            rom: record.classroomnumber,
            
        });
    }
    handleOk2 = e => {
        this.setState({
            visible2: false,
        });
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                updateGrade(values).then(res => {
                    getClass().then(res => {
                        this.setState({
                            data: res.data.result.map((item, index) => {
                                item.key = index
                                return item
                            })
                        })
                    })
                })
            }
        });
    };

    handleCancel2 = e => {
        this.setState({
            visible2: false,
        });
    };
    render() {
        const { size, data } = this.state;
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        return (
            <div className="cls">
                <div className="btn">
                    <Button type="primary" size={size} onClick={this.showModal} className="btn1">添加班级</Button>
                    <Modal
                        title="添加班级"
                        visible={this.state.visible}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                        okButtonProps cancelButtonProps
                        okText="提交" cancelText="取消" >
                        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                            <Form.Item labelCol={{ span: 5}} label="班级名" >
                                {getFieldDecorator('ban', {
                                    rules: [
                                        {
                                            required: true,
                                            message: '请选择班级号!',
                                        },
                                    ],
                                })(<Input placeholder="请选择班级号" />)}
                            </Form.Item>
                            <Form.Item labelCol={{ span: 5}} label="教室号" >
                                {getFieldDecorator('room', {
                                    rules: [
                                        {
                                            required: true,
                                            message: '请选择教室号!',
                                        },
                                    ],
                                })(
                                    <Select placeholder="请选择教室号" >
                                        {
                                            this.state.rooms.map((item, index) => {
                                                return <Option value={item.room_name} key={item.room_id}>{item.room_name}</Option>
                                            })
                                        }
                                    </Select>
                                )}
                            </Form.Item>
                            <Form.Item labelCol={{ span: 5}} label="课程名" >
                                {getFieldDecorator('subject', {
                                    rules: [
                                        {
                                            required: true,
                                            message: '请选择课程名!',
                                        },
                                    ],
                                })(
                                    <Select placeholder="请选择课程名">
                                        {
                                            this.state.subjects.map((item, index) => {
                                                return <Option value={item.subject_name} key={item.id}>{item.subject_name}</Option>
                                            })
                                        }
                                    </Select>
                                )}
                            </Form.Item>
                        </Form>
                    </Modal>
                </div>
                <Table dataSource={data}>
                    <Column title="班级名" dataIndex="class" key="class" />
                    <Column title="课程名" dataIndex="courseName" key="courseName" />
                    <Column title="教室号" dataIndex="classroomnumber" key="classroomnumber" />
                    <Column
                        title="操作"
                        render={(record) => (
                            <span>
                                <span className="cus" onClick={this.alter.bind(this, record)}>修改 {record.lastName}</span>
                                <Divider type="vertical" />
                                <Popconfirm
                                    title="确定删除吗?"
                                    onConfirm={() => this.confirm(record)}
                                    onCancel={this.cancel}
                                    okText="Yes"
                                    cancelText="No"
                                >
                                    <span className="cus" >删除</span>
                                </Popconfirm>
                            </span>
                        )}
                    />
                </Table>
                <Modal
                    title="修改班级"
                    visible={this.state.visible2}
                    onOk={this.handleOk2}
                    onCancel={this.handleCancel2}
                    okButtonProps cancelButtonProps
                    okText="提交" cancelText="取消" >
                    <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                        <Form.Item labelCol={{ span: 5}} label="班级名">
                            {getFieldDecorator('ban', { initialValue: `${this.state.guard}` }, {
                                rules: [
                                    {
                                        required: true,
                                        message: '请选择班级号!',
                                    },
                                ],
                            })(<Input placeholder="请选择班级号" disabled />)}
                        </Form.Item>
                        <Form.Item labelCol={{ span: 5}} label="教室号" >
                            {getFieldDecorator('room', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请选择教室号!',
                                    },
                                ],
                            })(
                                <Select placeholder="请选择教室号" >
                                    {
                                        this.state.rooms.map((item, index) => {
                                            return <Option value={item.room_name} key={item.room_id}>{item.room_name}</Option>
                                        })
                                    }
                                </Select>
                            )}
                        </Form.Item>
                        <Form.Item labelCol={{ span: 5}} label="课程名" >
                            {getFieldDecorator('subject', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请选择课程名!',
                                    },
                                ],
                            })(
                                <Select placeholder="请选择课程名">
                                    {
                                        this.state.subjects.map((item, index) => {
                                            return <Option value={item.subject_name} key={item.id}>{item.subject_name}</Option>
                                        })
                                    }
                                </Select>,
                            )}
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        )
    }

}
export default Grade;
