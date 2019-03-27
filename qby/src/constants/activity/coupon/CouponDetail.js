import React,{ Component } from 'react';
import {Card,Button,Table} from 'antd';
import { couponInfoApi } from '../../../services/activity/coupon' //请求方法
import './index.css'
const columns = [
  {
    title:'操作',
    dataIndex:'operation',
  },{
    title:'操作描述',
    dataIndex:'operationMsg',
  }, {
    title:'操作时间',
    dataIndex:'createTime',
  },{
    title:'操作人',
    dataIndex:'operator',
  },
]
class CouponDetail extends Component{
  constructor(props){
    super(props);
    this.state = {
      coupon:{},
      operateLogs:[],
      activityShop:[],
    }
  }

  //拿取数据
  componentWillMount(){
    const couponId = this.props.data.pdSpuId;
    couponInfoApi({couponId:couponId})
    .then(res => {
      if(res.code=="0"){
        this.setState({
          coupon:res.coupon||[],
          operateLogs:res.operateLogs||[],
          activityShop:res.activityShop,
        })
      }
    })
  }
  //导出门店明细
  exportShop =()=> {

  }
  render(){
    const {coupon,operateLogs,activityShop} = this.state;
    return(
      <div className='coupon_detail'>
        <div className='mb10'>
          <Card title='基本信息'>
            <div className='cardlist'>
              <div className='cardlist_item'><label>优惠券批次号：</label><span>{coupon.recName}</span></div>
              <div className='cardlist_item'><label>优惠券有效日期：自用户领取7日起</label><span>{coupon.recMobile}</span></div>
              <div className='cardlist_item'><label>优惠券状态：</label><span>{coupon.recAddress}</span></div>
              <div className='cardlist_item'><label>创建人：</label><span>{coupon.shunFengExpenses}</span></div>
              <div className='cardlist_item'><label>创建时间：</label><span>{coupon.knightName}</span></div>
              <div className='cardlist_item'><label>优惠券金额：</label><span>{coupon.knightMobile}</span></div>
              <div className='cardlist_item'><label>使用门槛：</label><span>{coupon.predictDeliveryTime}</span></div>
              <div className='cardlist_item'><label>优惠券数：</label><span>{coupon.actualDeliveryTime}</span></div>
              <div className='cardlist_item'><label>发放方式：</label><span>{coupon.actualDeliveryTime}</span></div>
              <div className='cardlist_item'><label>使用限制：</label><span>{coupon.actualDeliveryTime}</span></div>
              <div className='cardlist_item'><label>剩余数量预警数：</label><span>{coupon.actualDeliveryTime}</span></div>
              <div className='cardlist_item'><label>预警邮箱：</label><span>{coupon.actualDeliveryTime}</span></div>
              <div className='cardlist_item'><label>优惠券说明：</label><span>{coupon.actualDeliveryTime}</span></div>
              <div className='cardlist_item'><label>优惠券备注：</label><span>{coupon.actualDeliveryTime}</span></div>
            </div>
          </Card>
        </div>
        <div  className='mb10'>
          <Card title='活动商品'>
            <div className='des'>　适用商品类型：指定品牌【嘉宝娜】、【ashai】</div>
          </Card>
        </div>
        <div  className='mb10'>
          <Card title='活动门店'>
            <div className='des'>
              <span>　适用商品类型：指定品牌【嘉宝娜】、【ashai】</span>
              <Button className='export_shop_detail' type='primary' onClick={this.exportShop}>导出门店明细</Button>
            </div>
          </Card>
        </div>
        <div className='mb20'>
          <Table
            bordered
            title={()=>'处理日志'}
            dataSource={operateLogs}
            columns={columns}
            pagination={false}/>
        </div>
      </div>
    )
  }
}
export default CouponDetail
