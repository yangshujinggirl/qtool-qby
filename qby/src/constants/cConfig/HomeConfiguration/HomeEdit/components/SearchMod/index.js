import react, { Component } from 'react';
import { Input, Icon } from 'antd';
import './index.less'

class SearchMod extends Component {
  render() {
    return(
      <div  className="common-sty search-mod">
        <Input
          addonBefore={<Icon type="search" />}
          addonAfter={<Icon type="scan" />}
          placeholder="input search text"/>
      </div>
    )
  }
}
export default SearchMod;
