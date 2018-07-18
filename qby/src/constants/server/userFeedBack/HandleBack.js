import React, { Component } from 'react'
import {Form,Select,Button} from 'antd'
import {Row,Col} from 'antd'
import './index.css'
const FormItem = Form.Item;
const Option = Select.Option

class Handle extends Component{
  render(){
    const { getFieldDecorator }= this.props.form;
    return(
      <div className='detail'>
        <div className='container'>
          <p className='title'>用户反馈</p>
          <Row>
              <Col span={8}><p className='name'>反馈编号：　　YFFF21342344</p></Col>
              <Col span={8}><p className='name'>反馈用户：　　YFFF21342344</p></Col>
              <Col span={8}><p className='name'>用户电话：　　YFFF21342344</p></Col>
          </Row>
          <Row>
              <Col span={8}><p className='name'>反馈状态：　　YFFF21342344</p></Col>
              <Col span={8}><p className='name'>处理时长：　　YFFF21342344</p></Col>
              <Col span={8}><p className='name'>反馈时间：　　YFFF21342344</p></Col>
          </Row>
        </div>
        <div className='container'>
            <p className='title'>反馈内容</p>
            <div className='name'><span className='left'>反馈内容：</span><p className='ct content'>1111111111</p></div>
            <div className='name'><span className='left'>反馈图片：</span><p className='ct'>1111111111</p></div>
        </div>
        <div className='container'>
            <p className='title'>反馈处理</p>
            <div className='name'><span className='left'>反馈状态：</span>
              <p className='ct'  style={{width:'200px'}}>
                <Form>
                  <FormItem>
                    {getFieldDecorator('status')(
                      <Select allowClear={true} placeholder="处理时长" className='select'>
                          {/* <Option value='10'>待发货</Option> */}
                          <Option value='1'>'0-5h'</Option>
                          <Option value='2'>'5-24h'</Option>
                          <Option value='3'>'24h以上'</Option>
                      </Select>
                    )}
                  </FormItem>
                </Form>
              </p>
            </div>
            <div className='name'><span className='left'>反馈图片：</span><p className='ct'>1111111111</p></div>
        </div>
      </div>
    )
  }
}
const HandleBack = Form.create()(Handle)
export default HandleBack
