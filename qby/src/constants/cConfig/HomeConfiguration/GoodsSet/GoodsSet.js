import React, { Component } from "react";
import { Form, Radio, DatePicker } from "antd";
import TimeTable from './components/TimeTable'
const { RangePicker } = DatePicker;
const FormItem = Form.Item;

class GoodsSet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeSlots: []
    };
  }
  componentDidMount = () => {
    // getTimeListApi().then()
    const res = {
      timeSlots: [
        {
          pdDisplayCfgId: 1,
          beginTime: "2019-08-09 12:54:43",
          endTime: "2019-08-09 12:54:43",
          activityId: 1,
          type: 1
        },
        {
          pdDisplayCfgId: 2,
          beginTime: "2019-08-09 12:54:43",
          endTime: "2019-08-09 12:54:43",
          activityId: 1,
          type: 1
        }
      ]
    };
    this.setState({
      timeSlots: this.formatList(res.timeSlots)
    });
  };
  handleCallback = (timeSlots) => {
    this.setState({
      timeSlots
    })
  };
  formatList=(timeSlots)=>{
    const newList = timeSlots.map((item,index)=>{
      item.completed = true
      return item
    });
    return newList
  }
  render() {
    const { timeSlots } = this.state;
    const newTimeSlots = timeSlots.map((item,index)=>item.index = index);
    const { getFieldDecorator } = this.props.form;
    const formLayout = {
      labelCol: { span: 2 },
      wrapperCol: { span: 20 }
    };
    return (
      <div>
        <Form>
          <FormItem {...formLayout} label="属性商品选择">
            {getFieldDecorator("type", {
              initialValue: 1,
              onChange: this.onChange
            })(
              <Radio.Group>
                <Radio value={1}>活动商品</Radio>
                <Radio value={2}>上新商品</Radio>
              </Radio.Group>
            )}
          </FormItem>
          <FormItem {...formLayout} label="时间列表">
            {getFieldDecorator("type1", {
              initialValue: 1,
              onChange: this.onChange
            })(
              <TimeTable
                callback={this.handleCallback}
                timeSlots={newTimeSlots}
              />
            )}
          </FormItem>
        </Form>
      </div>
    );
  }
}
const GoodsSets = Form.create({})(GoodsSet);
export default GoodsSets;
