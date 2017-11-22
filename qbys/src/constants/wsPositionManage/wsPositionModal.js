import React from 'react';
import {GetServerData} from '../../services/services';
import {Table ,Button,Modal, Form, Select, Input ,message } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
import { connect } from 'dva';

class NewPositionModalForm extends React.Component {
    constructor(props) {
       super(props);
       this.state = {
          visible: false,
          id:null,
          wsAreaList:[]
	   };
    }

    //打开modal,设置modal数据显示
    changeVisible = (visible,info) =>{
        //进行数据请求获取库区列表
        const value={'limit':100};
        const result=GetServerData('qerp.web.ws.area.query',value);
        result.then((res) => {
            return res;
        }).then((json) => {
            if(json.code==0){
                const data=json.wsAreas;
                this.setState({
                    wsAreaList:data
                })
            }
        })

        if(info){
            this.setState({
                visible:visible,
                id:info.wsBinId
            },function(){
                this.props.dispatch({
                    type:'wsPositionManage/refreshwsPositionInfo',
                    payload:info
                });
            });
        }else{
            this.props.form.resetFields();
            this.props.dispatch({
                type:'wsPositionManage/refreshwsPositionInfo',
                payload:{
                    wsAreaId:"",
                    code:"",
                    codePrint:"",
                    type:"",
                    status:1,
                    remark:""
                }
            });
            this.setState({
                visible:visible,
                id:null
            })
        }
    }

    //取消操作
    handleCancel = () => {
        this.setState({ visible: false });
	}
	//保存数据操作
    handleCreate = () => {
        this.props.form.validateFields((err, values) => {
            if (err) {
                return;
            }
			if(this.state.id){
				values.wsBinId=this.state.id;
            }
            const newvalues={wsBin:values};
            const result=GetServerData('qerp.web.ws.bin.save',newvalues);
			result.then((res) => {
				return res;
			}).then((json) => {
				if(json.code=='0'){
                    this.refreshTableList();
                    this.props.form.resetFields();
                    this.setState({ visible: false });
				}
			})
        });
    }
    
    //刷新账号列表
	refreshTableList=()=>{
		//执行初始化数据方法获取list
		this.initHouseAreaList(this.props.values,this.props.limit,this.props.currentPage);
    }
    
    //列表数据请求   
    initHouseAreaList=(values,limit,currentPage)=>{
        values.limit=limit;
        values.currentPage=currentPage;
        this.props.dispatch({
            type:'wsPositionManage/fetch',
            payload:{code:'qerp.web.ws.bin.query',values:values}
        });
        this.props.dispatch({ type: 'tab/loding', payload:true});
    }
	      
     render() {
        const { getFieldDecorator } = this.props.form;
       return (
            <Modal
                visible={this.state.visible}
                title="新建库区"
                okText="确定"
                onCancel={this.handleCancel}
                onOk={this.handleCreate}
            >
                <Form layout="vertical" className='modal-form'>
                    <FormItem
                        label="库区名称："
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 12 }}
                        >
                        {getFieldDecorator('wsAreaId', {
                            rules: [{ required: true, message: '请选择库区' }],
                            initialValue:String(this.props.wsPositionInfo.wsAreaId)
                        })(
                            <Select placeholder="请选择库区">
                                {
                                this.state.wsAreaList.map((item,index)=>{
                                    return(
                                        <Option value={String(item.wsAreaId)} key={index}>{item.name}</Option>
                                    )
                                })
                                }
                            </Select>
                        )}
                    </FormItem>
                    <FormItem
                        label="库位编码"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 12 }}
                        >
                        {getFieldDecorator('code', {
                            rules: [{ required: true, message: '请输入库位编码' }],
                            initialValue:this.props.wsPositionInfo.code
                        })(
                            <Input placeholder='请输入库位编码'/>
                        )}
                    </FormItem>
                    <FormItem
                        label="库位打印编码"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 12 }}
                        >
                        {getFieldDecorator('codePrint', {
                            rules: [{ required: false, message: '请输入库位打印编码' }],
                            initialValue:this.props.wsPositionInfo.codePrint
                        })(
                            <Input placeholder='请输入库位打印编码'/>
                        )}
                    </FormItem>
                    <FormItem
                        label="库位类型"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 12 }}
                        >
                        {getFieldDecorator('type', {
                            rules: [{ required: true, message: '请选择库位类型' }],
                        
                            initialValue:String(this.props.wsPositionInfo.type) 
                        })(
                            <Select placeholder="请选择库位类型">
                            <Option value='10'>零捡</Option>
                            <Option value='11'>存储</Option>
                            <Option value='15'>过渡</Option>
                            <Option value='20'>次品</Option>
                            </Select>
                        )}
                    </FormItem>
                    <FormItem
                        label="库区状态"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 12 }}
                        >
                        {getFieldDecorator('status', {
                            rules: [{ required: true,  message: '请选择库区状态' }],
                        
                            initialValue:String(this.props.wsPositionInfo.status)
                        })(
                            <Select placeholder = '请选择库区状态'>
                            <Option value="1">启用</Option>
                            <Option value="0">禁用</Option>
                            </Select>
                        )}
                    </FormItem>
                    <FormItem
                        label="备注"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 12 }}
                        >
                        {getFieldDecorator('remark', {
                            initialValue:this.props.wsPositionInfo.remark
                        })(
                            <Input type="textarea" rows={4}/>
                        )}
                    </FormItem>
                </Form>
            </Modal>
       );
     }
}

const NewPositionModal = Form.create()(NewPositionModalForm);

function mapStateToProps(state) {
    const {total,limit,currentPage,values,wsPositionInfo} = state.wsPositionManage;
    return {total,limit,currentPage,values,wsPositionInfo};
}
export default connect(mapStateToProps)(NewPositionModal);