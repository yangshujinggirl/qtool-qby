import React , { Component } from 'react';
import { Input, InputNumber, Form, Select, Button, DatePicker, Modal } from 'antd';
import { connect } from 'dva';
import moment from 'moment';
import BaseEditTable from '../BaseEditTable';
import FrameModal from '../../../components/FrameModal';
import {
  getChangeFrameApi, getSaveApi
 } from '../../../../../../services/cConfig/homeConfiguration/moreGoodsSet';
import './index.less';
import { columns } from '../columns';

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
    this.props.dispatch({ type:'morePicSet/getGoodsList',payload:dataSource})
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
  //表单change
  handleChange=(type,name,e,index)=> {
    let value;
    switch(type) {
      case 'input':
        value = e.target.value;
        break;
      case 'select':
        value = e;
        break;
      case 'fileList':
        value = e;
        break;
    }
    let { goodsList } =this.props;
    if(!value) {
      goodsList[index][name]=null;
    } else {
      goodsList[index][name]=value;
    }
    this.handleCallback(goodsList)
  }
  render() {
    let { goodsList, activiKey } =this.props;
    const { visible, confirmLoading } =this.state;
    const { form }= this.props;
    let columnsTable = columns(form,this.handleChange);
    return(
      <div className="banner-set-mod">
        <BaseEditTable
          callback={this.handleCallback}
          form={form}
          columns={columnsTable}
          dataSource={goodsList}/>
        <div className="handle-btn-action">
          <Button
            onClick={this.submit}
            size="large"
            type="primary">
              保存
          </Button>
        </div>
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
  const { morePicSet } =state;
  return morePicSet;
}
export default connect(mapStateToProps)(Mod);
