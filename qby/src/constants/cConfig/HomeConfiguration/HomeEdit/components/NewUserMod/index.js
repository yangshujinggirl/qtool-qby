import react, { Component } from "react";
import { connect } from 'dva';
import { Button } from "antd";
import CommonMod from '../CommonMod';

import './index.less'

class NewUserMod extends Component {
  goEdit = () => {
    const { componkey } = this.props;
    const paneitem = {
      title: "新人礼模块",
      key: `${componkey}edit-new-user`,
      componkey: `${componkey}edit-new-user`,
      parentKey:componkey,
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
    let { coupon } =this.props.info;
    let { homepageModuleId, moduleBackColor,isDisplay, moduleContent } =coupon;
    const fileDomain = JSON.parse(sessionStorage.getItem('fileDomain'));
    return (
      <CommonMod
        homepageModuleId={ homepageModuleId }
        className={`new-user-mod ${!isDisplay?'hiddle-module':''}`}
        style={{'background':`#${moduleBackColor}`}}>
        <div>
          {
            moduleContent&&moduleContent.couponPopUpPicUrl?
            <div className="content-wrap">
              <img src={`${fileDomain}${moduleContent.couponPopUpPicUrl}`}/>
            </div>
            :
            <div className="no-module-data new-user-noData">新人礼</div>
          }
          <div className="handle-btn-action">

            {
               !this.props.data.info&&
               <div>
                <Button onClick={this.goEdit}>编辑</Button>
                <Button onClick={()=>this.props.toggleShow(homepageModuleId,isDisplay)}>{isDisplay?'隐藏':'展开'}</Button>
              </div>
            }

          </div>
        </div>
      </CommonMod>
    );
  }
}
function mapStateToProps(state) {
  const { homeEdit } = state;
  return homeEdit;
}
export default connect(mapStateToProps)(NewUserMod);
