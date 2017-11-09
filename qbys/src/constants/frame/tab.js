
import React from 'react';
import { Tabs, Button } from 'antd';
import { connect } from 'dva';
import Content from '../frame/content';
import '../../style/tab.css';

import Cgorder from '../cgorder/cgorder';
import Ctorder from '../ctorder/ctorder';
import Sporder from '../sporder/sporder';

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
        {
          this.props.pane.map(
            pane => 
            <TabPane tab={pane.title} key={pane.key} className='h10'>
                 {pane.content}
            </TabPane>
          )
        }
        </Tabs>
    );
  }
  onWindowResize = () =>{
    console.log(document.body.clientHeight);
  }

  componentDidMount() {
    window.addEventListener('resize', this.onWindowResize)
  }
  componentWillUnmount() {
      window.removeEventListener('resize', this.onWindowResize)
  }

}

function mapStateToProps(state) {
    console.log(state)
    const {pane,activeKey} = state.tab;
    return {pane,activeKey};
}


export default connect(mapStateToProps)(Tab);
