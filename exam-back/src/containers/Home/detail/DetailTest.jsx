/*
 * @Author: xiaoyu 
 * @Date: 2019-09-15 19:19:59 
 * @Last Modified by: xiaoyu
 * @Last Modified time: 2019-09-15 19:29:48
 */
import React, { Component } from 'react'
import { Tag } from 'antd';

class DetailTest extends Component {
    state = {
        size: 'large',
    };
    render() {
        const { data } = this.props.location.state;
        return (
            <div style={{ height: '100%', width: '100%', display: 'flex', flexFlow: 'column nowrap' }}>
                <h2>查看试题</h2>
                <div style={{ background: '#fff', flex: 1, overflow: 'auto', borderRadius: '15px' }}>
                    {
                        data.map(item => (
                            <div style={{ display: 'flex', borderBottom: '1px solid #eee' }} key={item.id}>
                                <div style={{ flex: 9 }}>
                                    <div style={{ paddingLeft: '25px', paddingBottom: '7px', paddingTop: '7px' }}>{item.question_name}</div>
                                    <div style={{ paddingLeft: '25px', paddingBottom: '7px', paddingTop: '7px' }}>
                                        <Tag color="volcano">{item.question_type}</Tag>
                                        <Tag color="orange">{item.question_class_type}</Tag>
                                        <Tag color="gold">{item.question_exam_type}</Tag>
                                    </div>
                                    <div style={{ paddingLeft: '25px', paddingBottom: '7px', paddingTop: '7px', color: '#108ee9' }}>{item.user} 发布</div>
                                </div>
                            </div>
                        ))
                    }

                </div>
            </div>
        )
    }
}
export default DetailTest;