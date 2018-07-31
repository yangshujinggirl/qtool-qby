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
			fileList:[],
			feedbackInfos:{},
      feedbackDetail:{},
      feedbackLogs:[],
			handelFeedBack:{}
		}
		this.columns = [{
			title: '反馈状态',
			dataIndex: 'statusStr',
      key:'1',
			render:(text,record)=> <a href="javascript:;">{record.fromStatusStr}-{record.toStatusStr}</a>
		}, {
			title: '处理备注',
			dataIndex: 'remark',
      key:'2'
		}, {
			title: '图片备注',
			dataIndex: 'operator',
      key:'4',
			render:(text,record)=>{
				let imgList;
				if(record.remarkPic) {
					imgList = JSON.parse(record.remarkPic);
					return (
						<div>
							{
								imgList.map((el,index) => (
									<img src={el.imgPath} key={index} style={{width:'100px',height:'100px'}}/>
								))
							}
						</div>
					)
				} else {
					return null
				}
			}
		},{
			title: '处理人',
			dataIndex: 'handleUser',
      key:'3'
		},  {
			title: '处理时间',
			dataIndex: 'createTime',
      key:'5'
		}];
}


render(){
  const {feedbackInfos,feedbackDetail,handelFeedBack,feedbackLogs} = this.state;
	feedbackInfos.status = String(feedbackInfos.status);
  const { getFieldDecorator } = this.props.form;
	console.log(this.state.fileList)
	return(
			<div>
        <div className='mb10'>
          <Card title='工单信息'>
            <div className='cardlist'>
                <div className='cardlist_item'><label>客服单号：</label><span>{feedbackInfos.customServiceNo}</span></div>
                <div className='cardlist_item'><label>客服状态：</label><span>{feedbackInfos.status}</span></div>
                <div className='cardlist_item'><label>处理时长：</label><span>{feedbackInfos.handleTime}</span></div>
                <div className='cardlist_item'><label>开始时间：</label><span>{feedbackInfos.createTime}</span></div>
                <div className='cardlist_item'><label>部门/用户/门店：</label><span>{feedbackInfos.source}</span></div>
                <div className='cardlist_item'><label>联系电话：</label><span>{feedbackInfos.waiterTel}</span></div>
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
							<div>{feedbackDetail.customServiceTheme}</div>
						</FormItem>
						<FormItem
							label="反馈内容"
							labelCol={{ span: 2 }}
							wrapperCol={{ span: 12 }}
						>
							<div className='clearfix'>{feedbackDetail.content}</div>
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
              initialValue:feedbackInfos.status
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
								changeImg = {this.changeImg}
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
            dataSource = { feedbackLogs }
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
    customserviceDetailApi({customServiceId:id})
    .then(res=>{
			if(res.code=='0'){
				var imgLists = [];
				var imgList = JSON.parse(res.handelFeedBack.remarkPic);
				imgList.map((item,index)=>{
					const obj={uid: -1,name: 'xxx.png',status: 'done',url:''}
					obj.url = item.imgPath;
					imgLists.push(obj);
				});
				this.setState({
					feedbackInfos:res.feedbackInfos,
					feedbackDetail:res.feedbackDetail,
					handelFeedBack:res.handelFeedBack,
					feedbackLogs:res.feedbackLogs,
					fileList:imgLists
				})
			};
    },err=>{
      message.error('失败')
    })
	}
	//图片处理
	changeImg =(fileList)=>{
		var imgLists = [];
		fileList.map((item,index)=>{
			if(item.status=='done'){
				const obj={uid: -1,name: 'xxx.png',status: 'done',url:''}
				obj.url = item.response.data[0];
				imgLists.push(obj);
			}
		});
		this.setState({fileList:imgLists})
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
			const {fileList} = this.state;
			var imgList = [];
			fileList.map((item,index)=>{
				if(item.status=='done'){
					let obj = {};
					obj.imgPath = item.url;
					imgList.push(obj);
				}
			});
			const _values = {customServiceId:this.props.data.pdSpuId,...values,imgList}
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
				type:'serverBill/fetchList',
				payload:{}
			})
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
