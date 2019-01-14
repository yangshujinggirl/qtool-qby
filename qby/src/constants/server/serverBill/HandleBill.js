import React from 'react';
import EditableTable from '../../../components/table/tablebasic';
import { Button, Icon ,Form,Select,Input,Card, message, Modal } from 'antd';
import { customserviceDetailApi,customserviceSaveApi } from '../../../services/server/server'
import UpLoadImg from '../../../components/UploadImg/index.js';
import { connect } from 'dva';
import './index.css'
const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;

class HandleBill extends React.Component{
	constructor(props) {
		super(props);
		this.state={
			visible:false,
			imgIndex:0,
			fileList:[],
			feedbackInfos:{},
      feedbackDetail:{},
      feedbackLogs:[],
			handelFeedBack:{},
			imgList:[],
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
					const fileDomain = eval(sessionStorage.getItem('fileDomain'));
					return (
						<div>
							{
								imgList.map((el,index) => (
									<img className='remark-img' onClick={()=>this.largeImg(index,imgList)} src={fileDomain+el.imgPath} key={index}/>
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

largeImg(index,imgList){
	this.setState({visible:true,imgIndex:index,imgList})
}
visible =()=>{
	this.setState({visible:false})
}
render(){
  const {feedbackInfos,feedbackDetail,handelFeedBack,feedbackLogs} = this.state;
	feedbackInfos.status = String(feedbackInfos.status);
  const { getFieldDecorator } = this.props.form;
	const fileDomain = eval(sessionStorage.getItem('fileDomain'));
	return(
			<div>
        <div className='mb10'>
          <Card title='工单信息'>
            <div className='cardlist'>
                <div className='cardlist_item'><label>客服单号：</label><span>{feedbackInfos.customServiceNo}</span></div>
                <div className='cardlist_item'><label>客服状态：</label><span>{feedbackInfos.statusStr}</span></div>
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
            {getFieldDecorator('remarks')(
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
        <div className='mb20 server-bill-edit'>
          <EditableTable
            columns={this.columns}
            title='处理日志'
            bordered={true}
            dataSource = { feedbackLogs }
          />
        </div>
				<FormItem style = {{marginBottom:0,textAlign:"center"}}>
						<Button className='mr30' onClick={this.onCancel} >取消</Button>
						<Button type="primary" onClick={this.onOk}>确定</Button>
      	</FormItem>
				<Modal
					visible={this.state.visible}
					footer={null}
					closable = { true }
					onOk={this.visible}
          onCancel={this.visible}
					wrapClassName='billModal'
				>
					{
						this.state.imgList[0]?<img src={fileDomain+((this.state.imgList[this.state.imgIndex]).imgPath)}/>:null
					}
				</Modal>
			</div>
		)
	}
	componentDidMount(){
		this.setState({fileList:[]});
    const id = this.props.data.pdSpuId;
    customserviceDetailApi({customServiceId:id})
    .then(res=>{
			if(res.code=='0'){
				if(res.feedbackLogs){
					res.feedbackLogs.map((item,index)=>{
						item.key =  index;
						return index;
					});
				};
				this.setState({
					feedbackInfos:res.feedbackInfos,
					feedbackDetail:res.feedbackDetail,
					handelFeedBack:res.handelFeedBack,
					feedbackLogs:res.feedbackLogs,
				})
			};
    },err=>{
      message.error('失败')
    })
	}
	//图片处理
	changeImg =(fileList)=>{
		this.setState({fileList})
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
					imgList.push({imgPath:item.response.data[0]});
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
		const {listParams} = this.props.data;
		debugger
		customserviceSaveApi(values)
		.then(res=>{
			if(res.code == "0"){
				message.success(res.message);
				this.props.dispatch({
					type:'serverBill/fetchList',
					payload:{...listParams}
				})
				this.props.dispatch({
						type:'tab/initDeletestate',
						payload:this.props.componkey
				});
			}
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
