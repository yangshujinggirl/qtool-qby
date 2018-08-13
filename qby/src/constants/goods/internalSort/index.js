import React ,{ Component } from 'react';
import { Tabs } from 'antd';
import CommonSort from './components/CommonSort/index.js';

import './index.less';

const TabPane = Tabs.TabPane;

class InternalSort extends Component {
  constructor(props) {
    super(props);
    this.state = {
      level:'1'
    }
  }
  callback=(level)=> {
    this.setState({
      level
    })
  }

  render() {
    const { level } = this.state;
    const { rolelists } =this.props.data;
    return(
      <div className="internal-sort-components">
        <Tabs activeKey={level} onChange={this.callback} className="qtools-tab-components">
          <TabPane tab="一级分类" key="1">{level=='1'&&<CommonSort level='1' rolelists={rolelists}/>}</TabPane>
          <TabPane tab="二级分类" key="2">{level=='2'&&<CommonSort level='2' rolelists={rolelists}/>}</TabPane>
          <TabPane tab="三级分类" key="3">{level=='3'&&<CommonSort level='3' rolelists={rolelists}/>}</TabPane>
          <TabPane tab="四级分类" key="4">{level=='4'&&<CommonSort level='4' rolelists={rolelists}/>}</TabPane>
        </Tabs>
      </div>
    )
  }
}


export default InternalSort;
