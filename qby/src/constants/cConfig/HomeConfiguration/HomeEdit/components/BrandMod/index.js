import react, { Component } from 'react';
import { Button } from 'antd';

class BrandMod extends Component {
  onEdit=()=>{
    this.setState({
      
    })
  }
  render() {
    return(
      <div className="common-sty search-mod">
        <p>品版背书</p>
        <div className="handle-btn-action">
          <Button>查看</Button>
          <Button onClick={this.onEdit}>编辑</Button>
          <Button>隐藏</Button>
        </div>
      </div>
    )
  }
}
export default BrandMod;
