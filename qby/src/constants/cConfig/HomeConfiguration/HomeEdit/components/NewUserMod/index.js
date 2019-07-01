import react, { Component } from 'react';
import { Button } from 'antd';

class NewUserMod extends Component {
  render() {
    return(
      <div className="common-sty search-mod">
        <p>新人礼</p>
        <div className="handle-btn-action">
          <Button>查看</Button>
          <Button>编辑</Button>
          <Button>隐藏</Button>
        </div>
      </div>
    )
  }
}
export default NewUserMod;
