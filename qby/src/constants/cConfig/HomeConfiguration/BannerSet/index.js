import React, { Component } from 'react';
import { Tabs, Button, Form, Modal } from 'antd';
import { connect } from 'dva';
import Mod from './components/Mod';
import './index.less';

const FormItem = Form.Item;
const { TabPane } = Tabs;
const panes = [
  { title: '第一帧', key: '0' },
  { title: '第二帧', key: '1' },
  { title: '第三帧', key: '2'},
  { title: '第四帧', key: '3'},
  { title: '第五帧', key: '4'},
];
class BannerSet extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.dispatch({
      type:'bannerSet/fetchList',
      payload:{
        position:0,
        homepageModuleId:20,
      }
    })
  }
  onChange = activiKey => {
    Modal.confirm({
      title: '请离开页面前保存当前操作?',
      content: 'Some descriptions',
      onOk:()=>{
        this.modDom.submit(()=>this.upDateData(activiKey))
      },
      onCancel:()=> {
        this.upDateData(activiKey)
      },
    });
  };
  upDateData=(activiKey)=> {
    this.props.dispatch({
      type:'bannerSet/fetchList',
      payload:{
        position:activiKey,
        homepageModuleId:20,
      }
    })
  }
  render() {
    const { activiKey } =this.props;
    return(
      <div className="banner-set-pages">
        <div className="part-tabs">
          {
            panes.map((el,index) => (
              <p
                key={index}
                className={`tab-bar-item ${index==activiKey?'tab-bar-activity':''}`}
                onClick={()=>this.onChange(index)}>{el.title}</p>
            ))
          }
        </div>
        <Mod onRef={(mod)=>{this.modDom = mod}} activiKey={activiKey}/>
      </div>
    )
  }
}
function mapStateToProps(state) {
  const { bannerSet } =state;
  return bannerSet;
}
export default connect(mapStateToProps)(BannerSet);
