import React , { Component } from 'react';
import { Input, InputNumber, Form, Select, Button, DatePicker, Modal } from 'antd';
import { connect } from 'dva';
import moment from 'moment';
import BaseEditTable from '../BaseEditTable';
import './index.less';

class ModForm extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.onRef(this);
  }
  //回调
  handleCallback=(dataSource)=> {
    this.props.dispatch({ type:'bannerSet/getGoodsList',payload:dataSource})
  }
  //提交
  submit=(func)=> {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        values = this.formatParams(values);
        let params={
          homepageModuleId:'0',
          position:this.props.activiKey,
          dataList:values
        }
        console.log(params)
        func&&typeof func == 'function'&&func()
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
    let { goodsList } =this.props;
    return(
      <div className="banner-set-mod">
        <BaseEditTable
          btnText="商品"
          handleCallback={this.handleCallback}
          form={this.props.form}
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
  const { bannerSet } =state;
  return bannerSet;
}
export default connect(mapStateToProps)(Mod);
