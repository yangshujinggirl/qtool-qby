import React, { Component } from 'react';
import { Tabs, Button, Form, Modal } from 'antd';
import { connect } from 'dva';
import Mod from './components/Mod';
import './MorePicSet.less';

const FormItem = Form.Item;
const { TabPane } = Tabs;
class MorePicSet extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.dispatch({
      type:'morePicSet/fetchList',
      payload:{
        position:1,
        homepageModuleId:20,
      }
    })
  }
  onChange=(e)=> {
    let dom = e.target;
    let activiKey = dom.getAttribute("data-key");
    Modal.confirm({
      title: '请离开页面前保存当前操作?',
      content: 'Some descriptions',
      onOk:()=>{
        this.onOkToggle(activiKey);
      },
      onCancel:()=> {
        this.onCancelToggle(activiKey);
      },
    });
  }
  onOkToggle=(activiKey)=> {
    this.modDom.submit(()=>this.onCancel(activiKey));
  }
  onCancelToggle=(activiKey)=> {
    this.props.dispatch({
      type:'morePicSet/fetchList',
      payload:{
        position:activiKey,
        homepageModuleId:20,
      }
    })
  }
  render() {
    const { activiKey } =this.props;
    return(
      <div className="more-pic-set-pages">
        <div className="pic-tabs-wrap">
          <div className="lev-one-l">
            <div className="content-wrap">
              <div className={`lev-two-l ${activiKey==1?'activikey':''}`} data-key='1' onClick={this.onChange}>左1大图</div>
              <div className="lev-two-r">
                <p className={`con ${activiKey == 2?'activikey':''}`} data-key='2' onClick={this.onChange}>右1大图</p>
                <p className={`con ${activiKey == 3?'activikey':''}`} data-key='3' onClick={this.onChange}>右2大图</p>
              </div>
            </div>
          </div>
          <div className="lev-one-r">
            <p className="r-item">
              <span className="label">左一大图</span><br />
              图片尺寸为313*400px，格式为png、jpg。大小不能超过2m。只能上传一张。
            </p>
            <p className="r-item">
              <span className="label">左一大图</span><br />
              图片尺寸为313*400px，格式为png、jpg。大小不能超过2m。只能上传一张。
            </p>
            <p className="r-item">
              <span className="label">左一大图</span><br />
              图片尺寸为313*400px，格式为png、jpg。大小不能超过2m。只能上传一张。
            </p>
          </div>
        </div>
        <Mod
          onRef={(mod)=>{this.modDom = mod}}/>
      </div>
    )
  }
}
function mapStateToProps(state) {
  const { morePicSet } =state;
  return morePicSet;
}
export default connect(mapStateToProps)(MorePicSet);
