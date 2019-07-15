import react, { Component } from "react";
import { connect } from 'dva';
import { Button } from "antd";

class NewUserMod extends Component {
  goEdit = () => {
    const { componkey } = this.props;
    const paneitem = {
      title: "新人礼模块",
      key: `${componkey}edit-new-user`,
      componkey: `${componkey}edit-new-user`,
      data: {
        homepageModuleId:this.props.info.coupon.homepageModuleId
      }
    };
    this.props.dispatch({
      type: "tab/firstAddTab",
      payload: paneitem
    });
  };
  render() {
    return (
      <div className="common-sty search-mod">
        <p>新人礼</p>
        <div className="handle-btn-action">
          <Button>查看</Button>
          <Button onClick={this.goEdit}>编辑</Button>
          <Button>隐藏</Button>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  const { homeEdit } = state;
  return homeEdit;
}
export default connect(mapStateToProps)(NewUserMod);
