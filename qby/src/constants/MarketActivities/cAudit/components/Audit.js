import React, { Component } from "react";
import { Form, Radio, Input,Button } from "antd";
const FormItem = Form.Item;
const TextArea = Input.TextArea;
import { saveAuditApi } from "../../../../services/marketActivities/cAudit";
class Audit extends Component {
  constructor(props) {
    super(props);
    this.state={
      isPass:0
    }
  }
  handleSubmit = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        saveAuditApi({...values}).then(res=>{
          if(res.code == '0'){
            
          }
        })
      }
    });
  };
  onChange = e => {
    const value = e.target.value;
    this.setState({
      isPass: value
    });
  };
  render() {
    const { isPass } = this.state;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 2 },
      wrapperCol: { span: 20 },
    };
    return (
      <div>
        <Form>
          <FormItem {...formItemLayout} label="审核结果">
            {getFieldDecorator("isPass", {
              onChange: this.onChange
            })(
              <Radio.Group>
                <Radio value="0">审核通过</Radio>
                <Radio value="1">审核不通过</Radio>
              </Radio.Group>
            )}
          </FormItem>
          { isPass==1&&
            <FormItem {...formItemLayout} label="不通过原因">
              {getFieldDecorator("opinion", {
                rules: [{ required: true, message: "请填写不通过原因" }]
              })(<TextArea rows={5} placeholder="请填写不通过原因" />)}
            </FormItem>
          }
        </Form>
        <div style={{'text-align':'right'}}>
          <Button type="primary" size="large" onClick={this.handleSubmit}>
            审核完成
          </Button>
        </div>
      </div>
    );
  }
}
const Audits = Form.create({})(Audit);
export default Audits;
