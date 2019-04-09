import React from 'react';
import { Card,message,Table } from 'antd';
import { getInfoApi } from '../../../services/operate/bActPrice/index'
import { connect } from 'dva';

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
    title: '供价',
    dataIndex: 'toBPrice',
    key:'4'
  },{
    title: '合同进价',
    dataIndex: 'costPrice',
    key:'5'
  }, {
    title: '活动进价',
    dataIndex: 'activityPrice',
    key:'6'
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
render(){
  // const infos = [
  //   {name:'批次编号',byteName:'no'},
  //   {name:'批次名称',byteName:'name'},
  //   {name:'创建时间',byteName:'createTime'},
  //   {name:'批次状态',byteName:'statusStr'},
  //   {name:'生效时间',byteName:'no'},
  //   {name:'备注',byteName:'remark'},
  // ]
  const {activityInfo,goodsInfos,logInfos} = this.state;
	return(
			<div>
        <div className='mb10'>
          <Card title='订单详情'>
            <div className='cardlist'>
               <div className='cardlist_item'><label>活动编码：</label><span>{activityInfo.no}</span></div>
               <div className='cardlist_item'><label>活动名称：</label><span>{activityInfo.name}</span></div>
               <div className='cardlist_item'><label>活动状态：</label><span>{activityInfo.statusStr}</span></div>
               <div className='cardlist_item'><label>活动时间：</label><span>{activityInfo.beginTime}~{activityInfo.endTime}</span></div>
               <div className='cardlist_item'><label>创建人：</label><span>{activityInfo.createUser}</span></div>
               <div className='cardlist_item'><label>创建时间：</label><span>{activityInfo.createTime}</span></div>
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
export default activityDetail;
