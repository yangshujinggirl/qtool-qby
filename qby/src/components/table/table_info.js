import { Table, Input, Icon, Button, Popconfirm } from 'antd';

class EditableTableInfo extends React.Component {
	rowClassName=(record, index)=>{
		if (index % 2) {
			return 'table_gray'
		}else{
			return 'table_white'
		}
	}
	render() {
		return (
			<Table bordered 
			dataSource={this.props.data} 
					columns={this.props.columns} 
					pagination={false}
					rowClassName={this.rowClassName.bind(this)}
					title={() => this.props.title}
					/>
		);
	}
}


export default EditableTableInfo
