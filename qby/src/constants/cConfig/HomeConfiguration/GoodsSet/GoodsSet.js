import React, { Component } from "react";
import { Form, Radio, DatePicker, Button } from "antd";
import {
  addTimeApi,
  getTimeListApi
} from "../../../../services/cConfig/homeConfiguration/goodSet";
import TimeTable from "./components/TimeTable";
import moment from "moment";
const { RangePicker } = DatePicker;
const FormItem = Form.Item;

class GoodsSet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeSlots: [],
      type: 1
    };
  }
  componentDidMount = () => {
    console.log(this.props)
    this.initPage()
   
    // const res = {
    //   timeSlots: [
    //     {
    //       pdListDisplayCfgId: 1,
    //       beginTime: "2019-08-09 12:54:43",
    //       endTime: "2019-08-09 12:54:43",
    //       activityId: 1,
    //       type: 1
    //     },
    //     {
    //       pdListDisplayCfgId: 2,
    //       beginTime: "2019-08-09 12:54:43",
    //       endTime: "2019-08-09 12:54:43",
    //       activityId: 1,
    //       type: 1
    //     }
    //   ]
    // };
    
  };
  initPage=()=>{
    const {homepageModuleId} = this.props;
    getTimeListApi({homepageModuleId,type:1}).then(res=>{
      if(res.code == '0'){
        this.setState({
          timeSlots: this.formatList(res.timeSlots)
        });
      }
    })
  }
  handleCallback = timeSlots => {
    this.setState({
      timeSlots
    });
  };
  formatList = timeSlots => {
    const newList = timeSlots.map((item, index) => {
      item.completed = true;
      item.key = index
      return item;
    });
    return newList;
  };
  //请求文档的列表
  getTimeListApi = () => {
    const values = {
      homePageModuleId: 1,
      type: this.state.type
    };
    getTimeListApi(values).then(res => {
      if (res.code == "0") {
        this.setState({
          timeSlots
        });
      }
    });
  };
  //添加时间
  addTime = () => {
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const { time, ..._values } = values;
        if (time && time[0]) {
          _values.beginTime = moment(time[0]).format("YYYY-MM-DD HH:mm");
          _values.endTime = moment(time[1]).format("YYYY-MM-DD HH:mm");
        }
        addTimeApi(_values).then(res => {
          if (res.code == "0") {
            this.getTimeListApi();
          }
        });
      }
    });
  };
  //商品分类的值
  onTypeChange = e => {
    this.setState({
      type: e.target.value
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const { timeSlots, type } = this.state;
    const {homePageModuleId} = this.props;
    const newTimeSlots = timeSlots.map((item, index) => {
      item.index = index;
      return item;
    });
    const formLayout = {
      labelCol: { span: 3 },
      wrapperCol: { span: 20 }
    };
    return (
      <div>
        <Form>
          <FormItem {...formLayout} label="属性商品选择">
            {getFieldDecorator("type", {
              rules: [{ required: true, message: "请选择商品属性" }],
              initialValue: type,
              onChange: this.onTypeChange
            })(
              <Radio.Group>
                <Radio value={1}>活动商品</Radio>
                <Radio value={2}>上新商品</Radio>
              </Radio.Group>
            )}
          </FormItem>
          <FormItem {...formLayout} label="时间列表">
            <TimeTable
              type={type}
              homePageModuleId={homePageModuleId}
              callback={this.handleCallback}
              timeSlots={newTimeSlots}
            />
          </FormItem>
        </Form>
      </div>
    );
  }
}
const GoodsSets = Form.create({})(GoodsSet);
export default GoodsSets;