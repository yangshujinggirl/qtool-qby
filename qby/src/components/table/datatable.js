
import React,{ Component } from 'react';
import {Table} from 'antd'

class DataTable extends Component {
	constructor(props) {
    super(props);
	}
  render() {
    return (
				<Table
					bordered
					columns={this.props.columns}
					dataSource={this.props.dataSource}
					pagination = {false}
				/>
		)
	}
}


export default DataTable;
