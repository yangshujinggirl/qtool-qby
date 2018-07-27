import React from 'react';
import EditableTable from '../../../components/table/tablebasic';
import { Button, Icon ,Form,Select,Input,Card, message } from 'antd';
import { getBackDetailApi,feedBackSaveApi } from '../../../services/server/server'
import { connect } from 'dva';
const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;

class HandleBack extends React.Component{
	constructor(props) {
		super(props);
    this.result={
      feedbackInfos:{},
      feedbackContent:{},
      feedbackLogs:[]
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
  const {feedbackInfos,feedbackContent,feedbackLogs} = this.result;
  const { getFieldDecorator } = this.props.form;
	return(
			<div>
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
							<div>{feedbackContent.remark}</div>
						</FormItem>
						<FormItem
							label="反馈图片"
							labelCol={{ span: 2 }}
							wrapperCol={{ span: 12 }}
						>
							<div className='clearfix'>
                {
                  feedbackLogs && feedbackLogs.remarkUrl
                  ?
                    feedbackLogs.remarkUrl.map((item,index) => {
                      return(
                        <img key={index} src={item}/>
                      )
                    })
                  :''
                }
              </div>
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
						<Button htmlType="submit" type="primary" onClick={this.onOk}>确定</Button>
        	</FormItem>
			</div>
		)
	}
	componentDidMount(){
    const id = this.props.data.pdSpuId;
    getBackDetailApi(id)
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
			const _values = {feedbackId:this.props.data.pdSpuId,...values}
			if(!err){
				this.submit(_values);
			};
		});
  }
	//提交
	submit =(values)=> {
		feedBackSaveApi(values)
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
const HandleBacks = Form.create()(HandleBack);
function mapStateToProps(state){
  const { userFeedBack } = state;
  return { userFeedBack }
}
export default connect(mapStateToProps)(HandleBacks);