/*
 * @Author: zgh
 * @Date: 2019-09-03 10:00:01
 * @Last Modified by: zhujiahui
 * @Last Modified time: 2019-09-10 17:11:31
 */

import Editor from 'for-editor';
import question from '@/api/question'
import React, { Component } from 'react';
import { Layout, Form, message, Breadcrumb, Input, Select, Button } from 'antd';

const { Option } = Select;
const { Content } = Layout;

@Form.create({ name: 'normal_login' })
class Detail extends Component {
    state = {
        collapsed: false,
        iptval: '',
        topic: '',
        answer: '',
        select_exam: '',
        select_subject: '',
        select_topic: '',
        examtype: [],
        subjecttype: [],
        topictype: [],
        id: 0
    };
    onCollapse = collapsed => {
        this.setState({ collapsed });
    };
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                values.id = this.state.id;

                question.newquestion(values).then(res => {
                    let { code, msg } = res.data;
                    if (code) {
                        this.props.history.push('/main/watchQuestions')
                    }
                })
                console.log('Received values of form: ', values);
            }
        });
    };
    render() {
        let {
            iptval,
            topic,
            answer,
            select_exam,
            select_subject,
            select_topic,
            examtype,
            subjecttype,
            topictype,
            id
        } = this.state;

        const { getFieldDecorator } = this.props.form;
        return <div>
            <Layout
                style={{
                    padding: '0 24px 24px',
                    height: 'auto',
                    width: '1000px'
                }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>添加试题</Breadcrumb.Item>
                </Breadcrumb>
                <Content
                    style={{
                        background: '#fff',
                        padding: 24,
                        margin: 0,
                        minHeight: 300
                    }}>
                    <div>题目信息</div>
                    <div style={{ margin: '20px 0' }}>题干</div>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Form.Item>
                            {getFieldDecorator('iptval', {
                                initialValue: iptval
                            })(
                                <Input
                                    placeholder='请输入题目信息，不超过20个字'
                                />
                            )}
                        </Form.Item>
                        <Form.Item label="题目主题">
                            {getFieldDecorator('topic', {
                                initialValue: this.state.topic
                            })(
                                <Editor
                                    style={{ height: '300px' }}
                                    onChange={e => {
                                        this.setState({
                                            topic: e
                                        });
                                    }}
                                />
                            )}
                        </Form.Item>
                        <Form.Item label="请选择考试类型">
                            {getFieldDecorator('select_exam', {
                                initialValue: select_exam
                            })(
                                <Select
                                    style={{ width: 120 }}
                                    onChange={e => {
                                        this.setState({
                                            select_exam: e
                                        });
                                    }}>
                                    {examtype && examtype.map((item, index) => (
                                        <Option value={item.text} key={index}>
                                            {item.text}
                                        </Option>
                                    ))}
                                </Select>
                            )}
                        </Form.Item>
                        <Form.Item label="请选择课程类型：">
                            {getFieldDecorator('select_subject', {
                                initialValue: this.state.select_subject
                            })(
                                <Select
                                    style={{ width: 120 }}
                                    onChange={e => {
                                        this.setState({
                                            select_subject: e
                                        });
                                    }}>
                                    {subjecttype &&
                                        subjecttype.map((item, index) => (
                                            <Option value={item.subject_name} key={index}>
                                                {item.subject_name}
                                            </Option>
                                        ))}
                                </Select>
                            )}
                        </Form.Item>
                        <Form.Item label="请选择题目类型">
                            {getFieldDecorator('select_topic', {
                                initialValue: select_topic
                            })(
                                <Select
                                    style={{ width: 120 }}
                                    onChange={e => {
                                        this.setState({
                                            select_topic: e
                                        });
                                    }}>
                                    {topictype &&
                                        topictype.map((item, index) => (
                                            <Option value={item.typename} key={item.id}>
                                                {item.typename}
                                            </Option>
                                        ))}
                                </Select>
                            )}
                        </Form.Item>
                        <Form.Item label="答案信息">
                            {getFieldDecorator('answer', {
                                initialValue: answer
                            })(
                                <Editor
                                    style={{ height: '300px' }}
                                    onChange={e => {
                                        this.setState({
                                            answer: e
                                        });
                                    }}
                                />
                            )}
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                提交
                         </Button>
                        </Form.Item>
                    </Form>
                </Content>
            </Layout>
        </div>
    }
    /**
    * 修改试题
    */

    componentDidMount() {
        /**
       * 通过路由传递过来的参数
       * */
        let data = this.props.location.query.item;
        console.log(data)
        let { id, question_name, question_body, question_answer, question_class_type, question_exam_type, question_type } = data;
        this.setState({
            id: id,
            iptval: question_name,
            topic: question_body,
            answer: question_answer,
            select_exam: question_exam_type,
            select_subject: question_class_type,
            select_topic: question_type,
        })

        /**
         * 考试类型
         */
        question.exam_type().then(res => {
            this.setState({
                examtype: res.data.result
            })
        })
        /**
         * 课程类型
         */
        question.subject_type().then(res => {
            this.setState({
                subjecttype: res.data.result
            })
        })
        /**
         * 题目类型
         */
        question.topic_type().then(res => {
            this.setState({
                topictype: res.data.result
            })
        })
    }
}

export default Detail;

