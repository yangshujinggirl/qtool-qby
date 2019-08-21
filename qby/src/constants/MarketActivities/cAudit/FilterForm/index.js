import React, { Component } from "react";
import { connect } from "dva";
import { Form, Input, Button, Select, DatePicker } from "antd";
import { removeSpace } from "../../../../utils/meth";
import moment from "moment";
const FormItem = Form.Item;
const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;

class NormalForm extends Component {
  //点击搜索
  handleSubmit = e => {
    this.props.form.validateFieldsAndScroll((err, values) => {
      removeSpace(values);
      this.props.submit && this.props.submit(values);
    });
  };
  //初始化
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Form className="qtools-condition-form">
          <div className="search-form-outwrap">
            <div className="search-form-wrap">
              <FormItem label="活动ID">
                {getFieldDecorator("promotionId")(
                  <Input placeholder="请输入活动ID" autoComplete="off" />
                )}
              </FormItem>
              <FormItem label="促销类型">
                {getFieldDecorator("promotionType")(
                  <Select allowClear={true} placeholder="请选择审核状态">
                    <Option value={10}>单品直降</Option>
                    <Option value={11}>单品多级满赠</Option>
                    <Option value={20}>专区多级满元赠</Option>
                    <Option value={21}>专区多级满件赠</Option>
                    <Option value={22}>专区多级满元减</Option>
                    <Option value={23}>专区满件减免</Option>
                  </Select>
                )}
              </FormItem>
              <FormItem label="审核状态">
                {getFieldDecorator("status")(
                  <Select allowClear={true} placeholder="请选择审核状态">
                    <Option value={0}>待审核</Option>
                    <Option value={1}>审核通过</Option>
                    <Option value={2}>审核不通过</Option>
                  </Select>
                )}
              </FormItem>
              <FormItem label="活动创建人">
                {getFieldDecorator("createUser")(
                  <Input placeholder="请输入活动创建人" autoComplete="off" />
                )}
              </FormItem>
              <FormItem label="审核人">
                {getFieldDecorator("approvalUser")(
                  <Input placeholder="请输入审核人" autoComplete="off" />
                )}
              </FormItem>
            </div>
          </div>
          <div className="search-submit-btn">
            <Button
              htmlType="submit"
              type="primary"
              size="large"
              onClick={() => this.handleSubmit()}
            >
              搜索
            </Button>
          </div>
        </Form>
      </div>
    );
  }
}

const FilterForm = Form.create({})(NormalForm);
function mapStateToProps(state) {
  const { bPromotion } = state;
  return { bPromotion };
}
export default connect(mapStateToProps)(FilterForm);
