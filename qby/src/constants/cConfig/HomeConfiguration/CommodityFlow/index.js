import React, { Component } from 'react';
import { Tabs, Button } from 'antd';
import Mod from './components/Mod'
import './index.less';

const { TabPane } = Tabs;

class CommodityFlow extends Component {
  constructor(props) {
    super(props);
    this.newTabIndex = 0;
    const panes = [
      { title: 'Tab 1', content: 'Content of Tab 1', key: '1' },
      { title: 'Tab 2', content: 'Content of Tab 2', key: '2' },
      {
        title: 'Tab 3',
        content: 'Content of Tab 3',
        key: '3',
      },
    ];
    this.state = {
      activeKey: panes[0].key,
      panes,
    };
  }
  onChange = activeKey => {
    this.setState({ activeKey });
  };

  onEdit = (targetKey, action) => {
    this[action](targetKey);
  };
  add = () => {
    const { panes } = this.state;
    const activeKey = `newTab${this.newTabIndex++}`;
    panes.push({ title: 'New Tab', content: 'Content of new Tab', key: activeKey });
    this.setState({ panes, activeKey });
  };

  remove = targetKey => {
    let { activeKey } = this.state;
    let lastIndex;
    this.state.panes.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const panes = this.state.panes.filter(pane => pane.key !== targetKey);
    if (panes.length && activeKey === targetKey) {
      if (lastIndex >= 0) {
        activeKey = panes[lastIndex].key;
      } else {
        activeKey = panes[0].key;
      }
    }
    this.setState({ panes, activeKey });
  };
  render() {
    const { panes } =this.state;

    return(
      <div className="commodity-flow-pages common-mod-set-pages">
        <Tabs
          hideAdd
          onChange={this.onChange}
          activeKey={this.state.activeKey}
          type="editable-card"
          onEdit={this.onEdit}>
            {panes.map(pane => (
              <TabPane tab={pane.title} key={pane.key} closable={panes.length>1?true:false}>
                <div className="main-content-action">
                  <Mod />
                </div>
              </TabPane>
            ))}
        </Tabs>
        <Button
          onClick={this.add}
          size="large"
          type="primary"
          className="add-tab-btn">
            +新增Tab（{panes.length}/10）
        </Button>
      </div>
    )
  }
}

export default CommodityFlow;
