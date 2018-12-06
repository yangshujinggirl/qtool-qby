import React from 'react';
import { Button, Icon ,Form,Select,Input,Card, message, Table } from 'antd';
import { connect } from 'dva';
const columns = [{
    title: '昵称',
    dataIndex: 'spuName',
    key:'1'
  }, {
    title: '性别',
    dataIndex: 'displayName',
    key:'2'
  }, {
    title: '生日类型',
    dataIndex: 'code',
    key:'3'
  },{
    title: '日期',
    dataIndex: 'qty',
    key:'4'
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
    title: '备注',
    dataIndex: 'remark',
    key:'4'
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
  })
  const id = this.props.data.pdSpuId;
	getInfoApi({orderId:id}).then(res => {
    let { orderInfo, userInfo, goodsInfos, shopInfo, logInfos, deliveryInfo, code } =res;
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
				orderInfo,
	      userInfo,
				goodsInfos,
	      shopInfo,
				logInfos,
        deliveryInfo
			})
		} else {
      message.error(res.message)
    }
    this.props.dispatch({
      type:'tab/loding',
      payload:false
    })
	},err => {
		message.error(err.message)
	})
}
renderDelivery(deliveryInfo) {
  return <Card title='配送信息'>
          {
            this.state.orderInfo.deliveryType==2?
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
              <div className='cardlist_item'><label>快递单号：</label><span>{deliveryInfo.expressNo}</span></div>
            </div>
          }
          </Card>
}
render(){
  const {orderInfo,userInfo,goodsInfos,shopInfo,logInfos, deliveryInfo} = this.state;
	return(
			<div>
        <div className='mb10'>
          <Card title='个人信息'>
            <div className='cardlist'>
              <div className='cardlist_item'><label>用户id：</label><span>{orderInfo.orderNo}</span></div>
              <div className='cardlist_item'><label>Qtools昵称：</label><span>{orderInfo.createTime}</span></div>
              <div className='cardlist_item'><label>微信昵称：</label><span>{orderInfo.statusStr}</span></div>
              <div className='cardlist_item'><label>手机号：</label><span>{orderInfo.orderStatusStr}</span></div>
              <div className='cardlist_item'><label>注册时间：</label><span>{orderInfo.orderNum}</span></div>
              <div className='cardlist_item'><label>注册平台：</label><span>{platformMap[orderInfo.platform]}</span></div>
              <div className='cardlist_item'><label>生日：</label><span>{deliveryMap[orderInfo.deliveryType]}</span></div>
              <div className='cardlist_item'><label>居住城市：</label><span>{orderInfo.amountSum}</span>元</div>
            </div>
          </Card>
        </div>
        <div className='mb20'>
          <Table
            bordered
            title={()=>'宝宝信息'}
            dataSource={goodsInfos}
            columns={columns}
            pagination={false}/>
        </div>
				<div className='mb20'>
          <Table
            bordered
            title={()=>'信息修改日志'}
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
