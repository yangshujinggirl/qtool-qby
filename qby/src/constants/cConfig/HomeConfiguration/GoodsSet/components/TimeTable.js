import React, { Component } from "react";
import { Form, DatePicker, Button } from "antd";
import moment from "moment";
import BaseDelTable from "../../components/BaseDelTable";
const FormItem = Form.Item;
const { RangePicker } = DatePicker;
import "../index.less";

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
                })(<RangePicker format="YYYY-MM-DD HH:mm" />)}
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
          return (
            <div>
              {record.completed && (
                <Button onClick={() => this.onEdit(record.pdDisplayCfgId,false)}>
                  编辑时间
                </Button>
              )}
              {!record.completed && (
                <Button onClick={()=>{this.onEdit(record.pdDisplayCfgId,true)}} style={{ marginLeft: "15px" }}>
                  确认
                </Button>
              )}
              <Button
                disabled={!record.completed}
                onClick={() => this.goToSet(record.pdDisplayCfgId)}
                style={{ marginLeft: "15px" }}
              >
                配置商品
              </Button>

              <Button
                style={{ marginLeft: "15px" }}
                onClick={() => this.delete(record.pdDisplayCfgId)}
              >
                删除
              </Button>
            </div>
          );
        }
      }
    ];
  }
  onEdit = (id,status) => {
    const { timeSlots } = this.props;
    const list = timeSlots.map(item => {
      if (item.pdDisplayCfgId == id) {
        item.completed = status;
      }
      return item
    });
    this.props.callback(list);
  };
  
  delete = id => {
    const { timeSlots } = this.props;
    const list = timeSlots.filter(item => item.pdDisplayCfgId != id);
    this.props.callback(list);
  };
  handleCallback = timeSlots => {
    this.props.callback(timeSlots);
  };
  render() {
    const { timeSlots } = this.props;
    console.log(timeSlots)
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

export default Form.create({})(TimeTable);
