import { connect } from 'dva';
import EditableTable from '../../../components/table/tablebasic';

class DatacgTable extends React.Component {
	constructor(props) {
        super(props);
		this.columns = [{
            title: '序号',
            dataIndex: 'index'
          },{
            title: '商品编码',
            dataIndex: 'code'
          }, {
            title: '商品条码',
            dataIndex: 'barcode'
          },{
            title: '商品名称',
            dataIndex: 'name'
		  },{
            title: '商品规格',
            dataIndex: 'displayName'
		  },{
            title: '10日销售数量',
            dataIndex: 'qbyQty'
          },{
            title: '库存',
            dataIndex: 'qtyErp'
          }];   
    }
	
	
    render() {
        return (
			<EditableTable
				dataSource={this.props.analysis} 
				columns={this.columns} 
				total={this.props.total}
				limit={this.props.limit}
                current={Number(this.props.currentPage)+1}
                bordered={true}
                footer={false}
				/>
        );
	}
}

function mapStateToProps(state) {
    const {analysis} = state.datacg;
    return {analysis};
}

export default connect(mapStateToProps)(DatacgTable);
