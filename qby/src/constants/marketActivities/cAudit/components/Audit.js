import React, { Component } from "react";
import { Form, Radio, Input, Button,message } from "antd";
const FormItem = Form.Item;
const TextArea = Input.TextArea;
import { saveAuditApi } from "../../../../services/marketActivities/cAudit";
import { connect } from "dva";
class Audit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPass: "1"
    };
  }
  handleSubmit = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        saveAuditApi({ ...values,approvalId:this.props.approvalId }).then(res => {
          if (res.code == "0") {
            message.success('审核成功');
            this.props.dispatch({
              type: "tab/initDeletestate",
              payload: this.props.componkey+this.props.approvalId
            });
            this.props.dispatch({
              type:'cAudit/fetchList',
              payload:{}
            });
          };
        });
      };
    });
  };
  onChange = e => {
    const value = e.target.value;
    this.setState({
      isPass: value
    });
  };
  render() {
    console.log(this.props)
    const { isPass } = this.state;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 2 },
      wrapperCol: { span: 20 }
    };
    return (
      <div>
        <Form>
          <FormItem {...formItemLayout} label="审核结果">
            {getFieldDecorator("isPass", {
              initialValue:isPass,
              onChange: this.onChange
            })(
              <Radio.Group>
                <Radio value="1">审核通过</Radio>
                <Radio value="0">审核不通过</Radio>
              </Radio.Group>
            )}
          </FormItem>
          {isPass == 0 && (
            <FormItem {...formItemLayout} label="不通过原因">
              {getFieldDecorator("opinion", {
                rules: [{ required: true, message: "请填写不通过原因" }]
              })(<TextArea rows={5} placeholder="请填写不通过原因" />)}
            </FormItem>
          )}
        </Form>
        <div style={{ "text-align": "right" }}>
          <Button type="primary" size="large" onClick={this.handleSubmit}>
            审核完成
          </Button>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state){
  const {cAudit} = state;
  return {cAudit}
}
const Audits = Form.create({})(Audit);
export default connect(mapStateToProps)(Audits);
