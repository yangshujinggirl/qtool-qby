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
                label="所属规格"
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 12 }}
                >
                {getFieldDecorator('pdTypeId', {
                rules: [{ required: true, message: 'Please input the title of collection!' }],
                })(
                    <Select
                    disabled
                >
                
                    {
                        pdTypes.map((item,index)=>{
                            return (<Option value={String(item.pdTypeId)} key={index}>{item.name}</Option>)
                        })
                    }
                </Select>
                )}
            </FormItem>
                <FormItem 
                label="属性名称"
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 12 }}
                >
                {getFieldDecorator('name', {
                    rules: [{ required: true, message: '请输入属性名称' }],
                })(
                    <Input/>
                )}
                </FormItem>
                <FormItem 
                label="属性状态"
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
        if(this.props.data.pdTypeValId){
            value.pdTypeValId=this.props.data.pdTypeValId
        }

        const values={pdTypeVal:value}
        const result=GetServerData('qerp.web.pd.typeval.save',values)
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
            pdTypeId:String(data.pdTypeId),
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
              <Button type={this.props.statetype} onClick={this.showModal}>{this.props.text}</Button>

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




export default connect()(CollectionsPage);

