import React from 'react';
import EditableTable from '../../../components/table/tablebasic';
import { Button, Icon ,Form,Select,Input,Card, message } from 'antd';
import { customserviceDetailApi,customserviceSaveApi } from '../../../services/server/server'
import UpLoadImg from '../../../components/UploadImg/index.js';
import { connect } from 'dva';
const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;

class HandleBill extends React.Component{
	constructor(props) {
		super(props);
		this.state={
			fileList:[]
		}
    this.result={
      customServiceInfos:{},
      customServiceContent:{},
      customServiceHandel:[]
    },
		this.columns = [{
			title: '反馈状态',
			dataIndex: 'statusStr',
      key:'1'
		}, {
			title: '处理备注',
			dataIndex: 'remark',
      key:'2'
		}, {
			title: '处理人',
			dataIndex: 'operator',
      key:'3'
		}, {
			title: '处理时间',
			dataIndex: 'operator',
      key:'4'
		}, {
			title: '处理时间',
			dataIndex: 'createTime',
      key:'5'
		}];
}


render(){
  const {customServiceInfos,customServiceContent,customServiceHandel,customServiceLogs} = this.result;
  const { getFieldDecorator } = this.props.form;
	return(
			<div>
        <div className='mb10'>
          <Card title='工单信息'>
            <div className='cardlist'>
                <div className='cardlist_item'><label>客服单号：</label><span>{customServiceInfos.customServiceNo}</span></div>
                <div className='cardlist_item'><label>客服状态：</label><span>{customServiceInfos.status}</span></div>
                <div className='cardlist_item'><label>处理时长：</label><span>{customServiceInfos.handleTime}</span></div>
                <div className='cardlist_item'><label>开始时间：</label><span>{customServiceInfos.createTime}</span></div>
                <div className='cardlist_item'><label>部门/用户/门店：</label><span>{customServiceInfos.source}</span></div>
                <div className='cardlist_item'><label>联系电话：</label><span>{customServiceInfos.waiterTel}</span></div>
            </div>
          </Card>
        </div>
				<div style={{padding:'10px 0',border:'1px solid #e8e8e8',margin:'10px 0',marginBottom:"10px"}}>
					<p style={{borderBottom:'1px solid #e8e8e8',padding:'5px 10px 15px'}}>工单内容</p>
					<Form className='mt20'>
						<FormItem
							label="客服主题"
							labelCol={{ span: 2 }}
							wrapperCol={{ span: 12 }}
						>
							<div>{customServiceContent.customServiceTheme}</div>
						</FormItem>
						<FormItem
							label="反馈内容"
							labelCol={{ span: 2 }}
							wrapperCol={{ span: 12 }}
						>
							<div className='clearfix'>{customServiceContent.content}</div>
						</FormItem>
  				</Form>
				</div>
				<div style={{padding:'10px 0',border:'1px solid #e8e8e8',marginBottom:"10px"}}>
					<p style={{borderBottom:'1px solid #e8e8e8',padding:'5px 10px 15px'}}>工单处理</p>
					<Form className='mt20'>
						<FormItem
							label="客服状态"
							labelCol={{ span: 2 }}
							wrapperCol={{ span: 12 }}
						>
            {getFieldDecorator('status',{
              initialValue:customServiceInfos.status
            })(
              <Select
								style={{width:'200px'}}
							>
								<Option value="10">待处理</Option>
								<Option value="20">处理中</Option>
								<Option value="30">已处理</Option>
							</Select>
            )}
						</FormItem>
						<FormItem
							label="处理备注"
							labelCol={{ span: 2 }}
							wrapperCol={{ span: 12 }}
						>
            {getFieldDecorator('remark')(
              <TextArea rows={4}   placeholder='备注信息，最多200字，方便其他人了解，非必填' maxLength='200'/>
            )}
						</FormItem>
						<FormItem
							label="图片备注"
							labelCol={{ span: 2 }}
							wrapperCol={{ span: 12 }}
						>
							<UpLoadImg
								getFieldDecorator={getFieldDecorator}
								name='imgFile'
								action = '/erpWebRest/qcamp/upload.htm?type=spu'
								fileList = {this.state.fileList}
								maxLength = '5'
							/>
						</FormItem>
  				</Form>
				</div>
        <div className='mb20'>
          <EditableTable
            columns={this.columns}
            title='处理日志'
            bordered={true}
            dataSource = { customServiceLogs }
          />
        </div>
					<FormItem style = {{marginBottom:0,textAlign:"center"}}>
						<Button className='mr30' onClick={this.onCancel} >取消</Button>
						<Button htmlType="submit" type="primary" onClick={this.onOk}>确定</Button>
        	</FormItem>
			</div>
		)
	}
	componentDidMount(){
    const id = this.props.data.pdSpuId;
    customserviceDetailApi(id)
    .then(res=>{
      message.success('成功');
    },err=>{
      message.error('失败')
    })
	}
	//取消
	onCancel =()=>{
		this.props.dispatch({
				type:'tab/initDeletestate',
				payload:this.props.componkey
		});
	}
	//确定
  onOk =()=> {
    this.props.form.validateFieldsAndScroll((err,values) => {
			console.log(values);
			const _values = {customServiceId:this.props.data.pdSpuId,...values}
			if(!err){
				this.submit(_values);
			};
		});
  }
	//提交
	submit =(values)=> {
		customserviceSaveApi(values)
		.then(res=>{
			this.props.dispatch({
					type:'tab/initDeletestate',
					payload:this.props.componkey
			});
		},err=>{
			message.error('失败')
		})
	}
}
const HandleBills = Form.create()(HandleBill);
function mapStateToProps(state){
  const { serverBill } = state;
  return { serverBill }
}
export default connect(mapStateToProps)(HandleBills);
