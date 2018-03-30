import { Table} from 'antd';


class TableCanEdit extends React.Component {
	rowClassName=(record, index)=>{
		if (index % 2) {
			return 'table_gray'
		}else{
			return 'table_white'
		}
	}
	render() {
		return (
					<Table 
						bordered
						dataSource={this.props.dataSources} 
						columns={this.props.columns} 
						pagination={false}
						rowClassName={this.rowClassName.bind(this)}
						/>
			);
		}
}

export default TableCanEdit


