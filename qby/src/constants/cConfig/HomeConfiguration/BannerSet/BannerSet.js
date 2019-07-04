import React, { Component } from 'react';
import { Tabs, Button, Form } from 'antd';
import { connect } from 'dva';
import Mod from './components/Mod';
// import Mod from './components/MainMod';
import './BannerSet.less';

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
    this.state = {
      activeKey: panes[0].key,
      goodsList:[]
    };
  }
  onChange = activeKey => {
    this.setState({ activeKey });
    activeKey++;
    this.props.dispatch({
      type:'bannerSet/fetchList',
      payload:{
        position:activeKey,
        homepageModuleId:20,
      }
    })
  };
  submit=()=> {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }
  render() {
    const { activeKey } =this.state;
    const { goodsList } =this.props;
    return(
      <div className="banner-set-pages">
        <div className="part-tabs">
          {
            panes.map((el,index) => (
              <p
                key={index}
                className={`tab-bar-item ${index==activeKey?'tab-bar-activity':''}`}
                onClick={()=>this.onChange(index)}>{el.title}</p>
            ))
          }
        </div>
        <Mod
          submit={this.submit}
          activeKey={activeKey}
          goodsList={goodsList}/>
      </div>
    )
  }
}
function mapStateToProps(state) {
  const { bannerSet } =state;
  return bannerSet;
}
export default connect(mapStateToProps)(BannerSet);
// export default BannerSet;
