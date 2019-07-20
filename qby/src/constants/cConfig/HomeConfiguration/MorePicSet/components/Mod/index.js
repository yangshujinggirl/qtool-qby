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
    this.state={
      loading:false
    }
  }
  componentDidMount() {
    this.props.onRef(this);
  }
  //回调
  handleCallback=(dataSource)=> {
    this.props.dispatch({ type:'morePicSet/getGoodsList',payload:dataSource});
    this.props.form.resetFields()
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
        this.setState({ loading:true });
        getSaveApi(params)
        .then((res)=> {
          if(res.code == 0) {
            func&&typeof func == 'function'?func():this.successCallback();
          }
          this.setState({ loading:false });
        })
      }
    });
  }
  //格式化
  formatParams() {
    let { goodsList } =this.props;
    goodsList.map((el,index) => {
      if(el.beginTime) {
        el.beginTime = moment(el.beginTime).format("YYYY-MM-DD HH:mm");
      }
    })
    return goodsList;
  }
  successCallback() {
    const { homepageModuleId, activiKey } =this.props;
    this.props.dispatch({
      type:'morePicSet/fetchList',
      payload:{
        position:activiKey,
        homepageModuleId:homepageModuleId,
      }
    })
  }
  render() {
    let { goodsList, activiKey } =this.props;
    const { form }= this.props;
    let columnsTable = columns(form);
    return(
      <div className="banner-set-mod">
        <BaseDelTable
          callback={this.handleCallback}
          columns={columnsTable}
          dataSource={goodsList}/>
        <div className="handle-btn-action">
          <Button
            loading={this.state.loading}
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
      type:'morePicSet/getGoodsList',
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
  const { morePicSet } =state;
  return morePicSet;
}
export default connect(mapStateToProps)(Mod);
