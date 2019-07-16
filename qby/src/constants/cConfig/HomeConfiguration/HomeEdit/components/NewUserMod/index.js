import react, { Component } from "react";
import { connect } from 'dva';
import { Button } from "antd";
import './index.less'

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
    let { homepageModuleId,backgroundPicUrl, contentPicUrl,isDisplay } =this.props.info.coupon;
    const fileDomain = JSON.parse(sessionStorage.getItem('fileDomain'));
    backgroundPicUrl = `${fileDomain}${backgroundPicUrl}`;
    return (
      <div className={`common-sty new-user-mod ${!isDisplay?'hiddle-module':''}`} style={{'background':`#fff url(${backgroundPicUrl})`}}>
        {
          contentPicUrl?
          <div className="content-wrap">
            <img src={`${fileDomain}${contentPicUrl}`}/>
          </div>
          :
          <div className="no-module-data new-user-noData">新人礼</div>
        }
        <div className="handle-btn-action">
          <Button onClick={this.goEdit}>编辑</Button>
          <Button onClick={()=>this.props.toggleShow(homepageModuleId,isDisplay)}>{isDisplay?'隐藏':'展开'}</Button>
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
