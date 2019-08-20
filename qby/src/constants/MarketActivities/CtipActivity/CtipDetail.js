import React , { Component } from 'react';
import { Collapse } from 'antd';
import DetailBase from './components/DetailBase';
import DetailDiscount from './components/DetailDiscount';
import DetailLog from './components/DetailLog';
import DetailGoods from './components/DetailGoods';
import DetailWebShow from './components/DetailWebShow';

const formItemLayout = {
     labelCol: 3,
     wrapperCol:20,
   };
const { Panel } = Collapse;

class CtipDetail extends Component {
  render() {
    return(
      <div>
        <Collapse accordion>
          <Panel header="活动信息" key="1">
            <DetailBase {...formItemLayout}/>
          </Panel>
          <Panel header="前端展示" key="2">
            <DetailWebShow  {...formItemLayout}/>
          </Panel>
          <Panel header="优惠内容" key="3">
            <DetailDiscount  {...formItemLayout}/>
          </Panel>
          <Panel header="活动商品" key="4">
            <DetailGoods  {...formItemLayout}/>
          </Panel>
          <Panel header="日志" key="5">
            <DetailLog  {...formItemLayout}/>
          </Panel>
        </Collapse>
      </div>
    )
  }
}

export default CtipDetail;
