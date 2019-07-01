import React, { Component } from 'react';
import { Button } from 'antd';
import './index.less';

class IconMod extends Component {
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
          <Button>编辑</Button>
          <Button>隐藏</Button>
        </div>
      </div>
    )
  }
}


export default IconMod;
