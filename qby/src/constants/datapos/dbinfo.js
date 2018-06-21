import {GetServerData} from '../../services/services';
import { connect } from 'dva';
import EditableTable from '../../components/table/tablebasic';
import Cardlist from '../../components/table/cardlist';


class QposDbInfo extends React.Component{
	constructor(props) {
    super(props);
    this.column =  [
			{
				title: '商品条码',
				dataIndex: 'code'
			}, {
          title: '商品名称',
          dataIndex: 'name',
		  	},
			{
				title: '规格',
				dataIndex: 'displayName',
			},
			{
				title: '调拨数量',
				dataIndex: 'qty',
			},
			{
				title: '调拨总价',
				dataIndex: 'price',
      }];
    this.column1=[
      {
        title: '操作记录',
            dataIndex: 'operateName'
      },
      {
        title: '操作人',
        dataIndex: 'operateUser',
      },
      {
        title: '操作时间',
        dataIndex: 'operateTime'
      },{
        title: '备注',
        dataIndex: 'remark'
      }]
    this.state={
      headTit:[],
      spuInfo:[],
      logs:[]
    }
  }

    //请求信息
    infofetch=(data)=>{
      this.props.dispatch({ type: 'tab/loding', payload:true});
      const result = GetServerData('qerp.web.sp.exchange.list',{exchangeNo:data.exchangeNo});
      const result1 = GetServerData('qerp.web.sp.exchange.detail.info',{qposPdExchangeId:data.qposPdExchangeId})
      const result2 = GetServerData('qerp.web.sp.exchange.info',{qposPdExchangeId:data.qposPdExchangeId})
      let headTit = []
      let spus = []
      let logs = []
      result.then((res) => {
        return res;
      }).then((json) => {
        if(json.code=='0'){
          let data = json.exchangeNos[0]
          headTit.push({
            lable:'订单号',
            text:data.exchangeNo
          },{
            lable:'需求门店',
            text:data.inShopName
          },{
            lable:'创建人',
            text:data.urUser
          },{
            lable:'调拨状态',
            text:data.statusStr
          },{
            lable:'商品调拨数量',
            text:data.qtySum
          },{
            lable:'商品调拨总价',
            text:data.amountSum
          },{
            lable:'创建时间',
            text:data.createTime
          })
        }
        this.setState({
          headTit:headTit,
        })
      })
      result1.then((res) => {
        return res;
      }).then((json) => {
        if(json.code=='0'){
          this.setState({
            spuInfo:json.pdInfo,
          })
        }
      })
      result2.then((res) => {
        return res;
      }).then((json) => {
        if(json.code=='0'){
          this.setState({
            logs:json.logs
          })
        }
      })
      this.props.dispatch({ type: 'tab/loding', payload:false});
    }


	render(){
		return(
			<div>
				<div className='mb10'>
					<Cardlist cardtitle="商品调拨信息" cardlist={this.state.headTit}/>
				</div>
				<div className='mb10'>
					<EditableTable columns={this.column} dataSource={this.state.spuInfo} title="商品信息" bordered={true} footer={false}/>
				</div>
        <div className='mb10'>
					<EditableTable columns={this.column1} dataSource={this.state.logs} title="订单日志" bordered={true} footer={false}/>
				</div>
			</div>
		)
	}
	componentDidMount(){
		this.infofetch(this.props.data)
	}
}


export default connect()(QposDbInfo);

