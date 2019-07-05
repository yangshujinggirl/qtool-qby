import React , { Component } from 'react';
import { Input, InputNumber, Form, Select, Button, DatePicker, Modal } from 'antd';
import { connect } from 'dva';
import moment from 'moment';
import BaseEditTable from '../../../components/BaseEditTable0';
import FrameModal from '../../../components/FrameModal';
import {
  getChangeFrameApi, getSaveApi
 } from '../../../../../../services/cConfig/homeConfiguration/iconSet';
import './index.less';

class ModForm extends Component {
  constructor(props) {
    super(props);
    this.state={
      visible:false,
      confirmLoading:false
    }
  }
  componentDidMount() {
    this.props.onRef(this);
  }
  //回调
  handleCallback=(dataSource)=> {
    this.props.dispatch({ type:'iconSet/getGoodsList',payload:dataSource})
  }
  //表单事件
  onOperateClick=(record,type)=> {
    switch(type) {
      case 'frame':
        this.changeFrame(record);
        break;
      case 'delete':
        this.handleDelete(record);
        break;
    }
  }
  //删除
  handleDelete=(record)=> {
    let { goodsList } =this.props;
    goodsList = goodsList.filter(item => item.key !== record.key)
    this.handleCallback(goodsList)
  }
  //变帖
  changeFrame=(record)=> {
    this.setState({ visible:true, currentItem:record })
  }
  //提交变帧
  submitFrame=(position)=> {
    const { currentItem } =this.state;
    const { activiKey } =this.props;
    let params = {
      ...currentItem,
      oldPosition:activiKey,
      newPosition:position,
      homepageModuleId:this.props.homepageModuleId
    }
    getChangeFrameApi(params)
    .then((res) => {
      console.log(res)
    })
    this.onCancel()
  }
  onCancel=()=>{
    this.props.form.resetFields('frameNum');
    this.setState({ visible:false })
  }
  submit=(func)=> {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        values = this.formatParams(values);
        let params={
          homepageModuleId:this.props.homepageModuleId,
          position:this.props.activiKey,
          dataList:values
        }
        func&&typeof func == 'function'&&func();
        getSaveApi()
        .then((res)=> {
          func&&typeof func == 'function'&&func()
        })
      }
    });
  }
  //格式化
  formatParams(values) {
    let { goods } =values;
    goods.map((el,index) => {
      if(el.picUrl&&el.picUrl.length>0) {
        el.picUrl = el.picUrl[0];
      }
      if(el.beginTime) {
        el.beginTime = moment(el.beginTime).format("YYYY-MM-DD");
      }
    })
    return goods;
  }
  render() {
    let { goodsList, activiKey } =this.props;
    const { visible, confirmLoading } =this.state;
    const { form }= this.props;
    return(
      <div className="banner-set-mod">
        <BaseEditTable
          onOperateClick={this.onOperateClick}
          callback={this.handleCallback}
          form={form}
          modName="icon"
          dataSource={goodsList}/>
        <div className="handle-btn-action">
          <Button
            onClick={this.submit}
            size="large"
            type="primary">
              保存
          </Button>
        </div>
        <FrameModal
          {...this.props}
          onOk={this.submitFrame}
          onCancel={this.onCancel}
          visible={visible}
          modName="icon"
          confirmLoading={confirmLoading}/>
      </div>
    )
  }
}
const Mod = Form.create({
  mapPropsToFields(props) {
    return {
      goods: Form.createFormField(props.goodsList),
    };
  }
})(ModForm);
function mapStateToProps(state) {
  const { iconSet } =state;
  return iconSet;
}
export default connect(mapStateToProps)(Mod);;
