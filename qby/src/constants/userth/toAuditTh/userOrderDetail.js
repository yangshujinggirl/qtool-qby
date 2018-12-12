import React from 'react';
import EditableTable from '../../components/table/tablebasic';
import { Button, Icon ,Form,Select,Input,Card, message } from 'antd';
import { getInfoApi } from '../../services/orderCenter/userth/allth'
import { connect } from 'dva';
const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;

class userOrderDetail extends React.Component{
	constructor(props) {
		super(props);
    this.state={
      orderInfo:{},
      userInfo:{},
			goodsInfos:[],
      shopInfo:{},
			logInfos:[]
    },
		this.columns1 = [{
			title: '商品名称',
			dataIndex: 'spuName',
      key:'1'
		}, {
			title: '规格',
			dataIndex: 'displayName',
      key:'2'
		}, {
			title: '商品编码',
			dataIndex: 'code',
      key:'3'
		}, {
			title: '商品数量',
			dataIndex: 'qty',
      key:'4'
		}, {
			title: '商品价格',
			dataIndex: 'price',
      key:'5'
		}];

		this.columns2 = [{
			title: '操作',
			dataIndex: 'action',
			key:'1'
		}, {
			title: '操作时间',
			dataIndex: 'createTime',
			key:'2'
		}, {
			title: '操作人',
			dataIndex: 'operateUser',
			key:'3'
		}, {
			title: '备注',
			dataIndex: 'remark',
			key:'4'
		}];
}
//初始化
componentDidMount(){
	const id = this.props.data.orderReturnNo;
	getInfoApi({orderId:id}).then(res => {
		if(res.code=='0'){
			this.setState({
				orderInfo:res.orderInfo,
	      userInfo:res.userInfo,
				goodsInfos:res.goodsInfos,
	      shopInfo:res.shopInfo,
				logInfos:res.logInfos
			})
		}
	},err => {
		message.error(err.message)
	})
}
render(){
  const {orderInfo,userInfo,goodsInfos,shopInfo,logInfos} = this.state;
	logInfos.map((item,index)=>{
		item.key = index;
		return item;
	});
	goodsInfos.map((item,index)=>{
		item.key = index;
		return item;
	});
	return(
			<div>
        <div className='mb10'>
          <Card title='订单详情'>
            <div className='cardlist'>
                <div className='cardlist_item'><label>订单号：</label><span>{orderInfo.orderNo}</span></div>
                <div className='cardlist_item'><label>下单时间：</label><span>{orderInfo.createTime}</span></div>
                <div className='cardlist_item'><label>流程状态：</label><span>{orderInfo.orderStatusStr}</span></div>
                <div className='cardlist_item'><label>订单金额：</label><span>{orderInfo.amountSum}</span>元</div>
                <div className='cardlist_item'><label>优惠券：</label><span>{orderInfo.deductionAmount}</span>元</div>
                <div className='cardlist_item'><label>订单序号：</label><span>{orderInfo.orderNum}</span></div>
            </div>
          </Card>
        </div>
				<div className='mb10'>
          <Card title='用户信息'>
            <div className='cardlist'>
                <div className='cardlist_item'><label>昵称：</label><span>{userInfo.nickname}</span></div>
                <div className='cardlist_item'><label>注册手机：</label><span>{userInfo.mobile}</span></div>
                <div className='cardlist_item'><label>下单次数：</label><span>{userInfo.userSumCounts}</span></div>
                <div className='cardlist_item'><label>本店下单次数：</label><span>{userInfo.spSumCounts}</span></div>
            </div>
          </Card>
        </div>
        <div className='mb20'>
          <EditableTable
            columns={this.columns1}
            title='商品信息'
            bordered={true}
            dataSource = { goodsInfos }
          />
        </div>
				<div className='mb10'>
          <Card title='门店信息'>
            <div className='cardlist'>
                <div className='cardlist_item'><label>门店名称：</label><span>{shopInfo.spShopName}</span></div>
                <div className='cardlist_item'><label>店主姓名：</label><span>{shopInfo.shopman}</span></div>
                <div className='cardlist_item'><label>店主电话：</label><span>{shopInfo.telephone}</span></div>
                <div className='cardlist_item'><label>门店电话：</label><span>{shopInfo.mobile}</span></div>
            </div>
          </Card>
        </div>
				<div className='mb20'>
          <EditableTable
            columns={this.columns2}
            title='处理日志'
            bordered={true}
            dataSource = { logInfos }
          />
        </div>
			</div>
		)}
}
function mapStateToProps(state){
  const { userorders } = state;
  return { userorders }
}
export default connect(mapStateToProps)(userOrderDetail);
