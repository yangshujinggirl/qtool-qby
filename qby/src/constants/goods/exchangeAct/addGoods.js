import React, { Component } from 'react';
import { connect } from 'dva';
import { Form,Button,Input,Row,Col} from 'antd';
import moment from 'moment';
import Upload from '../../../components/UploadImg/onlyOneImg';
import {addGoodsApi} from '../../../services/goodsCenter/exchangeAct/index'
const FormItem = Form.Item;
import './addGoods.less'


class AddGood extends  Component {
  constructor(props) {
    super(props);
    this.state={
      imageUrl:''
    }
  }
  componentDidMount(){

  }
  changeImg =(imageUrl)=> {
    this.setState({
      imageUrl
    });
  }
  cancel =()=> {
    this.props.dispatch({
      type:'tab/initDeletestate',
      payload:this.props.componkey
    });
  }
  handleSubmit =()=> {
    this.props.form.validateFieldsAndScroll((err,values)=>{
      if(!err){
        addGoodsApi(values).then(res=>{
          if(res.code=='0'){

          }
        })
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const {imageUrl} = this.state;
    const formItemLayout = {
      labelCol: { span:3 },
      wrapperCol: { span:6 },
    };
    return (
      	<Form className="exchangAct_addGood">
          	<div className='title'>基础信息</div>
              <FormItem {...formItemLayout}  label="商品名称">
      					{getFieldDecorator('name', {
      						rules: [{ required: true, message: '请输入商品名称'}],
      						initialValue:1
      					})(
      						<Input placeholder='请输入商品名称' autoComplete="off"/>
      					)}
      				</FormItem>
              <FormItem {...formItemLayout} label="品牌图片">
                {getFieldDecorator('picUrl', {
      						rules: [{ required: true, message: '请输入品牌图片'}],
      					})(
                  <Upload
                    name='imgFile'
                    action='/erpWebRest/qcamp/upload.htm?type=brand'
                    imageUrl = {imageUrl}
                    changeImg = {this.changeImg}
                  />
      					)}
              </FormItem>
              <FormItem {...formItemLayout} label="零售价">
      					{getFieldDecorator('price', {
      						rules: [{ required: true, message: '请输入零售价'}],
      						initialValue:2
      					})(
      						<Input placeholder='请输入零售价' autoComplete="off"/>
      					)}
      				</FormItem>
              <FormItem {...formItemLayout} label="兑换所需货币数">
      					{getFieldDecorator('valueQty', {
      						rules: [{ required: true, message: '请输入兑换所需货币数'}],
      						initialValue:3
      					})(
      						<Input placeholder='请输入门店名称' autoComplete="off"/>
      					)}
      				</FormItem>
              <FormItem {...formItemLayout} label="可兑换数量">
      					{getFieldDecorator('convertibleQty', {
      						rules: [{ required: true, message: '请输入可兑换数量'}],
      						initialValue:4
      					})(
      						<Input placeholder='请输入可兑换数量' autoComplete="off"/>
      					)}
      				</FormItem>
              <FormItem {...formItemLayout} className='btn_cancel_save'>
                <Row type="flex" justify="space-around">
                  <Col offset={4}>
                    <Button onClick={this.cancel}>取消</Button>
                  </Col>
                  <Col>
                    <Button onClick={this.handleSubmit} type="primary">保存</Button>
                  </Col>
                </Row>
              </FormItem>
        </Form>
    )
  }
}
const AddGoods  = Form.create({})(AddGood);
const mapStateToProps=(state)=>{
  const {exchangeAct} = state;
  return {exchangeAct}
}
export default connect(mapStateToProps)(AddGoods);
