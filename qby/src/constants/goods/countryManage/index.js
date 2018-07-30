import React , { Component } from 'react';
import { connect } from 'dva';
import { Button, Modal, Form, Input, Select, Card, Row, Col } from 'antd';
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
      countryDetail:{}
    }
  }
  componentDidMount() {
    this.props.dispatch({
      type:'countryManage/fetchList',
      payload:{},
    })
  }
  //新增
  addCountry() {
    this.setState({
      visible:true
    })
    this.props.dispatch({
      type:'countryManage/setImg',
      payload:null
    })
  }
  //修改
  editCountry(el) {
    this.setState({
      visible:true,
      countryDetail:el
    })
    this.props.dispatch({
      type:'countryManage/setImg',
      payload:el.url
    })
  }
  //提交
  handleOk() {
    this.props.form.validateFields((err, values) => {
     if (!err) {
       let url = values.url;
       url = url[0].name;
       values = {...values,url};
       this.saveCountry(values);
     }
   });
  }
  saveCountry(values) {
    goodSaveApi(values)
    .then(res => {
      const { code } =res;
      if(code == '0') {
        this.props.dispatch({
          type:'countryManage/fetchList',
          payload:{}
        })
        this.setState({visible:false})
      }
    },(error)=>{
      this.setState({visible:false})
    })
  }
  //取消
  handleCancel =()=> {
    this.setState({
      visible:false,
      countryDetail:{}
    })
    this.props.dispatch({
      type:'countryManage/setImg',
      payload:null
    })
  }
  validateLogo() {
    const { imgUrl } = this.props.countryManage;
    return imgUrl?'success':'error'
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { dataList } = this.props.countryManage;
    const { visible, countryDetail, imageUrl } =this.state;
    return(
      <div className="country-manage-components">
        <div className="handle-add-btn-wrp">
          <Button type="primary" onClick={()=>this.addCountry()}>新增国家</Button>
        </div>
        <div className="country-list">
          <Row wrap>
            {
              dataList.length>0&&dataList.map((el,index) => (
                <div key={index} onClick={()=>this.editCountry(el)} className="card-wrap">
                  <Card
                    className='card-item'
                    hoverable
                    cover={<img alt="example" src={el.url} />}>
                    <div className="theme-color country-name">{el.name}</div>
                  </Card>
                </div>
              ))
            }
          </Row>
        </div>
        <Modal
          title="Basic Modal"
          visible={visible}
          onOk={()=>this.handleOk()}
          onCancel={()=>this.handleCancel()}>
          <Form>
            <FormItem
              label="国家logo"
              {...formItemLayout}
              required={true}>
              <UpLoadFile />
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
                  <Select.Option value={2} value={2}>关闭</Select.Option>
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
