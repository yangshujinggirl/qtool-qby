import React from 'react';
import EditableTable from '../../components/table/tablebasic';
import { Button,Icon,Form,Select,Input,Card,message,Radio} from 'antd';
import { getInfoApi } from '../../services/orderCenter/userth/allth'
import { connect } from 'dva';
import Imgmodel from '../../components/model/modelimg';
import './index.less'

const TextArea = Input.TextArea;
const FormItem = Form.Item;
const RadioGroup = Radio.Group;

class UserthDetail extends React.Component{
	constructor(props) {
		super(props);
    this.state={
			loading1:false,
			loading2:false,
      value:'',
			backInfos:{},
			goodInfos:[],
			orderLogs:[]
    },
		this.columns1 = [{
			title: '商品名称',
			dataIndex: 'pdName',
      key:'1'
		}, {
			title: '规格',
			dataIndex: 'displayName',
      key:'2'
		}, {
			title: '商品编码',
			dataIndex: 'pdCode',
      key:'3'
		}, {
			title: '退款数量',
			dataIndex: 'returnCount',
      key:'4'
		}, {
			title: '退款金额',
			dataIndex: 'returnQuota',
      key:'5'
		}];

		this.columns2 = [{
			title: '操作',
			dataIndex: 'operation',
			key:'1'
		}, {
			title: '操作时间',
			dataIndex: 'operationTime',
			key:'2'
		}, {
			title: '操作人',
			dataIndex: 'operationer',
			key:'3'
		}, {
			title: '备注',
			dataIndex: 'remark',
			key:'4'
		}];
}
//初始化
componentWillMount(){
	const id = this.props.data.orderReturnNo;
	getInfoApi({orderReturnNo:id}).then(res => {
		if(res.code=='0'){
			this.setState({
				backInfos:res.pdOrderReturnDetailPage.ReturnOrderBaseInfo,
	      goodInfos:res.pdOrderReturnDetailPage.pdOrderReturnDetail,
				orderLogs:res.pdOrderReturnDetailPage.pdOrderReturnLog,
			})
		}
	},err => {
		message.error(err.message)
	})
}
//单选按钮 的变化
onChange = (e) => {
  console.log('radio checked', e.target.value);
  this.setState({
    value: e.target.value,
  });
}
//拒绝买家退款
refuse =()=> {
	this.setState({
		loading1:true
	})
}
//同意买家退款
agree =()=> {
	this.setState({
		loading2:true
	})
}
render(){
  const {backInfos,goodInfos,orderLogs} = this.state
	if(orderLogs[0]){
		orderLogs.map((item,index)=>{
			item.key = index;
			return item;
		});
	}
  const {getFieldDecorator} = this.props.form;
  const radioStyle = {
        display: 'block',
        height: '30px',
        lineHeight: '30px',
      };
	return(
			<div className='userth-detail'>
        <div className='mb10'>
          <Card title='退单信息'>
            <div className='cardlist'>
                <div className='cardlist_item'><label>退单号：</label><span>{backInfos.orderReturnNo}</span></div>
                <div className='cardlist_item'><label>用户订单号：</label><span>{backInfos.orderNum}</span></div>
                <div className='cardlist_item'><label>用户手机号：</label><span>{backInfos.userPhone}</span></div>
                <div className='cardlist_item'><label>用户昵称：</label><span>{backInfos.userNickName}</span>元</div>
                <div className='cardlist_item'><label>生成时间：</label><span>{backInfos.createTime}</span>元</div>
                <div className='cardlist_item'><label>退款类型：</label><span>{backInfos.returnTypeStr}</span></div>
                <div className='cardlist_item'><label>退款方式：</label><span>{backInfos.returnWayStr}</span></div>
                <div className='cardlist_item'><label>退单状态：</label><span>{backInfos.returnStatusStr}</span></div>
                <div className='cardlist_item'><label>退款总金额：</label><span>{backInfos.actualReturnQuota}</span></div>
                <div className='cardlist_item'><label>退款原因：</label><span>{backInfos.returnReason}</span></div>
                <div className='cardlist_item'><label>快递单号：</label><span>{backInfos.courierNumber}</span></div>
                <div className='cardlist_item'><label>退款地址：</label><span>{backInfos.returnPdAddress}</span></div>
            </div>
          </Card>
        </div>
        <div className='mb20'>
          <EditableTable
            columns={this.columns1}
            title='商品信息'
            bordered={true}
            dataSource = { goodInfos }
          />
        </div>
				{ this.props.data.type == '1' &&
	        <div style={{padding:'10px 0',border:'1px solid #e8e8e8',margin:'10px 0',marginBottom:"10px"}}>
						<p style={{borderBottom:'1px solid #e8e8e8',padding:'5px 10px 15px'}}>详细描述</p>
						<Form className='mt20'>
							<FormItem
								label="退款原因"
								labelCol={{ span: 2 }}
								wrapperCol={{ span: 12 }}
							>
								<div>1111</div>
							</FormItem>
	            <FormItem
								label="详细描述"
								labelCol={{ span: 2 }}
								wrapperCol={{ span: 12 }}
							>
								<div>1111</div>
							</FormItem>
							<FormItem
								label="图片"
								labelCol={{ span: 2 }}
								wrapperCol={{ span: 12 }}
							>
	            <ul className='img-list-wrap'>
	              <li className="img-item">
	                <Imgmodel picUrl='/static/eye.png'/>
	              </li>
	            </ul>
							</FormItem>
	  				</Form>
					</div>
				}
        <div style={{padding:'10px 0',border:'1px solid #e8e8e8',marginBottom:"10px"}}>
					<p style={{borderBottom:'1px solid #e8e8e8',padding:'5px 10px 15px'}}>退单处理</p>
					<Form className='mt20'>
					{
							this.props.data.type == '1' &&
							<FormItem
								label="退款方式"
								labelCol={{ span: 2 }}
								wrapperCol={{ span: 12 }}
							>
	            {getFieldDecorator('status',{
	              initialValue:this.state.value
	            })(
	              <RadioGroup onChange={this.onChange}>
	                <Radio style={radioStyle} value={1}>仅退款</Radio>
	                <Radio style={radioStyle} value={2}>退货退款</Radio>
	                  {
	                    this.state.value === 2
	                      ? <div>退货地址：<Input style={{ width: 300, marginLeft: 10 }} /></div>
	                      : null
	                   }
	              </RadioGroup>
	            )}
							</FormItem>
						}
						<FormItem
							label="拒绝原因"
							labelCol={{ span: 2 }}
							wrapperCol={{ span: 12 }}
						>
            {getFieldDecorator('remark',{
              rules:[{required:true,message:"请输入50字符以内"}]
            })(
              <TextArea rows={4}   placeholder='限制50字符以内' maxLength='200'/>
            )}
						</FormItem>
  				</Form>
					<div className='reason-btn'>
						<Button size='large' className='btn' onClick={this.refuse} loading={this.state.loading1} >拒绝买家退款</Button>
						<Button type="primary" size='large' onClick={this.agree} loading={this.state.loading2} >同意买家退款</Button>
					</div>
				</div>
				<div className='mb20'>
          <EditableTable
            columns={this.columns2}
            title='订单日志'
            bordered={true}
            dataSource = { orderLogs }
          />
        </div>
			</div>
		)}
}
const UserthDetails = Form.create({})(UserthDetail)
export default UserthDetails;
