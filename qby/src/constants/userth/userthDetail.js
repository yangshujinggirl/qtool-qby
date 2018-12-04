import React from 'react';
import EditableTable from '../../components/table/tablebasic';
import { Button,Icon,Form,Select,Input,Card,message,Radio} from 'antd';
import { getInfoApi } from '../../services/orderCenter/userOrders'
import { connect } from 'dva';
import Imgmodel from '../../components/model/modelimg';

const TextArea = Input.TextArea;
const FormItem = Form.Item;
const RadioGroup = Radio.Group;

class UserthDetail extends React.Component{
	constructor(props) {
		super(props);
    this.state={
      value:'',
      orderInfo:{},
      userInfo:{},
			goodsInfos:[],
      shopInfo:{},
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
			title: '退款数量',
			dataIndex: 'qty',
      key:'4'
		}, {
			title: '退款金额',
			dataIndex: 'price',
      key:'5'
		}];

		this.columns2 = [{
			title: '操作',
			dataIndex: 'action',
			key:'1'
		}, {
			title: '操作时间',
			dataIndex: 'createTime',
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
	// const id = this.props.data.pdSpuId;
  const id =  1439;
	getInfoApi({orderId:id}).then(res => {
		if(res.code=='0'){
			this.setState({
				orderInfo:res.orderInfo,
	      userInfo:res.userInfo,
				goodsInfos:res.goodsInfos,
	      shopInfo:res.shopInfo,
				logInfos:res.logInfos
			})
		}
	},err => {
		message.error(err.message)
	})
}
onChange = (e) => {
    console.log('radio checked', e.target.value);
    this.setState({
      value: e.target.value,
    });
  }
render(){
  const {orderInfo,userInfo,goodsInfos,shopInfo,logInfos} = this.state;
	logInfos.map((item,index)=>{
		item.key = index;
		return item;
	});
	goodsInfos.map((item,index)=>{
		item.key = index;
		return item;
	});
  const {getFieldDecorator} = this.props.form;
  const radioStyle = {
        display: 'block',
        height: '30px',
        lineHeight: '30px',
      };
	return(
			<div>
        <div className='mb10'>
          <Card title='退单信息'>
            <div className='cardlist'>
                <div className='cardlist_item'><label>退单号：</label><span>{orderInfo.orderNo}</span></div>
                <div className='cardlist_item'><label>用户订单号：</label><span>{orderInfo.createTime}</span></div>
                <div className='cardlist_item'><label>用户手机号：</label><span>{orderInfo.orderStatusStr}</span></div>
                <div className='cardlist_item'><label>用户昵称：</label><span>{orderInfo.amountSum}</span>元</div>
                <div className='cardlist_item'><label>生成时间：</label><span>{orderInfo.deductionAmount}</span>元</div>
                <div className='cardlist_item'><label>退款类型：</label><span>{orderInfo.orderNum}</span></div>
                <div className='cardlist_item'><label>退款方式：</label><span>{orderInfo.orderNum}</span></div>
                <div className='cardlist_item'><label>退单状态：</label><span>{orderInfo.orderNum}</span></div>
                <div className='cardlist_item'><label>退款总金额：</label><span>{orderInfo.orderNum}</span></div>
                <div className='cardlist_item'><label>退款原因：</label><span>{orderInfo.orderNum}</span></div>
                <div className='cardlist_item'><label>快递单号：</label><span>{orderInfo.orderNum}</span></div>
                <div className='cardlist_item'><label>退款地址：</label><span>{orderInfo.orderNum}</span></div>
            </div>
          </Card>
        </div>
        <div className='mb20'>
          <EditableTable
            columns={this.columns1}
            title='商品信息'
            bordered={true}
            dataSource = { goodsInfos }
          />
        </div>
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
        <div style={{padding:'10px 0',border:'1px solid #e8e8e8',marginBottom:"10px"}}>
					<p style={{borderBottom:'1px solid #e8e8e8',padding:'5px 10px 15px'}}>退单处理</p>
					<Form className='mt20'>
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
            <FormItem

							labelCol={{ span: 2 }}
							wrapperCol={{ span: 12 }}
						>
              <div width='300px;margin:0 auto'>
                <Button size='large' >拒绝买家退款</Button>
                <Button type="primary" size='large'>同意买家退款</Button>
              </div>
						</FormItem>
  				</Form>
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
const UserthDetails = Form.create({})(UserthDetail)
export default UserthDetails;
