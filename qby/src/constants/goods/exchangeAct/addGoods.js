import React, { Component } from 'react';
import { connect } from 'dva';
import { Form,Button,Input } from 'antd';
import moment from 'moment';
import Upload from '../../../components/UploadImg/onlyOneImg';
const FormItem = Form.Item;


class AddGood extends  Component {
  constructor(props) {
    super(props);
  }
  componentDidMount(){

  }
  changeImg =(imageUrl)=> {

  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      	<Form className="addUser-form addcg-form operate-shop-form">
          	<div className='title'>基本信息</div>
              <FormItem
      					label="门店名称"
      					labelCol={{ span: 3,offset: 1 }}
      					wrapperCol={{ span: 6 }}>
      					{getFieldDecorator('name', {
      						rules: [{ required: true, message: '请输入门店名称'}],
      						initialValue:1
      					})(
      						<Input placeholder='请输入门店名称' autoComplete="off"/>
      					)}
      				</FormItem>
              <FormItem
      					label="零售价"
      					labelCol={{ span: 3,offset: 1 }}
      					wrapperCol={{ span: 6 }}>
      					{getFieldDecorator('n1ame', {
      						rules: [{ required: true, message: '请输入门店名称'}],
      						initialValue:2
      					})(
      						<Input placeholder='请输入门店名称' autoComplete="off"/>
      					)}
      				</FormItem>
              <FormItem
                  label="品牌图片"
                  labelCol={{ span: 5 }}
                  wrapperCol={{ span: 12 }}>
                  <Upload
                    name='imgFile'
                    action='/erpWebRest/qcamp/upload.htm?type=brand'
                    imageUrl = ''
                    changeImg = {this.changeImg}
                  />
              </FormItem>
              <FormItem
      					label="兑换所需货币数"
      					labelCol={{ span: 3,offset: 1 }}
      					wrapperCol={{ span: 6 }}>
      					{getFieldDecorator('na2me', {
      						rules: [{ required: true, message: '请输入门店名称'}],
      						initialValue:3
      					})(
      						<Input placeholder='请输入门店名称' autoComplete="off"/>
      					)}
      				</FormItem>
              <FormItem
      					label="可兑换数量"
      					labelCol={{ span: 3,offset: 1 }}
      					wrapperCol={{ span: 6 }}>
      					{getFieldDecorator('nam3e', {
      						rules: [{ required: true, message: '请输入门店名称'}],
      						initialValue:4
      					})(
      						<Input placeholder='请输入门店名称' autoComplete="off"/>
      					)}
      				</FormItem>
        </Form>
    )
  }
}
const AddGoods  = Form.create({})(AddGood);
export default AddGoods;
