import { Button, Modal, Form, Input, Radio ,Select} from 'antd';
import {GetServerData} from '../../../services/services';
const FormItem = Form.Item;
const Option = Select.Option;

const CollectionCreateForm = Form.create()(
    class extends React.Component {
        render() {
            const { visible, onCancel, onCreate, form,modeltit } = this.props;
            const { getFieldDecorator } = form;
            return (
                <Modal
                    visible={visible}
                    title={modeltit}
                    okText="确定"
                    onCancel={onCancel}
                    onOk={onCreate}
                >
                    <Form>
                        <FormItem 
                            label="物流公司"
                            labelCol={{ span: 7 }}
                            wrapperCol={{ span: 12 }}
                            >
                            {getFieldDecorator('ecExpressCodeId', {
                                rules: [{ required: true, message: '请选择物流公司' }],
                            })(
                                <Select
                                    placeholder="请选择"
                                >
                                    <Option value="001">圆通</Option>
                                    <Option value="002">中通</Option>
                                    <Option value="003">天天</Option>
                                    <Option value="004">韵达</Option>
                                    <Option value="005">邮政</Option>
                                    <Option value="006">顺丰</Option>
                                    <Option value="007">申通</Option>
                                    <Option value="008">物流</Option>
                                </Select>
                            )}
                        </FormItem>
                        <FormItem 
                            label="物流单号"
                            labelCol={{ span: 7 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {getFieldDecorator('expressNo', {
                                rules: [{ required: true, message: '请输入物流单号' }],
                            })(
                                <Input placeholder='请输入'/>
                            )}
                        </FormItem>
                    </Form>
                </Modal>
            );
        }
    }
);


class Shipeditmodel extends React.Component {
    state = {
        visible: false,
    };
    showModal = () => {
        this.setState({ visible: true });
    }
    handleCancel = () => {
        const form = this.formRef.props.form;
        this.setState({ visible: false },function(){
            form.resetFields();
        });
    }
    handleCreate = () => {
        const form = this.formRef.props.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }

            values.ecSuborderNo=this.props.ecSuborderNo
            values.ecOrderId=this.props.ecOrderId
            values.ecSuborderId=this.props.ecSuborderId
            const result=GetServerData('qerp.web.ec.express.hk.save',values)
            result.then((res) => {
               return res;
            }).then((json) => {
                if(json.code=='0'){
                    this.setState({ visible: false });
                    this.props.infofetch(this.props.ecOrderId)
                    form.resetFields();
                }
            }) 
        });
    }
    saveFormRef = (formRef) => {
        this.formRef = formRef;
    }
    render() {
        return (
            <div>
                <Button type="primary" onClick={this.showModal}>发货</Button>
                <CollectionCreateForm
                    wrappedComponentRef={this.saveFormRef}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    onCreate={this.handleCreate}
                    modeltit={this.props.modeltit}
                />
            </div>
        );
    }
}

export default Shipeditmodel;