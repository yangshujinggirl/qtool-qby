import React ,{ Component } from 'react';
import { Tabs } from 'antd';
import CommonSort from './components/CommonSort/index.js';

import './index.less';

const TabPane = Tabs.TabPane;

class InternalSort extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type:'1'
    }
  }
  callback=(type)=> {
    this.setState({
      type
    })
  }
  handelChange =()=> {

  }
  render() {
    const { type } = this.state;
    return(
      <div className="internal-sort-components">
        <Tabs activeKey={type} onChange={this.callback} className="qtools-tab-components">
          <TabPane tab="一级分类" key="1"><CommonSort type={type}/></TabPane>
          <TabPane tab="二级分类" key="2"><CommonSort type={type}/></TabPane>
          <TabPane tab="三级分类" key="3"><CommonSort type={type}/></TabPane>
          <TabPane tab="四级分类" key="4"><CommonSort type={type}/></TabPane>
        </Tabs>
      </div>
    )
  }
}


export default InternalSort;
