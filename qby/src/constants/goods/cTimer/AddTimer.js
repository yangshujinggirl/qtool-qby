import {modifyTimerApi,invalidTimerApi,createTimerApi} from '../../../services/cTimer/cTimer';
import { connect } from 'dva';
import { Form, Input, Button ,message,DatePicker,Checkbox} from 'antd';
import moment from 'moment';

const CheckboxGroup = Checkbox.Group;
const FormItem = Form.Item;
const { TextArea } = Input;

class GoodEditForm extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			codes:[],
			check1:null,
			check2:null,
			check3:null,
			check4:null,
			check5:null,
			check6:null,
			salestatus:null,
			statusnew:null,
			statushot:null,
			taskTime:[],
			taskName:null
		}
	}
	//初始化数据
	componentWillMount(){
		if(this.props.data){
			this.getinfoData()
		}
	}
	getinfoData=()=>{
		const pdTaskTimeId = String(this.props.data.pdTaskTimeId);
		modifyTimerApi({pdTaskTimeId:pdTaskTimeId}).then(res=>{
			if(res.code=='0'){
				const taskTime=res.taskTime.taskTime
				const taskName=res.taskTime.taskName
				const codes=res.codes.join('\r\n')
				const check1=(res.taskTime.salestatus==1)?true:false
				const check2=(res.taskTime.salestatus==0)?true:false
				const check3=(res.taskTime.statusnew==1)?true:false
				const check4=(res.taskTime.statusnew==0)?true:false
				const check5=(res.taskTime.statushot==1)?true:false
				const check6=(res.taskTime.statushot==0)?true:false
				const salestatus=res.taskTime.salestatus
				const statusnew=res.taskTime.statusnew
				const statushot=res.taskTime.statushot
				this.setState({
					check1:check1,
					check2:check2,
					check3:check3,
					check4:check4,
					check5:check5,
					check6:check6,
					taskTime:taskTime,
					salestatus:salestatus,//是否在售
					statusnew:statusnew,//是否上架
					statushot:statushot,//是否畅销
					codes:codes,
					taskName:taskName
				})
			}
		},err=>{
		})
	}
	//删除当前tab
	deleteTab=()=>{
		const pane = eval(sessionStorage.getItem("pane"));
		if(pane.length<=1){
			return
		}
		if(this.props.data){
			this.props.dispatch({
				type:'tab/initDeletestate',
				payload:`${this.props.componkey}edit`+this.props.data.pdTaskTimeId
			  });
		}else{
			this.props.dispatch({
				type:'tab/initDeletestate',
				payload:`${this.props.componkey}edit`
			});
		}
		this.refreshList();
	}
	//刷新列表
	refreshList=()=>{
		this.props.dispatch({
      type:'cTimer/fetchList',
      payload:{}
    })
		this.props.dispatch({ type: 'tab/loding', payload:true})
	}
	kg = (arr)=>{
    arr!=''
   	return arr
 	}
	//保存
	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, value) => {
		    if (!err) {
					if(this.state.salestatus == null && this.state.statusnew ==null && this.state.statushot==null){
						message.error('请选择定时操作',.8);
					}else{
						value.taskTime=this.state.taskTime
						value.salestatus=this.state.salestatus
						value.statusnew=this.state.statusnew
						value.statushot=this.state.statushot
						const codes=value.codes.split(/\s+/).filter(this.kg)
						if(this.props.data){
							value.pdTaskTimeId=this.props.data.pdTaskTimeId
						}
						const values={
							taskTime:value,
							codes:codes
						}
						createTimerApi(values)
						.then((res) => {
					  	if(res.code == '0'){
								this.deleteTab()
						   	if(this.props.data){
							  	message.success('定时修改成功',.8);
						   	}else{
							  	message.success('定时设置成功',.8);
						   	};
					  	};
				  	},err => {

						})
        };
			};
    });
	}
	//取消
	hindCancel=()=>{
		this.deleteTab()
  }
	onChange1=(e)=>{
		if(this.state.check1==true && e.target.checked==false){
			this.setState({
				check1:false,
				check2:false,
				salestatus:null
			})
		}else{
			this.setState({
				check1:e.target.checked,
				check2:!e.target.checked,
				salestatus:e.target.checked?1:0
			})
		}
	}
	onChange2=(e)=>{
		if(this.state.check2==true && e.target.checked==false){
			this.setState({
				check1:false,
				check2:false,
				salestatus:null
			})
		}else{
			this.setState({
				check1:!e.target.checked,
				check2:e.target.checked,
				salestatus:e.target.checked?0:1
			})
		}
	}
	onChange3=(e)=>{
		if(this.state.check3==true && e.target.checked==false){
			this.setState({
				check3:false,
				check4:false,
				statusnew:null
			})
		}else{
			this.setState({
				check3:e.target.checked,
				check4:!e.target.checked,
				statusnew:e.target.checked?1:0
			})
		}
	}
	onChange4=(e)=>{
		if(this.state.check4==true && e.target.checked==false){
			this.setState({
				check3:false,
				check4:false,
				statusnew:null
			})
		}else{
			this.setState({
				check4:e.target.checked,
				check3:!e.target.checked,
				statusnew:e.target.checked?0:1
			})
		}
	}
	onChange5=(e)=>{
		if(this.state.check5==true && e.target.checked==false){
			this.setState({
				check5:false,
				check6:false,
				statushot:null
			})
		}else{
			this.setState({
				check5:e.target.checked,
				check6:!e.target.checked,
				statushot:e.target.checked?1:0
			})
		}
	}
	onChange6=(e)=>{
	   	if(this.state.check6==true && e.target.checked==false){
		   	this.setState({
			   	check5:false,
			   	check6:false,
			   	statushot:null
		   	})
	   	}else{
		   	this.setState({
			   	check6:e.target.checked,
			   	check5:!e.target.checked,
			   	statushot:e.target.checked?0:1
		   	})
	   	}
	}
	timeChange=(date,dateString)=>{
        this.setState({
            taskTime:dateString
        })
	}

	handUse=()=>{
		const pdTaskTimeId = String(this.props.data.pdTaskTimeId);
		invalidTimerApi({pdTaskTimeId})
		.then(res => {
			if(res.code=='0'){
				this.deleteTab()
				message.success('强制无效成功',.8);
			}
		},err=>{

		})
	}
  	render(){
		const { getFieldDecorator } = this.props.form;
     	return(
          	<Form className="addUser-form addcg-form">
                <FormItem
					label="定时名称"
					labelCol={{ span: 3,offset: 1 }}
					wrapperCol={{ span: 6 }}
				>
					{getFieldDecorator('taskName', {
						rules: [{ required: true, message: '请输入定时名称'}],
						initialValue:this.state.taskName
					})(
						<Input placeholder="请输入定时名称"/>
					)}
				</FormItem>
				<FormItem
					label="商品编码"
					labelCol={{ span: 3,offset: 1 }}
					wrapperCol={{ span: 6 }}
				>
					{getFieldDecorator('codes', {
						rules: [{ required: true, message: '请输入商品编码'}],
						initialValue:this.state.codes
					})(
						<TextArea rows={4} />
					)}
				</FormItem>
                <FormItem
					label="定时时间"
					labelCol={{ span: 3,offset: 1 }}
					wrapperCol={{ span:6 }}
					>
					{getFieldDecorator('taskTime', {
						rules: [{ required: true, message: '请选择定时时间' }],
						initialValue:this.props.data?moment(this.state.taskTime):null
					})(
					<DatePicker  format="YYYY-MM-DD HH:mm" showTime onChange={this.timeChange.bind(this)}/>
					)}
				</FormItem>
                <FormItem
					label="定时操作"
					labelCol={{ span: 3,offset: 1 }}
					wrapperCol={{ span:16 }}
					>
					{getFieldDecorator('codesinitsssss', {
					})(
						<div>
							<Checkbox onChange={this.onChange1.bind(this)} checked={this.state.check1}>售卖</Checkbox>
							<Checkbox onChange={this.onChange2.bind(this)} checked={this.state.check2}>停售</Checkbox>
							<Checkbox onChange={this.onChange3.bind(this)} checked={this.state.check3}>上NEW</Checkbox>
							<Checkbox onChange={this.onChange4.bind(this)} checked={this.state.check4}>下NEW</Checkbox>
							<Checkbox onChange={this.onChange5.bind(this)} checked={this.state.check5}>上HOT</Checkbox>
							<Checkbox onChange={this.onChange6.bind(this)} checked={this.state.check6}>下HOT</Checkbox>
						</div>
					)}
        		</FormItem>
            	<FormItem wrapperCol={{ offset: 4}} style = {{marginBottom:0}}>
            		<Button className='mr30' onClick={this.hindCancel.bind(this)}>取消</Button>
					  {
						  this.props.data?<Button htmlType="submit" type="primary" onClick={this.handUse}>强制无效</Button>:null
					  }
              	<Button type="primary" onClick={this.handleSubmit} style={{marginLeft:'30px'}}>保存</Button>
            	</FormItem>
          	</Form>
      	)
  	}

}
function mapStateToProps(state) {
	const {values} = state.goodtime;
    return {values};
}

const GoodEditForms = Form.create()(GoodEditForm);
export default connect(mapStateToProps)(GoodEditForms);
