import React, { Component } from "react";
import { Upload, Button, message, Modal } from "antd";
import { connect } from "dva";
import "./index.less";
class index extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  downLoadTemp = () => {
    const { promotionType } = this.props;
    switch (promotionType) {
      case 10:
        window.open("../../../../../../static/market/c_down.xlsx");
        break;
      case 11:
        window.open("../../../../../../static/market/c_single_give.xlsx");
        break;
      case 20:
        window.open("../../../../../../static/market/c_yuan_zeng.xlsx");
        break;
      case 21:
        window.open("../../../../../../static/market/c_jian_zeng.xlsx");
        break;
      case 22:
        window.open("../../../../../../static/market/c_yuan_low.xlsx");
        break;
      case 23:
        window.open("../../../../../../static/market/c_jian_low.xlsx");
        break;
    }
  };
  handleChange = info => {
    let file = info.file;
    const { response } = file;
    if (file.status == "done") {
      if (response) {
        if (response.code == "0") {
          const {
            promotionProducts,
            successSize,
            noPro,
            formatWrong,
            priceGapWrong,
            productKindWrong,
            huchiWrong
          } = response.data;
          Modal.success({
            title: "",
            content: (
              <div>
                <p className='import_error'>共成功导入商品  {successSize}  条</p>
                {noPro.length>0 && (
                  <p  className='import_error'>
                    {noPro.map(
                      (item, index) =>`${item}${index == noPro.length - 1 ? "" : "/ "}`
                    )} 商品不存在
                  </p>
                )}
                {formatWrong.length>0 && (
                  <p className='import_error'>
                    {formatWrong.map(
                      (item, index) =>`${item}${index == formatWrong.length - 1 ? "" : "/ "}`
                    )} 商品填写格式错误
                  </p>
                )}
                {priceGapWrong.length>0 && (
                  <p className='import_error'>
                    {priceGapWrong.map(
                      (item, index) =>`${item}${index == priceGapWrong.length - 1 ? "" : "/ "}`
                    )}
                    商品填写格式错误
                  </p>
                )}
                {productKindWrong.length>0 && (
                  <p className='import_error'>
                    {productKindWrong.map(
                      (item, index) =>`${item}${index == productKindWrong.length - 1 ? "" : "/ "}`
                    )}
                    商品不符合活动商品范围
                  </p>
                )}
                 {huchiWrong.length>0 && (
                  <p className='import_error'>
                    {huchiWrong.map(
                      (item, index) =>`${item}${index == huchiWrong.length - 1 ? "" : "/ "}`
                    )}
                    商品已参加其他和此活动互斥的活动
                  </p>
                )}
              </div>
            ),
            footer: null
          });
          this.props.dispatch({
            type: "ctipActivityAddTwo/refreshLists",
            payload: { goodLists: promotionProducts }
          });
        } else {
          message.error(file.response.message, 0.8);
        }
        return file.response.status === "success";
      }
    }
  };
  beforeUpload = () => {};
  render() {
    const {
      promotionType,
      beginTime,
      endTime,
      pdKind,
      promotionId
    } = this.props;
    const params = JSON.stringify({
      type: promotionType,
      beginTime,
      endTime,
      pdKind,
      promotionId
    });
    const props = {
      action: "/erpWebRest/webrest.htm?code=qerp.web.promotion.activity.import",
      onChange: this.handleChange,
      beforeUpload: this.beforeUpload,
      name: "mfile",
      data: { data: params },
      showUploadList: false
    };
    return (
      <div className="c_act_import">
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
        <div className="tips">
          注：导入为覆盖导入，即第二次导入的商品将覆盖前一次导入的所有商品
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
