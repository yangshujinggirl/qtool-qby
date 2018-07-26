import React , { Component } from 'react';
import { connect } from 'dva';
import { Button, Modal, Form, Input, Select, Card, Row, Col } from 'antd';
import UpLoadFile from '../components/UpLoadFile';
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
      visible:false
    }
  }
  componentWillMount() {
    this.props.dispatch({
      type:'countryManage/fetchList',
      payload:{}
    })
  }
  //新增
  addCountry() {
    this.setState({
      visible:true
    })
  }
  //修改
  editCountry(el) {
    const { fileDomain } =this.props.countryManage;
    el.fileList = [{
      url:`${fileDomain}${el.url}`,
      uid:el.pdCountryId,
      name: el.url,
      status: 'done',
    }]
    this.props.dispatch({
      type:'countryManage/editCountry',
      payload:el
    })
    this.setState({
      visible:true
    })
  }
  handleOk() {
    this.props.form.validateFields((err, values) => {
     if (!err) {
       let url = values.url;
       url = url.map(el=>(el.url));
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
  handleCancel =()=> {
    let countryDetail = {fileList:[]};
    this.props.dispatch({
      type:'countryManage/editCountry',
      payload:countryDetail
    })
    this.setState({
      visible:false
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { dataList, countryDetail, fileDomain } = this.props.countryManage;
    const { visible } =this.state;
    return(
      <div className="country-manage-components">
        <div className="handle-add-btn-wrp">
          <Button type="primary" onClick={()=>this.addCountry()}>新增国家</Button>
        </div>
        <div className="country-list">
          <Row wrap>
            {
              dataList.length>0&&dataList.map((el,index) => (
                <Col span={2} key={index} onClick={()=>this.editCountry(el)}>
                  <Card
                    className='card-item'
                    hoverable
                    cover={<img alt="example" src={el.url} />}>
                    <div className="theme-color country-name">{el.name}</div>
                  </Card>
                </Col>
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
              {...formItemLayout}>
              <UpLoadFile
                form={this.props.form}/>
            </FormItem>
            <FormItem
              label="国家名称"
              {...formItemLayout}>
              {getFieldDecorator('name', {
                rules: [{ required: true, message: 'Please input your Password!' }],
                initialValue:countryDetail.name
              })(
                <Input placeholder="Password" />
              )}
            </FormItem>
            <FormItem
              label="国家状态"
              {...formItemLayout}>
              {getFieldDecorator('status', {
                rules: [{ required: true, message: 'Please input your Password!' }],
                initialValue:countryDetail.status
              })(
                <Select placeholder="请选择">
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
