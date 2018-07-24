import React , { Component } from 'react';
import { Button, Modal, Form, Input, Select, Card, Row, Col } from 'antd';
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
  addCountry() {
    this.setState({
      visible:true
    })
  }
  handleOk() {

  }
  handleCancel() {
    this.setState({
      visible:false
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return(
      <div className="country-manage-components">
        <div className="handle-add-btn-wrp">
          <Button type="primary" onClick={()=>this.addCountry()}>新增国家</Button>
        </div>
        <div className="country-list">
          <Row wrap>
            <Col span={2}>
              <Card
                className='card-item'
                hoverable
                cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />} />
            </Col>
            <Col span={2}>
              <Card
                hoverable
                className='card-item'
                style={{ width: 105,height:105 }}
                cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />} />
            </Col>
            <Col span={2}>
              <Card
                hoverable
                className='card-item'
                style={{ width: 105,height:105 }}
                cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />} />
            </Col>
            <Col span={2}>
              <Card
                hoverable
                className='card-item'
                style={{ width: 105,height:105 }}
                cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />} />
            </Col>
          </Row>
        </div>
        <Modal
          title="Basic Modal"
          visible={this.state.visible}
          onOk={()=>this.handleOk()}
          onCancel={()=>this.handleCancel()}>
          <Form>
            <FormItem
              label="国家logo"
              {...formItemLayout}>
              {getFieldDecorator('logo', {
                rules: [{ required: true, message: 'Please input your username!' }],
              })(
                <Input  placeholder="Username" />
              )}
            </FormItem>
            <FormItem
              label="国家名称"
              {...formItemLayout}>
              {getFieldDecorator('name', {
                rules: [{ required: true, message: 'Please input your Password!' }],
              })(
                <Input placeholder="Password" />
              )}
            </FormItem>
            <FormItem
              label="国家状态"
              {...formItemLayout}>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: 'Please input your Password!' }],
              })(
                <Select placeholder="请选择">
                  <Option value='1'>启用</Option>
                  <Option value='2'>关闭</Option>
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
export default CountryManage;
