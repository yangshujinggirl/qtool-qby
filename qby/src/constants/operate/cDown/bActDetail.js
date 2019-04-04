import React from 'react';
import { Card,message,Table,Button,Modal } from 'antd';
import { getInfoApi,exportMdApi } from '../../../services/operate/bActPrice/index'
import { connect } from 'dva';
const confirm = Modal.confirm;
const columns = [{
    title: '商品编码',
    dataIndex: 'pdCode',
    key:'1'
  }, {
    title: '商品名称',
    dataIndex: 'name',
    key:'2'
  }, {
    title: '规格',
    dataIndex: 'displayName',
    key:'3'
  }, {
    title: '零售价',
    dataIndex: 'salePrice',
    key:'4'
  }, {
    title: '活动特价',
    dataIndex: 'specialPrice',
    key:'5'
  }];
const columns2 = [{
    title: '操作',
    dataIndex: 'action',
    key:'1'
  },{
    title: '操作描述',
    dataIndex: 'remark',
    key:'2'
  }, {
    title: '操作时间',
    dataIndex: 'createTime',
    key:'3'
  }, {
    title: '操作人',
    dataIndex: 'operateUser',
    key:'4'
  }];

class activityDetail extends React.Component{
	constructor(props) {
		super(props);
    this.state={
      activityInfo:{},
      goodsInfos:[],
      logInfos:[]
    }
  }
//初始化
componentDidMount(){
	this.getDetail()
}
getDetail() {
  const {activityId} = this.props.data;
	getInfoApi({activityId}).then(res => {
    let { activityInfo,goodsInfos,logInfos } = res;
    logInfos = logInfos||[];
    goodsInfos = goodsInfos||[];
    logInfos.length>0 && logInfos.map((item,index)=>{
  		item.key = index;
  		return item;
  	});
  	goodsInfos.length>0&&goodsInfos.map((item,index)=>{
  		item.key = index;
  		return item;
  	});
		this.setState({
			activityInfo,
      goodsInfos,
      logInfos
		});
	},err => {
		message.error(err.message)
	});
}
//导出门店明细
exportShop =()=> {
  const {shopType,activityId} = this.state.activityInfo;
  exportMdApi({downloadParam:{shopType,activityId},type:110}).then(res => {
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
  const {activityInfo,goodsInfos,logInfos} = this.state;
	return(
			<div>
        <div className='mb10'>
          <Card title='订单详情'>
            <div className='cardlist'>
              <div className='cardlist_item'><label>活动编码：</label><span>{activityInfo.no}</span></div>
              <div className='cardlist_item'><label>活动名称：</label><span>{activityInfo.name}</span></div>
              <div className='cardlist_item'><label>预热时间：</label><span>{activityInfo.warmTime}</span></div>
              <div className='cardlist_item'><label>活动状态：</label><span>{activityInfo.statusStr}</span></div>
              <div className='cardlist_item'><label>创建时间：</label><span>{activityInfo.beginTime}~{activityInfo.endTime}</span></div>
              <div className='cardlist_item'><label>活动平台：</label>
                <span>
                  {activityInfo.activityPlat=='1' ? '线上APP'
                    : (activityInfo.activityPlat=='2') ? '线下POS'
                      :'线上APP、线下POS'
                  }
                </span>
              </div>
              <div className='cardlist_item'><label>出货平台：</label>
                <span>
                  {activityInfo.shipmentPlat=='1' ? '门店'
                    : (activityInfo.shipmentPlat=='2') ? '仓库'
                      :'门店、仓库'
                  }
                </span>
              </div>
              <div className='cardlist_item'><label>是否生成门店利润：</label><span>{activityInfo.isStoreProfit?'是':'否'}</span></div>
              <div className='cardlist_item'><label>活动成本承担方：</label><span>{activityInfo.activityCostbearer?'是':'否'}</span></div>
              <div className='cardlist_item'><label>活动备注：</label><span>{activityInfo.remark}</span></div>
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
        {
          activityInfo.type == 3 &&
          <Card title='活动门店'>
            <div style={{'padding':'20px'}}>门店范围：{
                activityInfo.shopType == 1?'全部门店':
                (activityInfo.shopType == 2 ? '加盟店' :
                  (activityInfo.shopType == 3 ? '直联营店' : '指定门店')
                )
              }</div>
            <Button type='primary' style={{'float':'right','margin-right':'20px'}} onClick={this.exportShop}>导出门店明细</Button>
          </Card>
        }
        </div>
				<div className='mb20'>
          <Table
            bordered
            title={()=>'操作日志'}
            dataSource={logInfos}
            columns={columns2}
            pagination={false}/>
        </div>
			</div>
		)}
}
function mapStateToProps(state){
  const {bActPrice} = state;
  return {bActPrice};
}
export default connect(mapStateToProps)(activityDetail);
