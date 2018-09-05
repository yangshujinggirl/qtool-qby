import React from 'react';
import EditableTable from '../../../components/table/tablebasic';
import { Button, Icon ,Form,Select,Input,Card, message } from 'antd';
import { getBackDetailApi,feedBackSaveApi } from '../../../services/server/server'
import { connect } from 'dva';
import Imgmodel from '../../../components/model/modelimg';
import './index.less'

const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;

class HandleBack extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			loading:false,
			feedbackInfos:{},
			feedbackDetail:{},
			feedbackLogs:[]
		}
		this.columns = [{
			title: '反馈状态',
			dataIndex: 'status',
      key:'1',
			render:(text,record)=> <a href="javascript:;">{record.fromStatusStr}-{record.toStatusStr}</a>
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
  const {feedbackInfos,feedbackDetail,feedbackLogs} = this.state;
	feedbackInfos.status = String(feedbackInfos.status);
	const fileDomain = eval(sessionStorage.getItem('fileDomain'));
  const { getFieldDecorator } = this.props.form;
	return(
			<div className="user-feedBack-pages">
        <div className='mb10'>
          <Card title='反馈信息'>
            <div className='cardlist'>
                <div className='cardlist_item'><label>反馈编号：</label><span>{feedbackInfos.feedbackNo}</span></div>
                <div className='cardlist_item'><label>反馈用户：</label><span>{feedbackInfos.nickName}</span></div>
                <div className='cardlist_item'><label>用户电话：</label><span>{feedbackInfos.userTel}</span></div>
                <div className='cardlist_item'><label>反馈状态：</label><span>{feedbackInfos.status}</span></div>
                <div className='cardlist_item'><label>处理时长：</label><span>{feedbackInfos.handleTime}</span></div>
                <div className='cardlist_item'><label>反馈时间：</label><span>{feedbackInfos.createTime}</span></div>
            </div>
          </Card>
        </div>
				<div style={{padding:'10px 0',border:'1px solid #e8e8e8',margin:'10px 0',marginBottom:"10px"}}>
					<p style={{borderBottom:'1px solid #e8e8e8',padding:'5px 10px 15px'}}>反馈内容</p>
					<Form className='mt20'>
						<FormItem
							label="反馈内容"
							labelCol={{ span: 2 }}
							wrapperCol={{ span: 12 }}
						>
							<div>{feedbackDetail.remark}</div>
						</FormItem>
						<FormItem
							label="反馈图片"
							labelCol={{ span: 2 }}
							wrapperCol={{ span: 12 }}
						>
							<ul className='img-list-wrap'>
                {
                  feedbackDetail && feedbackDetail.remarkUrl
                  ?
                    JSON.parse(feedbackDetail.remarkUrl).map((item,index) => {
                      return(
												<li className="img-item" key={index}>
													<Imgmodel picUrl={item.imgPath}/>
												</li>
                      )
                    })
                  :''
                }
              </ul>
						</FormItem>
  				</Form>
				</div>
				<div style={{padding:'10px 0',border:'1px solid #e8e8e8',marginBottom:"10px"}}>
					<p style={{borderBottom:'1px solid #e8e8e8',padding:'5px 10px 15px'}}>反馈处理</p>
					<Form className='mt20'>
						<FormItem
							label="反馈状态"
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
						<Button htmlType="submit" type="primary" onClick={this.onOk} loading={this.state.loading}>确定</Button>
        	</FormItem>
			</div>
		)
	}
	componentDidMount(){
    const id = this.props.data.pdSpuId;
    getBackDetailApi({feedbackId:id})
    .then(res=>{
			if(res.code=="0"){
				if(res.feedbackLogs){
					res.feedbackLogs.map((item,index)=>{
						item.key =  index;
						return index;
					});
				};
				this.setState({
					feedbackDetail:res.feedbackDetail,
					feedbackInfos:res.feedbackInfos,
					feedbackLogs:res.feedbackLogs
				});
			}
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
			const _values = {feedbackId:this.props.data.pdSpuId,...values}
			if(!err){
				this.setState({ loading: true });
				this.submit(_values);
			};
		});
  }
	//提交
	submit =(values)=> {
		feedBackSaveApi(values)
		.then(res=>{
			if(res.code=="0"){
				message.success(res.message,.8)
				this.props.dispatch({
						type:'tab/initDeletestate',
						payload:this.props.componkey
				});
				this.props.dispatch({
		      type:'userFeedBack/fetchList',
		      payload:{}
		    })
			};
			this.setState({ loading: false });
		},err=>{
			message.error(err.message,.8);
			this.setState({ loading: false });
		});
	}
}
const HandleBacks = Form.create()(HandleBack);
function mapStateToProps(state){
  const { userFeedBack } = state;
  return { userFeedBack }
}
export default connect(mapStateToProps)(HandleBacks);
