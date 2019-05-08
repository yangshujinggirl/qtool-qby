import React, { Component } from 'react';
import { connect } from 'dva';
import { Form,Button,Input,Row,Col,message} from 'antd';
import moment from 'moment';
import Upload from '../../../components/UploadImg/onlyOneImg';
import {addGoodsApi} from '../../../services/goodsCenter/exchangeAct/index'
const FormItem = Form.Item;
import './addGoods.less'


class AddGood extends  Component {
  constructor(props) {
    super(props);
    this.state={
      isLoading:false,
      imageUrl:'',
      infos:{
        name:'',
        price:'',
        valueQty:'',
        convertibleQty:'',
        leftQty:'',
        pdSpuActiveId:'',
      }
    }
  }
  componentDidMount(){
    if(this.props.data){
      const {infos} = this.props.data;
      const imageUrl = infos.picUrl;
      this.setState({infos,imageUrl})
    };
  }
  changeImg =(imageUrl)=> {
    this.setState({
      imageUrl
    });
  }
  cancel =()=> {
    let {componkey} = this.props;
    if(this.props.data){
      componkey = componkey+this.props.data.infos.pdSpuActiveId
    };
    this.props.dispatch({
      type:'tab/initDeletestate',
      payload:componkey
    });
  }
  handleSubmit =()=> {
    this.props.form.validateFieldsAndScroll((err,values)=>{
      if(!err){
        this.setState({isLoading:true});
        if(this.props.data){
          values.pdSpuActiveId = this.state.infos.pdSpuActiveId;
        };
        values.picUrl = this.state.imageUrl;
        addGoodsApi({pdSpuActive:values}).then(res=>{
          if(res.code=='0'){
            let {componkey} = this.props;
            if(this.props.data){
              message.success('修改成功');
              componkey = componkey+this.props.data.infos.pdSpuActiveId
            }else{
              message.success('新增成功')
            }
            this.props.dispatch({
              type:'tab/initDeletestate',
              payload:componkey
            });
            this.props.dispatch({
              type:'exchangeAct/fetchList',
              payload:{}
            });
            this.setState({isLoading:false})
          }else{
            this.setState({isLoading:false})
          };
        });
      };
    });
  }
  beforeUpload =(file)=> {
    const isJPG = file.type === 'image/jpeg'||'image.png';
    if (!isJPG) {
      message.error('仅支持jpg/jpeg/png格式',.8);
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('上传内容大于2M，请选择2M以内的文件',.8);
    }
    return isJPG && isLt2M;
  }
  render() {
    const {
      name,
      price,
      valueQty,
      convertibleQty,
      leftQty,
    } = this.state.infos;
    const { getFieldDecorator } = this.props.form;
    const {imageUrl,isLoading} = this.state;
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
      						initialValue:name
      					})(
      						<Input placeholder='请输入商品名称' maxLength='30' autoComplete="off"/>
      					)}
      				</FormItem>
              <FormItem {...formItemLayout} label="商品图片" className='must-pic'>
                  <Upload
                    name='imgFile'
                    action='/erpWebRest/qcamp/upload.htm?type=brand'
                    imageUrl = {imageUrl}
                    changeImg = {this.changeImg}
                    beforeUpload={this.beforeUpload}
                  />
              </FormItem>
              <FormItem {...formItemLayout} label="零售价">
      					{getFieldDecorator('price', {
      						rules: [
                    { required: true, message: '请输入零售价'},
                    { pattern:/^\d+(\.\d+)?$/,message:'只可输入正数' }
                  ],
      						initialValue:price
      					})(
      						<Input placeholder='请输入零售价' autoComplete="off"/>
      					)}
      				</FormItem>
              <FormItem {...formItemLayout} label="兑换所需货币数">
      					{getFieldDecorator('valueQty', {
      						rules: [
                    { required: true, message: '请输入兑换所需货币数'},
                    { pattern:/^[0-9]*$/,message:'只可输入正整数'}
                  ],
      						initialValue:valueQty
      					})(
      						<Input placeholder='请输入兑换所需货币数' autoComplete="off"/>
      					)}
      				</FormItem>
              <FormItem {...formItemLayout} label="可兑换数量">
      					{getFieldDecorator('convertibleQty', {
      						rules: [
                    {required: true, message: '请输入可兑换数量'},
                    {pattern:/^[0-9]*$/,message:'只可输入正整数'}
                  ],
      						initialValue:convertibleQty
      					})(
      						<Input placeholder='请输入可兑换数量' autoComplete="off" disabled={Boolean(this.props.data)}/>
      					)}
      				</FormItem>
              <FormItem {...formItemLayout} className='btn_cancel_save'>
                <Row type="flex" justify="space-around">
                  <Col offset={4}>
                    <Button onClick={this.cancel}>取消</Button>
                  </Col>
                  <Col>
                    <Button onClick={this.handleSubmit} loading={isLoading} type="primary">保存</Button>
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
