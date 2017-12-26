import {GetServerData} from '../../services/services';
import { connect } from 'dva';
import EditableTable from '../../components/table/tablebasic';
import EditableTableInfo from '../../components/table/table_info';
import Cardlist from '../../components/table/cardlist';


class OrderposInfo extends React.Component{
	constructor(props) {
        super(props);
        this.state = {
            type:1
        }

        this.column1 = [{
            title: '商品名称',
            dataIndex: 'name',
          }, {
            title: '规格',
            dataIndex: 'displayName'
          }, {
            title: '商品编码',
            dataIndex: 'code',
          }, {
            title: '数量',
            dataIndex: 'qty',
          },{
            title: '零售价',
            dataIndex: 'price',
          },{
            title: '折扣',
            dataIndex: 'discount',
          },{
            title: '折后价',
            dataIndex: 'payPrice',
          }];

          this.column2 = [{
            title: '会员姓名',
            dataIndex: 'name',
          }, {
            title: '会员卡号',
            dataIndex: 'cardNo'
          }, {
            title: '会员手机',
            dataIndex: 'mobile',
          }, {
            title: '会员级别',
            dataIndex: 'levelStr',
          },{
            title: '充值前余额',
            dataIndex: 'beforeAmount',
          },{
            title: '充值金额',
            dataIndex: 'delta',
          },{
            title: '充值后余额',
            dataIndex: 'result',
          }];

          this.column3 = [{
            title: '商品名称',
            dataIndex: 'name',
          }, {
            title: '规格',
            dataIndex: 'displayName'
          }, {
            title: '商品编码',
            dataIndex: 'code',
          }, {
            title: '数量',
            dataIndex: 'qty',
          },{
            title: '零售价',
            dataIndex: 'price',
          },{
            title: '折后价',
            dataIndex: 'refundPrice',
          },{
            title: '实退价',
            dataIndex: 'payPrice',
          }];
          
    }

    
	infofetch=(spOrderId,type)=>{
        if(type=='1'){
            //销售
            this.props.dispatch({
              type:'orderpos/infofetch1',
              payload:{code:'qerp.web.qpos.od.order.info',values:{odOrderId:spOrderId}}
            }) 
        }
        if(type=='2'){
            //充值
            this.props.dispatch({
              type:'orderpos/infofetch2',
              payload:{code:'qerp.web.qpos.mb.card.charge.info',values:{mbCardMoneyChargeId:spOrderId}}
            }) 
        }
        if(type=='3'){
            //退货
            this.props.dispatch({
              type:'orderpos/infofetch3',
              payload:{code:'qerp.web.qpos.od.return.info',values:{odReturnId:spOrderId}}
            }) 
        }
	}
    
	render(){
		return(
			<div>
				<div className='mb10'><Cardlist cardtitle="订单信息" cardlist={this.props.cardlist}/></div>
				<div className='mb10'>
          <EditableTable columns={
                                  this.props.data.type == 1
                                  ?
                                  this.column1
                                  :
                                  (
                                    this.props.data.type == 2
                                    ?
                                    this.column2
                                    :
                                    this.column3
                                  )
                                } 
												  dataSource={this.props.infoList} 
                          title="订单内容"
                          bordered={true}
                          footer={false}/>
				</div>
			</div>
		)
	}
	componentDidMount(){
		this.infofetch(this.props.data.spOrderId,this.props.data.type)
	}
}

function mapStateToProps(state) {
    const {cardlist,infoList} = state.orderpos;
    return {cardlist,infoList};
}
export default connect(mapStateToProps)(OrderposInfo);

