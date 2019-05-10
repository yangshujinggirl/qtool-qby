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
    title: '合同进价',
    dataIndex: 'costPrice',
    key:'4'
  }, {
    title: '活动进价',
    dataIndex: 'activityPrice',
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
render(){
  const {activityInfo,goodsInfos,logInfos} = this.state;
	return(
			<div>
        <div className='mb10'>
          <Card title='基本信息'>
            <div className='cardlist'>
              <div className='cardlist_item'><label>批次编号：</label><span>{activityInfo.no}</span></div>
              <div className='cardlist_item'><label>批次名称：</label><span>{activityInfo.name}</span></div>
              <div className='cardlist_item'><label>创建时间：</label><span>{activityInfo.createTime}</span></div>
              <div className='cardlist_item'><label>批次状态：</label><span>{activityInfo.statusStr}</span></div>
              <div className='cardlist_item'><label>生效时间：</label><span>{activityInfo.beginTime}~{activityInfo.endTime}</span></div>
              <div className='cardlist_item'><label>备注：</label><span>{activityInfo.remark}</span></div>
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
