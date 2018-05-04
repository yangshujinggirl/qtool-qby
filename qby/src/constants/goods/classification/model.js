import { Button, Modal, Form, Input, Radio,Select ,message} from 'antd';
import {GetServerData} from '../../../services/services';
import { connect } from 'dva';
const FormItem = Form.Item;

const CollectionCreateForm = Form.create()(
    (props) => {
        const { visible, onCancel, onCreate, form ,pdCategoryslist,title} = props;
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
                label="所属规格"
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 12 }}
                >
                {getFieldDecorator('parentId', {
                rules: [{ required: true, message: 'Please input the title of collection!' }],
                })(
                    <Select
                    disabled
                >
                
                    {
                        pdCategoryslist.map((item,index)=>{
                            return (<Option value={String(item.pdCategoryId)} key={index}>{item.name}</Option>)
                        })
                    }
                </Select>
                )}


            </FormItem>
                <FormItem 
                label="类型名称"
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 12 }}
                >
                {getFieldDecorator('name', {
                    rules: [{ required: true, message: '请输入类型名称' }],
                })(
                    <Input/>
                )}
                </FormItem>
                <FormItem 
                label="类型状态"
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 12 }}
                >
                    {getFieldDecorator('status', {
                    rules: [{ required: true, message: 'Please input the title of collection!' }],
                    })(
                        <Select
                    >
                        <Option value="1">启用</Option>
                        <Option value="0">禁用</Option>
                    </Select>
                    )}
                </FormItem>
                </Form>
            </Modal>
        );
    }
    );

class CollectionsPage extends React.Component {
    state = {
        visible: false,
    };
    showModal = () => {
        const rolelists=this.props.rolelists
        const addorder=rolelists.find((currentValue,index)=>{
            return currentValue.url=="qerp.web.pd.category.save"
        })
      
        if(addorder){
            this.setState({ visible: true },function(){
                this.setValues()
            });
        }else{
            message.error('无修改权限')
        }

        
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
        value.type=this.props.data.type
        if(this.props.data.pdCategoryId){
            value.pdCategoryId=this.props.data.pdCategoryId
        }

        // value.parentId=this.props.data.pdCategoryIds
        const values={pdCategory:value}
        const result=GetServerData('qerp.web.pd.category.save',values)
        result.then((res) => {
            return res;
        }).then((json) => {
            if(json.code=='0'){
                form.resetFields();
                this.setState({ visible: false });
                this.props.dispatch({
                    type:'fenlei/classfetch',
                    payload:{code:'qerp.web.pd.category.list',values:{getChildren:true}}
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
            parentId:String(data.pdCategoryIds),
            name:data.name,
            status:String(data.status)
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
              <Button type={this.props.statetype} onClick={this.showModal} style={{color:"#666",fontWeight:"normal"}}><span>{this.props.text}</span></Button>

          }
        
        <CollectionCreateForm
          ref={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
          setValues={this.setValues}
          pdCategoryslist={this.props.pdCategoryslist}
          data={this.props.data}
          title={this.props.title}
        />
      </div>
    );
  }
}


function mapStateToProps(state) {
	const {pdCategoryslist} = state.fenlei;
    return {pdCategoryslist};
}

export default connect(mapStateToProps)(CollectionsPage);

