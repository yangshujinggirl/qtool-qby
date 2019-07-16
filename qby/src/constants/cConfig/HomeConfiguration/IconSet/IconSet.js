import React, { Component } from 'react';
import { Tabs, Button, Form, Modal } from 'antd';
import { connect } from 'dva';
import Mod from './components/Mod';
import TabsMod from '../components/TabsMod';


const FormItem = Form.Item;
const { TabPane } = Tabs;
const panes = [
  { title: '第一坑', key: '1' },
  { title: '第二坑', key: '2' },
  { title: '第三坑', key: '3'},
  { title: '第四坑', key: '4'},
];
class IconSet extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const { homepageModuleId } =this.props.data;
    this.props.dispatch({
      type:'iconSet/fetchList',
      payload:{
        position:1,
        homepageModuleId:homepageModuleId,
      }
    })
  }
  onOkToggle=(activiKey)=> {
    this.modDom.submit(()=>this.onCancel(activiKey));
  }
  onCancelToggle=(activiKey)=> {
    const { homepageModuleId } =this.props.data;
    this.props.dispatch({
      type:'iconSet/fetchList',
      payload:{
        position:activiKey,
        homepageModuleId:homepageModuleId,
      }
    })
  }
  render() {
    return(
      <div className="banner-set-pages">
        <TabsMod
          activiKey={this.props.activiKey}
          panes={panes}
          onOk={this.onOkToggle}
          onCancel ={this.onCancelToggle}/>
        <Mod
          onRef={(mod)=>{this.modDom = mod}}/>
      </div>
    )
  }
}
function mapStateToProps(state) {
  const { iconSet } =state;
  return iconSet;
}
export default connect(mapStateToProps)(IconSet);
