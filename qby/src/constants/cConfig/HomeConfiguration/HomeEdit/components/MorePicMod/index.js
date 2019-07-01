import react, { Component } from 'react';
import { Button } from 'antd';
import './index.less'

class MorePicMod extends Component {
  render() {
    return(
      <div className="common-sty morePic-mod">
        <div className="mod-wrap">
          <div className="mod-common-head">
            <div className="hd-item">
              多商品组合
            </div>
            <p className="hd-item">查看更多</p>
          </div>
          <div className="main-layout">
            <div className="layout-l">
              layout-l
            </div>
            <div className="layout-r">
              <div className="lay-t">lay-t</div>
              <div className="lay-b">lay-b</div>
            </div>
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
export default MorePicMod;
