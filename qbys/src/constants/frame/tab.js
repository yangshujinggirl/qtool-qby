import React from 'react';
import { Tabs, Button } from 'antd';
import { connect } from 'dva';
import Content from '../frame/content';
import '../../style/tab.css';
const TabPane = Tabs.TabPane;


class Tab extends React.Component {
  constructor(props) {
    super(props);
    this.newTabIndex = 0;
    const panes = [
      { title: 'Tab 1', key: '1' }
    ];
    this.state = {
      activeKey: panes[0].key,
      panes,
    };
  }

  




  onChange = (activeKey) => {
    console.log(activeKey)
    this.setState({ activeKey });
  }
  onEdit = (targetKey, action) => {
    console.log(targetKey)
    console.log(action)
    this[action](targetKey);
  }
  add = () => {
    const panes = this.state.panes;
    const activeKey = `newTab${this.newTabIndex++}`;
    panes.push({ title: 'New Tab', content: 'New Tab Pane', key: activeKey });
    this.setState({ panes, activeKey });
  }
  remove = (targetKey) => {
    let activeKey = this.state.activeKey;
    let lastIndex;
    this.state.panes.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const panes = this.state.panes.filter(pane => pane.key !== targetKey);
    if (lastIndex >= 0 && activeKey === targetKey) {
      activeKey = panes[lastIndex].key;
    }
    this.setState({ panes, activeKey });
  }
  render() {
    return (
            <Tabs
              hideAdd
              onChange={this.onChange}
              activeKey={this.state.activeKey}
              type="editable-card"
              onEdit={this.onEdit}
              className='h10'

            >
              {this.props.pane.map(pane => <TabPane tab={pane.title} key={pane.key} className='h10'>
              <Content countkey={pane.key}/></TabPane>)}
            </Tabs>
       
      
    );
  }
}

function mapStateToProps(state) {
     console.log(state)
    const {pane} = state.tab;
    console.log(pane)
    return {pane};
}


export default connect(mapStateToProps)(Tab);
