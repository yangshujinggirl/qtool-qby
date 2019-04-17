import React,{ Component } from 'react';
import {connect} from 'dva'
import {Card,Button,Table,Modal} from 'antd';
import { couponInfoApi,exportMdApi} from '../../../services/activity/coupon' //请求方法
import './index.css'
const confirm = Modal.confirm
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
      couponInfo:{},
      operateLogs:[],
      activityShop:[],
      activityProduct:{}
    }
  }

  //拿取数据
  componentWillMount(){
    const {couponId} = this.props.data;
    couponInfoApi({couponId})
    .then(res => {
      if(res.code=="0"){
        this.setState({
          couponInfo:res.couponInfo||[],
          operateLogs:res.operateLogs||[],
          activityShop:res.activityShop,
          activityProduct:res.activityProduct
        })
      }
    })
  }
  //导出门店明细
  exportShop =()=> {
    const {couponId} = this.props.data;
    exportMdApi({downloadParam:{couponId},type:111}).then(res => {
      if(res.code == '0'){
        confirm({
          title: '数据已经进入导出队列',
          content: '请前往下载中心查看导出进度',
          cancelText:'稍后去',
          okText:'去看看',
          onOk:()=>{
            const paneitem={title:'下载中心',key:'000001',componkey:'000001',data:null}
            this.props.dispatch({
              type:'tab/firstAddTab',
              payload:paneitem
            });
            this.props.dispatch({
              type:'downlaod/fetch',
              payload:{code:'qerp.web.sys.doc.list',values:{limit:15,currentPage:0}}
            });
          },
        });
      }
    })
  }
  render(){
    const {couponInfo,operateLogs,activityShop,activityProduct } = this.state;
    return(
      <div className='coupon_detail'>
        <div className='mb10'>
          <Card title='基本信息'>
            <div className='cardlist'>
              <div className='cardlist_item'><label>优惠券批次号：</label><span>{couponInfo.couponCode}</span></div>
              <div className='cardlist_item'><label>优惠券有效日期：自用户领取{couponInfo.couponValidDay}日起</label></div>
              <div className='cardlist_item'><label>优惠券状态：</label><span>{couponInfo.statusStr}</span></div>
              <div className='cardlist_item'><label>创建人：</label><span>{couponInfo.creater}</span></div>
              <div className='cardlist_item'><label>创建时间：</label><span>{couponInfo.createTime}</span></div>
              <div className='cardlist_item'><label>优惠券金额：</label><span>{couponInfo.couponMoney}</span></div>
              <div className='cardlist_item'><label>使用门槛：</label><span>{couponInfo.couponFullAmount}</span></div>
              <div className='cardlist_item'><label>优惠券数：</label><span>{couponInfo.couponCount}</span></div>
              <div className='cardlist_item'><label>发放方式：</label><span>
                {couponInfo.couponUseScene == 1 ? '新用户专享券'
                   :(couponInfo.couponUseScene == 2 ? '注券' : '手动领取')
                 }
              </span></div>
              <div className='cardlist_item'><label>使用限制：</label>
                <span>{
                    couponInfo.couponUsageLimit == 1?'不可与限时直降同享':(
                      couponInfo.couponUsageLimit == 2?'不可与秒杀同享':'不可与限时直降同享、不可与秒杀同享'
                    )
                  }</span>
              </div>
              <div className='cardlist_item'><label>剩余数量预警数：</label><span>{couponInfo.couponWarningQty}</span></div>
              <div className='cardlist_item'><label>预警邮箱：</label><span>{couponInfo.couponWarningEmail}</span></div>
              <div className='cardlist_item'><label>优惠券说明：</label><span>{couponInfo.couponExplain}</span></div>
              <div className='cardlist_item'><label>优惠券备注：</label><span>{couponInfo.couponRemark}</span></div>
            </div>
          </Card>
        </div>
        <div  className='mb10'>
          <Card title='活动商品'>
            <div className='des'>　适用商品类型：
              {
                activityProduct.couponUseScope == 1
                ? '一般贸易商品'
                :(activityProduct.couponUseScope == 2
                  ? '保税商品 '
                  :(activityProduct.couponUseScope == 4
                    ? '全部商品'
                    :(activityProduct.brandList&&activityProduct.brandList.map((item,index)=>(
                        <span key={index}>【{item.name}】、</span>))
                    )
                  )
                )
              }
            </div>
          </Card>
        </div>
        <div  className='mb10'>
          <Card title='活动门店'>
            <div className='des'>
              <span>　适用门店类型：
                {
                  activityShop.couponShopScope=='0'
                  ? '全部门店'
                  : (activityShop.couponShopScope=='1')
                    ? '加盟店'
                    :'直联营店'
              }</span>
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
function mapStateToProps(state){
  const {coupon} = state;
  return {coupon}
}
export default connect(mapStateToProps)(CouponDetail)
