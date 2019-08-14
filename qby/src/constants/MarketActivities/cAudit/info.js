import {React,Component} from "react";
import { Card, Form, Table, Button } from "antd";
import { connect } from "dva";
const FormItem = Form.Item;
const columns = [
  {
    title: "操作类型",
    dataIndex: "pdCode",
    key: "1"
  },
  {
    title: "操作描述",
    dataIndex: "name",
    key: "2"
  },
  {
    title: "操作时间",
    dataIndex: "displayName",
    key: "3"
  },
  {
    title: "操作人",
    dataIndex: "toCPrice",
    key: "4"
  },
];
class activityDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  componentDidMount() {
    this.getDetail();
  }
  getDetail(){

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
  render() {
    return (
      <div>
        <div className="mb10">
          <Card title="活动信息">
            <Form>
              <FormItem label="活动ID"></FormItem>
            </Form>
          </Card>
        </div>
        <div className="mb10">
          <Card title="前端信息">
            <Form>
              <FormItem label="活动ID"></FormItem>
            </Form>
          </Card>
        </div>
        <div className="mb20">
            <Card>
              <Button
                type="primary"
                style={{ float: "right", "margin-right": "20px" }}
                onClick={this.exportShop}
              >
                导出门店明细
              </Button>
            </Card>
        </div>
        <div className="mb20">
            <Card
              title='审核日志'
            >
            </Card>
        </div>
      </div>
    );
  }
}
export default activityDetail;
