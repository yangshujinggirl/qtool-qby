import React from 'react';
import {GetServerData} from '../../services/services';
import { Button, Icon ,Form,Select,Input} from 'antd';
import { connect } from 'dva';
import EditableTable from '../../components/table/tablebasic';
import Cardlist from '../../components/table/cardlist';
import Imgmodel from '../../components/model/modelimg';
const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;

class Feedbackedit extends React.Component{
	constructor(props) {
		super(props);
		this.columns = [{
			title: '反馈类型',
			dataIndex: 'feedbackTypeStr'
		}, {
			title: '反馈状态',
			dataIndex: 'feedbackStatusStr'
		}, {
			title: '处理备注',
			dataIndex: 'remark'
		}, {
			title: '处理人',
			dataIndex: 'operator'
		}, {
			title: '处理时间',
			dataIndex: 'createTime'
		}];	
    }
	
    infofetch=(id)=>{
		console.log(id)
        this.props.dispatch({
            type:'feedback/infofetch',
            payload:{code:'qerp.web.sp.feedback.detail',values:{spFeedbackId:id}}
        })
	}
	

	handletypeSelectChange=(value)=>{
		const type=value
		this.props.dispatch({
			type:'feedback/typechange',
            payload:type
		})
	}
	handleSelectChange=(value)=>{
		const status=value
		this.props.dispatch({
			type:'feedback/statuschange',
            payload:status
		})
	}
	editremarkchange=(e)=>{
		const editremark=e.target.value
		this.props.dispatch({
			type:'feedback/editremarkchange',
            payload:editremark
		})
	}
	//删除tab
	deleteTab=()=>{
		const pane = eval(sessionStorage.getItem("pane"));
		if(pane.length<=1){
			return
		}
		this.props.dispatch({
			type:'tab/initDeletestate',
			payload:'406000edit'+this.props.data.spFeedbackId
		});
		this.refreshList(this.props.values,this.props.limit,this.props.currentPage)
	}

	refreshList=(values,limit,currentPage)=>{
		values.limit=limit;
		values.currentPage=currentPage;
		this.props.dispatch({
            type:'feedback/fetch',
            payload:{code:'qerp.web.sp.feedback.query',values:values}
        });
	}
	hindCancel=()=>{
		this.deleteTab()
	}
	handleSubmit=()=>{
		const spFeedbackId=this.props.data.spFeedbackId
		const type=this.props.type
		const status=this.props.status
		const remark=this.props.editremark
		const values={
			spFeedbackId:spFeedbackId,
			type:type,
			status:status,
			remark:remark
		}

		const result=GetServerData('qerp.web.sp.feedback.update',values)
		result.then((res) => {
			return res;
		}).then((json) => {
			if(json.code=='0'){
				this.deleteTab()
			}
		})
	}
	render(){
		return(
			<div>
            
				<div className='mb10'>
					<Cardlist cardtitle={this.props.cardtitle} cardlist={this.props.cardlist}/>
				</div>
				<div>
					<p>反馈内容</p>
					<Form>
						<FormItem
							label="反馈内容"
							labelCol={{ span: 2 }}
							wrapperCol={{ span: 12 }}
						>
							<div>{this.props.remark}</div>
						</FormItem>
						<FormItem
							label="反馈图片"
							labelCol={{ span: 2 }}
							wrapperCol={{ span: 12 }}
						>
							<div className='clearfix'>
							{
								this.props.feedbackPics.map((item,index)=>{
									return (
										<div className='fl mr10' key={index}><Imgmodel picUrl={item.url}/></div>
									)
								})
							}
						</div>
						</FormItem>
      				</Form>
				</div>
				<div>
					<p>反馈处理</p>
					<Form>
						<FormItem
							label="反馈类型"
							labelCol={{ span: 2 }}
							wrapperCol={{ span: 12 }}
						>
							<Select
								onChange={this.handletypeSelectChange}
								style={{width:'200px'}}
								value={this.props.type}
							>
								<Option value="1">运营相关问题</Option>
								<Option value="2">商品相关问题</Option>
								<Option value="3">设计相关问题</Option>
								<Option value="4">招商相关问题</Option>
								<Option value="5">系统相关问题</Option>
								<Option value="6">其他</Option>
							</Select>
						</FormItem>
						<FormItem
							label="反馈状态"
							labelCol={{ span: 2 }}
							wrapperCol={{ span: 12 }}
						>
							<Select
								onChange={this.handleSelectChange}
								style={{width:'200px'}}
								value={this.props.status}
							>
								<Option value="10">待处理</Option>
								<Option value="20">处理中</Option>
								<Option value="30">已处理</Option>
							</Select>
						</FormItem>
						<FormItem
							label="处理备注"
							labelCol={{ span: 2 }}
							wrapperCol={{ span: 12 }}
						>
							<TextArea rows={4} value={this.props.editremark} onChange={this.editremarkchange.bind(this)}/>
						</FormItem>
      				</Form>
				</div>

					<div className='mb10'>
						<EditableTable 
							columns={this.columns} 
							dataSource={this.props.logs} 
							title={this.props.logstitle}
							bordered={true}
						/>
					</div>
					<FormItem wrapperCol={{ offset: 4}} style = {{marginBottom:0}}>
						<Button className='mr30' onClick={this.hindCancel.bind(this)}>取消</Button>
						<Button htmlType="submit" type="primary" onClick={this.handleSubmit.bind(this)}>确定</Button>
            	</FormItem>

			</div>
		)
	}
	componentDidMount(){
		 this.infofetch(this.props.data.spFeedbackId)
	}
	
}

function mapStateToProps(state) {
	const {cardtitle,cardlist,logstitle,logs,remark,feedbackPics,type,status,editremark,limit,currentPage,values} = state.feedback;
	return {cardtitle,cardlist,logstitle,logs,remark,feedbackPics,type,status,editremark,limit,currentPage,values};
}
export default connect(mapStateToProps)(Feedbackedit);



