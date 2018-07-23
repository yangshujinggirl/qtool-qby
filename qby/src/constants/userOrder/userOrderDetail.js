import React from 'react';
import EditableTable from '../../components/table/tablebasic';
import { Button, Icon ,Form,Select,Input,Card, message } from 'antd';
import { getInfoApi } from '../../services/orderCenter/userOrders'
import { connect } from 'dva';
const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;

class userOrderDetail extends React.Component{
	constructor(props) {
		super(props);
    this.result={
      orderInfos:{},
      userInfos:{},
			goodsInfos:[],
      shopInfos:{},
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
			dataIndex: 'statusStr',
			key:'1'
		}, {
			title: '操作时间',
			dataIndex: 'operateName',
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
	console.log(id)
	getInfoApi(id).then(res => {
		message.success('成功');
	},err => {
		message.error('失败')
	})
}
render(){
  const {orderInfos,userInfos,goodsInfos,shopInfos,logInfos} = this.result;
	return(
			<div>
        <div className='mb10'>
          <Card title='订单详情'>
            <div className='cardlist'>
                <div className='cardlist_item'><label>订单号：</label><span>{orderInfos.orderNo}</span></div>
                <div className='cardlist_item'><label>下单时间：</label><span>{orderInfos.createTime}</span></div>
                <div className='cardlist_item'><label>流程状态：</label><span>{orderInfos.orderStatus}</span></div>
                <div className='cardlist_item'><label>订单金额：</label><span>{orderInfos.amountSum}</span></div>
                <div className='cardlist_item'><label>优惠券：</label><span>{orderInfos.coupon}</span></div>
                <div className='cardlist_item'><label>订单序号：</label><span>{orderInfos.orderNum}</span></div>
            </div>
          </Card>
        </div>
				<div className='mb10'>
          <Card title='用户信息'>
            <div className='cardlist'>
                <div className='cardlist_item'><label>昵称：</label><span>{userInfos.nickname}</span></div>
                <div className='cardlist_item'><label>注册手机：</label><span>{userInfos.mobile}</span></div>
                <div className='cardlist_item'><label>下单次数：</label><span>{userInfos.userSumCounts}</span></div>
                <div className='cardlist_item'><label>本店下单次数：</label><span>{userInfos.spSumCounts}</span></div>
            </div>
          </Card>
        </div>
        <div className='mb20'>
          <EditableTable
            columns={this.columns1}
            title='处理日志'
            bordered={true}
            dataSource = { goodsInfos }
          />
        </div>
				<div className='mb10'>
          <Card title='门店信息'>
            <div className='cardlist'>
                <div className='cardlist_item'><label>门店名称：</label><span>{shopInfos.spShopName}</span></div>
                <div className='cardlist_item'><label>店主姓名：</label><span>{shopInfos.shopman}</span></div>
                <div className='cardlist_item'><label>店主电话：</label><span>{shopInfos.telephone}</span></div>
                <div className='cardlist_item'><label>门店电话：</label><span>{shopInfos.mobile}</span></div>
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
