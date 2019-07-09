import React , { Component } from 'react';
import { Form, Button, Modal } from 'antd';
import { connect } from 'dva';
import moment from 'moment';
import BaseDelTable from '../../../components/BaseDelTable';
import {
  getSaveApi
 } from '../../../../../../services/cConfig/homeConfiguration/morePicSet';
import './index.less';
import { columns } from '../columns';

class ModForm extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.onRef(this);
  }
  //回调
  handleCallback=(dataSource)=> {
    this.props.dispatch({ type:'morePicSet/getGoodsList',payload:dataSource})
  }
  submit=()=> {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        values = this.formatParams(values);
        let params={
          homepageModuleId:this.props.homepageModuleId,
          position:this.props.activiKey,
          dataList:values
        }
        getSaveApi(params)
        .then((res)=> {

        })
      }
    });
  }
  //格式化
  formatParams() {
    const { goodsList } =this.props;
    goodsList.map((el,index) => {
      if(el.beginTime) {
        el.beginTime = moment(el.beginTime).format("YYYY-MM-DD");
      }
    })
    return goodsList;
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
    const { form }= this.props;
    let columnsTable = columns(form,this.handleChange);
    return(
      <div className="banner-set-mod">
        <BaseDelTable
          callback={this.handleCallback}
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
