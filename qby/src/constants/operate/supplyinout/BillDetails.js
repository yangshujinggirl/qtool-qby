	import React from 'react';
import EditableTable from '../../../components/table/tablebasic';
import { Button, Form, Input, message,Card, Modal, DatePicker } from 'antd';
import { connect } from 'dva';
import { billDetailsApi,changeAccountApi } from '../../../services/operate/supplyinout'
import UpLoadImg from '../../../components/UploadImg/index.js';
import './index.less'
import moment from 'moment'
const FormItem = Form.Item;
const { TextArea } = Input;
const RangePicker = DatePicker.RangePicker

class BillDetail extends React.Component{
	constructor(props) {
		super(props);
		this.state={
      visible:false,
      pdSettles:{},
      logs:[]
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
componentDidMount(){
	this.initData()
}
initData =()=> {
	const {pdSettlementId} = this.props.data;
	billDetailsApi({pdSettlementId})
	.then(res=>{
		if(res.code == '0'){
			this.setState({
				pdSettles:res.pdSettles,
				logs:res.logs
			});
		};
	})
}
//点击修改结算到期日
changeStatus =()=> {
	this.setState({visible:true})
}
//确定
onOk =()=> {
	this.props.form.validateFieldsAndScroll((err,values) => {
		const {pdSettlementId} = this.props.data;
		values.expireDate = moment(values.expireDate).format('YYYY-MM-DD');
		values.pdSettlementId = pdSettlementId;
		if(!err){
			changeAccountApi(values)
			.then(res => {
				if(res.code == '0'){
					this.setState({visible:false});
					this.props.form.resetFields(['expireDate','remark']);
					this.initData()
				};
			})
		}
	});
}
//取消
onCancel =()=> {
	this.setState({
		visible:false
	});
	this.props.form.resetFields(['expireDate','remark'])
}

render(){
	console.log(this.props);
  const {
    settlementNo,
    outNo,
    typeStr,
    statusStr,
    expireDate,
    name,
    userName,
    amountSum
  } = this.state.pdSettles;
  const logs = this.state.logs;
	const { getFieldDecorator }= this.props.form;
	const rolelists = this.props.data.rolelists;
	//修改结算到期日
	const accountChange = rolelists.find((currentValue,index)=>{
		return currentValue.url=="qerp.web.pd.settle.update"
	})
	return(
			<div className='bill_detail'>
        <div className='mb10 change_day'>
					{
						this.props.data.status == 0 && accountChange
						?
							<Button
								size='large'
								onClick={this.changeStatus}
								type='primary'>修改结算到期日
							</Button>
						:	null
					}

        </div>
        <div className='mb10'>
          <Card title='工单信息'>
            <div className='cardlist'>
                <div className='cardlist_item'><label>结算单号：</label><span>{settlementNo}</span></div>
                <div className='cardlist_item'><label>关联订单：</label><span>{outNo}</span></div>
                <div className='cardlist_item'><label>类型：</label><span>{typeStr}</span></div>
                <div className='cardlist_item'><label>是否已结算：</label><span>{statusStr}</span></div>
                <div className='cardlist_item'><label>结算到期日：</label><span>{expireDate}</span></div>
                <div className='cardlist_item'><label>供应商名称：</label><span>{name}</span></div>
                <div className='cardlist_item'><label>关联业务人员：</label><span>{userName}</span></div>
                <div className='cardlist_item'>
									{ this.props.data == 10
										? <span><label>应收金额：</label><span>-{amountSum}</span></span>
										:<span><label>应付金额：</label><span>+{amountSum}</span></span>
									}
								</div>
            </div>
          </Card>
        </div>
        <div className='mb20 server-bill-edit'>
          <EditableTable
            columns={this.columns}
            title='处理日志'
            bordered={true}
            dataSource = {logs}
          />
        </div>
				<Modal
					visible={this.state.visible}
					closable = { true }
					onOk={this.onOk}
          onCancel={this.onCancel}
					wrapClassName='billModal'
				>
					<Form>
						<FormItem
							label="当前结算到期日为"
							labelCol={{ span: 6 }}
							wrapperCol={{ span: 12 }}
						>
							<span>{expireDate}</span>
						</FormItem>
						<FormItem
							label="修改为"
							labelCol={{ span: 6 }}
							wrapperCol={{ span: 12 }}
						>
							{getFieldDecorator('expireDate',{
								rules: [{required: true, message: '请选择结算到期日'}],
							})(
								<DatePicker
									placeholder='请选择结算到期日'
									className='data_size'
									showTime
								/>
							)}
						</FormItem>
						<FormItem
							label='修改原因'
							labelCol={{ span: 6 }}
							wrapperCol={{ span: 12 }}
						>
								{getFieldDecorator('remark',{
									rules: [{required: true, message: '请输入修改原因'}],
								})(
									<TextArea placeholder='请输入修改原因' maxLength='50'/>
								)}
						</FormItem>
					</Form>
				</Modal>
			</div>
		)
	}

}
const BillDetails = Form.create()(BillDetail);
function mapStateToProps(state){
  const { supplyinout } = state;
  return { supplyinout }
}
export default connect(mapStateToProps)(BillDetails);
