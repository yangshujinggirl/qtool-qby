import {GetServerData} from '../../services/services';
import { connect } from 'dva';
import EditableTable from '../../components/table/tablebasic';
import EditableTableInfo from '../../components/table/table_info';
import Cardlist from '../../components/table/cardlist';


class OrderctInfo extends React.Component{
	constructor(props) {
        super(props);
        this.column1 = [{
            title: '商品名称',
            dataIndex: 'spuName'
          }, {
            title: '规格',
            dataIndex: 'pdSkuType'
          }, {
            title: '商品编码',
            dataIndex: 'pdCode'
          },{
            title: '采退数量',
            dataIndex: 'qty'
          },{
            title: '单价',
            dataIndex: 'retailPrice'
          },{
            title: '总价',
            dataIndex: 'amount'
          }];


        this.column2 = [{
            title: '操作',
            dataIndex: 'operateName'
            }, {
            title: '操作时间',
            dataIndex: 'operateTime'
            }, {
            title: '操作人',
            dataIndex: 'operateUser'
        }];
				this.column2 = [{
            title: '快递单号',
            dataIndex: 'expressCode'
            }, {
            title: '快递公司',
            dataIndex: 'expressCompany'
            }, {
            title: '快递费用',
            dataIndex: 'expressFee'
						}, {
						title: '备注',
						dataIndex: 'remark'
					}];
    }


	infofetch=(spCtorderId)=>{
      //获取订单信息列表
			this.props.dispatch({
				type:'orderct/infofetch',
				payload:{code:'qerp.web.sp.ctorder.info',values:{spCtorderId:spCtorderId}}
            })
    }

	render(){
		return(
			<div>
				<div className='mb10'><Cardlist cardtitle="采退单信息" cardlist={this.props.headTit}/></div>
				<div className='mb10'>
					<EditableTable columns={this.column1}
           dataSource={this.props.details}
           bordered={true}
					 title="采退商品"
					footer={false}/>
				</div>
				<div className='mb10'>
					<EditableTable columns={this.column3}
           dataSource={this.props.expresslnfos}
           bordered={true}
					 title="采退商品"
					footer={false}/>
				</div>
				<div className='mb10'>
					<EditableTable columns={this.column2}
           dataSource={this.props.orderLogs}
           bordered={true}
					 title="采购单日志"
					footer={false}/>
				</div>
			</div>
		)
	}
	componentDidMount(){
		this.infofetch(this.props.data.spCtorderId)
	}
}

function mapStateToProps(state) {
    const {headTit,details,orderLogs} = state.orderct;
		return {headTit,details,orderLogs};
}
export default connect(mapStateToProps)(OrderctInfo);
