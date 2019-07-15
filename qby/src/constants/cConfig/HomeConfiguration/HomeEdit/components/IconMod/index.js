import React, { Component } from 'react';
import { connect } from 'dva';
import { Button } from 'antd';
import './index.less';

class IconMod extends Component {
  goEdit=()=> {
    const { componkey } = this.props;
    const paneitem={
      title:'icon模块',
      key:`${componkey}edit-icon`,
      componkey:`${componkey}edit-icon`,
      data:{
        homepageModuleId:this.props.info.icon.homepageModuleId,
        homepageId:this.props.data.homepageId
      }
    };
    this.props.dispatch({
        type:'tab/firstAddTab',
        payload:paneitem
    })
  }
  render() {
    return(
      <div className="common-sty icon-mod">
        <div className="mod-wrap">
          <div className="item-icon">
            <div className="pic-wrap"><img src=''/></div>
            <p>奶粉辅食</p>
          </div>
          <div className="item-icon">
            <div className="pic-wrap"><img src=''/></div>
            <p>奶粉辅食</p>
          </div>
          <div className="item-icon">
            <div className="pic-wrap"><img src=''/></div>
            <p>奶粉辅食</p>
          </div>
          <div className="item-icon">
            <div className="pic-wrap"><img src=''/></div>
            <p>奶粉辅食</p>
          </div>
        </div>
        <div className="handle-btn-action">
          <Button>查看</Button>
          <Button onClick={this.goEdit}>编辑</Button>
          <Button>隐藏</Button>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { homeEdit } =state;
  return homeEdit;
}
export default connect(mapStateToProps)(IconMod);
