import React, { Component } from "react";
import { Form, Radio, DatePicker, Button } from "antd";
import {connect} from 'dva'
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
    this.initPage()
  };
  initPage=()=>{
    this.props.dispatch({type: 'tab/loding',payload:true})
    const {homepageModuleId} = this.props;
    const {type} = this.state;
    getTimeListApi({homepageModuleId,type}).then(res=>{
      if(res.code == '0'){
        this.setState({
          timeSlots: this.formatList(res.timeSlots)
        });
        this.props.dispatch({type: 'tab/loding',payload:false})
      }else{
        this.props.dispatch({type: 'tab/loding',payload:false})
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
      homepageModuleId: 1,
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
    this.props.dispatch({
      type:'goodsSet/getGoodType',
      payload:{
        goodType:e.target.value
      }
    });
    this.props.dispatch({
      type:'goodsSet/activeKeyLists',
      payload:{
        activeKeyLists:[
          {tab:'设置时段',key:'1'},
          {tab:'模块设置',key:'2'},
        ],
      }
    });
    this.setState({
      type: e.target.value
    },()=>{
      this.initPage()
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const { timeSlots, type } = this.state;
    const {homepageModuleId} = this.props;
    const newTimeSlots = timeSlots.map((item, index) => {
      item.index = index;
      return item;
    });
    const formLayout = {
      labelCol: { span: 3 },
      wrapperCol: { span: 20 }
    };
    return (
      <div className="common-modal-set-component">
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
              homepageModuleId={homepageModuleId}
              callback={this.handleCallback}
              timeSlots={newTimeSlots}
            />
          </FormItem>
        </Form>
      </div>
    );
  }
}
function mapStateToProps(state){
  const {goodsSet} = state;
  return goodsSet
}
const GoodsSets = Form.create({})(GoodsSet);
export default connect(mapStateToProps)(GoodsSets);
