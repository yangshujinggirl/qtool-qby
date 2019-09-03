import React from 'react';
import { Button, Icon ,Form,Select,Input,Card, message, Table } from 'antd';
import { getInfoApi } from '../../services/orderCenter/userOrders'
import { connect } from 'dva';
const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;

const platformMap={
  '1':'Qtools App ios端',
  '2':'Qtools App 安卓端',
  '3':'小程序',
}
const levelMap={
  1:'金卡',
  2:'银卡',
  3:'普卡',
}

const columns = [{
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
    title: '应付单价',
    dataIndex: 'payPrice',
    key:'payPrice',
  }, {
    title: '应付总价',
    dataIndex: 'payAmount',
    key:'payAmount',
  },{
    title: '活动优惠',
    dataIndex: '',
    key:'',
  },{
    title: '优惠券抵扣',
    dataIndex: '',
    key:'',
  },{
    title: '实付总额',
    dataIndex: 'actualPayAmount',
    key:'actualPayAmount',
  }];
const columns2 = [{
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
  const columns3 = [{
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
    title: '赠送数量',
    dataIndex: 'qty',
    key:'4'
  }, {
    title: '零售价',
    dataIndex: 'price',
    key:'5'
  }, {
    title: '实付总价',
    dataIndex: 'actualPayAmount',
    key:'actualPayAmount',
  }, {
    title: '活动信息',
    dataIndex: 'activityInfo',
    key:'activityInfo',
  }];

class userOrderDetail extends React.Component{
	constructor(props) {
		super(props);
    this.state={
      orderInfo:{},
      userInfo:{},
			goodsInfos:[],
      shopInfo:{},
			logInfos:[],
      deliveryInfo:null//配送信息
    }
  }
//初始化
componentDidMount(){
	this.getDetail()
}
getDetail() {
  this.props.dispatch({
    type:'tab/loding',
    payload:true
  });
  const id = this.props.data.pdSpuId;
	getInfoApi({orderId:id}).then(res => {
    let { orderInfo,giftInfos, userInfo, goodsInfos, shopInfo, logInfos, deliveryInfo, code } = res;
    logInfos = logInfos?logInfos:[];
    goodsInfos = goodsInfos?goodsInfos:[];
    logInfos.length>0&&logInfos.map((item,index)=>{
  		item.key = index;
  		return item;
  	});
  	goodsInfos.length>0&&goodsInfos.map((item,index)=>{
  		item.key = index;
  		return item;
  	});
		if(code=='0'){
			this.setState({
        giftInfos,
				orderInfo,
	      userInfo,
				goodsInfos,
	      shopInfo,
				logInfos,
        deliveryInfo
			})
		};
    this.props.dispatch({
      type:'tab/loding',
      payload:false
    })
	},err => {
		message.error(err.message)
	});
}
renderDelivery(deliveryInfo) {
  return <Card title='配送信息'>
          {
            this.state.orderInfo.orderType==2?
            <div className='cardlist'>
              <div className='cardlist_item'><label>收件人：</label><span>{deliveryInfo.recName}</span></div>
              <div className='cardlist_item'><label>收货人电话：</label><span>{deliveryInfo.recMobile}</span></div>
              <div className='cardlist_item'><label>收货地址：</label><span>{deliveryInfo.recAddress}</span></div>
              <div className='cardlist_item'><label>顺丰实际配送费：</label><span>{deliveryInfo.shunFengExpenses}</span></div>
              <div className='cardlist_item'><label>骑士姓名：</label><span>{deliveryInfo.knightName}</span></div>
              <div className='cardlist_item'><label>骑士联系方式：</label><span>{deliveryInfo.knightMobile}</span></div>
              <div className='cardlist_item'><label>预计送达时间：</label><span>{deliveryInfo.predictDeliveryTime}</span></div>
              <div className='cardlist_item'><label>实际送达时间：</label><span>{deliveryInfo.actualDeliveryTime}</span></div>
            </div>
            :
            <div className='cardlist'>
              <div className='cardlist_item'><label>收件人：</label><span>{deliveryInfo.recName}</span></div>
              <div className='cardlist_item'><label>收货人电话：</label><span>{deliveryInfo.recMobile}</span></div>
              <div className='cardlist_item'><label>收货地址：</label><span>{deliveryInfo.recAddress}</span></div>
              {
                this.state.orderInfo.orderType==4 ?
                <div className='cardlist_item'><label>快递单号：</label>
                  <span>
                    {deliveryInfo.whExpressNos && deliveryInfo.whExpressNos.join(';')}
                  </span>
                </div>
                :
                <div className='cardlist_item'><label>快递单号：</label><span>{deliveryInfo.expressNo}</span></div>
              }

            </div>
          }
          </Card>
}
render(){
  const {orderInfo,userInfo,goodsInfos,shopInfo,logInfos, deliveryInfo,giftInfos} = this.state;
	return(
			<div>
        <div className='mb10'>
          <Card title='订单详情'>
            <div className='cardlist'>
              <div className='cardlist_item'><label>订单号：</label><span>{orderInfo.orderNo}</span></div>
              <div className='cardlist_item'><label>虚拟单号：</label><span>{orderInfo.virtualOrderNo}</span></div>
              <div className='cardlist_item'><label>下单时间：</label><span>{orderInfo.createTime}</span></div>
              <div className='cardlist_item'><label>订单状态：</label><span>{orderInfo.qbOrderStatusStr}</span></div>
              <div className='cardlist_item'><label>流程状态：</label><span>{orderInfo.orderStatusStr}</span></div>
              <div className='cardlist_item'><label>订单序号：</label><span>{orderInfo.orderNum}</span></div>
              <div className='cardlist_item'><label>下单平台：</label><span>{platformMap[orderInfo.platform]}</span></div>
              <div className='cardlist_item'><label>订单类型：</label><span>{orderInfo.orderTypeStr}</span></div>
              <div className='cardlist_item'><label>订单金额：</label><span>{orderInfo.amountSum}</span>元</div>
              <div className='cardlist_item'><label>商品金额：</label><span>{orderInfo.commodityAmount}</span>元</div>
              <div className='cardlist_item'><label>活动优惠：</label><span>{orderInfo.promotionDeductAmount}</span>元</div>
              <div className='cardlist_item'><label>用户支付配送费：</label><span>{orderInfo.standardExpressAmount}</span>元</div>
              <div className='cardlist_item'><label>优惠金额：</label><span>{orderInfo.deductionAmount}</span>元</div>
              <div className='cardlist_item'><label>优惠券：</label><span>{orderInfo.discountAmount?orderInfo.discountAmount:0}</span>元</div>
              <div className='cardlist_item'><label>优惠券批次号：</label><span>{orderInfo.couponCode}</span></div>
              <div className='cardlist_item'><label>版本号：</label><span>{orderInfo.platVersion}</span></div>
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
              {
                userInfo.level!=4&&
                <div className='cardlist_item'>
                  <label>会员级别：</label>
                  <span>{levelMap[userInfo.level]}</span>
                </div>
              }
            </div>
          </Card>
        </div>
        <div className='mb20'>
          <Table
            bordered
            title={()=>'商品信息'}
            dataSource={goodsInfos}
            columns={columns}
            pagination={false}/>
        </div>
        <div className='mb20'>
          <p style={{'color':'red','marginBottom':'10px','fontSize':'16px'}}>　(以下为赠品)</p>
          <Table
            bordered
            dataSource={giftInfos}
            columns={columns3}
            pagination={false}/>
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
        {
          deliveryInfo&&
          <div className='mb10'>
            {this.renderDelivery(deliveryInfo)}
          </div>
        }
				<div className='mb20'>
          <Table
            bordered
            title={()=>'处理日志'}
            dataSource={logInfos}
            columns={columns2}
            pagination={false}/>
        </div>
			</div>
		)}
}
function mapStateToProps(state){
  const { userorders } = state;
  return { userorders }
}
export default connect(mapStateToProps)(userOrderDetail);
