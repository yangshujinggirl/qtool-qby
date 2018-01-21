import { Button, Modal, Form, Input, Radio,Select } from 'antd';
const FormItem = Form.Item;

const CollectionCreateForm = Form.create()(
  (props) => {
    const { visible, onCancel, onCreate, form } = props;
    const { getFieldDecorator } = form;
    return (
      	<Modal
			visible={visible}
			title="Create a new collection"
			okText="Create"
			onCancel={onCancel}
			onOk={onCreate}
      	>
        <Form layout="vertical">
          <FormItem label="所属规格">
            {getFieldDecorator('asd', {
              	rules: [{ required: true, message: 'Please input the title of collection!' }],
            })(
              	<Input />
            )}
          </FormItem>
          <FormItem label="属性名称">
            {getFieldDecorator('description')(<Input type="textarea" />)}
          </FormItem>
          <FormItem label="属性状态">
            {getFieldDecorator('gender', {
              rules: [{ required: true, message: 'Please input the title of collection!' }],
            })(
                <Select
                placeholder="Select a option and change input text above"
                // onChange={this.handleSelectChange}
              >
                <Option value="male">male</Option>
                <Option value="female">female</Option>
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
    //数据请求
    



    this.setState({ visible: true });
  }
  handleCancel = () => {
    this.setState({ visible: false });
  }
  handleCreate = () => {
    const form = this.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      form.resetFields();
      this.setState({ visible: false });
    });
  }
  saveFormRef = (form) => {
    this.form = form;
  }
  render() {
    return (
      <div>
        <div type="primary" onClick={this.showModal}>新增属性</div>
        <CollectionCreateForm
          ref={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
        />
      </div>
    );
  }
}

export default CollectionsPage;

