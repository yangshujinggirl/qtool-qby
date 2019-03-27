import React, { Component } from 'react';
import { connect } from 'dva';
import { Form,Button,Input,Row,Col,DatePicker} from 'antd';
import moment from 'moment';
import Upload from '../../../components/UploadImg/onlyOneImg';
const FormItem = Form.Item;
const TextArea = Input.TextArea;
const RangePicker = DatePicker.RangePicker


class AddTheme extends  Component {
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
    const { getFieldDecorator } = this.props.form;
    const {imageUrl} = this.state;
    const formItemLayout = {
      labelCol: { span:3 },
      wrapperCol: { span:6 },
    };
    return (
      	<Form className="add_theme">
          	<div className='title'>基础信息</div>
              <FormItem {...formItemLayout}  label="主题活动名称">
      					{getFieldDecorator('themeName', {
      						rules: [{ required: true, message: '请输入主题活动名称'}],
      						initialValue:1
      					})(
      						<Input placeholder='请输入主题活动名称' autoComplete="off"/>
      					)}
      				</FormItem>
              <FormItem {...formItemLayout} label="展示时间">
      					{getFieldDecorator('time', {
      						rules: [{ required: true, message: '请选择展示时间'}],
      					})(
      						<RangePicker
                    showTime
                    format='YYYY-MM-DD hh:mm:ss'
                  />
      					)}
      				</FormItem>
              <FormItem {...formItemLayout}  label="主题活动名称">
      					{getFieldDecorator('themeName', {
      						rules: [{ required: true, message: '请输入主题活动名称'}],
      						initialValue:1
      					})(
      						<Input placeholder='请输入主题活动名称' autoComplete="off"/>
      					)}
      				</FormItem>
              <FormItem {...formItemLayout}  label="展示权重">
                {getFieldDecorator('rank', {
                  rules: [{ required: true, message: '请输入展示权重'}],
                  initialValue:1
                })(
                  <Input placeholder='请输入展示权重' autoComplete="off"/>
                )}
              </FormItem>
              <FormItem {...formItemLayout} label="活动图片">
                {getFieldDecorator('picUrl', {
      						rules: [{ required: true, message: '请上传活动图片'}],
      					})(
                  <Upload
                    name='imgFile'
                    action='/erpWebRest/qcamp/upload.htm?type=brand'
                    imageUrl = {imageUrl}
                    changeImg = {this.changeImg}
                    beforeUpload={this.beforeUpload}
                  />
      					)}
              </FormItem>
              <FormItem {...formItemLayout}  label="跳转页面编码">
                {getFieldDecorator('name', {
                  rules: [{ required: true, message: '请输入跳转页面编码'}],
                  initialValue:1
                })(
                  <Input placeholder='请输入跳转页面编码' autoComplete="off"/>
                )}
              </FormItem>
              <FormItem {...formItemLayout} label="活动spuid">
      					{getFieldDecorator('price', {
      					})(
      						<TextArea rows='5' placeholder='请输入活动spuid'/>
      					)}
      				</FormItem>
              <FormItem {...formItemLayout} label="备注">
      					{getFieldDecorator('price', {
      					})(
      						<TextArea rows='3' placeholder='请输入备注'/>
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
const AddThemes  = Form.create({})(AddTheme);
const mapStateToProps=(state)=>{
  const {themeAct} = state;
  return {themeAct}
}
export default connect(mapStateToProps)(AddThemes);
