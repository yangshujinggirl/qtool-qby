import { connect } from 'dva';
import EditableTable from '../../../components/table/tablebasic';

class DataspTable extends React.Component {
	constructor(props) {
		super(props);
		this.columns = [{
			title: '门店编码',
			dataIndex: 'no'
		}, {
			title: '门店名称',
			dataIndex: 'name'
		},{
			title: '掌柜销售额',
			dataIndex: 'qbyAmount'
		},{
			title: '掌柜销售数量',
			dataIndex: 'qbyQty'
		},{
			title: 'POS销售额',
			dataIndex: 'posAmount'
		},{
			title: 'POS净收款',
			dataIndex: 'cleanAmount'
		},{
			title: 'POS销售数量',
			dataIndex: 'posQty'
		}];   
	}
	
	
	render() {
		return (
			<EditableTable
				dataSource={this.props.shopSaleDatas} 
				columns={this.columns} 
				bordered={true}
				footer={false}
				/>
		);
	}
	
}

function mapStateToProps(state) {
	const {shopSaleDatas} = state.dataspsell;
	return {shopSaleDatas};
}

export default connect(mapStateToProps)(DataspTable);
