import { Button, Modal, Form, Input, Radio,Select } from 'antd';
import {GetServerData} from '../../../services/services';
import { connect } from 'dva';

const FormItem = Form.Item;
const CollectionCreateForm = Form.create()(
	(props) => {
		const { visible, onCancel, onCreate, form ,pdTypes,title} = props;
		const { getFieldDecorator } = form;
		return (
			<Modal
				visible={visible}
				title={title}
				okText="确定"
				onCancel={onCancel}
				onOk={onCreate}
			>
				<Form>

				<FormItem
				label="规格名称"
				labelCol={{ span: 5 }}
				wrapperCol={{ span: 12 }}
				>
				{getFieldDecorator('name', {
					rules: [{ required: true, message: '请输入规格名称' }],
				})(
					<Input/>
				)}
				</FormItem>

				</Form>
			</Modal>
		);
	}
);

class CollectionsPages extends React.Component {
	state = {
		visible: false,
	};
	showModal = () => {
		this.setState({ visible: true },function(){
			this.setValues()
		});
	}
	handleCancel = () => {
		this.setState({ visible: false });
	}
	handleCreate = () => {
		const form = this.form;
		form.validateFields((err, value) => {
		if (err) {
			return;
		}
		value.state='1'
		value.name = value.name.trim();
		const values={pdType:value}
		const result=GetServerData('qerp.web.pd.type.save',values)
			result.then((res) => {
				return res;
			}).then((json) => {
				if(json.code=='0'){
					form.resetFields();
					this.setState({ visible: false });
					this.props.dispatch({
						type:'specs/specsfetch',
						payload:{code:'qerp.web.pd.type.list',values:{}}
					})
				}
			})
		});
	}
	saveFormRef = (form) => {
		this.form = form;
	}
	setValues=()=>{
		const form = this.form;
		const data=this.props.data
		form.setFieldsValue({
			name:null,
		});
	}


	render() {
		return (
			<div style={{display:'inline-block'}}>
				{
					this.props.type=='1'
					?
					<div onClick={this.showModal} style={{color:'#35bab0'}} className='pointer'>{this.props.text}</div>
					:
					<Button size='large' type={this.props.statetype} onClick={this.showModal}>{this.props.text}</Button>

				}

				<CollectionCreateForm
					ref={this.saveFormRef}
					visible={this.state.visible}
					onCancel={this.handleCancel}
					onCreate={this.handleCreate}
					setValues={this.setValues}
					pdTypes={this.props.pdTypes}
					data={this.props.data}
					title={this.props.title}
				/>
			</div>
		);
	}
}

export default connect()(CollectionsPages);
