import React , { Component } from 'react';
import { connect } from 'dva';
import { Button, Modal, Form, Input, Select, Card, Row, Col, message } from 'antd';
import UpLoadFile from './UpLoadFile.js';
import { goodSaveApi } from '../../../services/goodsCenter/countryManage.js';

import './index.less';

const FormItem = Form.Item;
const formItemLayout = {
      labelCol: {
        span: 5
      },
      wrapperCol: {
        span: 12
      },
  };

class CountryManageForm extends Component {
  constructor(props) {
    super(props);
    this.state={
      visible:false,
      pdCountryId:'',
      countryDetail:{},
      errorText:''
    }
  }
  componentDidMount() {
    this.initPage()
  }
  initPage() {
    const { rolelists=[] } =this.props.data;
    this.props.dispatch({
      type:'countryManage/fetchList',
      payload:{},
    })
    this.props.dispatch({
      type:'countryManage/setAuthority',
      payload:rolelists,
    })
  }
  //新增
  addCountry() {
    this.props.form.resetFields();
    this.setState({
      visible:true,
      pdCountryId:''
    })
  }
  //修改
  editCountry(el) {
    if(!this.props.countryManage.authorityList.authorityEdit) {
      return;
    }
    this.setState({
      countryDetail:{
        name:el.name,
        status:el.status,
      },
      pdCountryId:el.pdCountryId,
      visible:true,
    })
    this.props.dispatch({
      type:'countryManage/setFileList',
      payload:el.url
    })
  }
  //取消
  handleCancel =()=> {
    //重置表单
    this.props.form.resetFields();
    this.setState({
      visible:false,
      countryDetail:{}
    })
    this.props.dispatch({
      type:'countryManage/setFileList',
      payload:null
    })
  }
  validateLogo(imageUrl) {
    let errorText;
    let status;
    if(!imageUrl) {
      errorText='请上传国家Logo';
      status = false;
    } else {
      errorText='';
      status = true;
    }
    this.setState({
      errorText
    })
    return status;
  }
  //提交
  handleOk() {
    this.props.form.validateFields((err, values) => {
     if (!err&&this.validateLogo(this.props.countryManage.imageUrl)) {
       values = {...values, ...{ url:this.props.countryManage.imageUrl }};
       this.saveCountry(values);
     }
   });
  }
  saveCountry(values) {
    let message = '';
    if(this.state.pdCountryId!== '') {
      values = {...values,...{pdCountryId:this.state.pdCountryId}};
      message='修改成功'
    } else {
      message='新增成功'
    }
    goodSaveApi(values)
    .then(res => {
      const { code } =res;
      if(code == '0') {
        this.props.dispatch({
          type:'countryManage/fetchList',
          payload:{}
        })
        message.success(message)
        this.handleCancel()
      } else {
        this.handleCancel()
      }
    },(error)=>{
      this.handleCancel()
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { data, authorityList, fileDomain } = this.props.countryManage;
    const { visible, countryDetail, pdCountryId, errorText } =this.state;
    let title = pdCountryId?'修改国家':'新增国家';
    return(
      <div className="country-manage-components">
        {
          authorityList.authorityEdit&&
          <div className="handle-add-btn-wrp">
            <Button
              size="large"
              type="primary"
              onClick={()=>this.addCountry()}>新增国家</Button>
          </div>
        }
        <div className="country-list">
          <Row wrap>
            {
              data.dataList.length>0&&data.dataList.map((el,index) => (
                <div key={index} onClick={()=>this.editCountry(el)} className="card-wrap">
                  <Card
                    className={`${authorityList.authorityEdit?'card-item':'card-item disabled'}`}
                    hoverable
                    cover={<img alt="example" src={`${fileDomain}${el.url}`} />}>
                    <div className="theme-color country-name">{el.name}</div>
                  </Card>
                </div>
              ))
            }
          </Row>
        </div>
        <Modal
          className='country-modal-content'
          title={title}
          visible={visible}
          onOk={()=>this.handleOk()}
          onCancel={()=>this.handleCancel()}>
          <Form>
            <FormItem
              label="国家图片" {...formItemLayout}
              required={true}>
              <UpLoadFile validateLogo={this.validateLogo.bind(this)}/>
              <div className="ant-form-explain-error">{errorText}</div>
            </FormItem>
            <FormItem
              label="国家名称"
              {...formItemLayout}>
              {getFieldDecorator('name', {
                rules: [{ required: true, message: '请输入国家名称' }],
                initialValue:countryDetail.name
              })(
                <Input placeholder="请输入国家名称" autoComplete="off"/>
              )}
            </FormItem>
            <FormItem
              label="国家状态"
              {...formItemLayout}>
              {getFieldDecorator('status', {
                rules: [{ required: true, message: '请选择状态' }],
                initialValue:countryDetail.status
              })(
                <Select placeholder="请选择" autoComplete="off">
                  <Select.Option value={1} key={1}>启用</Select.Option>
                  <Select.Option value={0} value={0}>关闭</Select.Option>
                </Select>
              )}
            </FormItem>
          </Form>
        </Modal>
      </div>
    )
  }
}
const CountryManage = Form.create()(CountryManageForm);
function mapStateToProps(state) {
  const { countryManage } =state;
  return {countryManage };
}
export default connect(mapStateToProps)(CountryManage);
