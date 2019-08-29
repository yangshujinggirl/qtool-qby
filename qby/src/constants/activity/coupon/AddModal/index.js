import React, { Component } from "react";
import { Modal, Radio, Input, Select, Form } from "antd";
import "./index.less";

const FormItem = Form.Item;
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 14 }
};
class AddModalForm extends Component {
  constructor(props) {
    super(props);
  }
  resetForm=()=>{
    this.props.form.resetFields();
  }
  onOk = () => {
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.onOk(values,this.resetForm);
      }
    });
  };
  onCancel = () => {
    this.props.onCancel(this.resetForm);
  };
  //分成校验
  validator=(rule, value, callback)=> {
    if(value>20000) {
      callback('最多填写20000张');
    }else {
      callback();
    }
  }
  render() {
    const { visible,loading } = this.props;
    const { getFieldDecorator } = this.props.form;
    return (
      <Modal
        className="add-version-modal"
        title="追加数量"
        visible={visible}
        onOk={this.onOk}
        onCancel={this.onCancel}
        confirmLoading={loading}>
        <Form>
          <FormItem label="追加数量" {...formItemLayout}>
            {getFieldDecorator("couponCount",{
              rules:[{
                required:true,message:'请输入追加数量'
              },{
                pattern:/^[1-9]\d*$/,message:'请输入1-20000的正整数'},{
              },{
                validator:this.validator
              }]
            })(
              <Input
                placeholder="最多填写20000张"
                autoComplete="off"
                maxLength='15'/>
            )}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

const AddModal = Form.create({})(AddModalForm);

export default AddModal;
