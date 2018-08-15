import React,{ Component } from 'react';
import { Tabs } from 'antd'
import { connect } from 'dva';
import AppBase from './appBase/index'
const TabPane = Tabs.TabPane;

class AppData extends Component{
  render(){
    return (
      <div className='content_box stock-tabs'>
        <Tabs defaultActiveKey="1" >
          <TabPane tab="基础数据" key="1">
            <AppBase/>
          </TabPane>
        </Tabs>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { appBase } = state;
  return {appBase};
}

export default connect(mapStateToProps)(AppData);
