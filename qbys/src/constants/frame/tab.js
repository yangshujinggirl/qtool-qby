import React from 'react';
import { Tabs, Button } from 'antd';
import { connect } from 'dva';
import Content from '../frame/content';
import '../../style/tab.css';
const TabPane = Tabs.TabPane;


class Tab extends React.Component {
  onChange = (activeKey) => {
    console.log(activeKey)
    let activeKeys={key:activeKey}
    this.props.dispatch({
        type:'tab/addNewTab',
        payload:activeKeys
      });
  }

  onEdit = (targetKey) => {
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
        {this.props.pane.map(pane => <TabPane tab={pane.title} key={pane.key}><Content activeKey={this.props.activeKey}/></TabPane>)}
        </Tabs>
    );
  }

}

function mapStateToProps(state) {
    console.log(state)
    const {pane,activeKey} = state.tab;
    return {pane,activeKey};
}


export default connect(mapStateToProps)(Tab);
