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
    const pane = this.props.pane;
    this.state = {
      activeKey: pane[0].key,
      pane,
    };
  }

  onChange = (activeKey) => {
    this.setState({ activeKey });
    this.props.dispatch({
        type:'tab/changeActiveKey',
        payload:activeKey
      });
  }

  onEdit = (targetKey, action) => {
    console.log(this.state.pane);
    console.log(targetKey)
    console.log(action)
    this[action](targetKey);
  }

  add = () => {
        const pane = this.state.pane;
        const activeKey = `newTab${this.newTabIndex++}`;
        pane.push({ title: 'New Tab', content: 'New Tab Pane', key: activeKey });
        this.setState({ pane, activeKey });
      }

  remove = (targetKey) => {
    this.props.dispatch({
        type:'tab/delectArr',
        payload:targetKey
      });
  }

  render() {
    return (
        <Tabs
          hideAdd
          onChange={this.onChange}
          activeKey={this.props.activeKey}
          type="editable-card"
          onEdit={this.onEdit}
          className='h10'
        >
          {this.props.pane.map(pane => 
            pane.children
            ?
            <div>
              <TabPane tab={pane.title} key={pane.key} className='h10'>
                <Content/>
              </TabPane>
              <TabPane tab={pane.children.title} key={pane.children.key} className='h10'>
                <Content/>
              </TabPane>
            </div>
            :
            <TabPane tab={pane.title} key={pane.key} className='h10'>
                 <Content/>
            </TabPane>
            )
        }
        </Tabs>
    );
  }
}

function mapStateToProps(state) {
    const {pane,activeKey} = state.tab;
    return {pane,activeKey};
}


export default connect(mapStateToProps)(Tab);
