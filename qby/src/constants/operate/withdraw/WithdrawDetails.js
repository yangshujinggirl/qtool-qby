	import React from 'react';
import EditableTable from '../../../components/table/tablebasic';
import { Button, Form, Input, message,Card, Modal, DatePicker } from 'antd';
import { connect } from 'dva';
import { getDetailApi } from '../../../services/operate/withdraw'
import UpLoadImg from '../../../components/UploadImg/index.js';
import './index.less'
import moment from 'moment'
const FormItem = Form.Item;
const { TextArea } = Input;
const RangePicker = DatePicker.RangePicker

class WithdrawDetail extends React.Component{
	constructor(props) {
		super(props);
		this.state={
      spCarryCashs:{},
      spCarryCashLog:[]
		}
		this.columns = [{
  			title: '操作',
  			dataIndex: 'operateName',
        key:'1',
		  }, {
  			title: '操作时间',
  			dataIndex: 'operateTime',
        key:'2'
  		}, {
  			title: '操作人',
  			dataIndex: 'operateUser',
        key:'3',
  		},{
  			title: '备注',
  			dataIndex: 'remark',
        key:'4'
  		}];
}
componentWillMount(){
	console.log(this.props.data)
	this.initData()
}
initData =()=> {
	const {spCarryCashId} = this.props.data;
	getDetailApi({spCarryCashId})
	.then(res=>{
		if(res.code == '0'){
			this.setState({
				spCarryCashs:res.spCarryCashs,
				spCarryCashLog:res.spCarryCashLog
			});
		};
	})
}


render(){
  const {
    carryCashNo,
    statusStr,
    shopName,
    amount,
    createTime,
  } = this.state.spCarryCashs;
  const spCarryCashLog = this.state.spCarryCashLog;
	return(
			<div className='withdraw_detail'>
        <div className='mb10'>
          <Card title='提现信息'>
            <div className='cardlist'>
                <div className='cardlist_item'><label>提现单号：</label><span>{carryCashNo}</span></div>
                <div className='cardlist_item'><label>审核状态：</label><span>{statusStr}</span></div>
                <div className='cardlist_item'><label>门店名称：</label><span>{shopName}</span></div>
                <div className='cardlist_item'><label>提现金额：</label><span>{amount}</span></div>
                <div className='cardlist_item'><label>提现时间：</label><span>{createTime}</span></div>
            </div>
          </Card>
        </div>
        <div className='mb20 server-bill-edit'>
          <EditableTable
            columns={this.columns}
            title='订单日志'
            bordered={true}
            dataSource = {spCarryCashLog}
          />
        </div>
			</div>
		)
	}

}
const WithdrawDetails = Form.create()(WithdrawDetail);
function mapStateToProps(state){
  const { withdraw } = state;
  return { withdraw }
}
export default connect(mapStateToProps)(WithdrawDetail);
