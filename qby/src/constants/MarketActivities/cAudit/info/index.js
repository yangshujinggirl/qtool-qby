import React, { Component } from "react";
import { Card, Form, Table, Radio, Input, Button, Collapse } from "antd";
import {baseInfoApi,goodsInfoApi} from '../../../../services/marketActivities/cAudit'
import "../index.less";
import * as Columns from './columns' 
const FormItem = Form.Item;
const TextArea = Input.TextArea;
const { Panel } = Collapse;
class activityDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expandIconPosition: "right",
      audit:0
    };
  }
  componentDidMount() {
    this.getDetail();
  }
  getDetail(){
    //基本信息请求
    const {promotionId} = this.props.data;
    baseInfoApi({promotionId}).then(res=>{
      if(res.code == '0'){

      };
    })
    //商品信息
    goodsInfoApi({promotionId}).then(res=>{

    });
    
  }
  exportShop = () => {
    const { shopType, activityId } = this.state.activityInfo;
    exportMdApi({ downloadParam: { shopType, activityId }, type: 110 }).then(
      res => {
        if (res.code == "0") {
          confirm({
            title: "数据已经进入导出队列",
            content: "请前往下载中心查看导出进度",
            cancelText: "稍后去",
            okText: "去看看",
            onOk: () => {
              const paneitem = {
                title: "下载中心",
                key: "000001",
                componkey: "000001",
                data: null
              };
              this.props.dispatch({
                type: "tab/firstAddTab",
                payload: paneitem
              });
              this.props.dispatch({
                type: "downlaod/fetch",
                payload: {
                  code: "qerp.web.sys.doc.list",
                  values: { limit: 15, currentPage: 0 }
                }
              });
            }
          });
        }
      }
    );
  };
  onChange=(e)=>{
    const {value} = e.target;
    if(value){
      this.setState({
        audit:value
      });
    };
  }
  render() {
    const {type} = this.props//从列表中获取应该是哪种促销
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 3 },
      wrapperCol: { span: 14 }
    };
    return (
      <div className="audit-info">
        <Collapse
          defaultActiveKey={["1"]}
          expandIconPosition={this.state.expandIconPosition}
        >
          <Panel header="活动信息" key="1">
            <div className="mb10">
              <Form className="base-info">
                <FormItem label="活动ID">111</FormItem>
                <FormItem label="活动状态">111</FormItem>
                <FormItem label="活动名称">111</FormItem>
                <FormItem label="活动时间">2017-8-19  00:00 至 2017-9-20  00:00</FormItem>
                <FormItem label="活动目的">111</FormItem>
                <FormItem label="活动级别">111</FormItem>
                <FormItem label="活动端">111</FormItem>
                <FormItem label="活动门店">111</FormItem>
                <FormItem label="活动成本承担方">111</FormItem>
                <FormItem label="活动成本分摊比例">
                  <Table
                    bordered
                    dataSource={[]}
                    columns={Columns.columns2}
                    pagination={false}
                  />
                </FormItem>
                <FormItem label="促销范围">111</FormItem>
                <FormItem label="促销类型">111</FormItem>
                <FormItem label="请选择可同享的专区促销类型">111</FormItem>
              </Form>
            </div>
          </Panel>
          <Panel header="前端展示" key="2">
            <div>
              <div className="mb10">
                <Form>
                  <FormItem label="是否展示商品横幅">111</FormItem>
                  <FormItem label="设置横幅条开始展示的时间">111</FormItem>
                  <FormItem label="配置商品详情页横幅条背景图片">111</FormItem>
                  <FormItem label="配置活动主题logo图">111</FormItem>
                </Form>
              </div>
            </div>
          </Panel>
          <Panel header="优惠内容" key="3">
            <FormItem label="优惠条件">111</FormItem>
            <FormItem label="赠送方式">每种赠品均送</FormItem>
            <div>
              <div className="mb20">
                <Table
                  bordered
                  title={() => <p>阶梯：单笔订单满200元，送以下商品</p>}
                  dataSource={[]}
                  columns={Columns.columns3}
                  pagination={false}
                />
              </div>
              <div className="mb20">
                <Table
                  bordered
                  title={() => <p>阶梯：单笔订单满200元，送以下商品</p>}
                  dataSource={[]}
                  columns={Columns.columns3}
                  pagination={false}
                />
              </div>
            </div>
          </Panel>
          <Panel header="活动商品" key="4">
            <div className="export-title">
              <div>
                <span>共6条数据</span>　
                <Button onClick={this.exportShop} type="primary">
                  导出活动商品明细
                </Button>
              </div>
            </div>
            <Table
              bordered
              dataSource={[]}
              columns={Columns.columns3}
              pagination={false}
            />
          </Panel>
          <Panel header="审核日志" key="5">
            <div className="mb20">
              <Table
                bordered
                dataSource={[]}
                columns={Columns.columns2}
                pagination={false}
              />
            </div>
          </Panel>
        </Collapse>
        <div className="mb20">
          <Card title="">
            <Form>
              <FormItem label="审核结果">
                {getFieldDecorator("status", {
                  onChange:this.onChange,
                  initialValue: 1
                })(
                  <Radio.Group>
                    <Radio value={1}>审核通过</Radio>
                    <Radio value={2}>审核不通过</Radio>
                  </Radio.Group>
                )}
              </FormItem>
              <FormItem label="不通过原因">
                {getFieldDecorator("reason", {
                  initialValue: ""
                })(
                  <TextArea
                    rows={3}
                    style={{ width: "300px" }}
                    placeholder="请输入不通过理由，100字以内"
                    maxLength="100"
                  />
                )}
              </FormItem>
            </Form>
          </Card>
        </div>
        <div style={{ "text-align": "center" }}>
          <Button type="primary" size="large">
            审核完成
          </Button>
        </div>
      </div>
    );
  }
}
const activityDetails = Form.create({})(activityDetail);
export default activityDetails;
