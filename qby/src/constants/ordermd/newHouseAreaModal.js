// import React from 'react';
// import {GetServerData} from '../../services/services';
// import {Table ,Button,Modal, Form, Select, Input ,message } from 'antd';
// const FormItem = Form.Item;
// const Option = Select.Option;
// import { connect } from 'dva';

// class NewAreaModalForm extends React.Component {
//     constructor(props) {
//        super(props);
//        this.state = {
//           visible: false,
//           id:null,
//           headText:''
// 	   };
//     }

//     //改变modal的显示隐藏
//     changeVisible = (visible,info,headText) =>{
//         if(info){
//             this.setState({
//                 visible:visible,
//                 id:info.wsAreaId,
//                 headText:headText
//             },function(){
//                 this.props.dispatch({
//                     type:'ordermd/getInfo',
//                     payload:info
//                 });
//             });
//         }else{
//             this.props.form.resetFields();
//             this.props.dispatch({
//                 type:'ordermd/getInfo',
//                 payload:{
//                     code:"",
//                     name:"",
//                     status:1,
//                     wsAreaId:null
//                 }
//             });
//             this.setState({
//                 visible:visible,
//                 id:null,
//                 headText:headText
//             })
//         }
//     }

//     //取消操作
//     handleCancel = () => {
//         this.setState({ visible: false });
// 	}
// 	//保存数据操作
//     handleCreate = () => {
//         this.props.form.validateFields((err, values) => {
//             if (err) {
//                 return;
//             }
// 			if(this.state.id){
// 				values.wsAreaId=this.state.id;
//             }
//             const newvalues={wsArea:values};
//             const result=GetServerData('qerp.web.ws.area.save',newvalues);
// 			result.then((res) => {
// 				return res;
// 			}).then((json) => {
// 				if(json.code=='0'){
//                     this.refreshTableList();
//                     this.props.form.resetFields();
//                     this.setState({ visible: false });
// 				}
// 			})
//         });
//     }
    
//     //刷新账号列表
// 	refreshTableList=()=>{
// 		//执行初始化数据方法获取list
// 		this.initHouseAreaList(this.props.values,this.props.limit,this.props.currentPage);
//     }
    
//     //列表数据请求   
//     initHouseAreaList=(values,limit,currentPage)=>{
//         values.limit=limit;
//         values.currentPage=currentPage;
//         this.props.dispatch({
//             type:'ordermd/fetch',
//             payload:{code:'qerp.web.ws.area.query',values:values}
//         });
//         this.props.dispatch({ type: 'tab/loding', payload:true});
//     }
	      
//      render() {
//         const { getFieldDecorator } = this.props.form;
//        return (
//             <Modal
//                 visible={this.state.visible}
//                 title={this.state.headText}
//                 okText="确定"
//                 onCancel={this.handleCancel}
//                 onOk={this.handleCreate}
//             >
//                 <Form layout="vertical" className='modal-form'>
//                     <FormItem
//                         label="库区编码："
//                         labelCol={{ span: 8 }}
//                         wrapperCol={{ span: 12 }}
//                         initialValue={this.props.wsArea.code}
//                         >
//                         {getFieldDecorator('code', {
//                             rules: [{ required: true, message: '请输入库区编码' }],
//                             initialValue:this.props.wsArea.code
//                         })(
//                             <Input placeholder='请输入库区编码'/>
//                         )}
//                     </FormItem>
//                     <FormItem
//                     label="库区名称："
//                     labelCol={{ span: 8 }}
//                     wrapperCol={{ span: 12 }}
//                     >
//                     {getFieldDecorator('name', {
//                         rules: [{ required: true, message: '请输入库区名称' }],
//                         initialValue:this.props.wsArea.name
//                     })(
//                         <Input placeholder='请输入库区名称'/>
//                     )}
//                     </FormItem>
//                     <FormItem
//                     label="库区状态："
//                     labelCol={{ span: 8 }}
//                     wrapperCol={{ span: 12 }}
//                     >
//                     {getFieldDecorator('status', {
//                         rules: [{ required: true,  message: '请选择库区状态' }],
//                         initialValue:String(this.props.wsArea.status)
//                     })(
//                         <Select placeholder = '请选择库区状态'>
//                         <Option value="1">启用</Option>
//                         <Option value="0">禁用</Option>
//                         </Select>
//                     )}
//                     </FormItem>
//                 </Form>
//             </Modal>
//        );
//      }
// }

// const NewAreaModal = Form.create()(NewAreaModalForm);

// function mapStateToProps(state) {
//     const {houseAreaList,total,limit,currentPage,values,wsArea} = state.ordermd;
//     return {houseAreaList,total,limit,currentPage,values,wsArea};
// }
// export default connect(mapStateToProps)(NewAreaModal);