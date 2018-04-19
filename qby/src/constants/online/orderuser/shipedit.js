import { Button, Modal, Form, Input, Radio ,Select} from 'antd';
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
                    <Form layout="vertical">
                        <FormItem label="Title">
                            {getFieldDecorator('title', {
                                rules: [{ required: true, message: '请选择物流公司' }],
                            })(
                                <Select
                                    placeholder="请选择"
                                >
                                    <Option value="male">male</Option>
                                    <Option value="female">female</Option>
                                </Select>
                            )}
                        </FormItem>
                        <FormItem label="物流单号">
                            {getFieldDecorator('order', {
                                rules: [{ required: true, message: '请输入物流单号' }],
                            })(
                                <Input />
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
        this.setState({ visible: false });
    }
    handleCreate = () => {
        const form = this.formRef.props.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            console.log('Received values of form: ', values);
            const result=GetServerData('qerp.web.ec.pd.userOrder.query',values)
            result.then((res) => {
               return res;
            }).then((json) => {
                if(json.code=='0'){
                    this.setState({ visible: false });
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