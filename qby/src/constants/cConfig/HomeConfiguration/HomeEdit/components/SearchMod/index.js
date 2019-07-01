import react, { Component } from 'react';
import { Input, Icon, Button } from 'antd';
import './index.less'

class SearchMod extends Component {
  render() {
    return(
      <div  className="common-sty search-mod">
        <Input
          addonBefore={<Icon type="search" />}
          addonAfter={<Icon type="scan" />}
          placeholder="input search text"/>
        <div className="handle-btn-action">
          <Button>查看</Button>
          <Button>编辑</Button>
        </div>
      </div>
    )
  }
}
export default SearchMod;
