import React, { Component } from "react";
import { connect } from "dva";
import { Form, DatePicker, Button } from "antd";
import moment from "moment";
import BaseDelTable from "../../components/BaseDelTable";
import {
  addTimeApi,
  getTimeListApi,
  deleteTimeApi
} from "../../../../../services/cConfig/homeConfiguration/goodSet";
const FormItem = Form.Item;
const { RangePicker } = DatePicker;
import "../index.less";


const disabledDate = current => {
  return current < moment().endOf("second");
};
const range = (start, end) => {
  const result = [];
  for (let i = start; i <= end; i++) {
    if (i != 30 && i != 0) {
      result.push(i);
    }
  }
  return result;
};
const disabledDateTime = () => {
  return {
    disabledMinutes: () => range(0, 60)
  };
};
class TimeTable extends Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: "序号",
        dataIndex: "index"
      },
      {
        title: "展示时间段",
        width: "300",
        render: (text, record, index) => {
          const { getFieldDecorator } = this.props.form;
          return record.completed ? (
            <span>
              {record.beginTime}~{record.endTime}
            </span>
          ) : (
            <Form>
              <FormItem>
                {getFieldDecorator(`time[${index}]`, {
                  initialValue: record.beginTime
                    ? [moment(record.beginTime), moment(moment(record.endTime))]
                    : null
                })(
                  <RangePicker
                    disabledDate={disabledDate}
                    disabledTime={disabledDateTime}
                    allowClear={false}
                    showTime
                    format="YYYY-MM-DD HH:mm"
                  />
                )}
              </FormItem>
            </Form>
          );
        }
      },
      {
        title: "操作",
        width: 400,
        key: "delete",
        render: (text, record, index) => {
          let times = this.props.form.getFieldsValue().time;
          if (times) {
            times = times[index];
          }
          return (
            <div>
              {record.completed && (
                <Button onClick={() => this.onEdit(record.pdListDisplayCfgId)}>
                  编辑时间
                </Button>
              )}
              {!record.completed && (
                <Button
                  disabled={!Boolean(times)}
                  onClick={() => {
                    this.onSure(times);
                  }}
                  style={{ marginLeft: "15px" }}
                >
                  确认
                </Button>
              )}
              <Button
                disabled={!record.completed}
                onClick={() => this.goToSet(record.pdListDisplayCfgId)}
                style={{ marginLeft: "15px" }}
              >
                配置商品
              </Button>
              <Button
                style={{ marginLeft: "15px" }}
                onClick={() => this.delete(record.pdListDisplayCfgId)}
              >
                删除
              </Button>
            </div>
          );
        }
      }
    ];
  }
  goToSet=(id)=>{
    console.log(id)
    this.props.dispatch({
      type:'goodsSet/getpdListDisplayCfgId',
      payload:{pdListDisplayCfgId:id}
    });
    this.props.dispatch({
      type:'goodsSet/changeKey',
      payload:{activeKey:"2"}
    })
  }
  onEdit = id => {
    const { timeSlots } = this.props;
    const list = timeSlots.map(item => {
      if (item.pdListDisplayCfgId == id) {
        item.completed = false;
      }
      return item;
    });
    this.props.callback(list);
  };
  //确认
  onSure = (times) => {
    const beginTime = moment(times[0]).format("YYYY-MM-DD HH:mm");
    const endTime = moment(times[1]).format("YYYY-MM-DD HH:mm");
    this.addTime(beginTime, endTime);
  };
  addTime = (beginTime, endTime) => {
    const { type,homePageModuledId } = this.props;
    const values = {
      homePageModuledId,
      type,
      beginTime,
      endTime,
    };
    addTimeApi(values).then(res => {
      if (res.code == "0") {
        this.getTimeList(type,homePageModuledId)
      }
    });
  };
  //请求时间列表
  getTimeList=(type,homePageModuledId)=>{
    getTimeListApi({ type, homePageModuledId }).then(res => {
      if (res.code == "0") {
        const { timeSlots } = res;
        const list = timeSlots.map(item => {
          if (item.pdListDisplayCfgId == id) {
            item.completed = true;
          }
          return item;
        });
        this.props.callback(list);
      }
    });
  }
  //删除
  delete = id => {
    deleteTimeApi({pdListDisplayCfgId:id}).then(res=>{
      if(res.code == '0'){
        this.getTimeList(this.props.type,this.props.homePageModuledId)
      }
    })
    const { timeSlots } = this.props;
    const list = timeSlots.filter(item => item.pdListDisplayCfgId != id);
    this.props.callback(list);
  };
  //更改时段list
  handleCallback = timeSlots => {
    this.props.callback(timeSlots);
  };
  render() {
    const { timeSlots } = this.props;
    return (
      <div className="time-list">
        <BaseDelTable
          callback={this.handleCallback}
          columns={this.columns}
          dataSource={timeSlots}
        />
      </div>
    );
  }
}
function mapStateToProps(state){
  const {goodsSet} = state;
  return goodsSet
}
const TimeTables = Form.create({})(TimeTable)
export default connect(mapStateToProps)(TimeTables)
