import React , { Component } from 'react';
import { Input, InputNumber, Form, Select, Button, DatePicker, Modal, message } from 'antd';
import { connect } from 'dva';
import moment from 'moment';
import lodash from 'lodash';
import MoreEditTable from '../../../components/MoreEditTable';
import FrameModal from '../../../components/FrameModal';
import {
  getChangeFrameApi, getSaveApi
 } from '../../../../../../services/cConfig/homeConfiguration/bannerSet';
 import {
   linkOption,
   linkOptionTwo
 } from '../../../components/optionMap.js';
import './index.less';

class ModForm extends Component {
  constructor(props) {
    super(props);
    this.state={
      visible:false,
      loading:false,
      confirmLoading:false
    }
  }
  componentDidMount() {
    this.props.onRef(this);
  }
  //回调
  handleCallback=(dataSource)=> {
    this.props.dispatch({ type:'bannerSet/getGoodsList',payload:dataSource});
    this.props.form.resetFields()
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
    this.setState({ confirmLoading:true })
    const { currentItem } =this.state;
    const { activiKey, homepageModuleId } =this.props;
    let params = {
      ...currentItem,
      oldPosition:activiKey,
      newPosition:position,
      homepageModuleId:homepageModuleId
    }
    getChangeFrameApi(params)
    .then((res) => {
      if(res.code == 0) {
        message.success('变帧成功',1);
        this.handleDelete(currentItem);
      }
      this.setState({ confirmLoading:false })
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
        this.setState({ loading:true })
        getSaveApi(params)
        .then((res)=> {
          const { code } =res;
          if(code == 0) {
            message.success('保存成功',1);
            func&&typeof func == 'function'?func():this.successCallback();
          }
          this.setState({ loading:false })
        })
      }
    });
  }
  successCallback() {
    const { homepageModuleId, activiKey } =this.props;
    this.props.dispatch({
      type:'bannerSet/fetchList',
      payload:{
        position:activiKey,
        homepageModuleId:homepageModuleId,
      }
    })
  }
  //格式化
  formatParams(values) {
    let { goodsList } =this.props;
    goodsList.map((el,index) => {
      if(el.beginTime) {
        el.beginTime = moment(el.beginTime).format("YYYY-MM-DD HH:mm");
      }
    })
    return goodsList;
  }
  render() {
    let { goodsList, activiKey, categoryList, addKey } =this.props;
    const { visible, confirmLoading, loading } =this.state;
    const { form }= this.props;
    let optionSource = activiKey==1?linkOptionTwo:linkOption;
    return(
      <div className="banner-set-mod">
        <MoreEditTable
          addKey={addKey}
          onOperateClick={this.onOperateClick}
          callback={this.handleCallback}
          form={form}
          modName="banner"
          optionSource={optionSource}
          categoryList={categoryList}
          dataSource={goodsList}/>
        <div className="handle-btn-action">
          <Button
            loading={loading}
            onClick={this.submit}
            size="large"
            type="primary">
              保存
          </Button>
        </div>
        <FrameModal
          modName='banner'
          {...this.props}
          onOk={this.submitFrame}
          onCancel={this.onCancel}
          visible={visible}
          confirmLoading={confirmLoading}/>
      </div>
    )
  }
}
const Mod = Form.create({
  onValuesChange(props, changedFields, allFields) {
    let { goods } =allFields;
    let { goodsList } =props;
    // goods.map((el,index) => {
    //   for(var key in el) {
    //     if(el[key]&&typeof el[key] == 'string') {
    //       // el[key] = lodash.trim(el[key]);
    //       el[key] = el[key].replace(/\s/g,"");
    //     }
    //   }
    // })
    goodsList = goodsList.map((el,index) => {
      goods.map((item,idx) => {
        if(index == idx) {
          if(item.picUrl&&item.picUrl.response) {
            let file = item.picUrl;
            if(file.status == 'done') {
              item.picUrl = file.response.data[0];
            }
          } else if(item.picUrl instanceof Array) {
            item.picUrl = item.picUrl[0];
          }
          el ={...el,...item}
        }
      })
      return el;
    })
    props.dispatch({
      type:'bannerSet/getGoodsList',
      payload:goodsList
    })
  },
  // mapPropsToFields(props) {
  //   return {
  //     goods: Form.createFormField(props.goodsList),
  //   };
  // }
})(ModForm);
function mapStateToProps(state) {
  const { bannerSet } =state;
  return bannerSet;
}
export default connect(mapStateToProps)(Mod);
