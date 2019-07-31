import React, { Component } from "react";
import { Form, Row, Col, Input, Button, Icon, Select, DatePicker } from "antd";
import {removeSpace} from '../../../../../../utils/meth'
import moment from 'moment'
const FormItem = Form.Item;
const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;
const StatusOption = [
  {
    key: 1,
    value: "草稿中"
  },
  {
    key: 2,
    value: "待发布"
  },
  {
    key: 0,
    value: "线上版本"
  },
  {
    key: 3,
    value: "已下线"
  }
];

class NormalForm extends Component {
  constructor(props) {
    super(props);
  }
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      const {time,..._values} = values;
      if(time&&time[0]){
        _values.releaseTimeStr = moment(time[0]).format('YYYY-MM-DD HH:mm:ss')
        _values.releaseTimeEn = moment(time[1]).format('YYYY-MM-DD HH:mm:ss')
      };
      removeSpace(_values);
      this.props.submit && this.props.submit(_values);
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form className="qtools-condition-form">
        <div className="search-form-outwrap">
          <div className="search-form-wrap">
            <FormItem label="版本名称">
              {getFieldDecorator("versionName")(
                <Input
                  placeholder="版本名称"
                  maxLength="15"
                  autoComplete="off"
                />
              )}
            </FormItem>
            <FormItem label="发布时间">
              {getFieldDecorator("time")(
                <RangePicker format="YYYY-MM-DD HH:mm:ss" />
              )}
            </FormItem>
            <FormItem label="版本状态">
              {getFieldDecorator("status")(
                <Select placeholder="请选择版本状态" allowClear={true}>
                  {StatusOption.map(el => (
                    <Select.Option value={el.key} key={el.key}>
                      {el.value}
                    </Select.Option>
                  ))}
                </Select>
              )}
            </FormItem>
            <FormItem label="版本编号">
              {getFieldDecorator("versionCode")(
                <Input placeholder="请输入版本编号" autoComplete="off" />
              )}
            </FormItem>
          </div>
        </div>
        <div className="search-submit-btn">
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            onClick={this.handleSubmit.bind(this)}
          >
            搜索
          </Button>
        </div>
      </Form>
    );
  }
}
const FilterForm = Form.create({})(NormalForm);

export default FilterForm;
