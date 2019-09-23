/*
 * @Author: yixian
 * @Date: 2019-09-07 00:36:18
 * @Last Modified by: yixian
 * @Last Modified time: 2019-09-07 10:52:38
 */

import { Table } from 'antd';
import React, { Component } from 'react';

class ShowUserList extends Component {
	render() {
		const { columns, data } = this.props;
		return (
			<div>
				<Table columns={columns} dataSource={data} />
			</div>
		);
	}
}
export default ShowUserList;
