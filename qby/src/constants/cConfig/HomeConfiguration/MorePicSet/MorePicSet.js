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
    const { homepageModuleId } =this.props.data;
    this.props.dispatch({
      type:'morePicSet/fetchList',
      payload:{
        position:1,
        homepageModuleId:homepageModuleId,
      }
    })
  }
  onChange=(e)=> {
    let dom = e.target;
    const { activiKey } =this.props;
    let keys = dom.getAttribute("data-key");
    if( activiKey == keys ) {
      return;
    }
    Modal.confirm({
      title: '温馨提示',
      content: '切换页面请确认保存',
      onOk:()=>{
        this.onOkToggle(keys);
      },
      onCancel:()=> {
        this.onCancelToggle(keys);
      },
    });
  }
  onOkToggle=(activiKey)=> {
    this.modDom.submit(()=>this.onCancelToggle(activiKey));
  }
  onCancelToggle=(activiKey)=> {
    const { homepageModuleId } =this.props.data;
    this.props.dispatch({
      type:'morePicSet/fetchList',
      payload:{
        position:activiKey,
        homepageModuleId:homepageModuleId,
      }
    })
  }
  render() {
    const { activiKey } =this.props;
    return(
      <div className="more-pic-set-pages common-modal-set-component">
        <div className="pic-tabs-wrap">
          <div className="lev-one-l">
            <div className="content-wrap">
              <div className={`lev-two-l ${activiKey==1?'activikey':''}`} data-key='1' onClick={this.onChange}>左一大图</div>
              <div className="lev-two-r">
                <p className={`con ${activiKey == 2?'activikey':''}`} data-key='2' onClick={this.onChange}>右上小图</p>
              <p className={`con ${activiKey == 3?'activikey':''}`} data-key='3' onClick={this.onChange}>右下小图</p>
              </div>
            </div>
          </div>
          <div className="lev-one-r">
            <p className="r-item">
              <span className="label">左一大图</span><br />
              图片尺寸为313*400px，格式为png、jpg。大小不能超过2m。只能上传一张。
            </p>
            <p className="r-item">
              <span className="label">右上小图</span><br />
              图片尺寸为357*144px，格式为png、jpg。大小不能超过2m。只能上传一张。
            </p>
            <p className="r-item">
              <span className="label">右下小图</span><br />
              图片尺寸为357*144px，格式为png、jpg。大小不能超过2m。只能上传一张。
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
