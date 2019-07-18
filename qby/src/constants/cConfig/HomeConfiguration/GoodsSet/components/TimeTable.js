import React, { Component } from "react";
import { connect } from "dva";
import { Form, DatePicker, Button, Modal } from "antd";
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
    this.state = {
      visible: false
    };
    this.columns = [
      {
        title: "序号",
        dataIndex: "index"
      },
      {
        title: "展示时间段",
        width: "40%",
        render: (text, record, index) => {
          const { getFieldDecorator } = this.props.form;
          return record.completed ? (
            <span>
              {record.beginTime}~{record.endTime}
            </span>
          ) : (
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
          );
        }
      },
      {
        title: "操作",
        width: "40%",
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
                    this.onSure(times,record);
                  }}
                  style={{ marginLeft: "15px" }}
                >
                  确认
                </Button>
              )}
              <Button
                disabled={!record.completed}
                onClick={() => this.goToSet(record)}
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
  //点击配置商品
  goToSet = record => {
    this.props.dispatch({
      type: "goodsSet/getTimeInfo",
      payload: { 
        pdListDisplayCfgId: record.pdListDisplayCfgId,
        endTime:record.endTime,
        beginTime:record.beginTime,
        activityId:record.activityId
       }
    });
    this.props.dispatch({
      type: "goodsSet/changeKey",
      payload: { activeKey: "2" }
    });
  };
  //点击编辑时间
  onEdit = id => {
    const { timeSlots } = this.props;
    const list = timeSlots.map(item => {
      if (item.pdListDisplayCfgId == id) {
        item.completed = false;
      };
      return item;
    });
    this.props.callback(list);
  };
  //确认
  onSure = (times,record) => {
    const beginTime = moment(times[0]).format("YYYY-MM-DD HH:mm");
    const endTime = moment(times[1]).format("YYYY-MM-DD HH:mm");
    
    this.addTime(beginTime, endTime,record);
  };
  addTime = (beginTime, endTime,record) => {
    const { type, homepageModuleId } = this.props;
    const values = {
      homepageModuleId,
      type,
      beginTime,
      endTime
    };
    if(record.pdListDisplayCfgId){
      values.pdListDisplayCfgId = record.pdListDisplayCfgId
    };
    addTimeApi(values).then(res => {
      if (res.code == "0") {
        this.getTimeList(type, homepageModuleId);
      }
    });
  };
  //请求时间列表
  getTimeList = (type, homepageModuleId) => {
    getTimeListApi({ type, homepageModuleId }).then(res => {
      if (res.code == "0") {
        const { timeSlots } = res;
        const list = timeSlots.map(item => {
          if (item.pdListDisplayCfgId) {
            item.completed = true;
          };
          return item;
        });
        this.props.callback(list);
      }
    });
  };
  //删除
  delete = id => {
    this.setState({
      pdListDisplayCfgId: id,
      visible: true
    });
  };
  //更改时段list
  handleCallback = timeSlots => {
    this.props.callback(timeSlots);
  };
  onOk = () => {
    const { pdListDisplayCfgId } = this.state;
    deleteTimeApi({ pdListDisplayCfgId }).then(res => {
      if (res.code == "0") {
        this.getTimeList(this.props.type, this.props.homepageModuleId);
        this.setState({
          visible:false
        });
      }
    });
  };
  onCancel = () => {
    this.setState({
      visible: false
    });
  };
  render() {
    const { timeSlots } = this.props;
    const { visible } = this.state;
    return (
      <div className="time-list">
        <BaseDelTable
          callback={this.handleCallback}
          columns={this.columns}
          dataSource={timeSlots}
        />
        <Modal visible={visible} onOk={this.onOk} onCancel={this.onCancel}>
          <p>确认删除该时间段么?</p>
        </Modal>
      </div>
    );
  }
}
function mapStateToProps(state) {
  const { goodsSet } = state;
  return goodsSet;
}
const TimeTables = Form.create({})(TimeTable);
export default connect(mapStateToProps)(TimeTables);
