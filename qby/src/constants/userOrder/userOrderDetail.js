import React from 'react';
import EditableTable from '../../components/table/tablebasic';
import { Button, Icon ,Form,Select,Input,Card, message } from 'antd';
import { getInfoApi } from '../../services/orderCenter/userOrders'
import { connect } from 'dva';
const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;

const platformMap={
  '1':'Qtools App ios端',
  '2':'Qtools App  安卓端',
  '3':'小程序',
}
const deliveryMap={
  '1':'门店自提',
  '2':'同城配送',
  '3':'快递邮寄',
}

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
			title: '零售价',
			dataIndex: 'price',
      key:'5'
		}, {
			title: '应付价格',
			dataIndex: 'sprice',
      key:'6',
			render:(text,record) => {
				console.log(record)
			}
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
	const id = this.props.data.pdSpuId;
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
                <div className='cardlist_item'><label>订单序号：</label><span>{orderInfo.orderNum}</span></div>
                <div className='cardlist_item'><label>下单平台：</label><span>{platformMap[orderInfo.platform]}</span></div>
                <div className='cardlist_item'><label>配送方式：</label><span>{deliveryMap[orderInfo.deliveryType]}</span></div>
                <div className='cardlist_item'><label>订单金额：</label><span>{orderInfo.amountSum}</span>元</div>
                <div className='cardlist_item'><label>商品金额：</label><span>{orderInfo.CommodityAmount}</span>元</div>
                <div className='cardlist_item'><label>用户支付配送费：</label><span>{orderInfo.actualExpressAmount}</span>元</div>
                <div className='cardlist_item'><label>优惠券：</label><span>{orderInfo.discountAmount}</span>元</div>
                <div className='cardlist_item'><label>优惠券批次号：</label><span>{orderInfo.couponNumber}</span>元</div>
                <div className='cardlist_item'><label>版本号：</label><span>{orderInfo.orderNum}</span></div>
            </div>
          </Card>
        </div>
				<div className='mb10'>
          <Card title='用户信息'>
            <div className='cardlist'>
                <div className='cardlist_item'><label>昵称：</label><span>{userInfo.nickname}</span></div>
                <div className='cardlist_item'><label>注册手机：</label><span>{userInfo.mobile}</span></div>
                <div className='cardlist_item'><label>本单用户下单次序：</label><span>{userInfo.userSumCounts}</span></div>
                <div className='cardlist_item'><label>本单本店下单次序：</label><span>{userInfo.spSumCounts}</span></div>
                <div className='cardlist_item'><label>会员级别：</label><span>{userInfo.userType}</span></div>
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
				<div className='mb10'>
          <Card title='配送信息'>
            <div className='cardlist'>
                <div className='cardlist_item'><label>收件人：</label><span>{orderInfo.orderNo}</span></div>
                <div className='cardlist_item'><label>收货人电话：</label><span>{orderInfo.createTime}</span></div>
                <div className='cardlist_item'><label>收货地址：</label><span>{orderInfo.orderStatusStr}</span></div>
                <div className='cardlist_item'><label>顺丰实际配送费：</label><span>{orderInfo.orderStatusStr}</span></div>
                <div className='cardlist_item'><label>骑士姓名：</label><span>{orderInfo.orderStatusStr}</span></div>
                <div className='cardlist_item'><label>骑士联系方式：</label><span>{orderInfo.orderStatusStr}</span></div>
                <div className='cardlist_item'><label>预计送达时间：</label><span>{orderInfo.amountSum}</span>元</div>
                <div className='cardlist_item'><label>实际送达时间：</label><span>{orderInfo.deductionAmount}</span>元</div>
            </div>
          </Card>
        </div>
				<div className='mb10'>
          <Card title='配送信息'>
            <div className='cardlist'>
                <div className='cardlist_item'><label>收件人：</label><span>{orderInfo.orderNo}</span></div>
                <div className='cardlist_item'><label>收货人电话：</label><span>{orderInfo.createTime}</span></div>
                <div className='cardlist_item'><label>收货地址：</label><span>{orderInfo.orderStatusStr}</span></div>
                <div className='cardlist_item'><label>快递单号：</label><span>{orderInfo.orderStatusStr}</span></div>
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
