import React , { Component } from 'react';
import { Input, InputNumber, Form, Select, Button, DatePicker, Modal, message } from 'antd';
import { connect } from 'dva';
import moment from 'moment';
import MoreEditTable from '../../../components/MoreEditTable';
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
    this.props.dispatch({ type:'iconSet/getGoodsList',payload:dataSource});
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
        this.successCallback();
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
        if(!values.goods) {//空页面不进行保存
          func&&typeof func == 'function'?func():this.successCallback();
          return;
        }
        values = this.formatParams(values);
        let params={
          homepageModuleId:this.props.homepageModuleId,
          position:this.props.activiKey,
          dataList:values
        }
        this.setState({ loading:true })
        this.props.dispatch({ type: 'tab/loding', payload:true});
        getSaveApi(params)
        .then((res)=> {
          const { code } =res;
          if(code == 0) {
            message.success('保存成功',1);
            func&&typeof func == 'function'?func():this.successCallback();
          }
          this.setState({ loading:false })
          this.props.dispatch({ type: 'tab/loding', payload:false});
        })
      }
    });
  }
  successCallback() {
    const { homepageModuleId, activiKey } =this.props;
    this.props.dispatch({
      type:'iconSet/fetchList',
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
        el.beginTime = moment(el.beginTime).format("YYYY-MM-DD");
      }
    })
    return goodsList;
  }
  render() {
    let { goodsList, activiKey, categoryList } =this.props;
    const { visible, confirmLoading, loading } =this.state;
    const { form }= this.props;
    return(
      <div className="banner-set-mod">
        <MoreEditTable
          categoryList={categoryList}
          onOperateClick={this.onOperateClick}
          callback={this.handleCallback}
          form={form}
          modName="icon"
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
  onValuesChange(props, changedFields, allFields) {
    let { goods } =allFields;
    let { goodsList } =props;
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
      type:'iconSet/getGoodsList',
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
  const { iconSet } =state;
  return iconSet;
}
export default connect(mapStateToProps)(Mod);;
