import React, { Component } from 'react';
import { Tabs, Button, Form, Modal } from 'antd';
import { connect } from 'dva';
import Mod from './components/Mod';
import TabsMod from './components/TabsMod';
import './BannerSet.less';

const FormItem = Form.Item;
const { TabPane } = Tabs;
const panes = [
  { title: '第一帧', key: '1' },
  { title: '第二帧', key: '2' },
  { title: '第三帧', key: '3'},
  { title: '第四帧', key: '4'},
  { title: '第五帧', key: '5'},
];
class BannerSet extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.dispatch({
      type:'bannerSet/fetchList',
      payload:{
        position:1,
        homepageModuleId:20,
      }
    })
  }
  onOkToggle=(activiKey)=> {
    this.modDom.submit(()=>this.onCancel(activiKey));
  }
  onCancelToggle=(activiKey)=> {
    this.props.dispatch({
      type:'bannerSet/fetchList',
      payload:{
        position:activiKey,
        homepageModuleId:20,
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
          {...this.props}
          onRef={(mod)=>{this.modDom = mod}}/>
      </div>
    )
  }
}
const BannerSetF = Form.create({
  mapPropsToFields(props) {
    return {
      goods: Form.createFormField(props.goodsList),
    };
  }
})(BannerSet);
function mapStateToProps(state) {
  const { bannerSet } =state;
  return bannerSet;
}
export default connect(mapStateToProps)(BannerSetF);
