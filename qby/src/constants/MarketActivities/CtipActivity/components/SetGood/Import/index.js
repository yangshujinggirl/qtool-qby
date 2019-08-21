import React, { Component } from "react";
import { Upload, Button } from "antd";
import { connect } from "dva";
import "./index.less";
class index extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  downLoadTemp = () => {
    window.open("");
  };
  handleChange = info => {
    // let file = info.file;
    // const { response } = file;
    // if (file.status == "done") {
    //   if (response) {
    //     if (response.code == "0") {
    //       const { promotionProducts } = response;
    //       this.props.dispatch({
    //         type:'ctipActivityAddTwo/refreshLists',
    //         payload:{goodLists:promotionProducts}
    //       });
    //     } else {
    //       message.error(file.response.message, 0.8);
    //     };
    //     return file.response.status === "success";
    //   };
    // };
    const promotionProducts = [{
      pdCode: "",
      maxQty: 100,
      activityPrice: 10,
      perOrderLimit: 1,
      perDayLimit: 2,
      perUserLimit: 3,
      pdName: "1",
      pdSpec: "2",
      pdKind: "3",
      sellPrice: 10,
      goldCardPrice: 10,
      silverCardPrice: 10
    }];
    this.props.dispatch({
      type: "ctipActivityAddTwo/refreshLists",
      payload: { goodLists: promotionProducts }
    });
  };
  beforeUpload = () => {
    
  };
  render() {
    const params = JSON.stringify({ type: this.props.promotionType });
    const props = {
      action: "/erpWebRest/webrest.htm?code=qerp.web.promotion.activity.import",
      onChange: this.handleChange,
      beforeUpload: this.beforeUpload,
      name: "mfile",
      data: { data: params },
      showUploadList: false
    };
    return (
      <div>
        <div>
          请导入商品：
          <Upload {...props}>
            <Button type="primary" size="large">
              导入商品
            </Button>
          </Upload>
          <a className="act_down" onClick={this.downLoadTemp}>
            下载导入模板
          </a>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  const { ctipActivityAddTwo } = state;
  return ctipActivityAddTwo;
}
export default connect(mapStateToProps)(index);
