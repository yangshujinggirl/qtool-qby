import React, { Component } from 'react';
import { connect } from 'dva';
import { Form,Button,Input,Row,Col,DatePicker,message} from 'antd';
import moment from 'moment';
import Upload from '../../../components/UploadImg/onlyOneImg';
import {addThemeApi} from '../../../services/operate/themeAct/index'
const FormItem = Form.Item;
const TextArea = Input.TextArea;
const RangePicker = DatePicker.RangePicker
import './index.css'


class AddTheme extends  Component {
  constructor(props) {
    super(props);
    this.state={
      infos:{
        themeName:'',
        showTimeStart:moment().format('YYYY-MM-DD HH:mm:ss'),
        showTimeEnd:moment().add(1,'days').format('YYYY-MM-DD HH:mm:ss'),
        rank:'',
        pageCode:'',
        remark:'',
      },
      imageUrl:''
    }
  }
  componentDidMount(){
    if(this.props.data){
      const {infos} = this.props.data;
      const {pics} = infos;
      const pdSpuIds = infos.pdThemeActivityDetail;
      let activityPdSpuIds='';
      pdSpuIds.map((item,index)=>{
        if(index< (pdSpuIds.length-1) )
        item.pdSpuId = item.pdSpuId+'\n'
      });
      pdSpuIds.map((item,index)=>{
        activityPdSpuIds += item.pdSpuId
      });
      infos.activityPdSpuIds = activityPdSpuIds;
      this.setState({
        infos,
        imageUrl:pics
      });
    };
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
        const {imageUrl} = this.state;
        if(imageUrl){
          const {time,..._values} = values;
          if(time && time[0]){
            _values.showTimeStart = moment(time[0]).format('YYYY-MM-DD hh:mm:ss')
            _values.showTimeEnd = moment(time[1]).format('YYYY-MM-DD hh:mm:ss')
          }
          _values.activityPdSpuIds = values.activityPdSpuIds.split('\n');
          _values.pics = imageUrl;
          addThemeApi(_values).then(res=>{
            if(res.code=='0'){
              let {componkey} = this.props;
              if(!this.props.data){
                message.success('新增成功');
              }else{
                message.success('修改成功');
                componkey = componkey+this.props.data.infos.themeActivityId
              };
              this.props.dispatch({
                type:'themeAct/fetchList',
                payload:{}
              });
              this.props.dispatch({
                type:'tab/initDeletestate',
                payload:componkey
              });
            };
          });
        }else{
          message.error('请上传图片')
        };
      };
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
    const {themeName,showTimeStart,showTimeEnd,rank,pageCode,activityPdSpuIds,remark} = this.state.infos;
    const formItemLayout = {
      labelCol: { span:3 },
      wrapperCol: { span:6 },
    };
    return (
      	<Form className="add_theme">
          	<div className='head_title'>基础信息</div>
              <FormItem {...formItemLayout}  label="主题活动名称">
      					{getFieldDecorator('themeName', {
      						rules: [{ required: true, message: '请输入主题活动名称'}],
      						initialValue:themeName
      					})(
      						<Input placeholder='请输入主题活动名称' autoComplete="off"/>
      					)}
      				</FormItem>
              <FormItem {...formItemLayout} label="展示时间">
      					{getFieldDecorator('time', {
                  initialValue: [moment(showTimeStart, 'YYYY-MM-DD HH:mm:ss'), moment(showTimeEnd, 'YYYY-MM-DD HH:mm:ss')],
      						rules: [{ required: true, message: '请选择展示时间'}],
      					})(
      						<RangePicker
                    showTime
                    format='YYYY-MM-DD hh:mm:ss'
                  />
      					)}
      				</FormItem>
              <FormItem {...formItemLayout}  label="展示权重">
                {getFieldDecorator('rank', {
                  rules: [{ required: true, message: '请输入展示权重'}],
                  initialValue:rank
                })(
                  <Input placeholder='请输入展示权重' autoComplete="off"/>
                )}
              </FormItem>
              <FormItem {...formItemLayout} label="活动图片" className='must-pic'>
                <Upload
                  name='imgFile'
                  action='/erpWebRest/qcamp/upload.htm?type=brand'
                  imageUrl = {imageUrl}
                  changeImg = {this.changeImg}
                  beforeUpload={this.beforeUpload}
                />
              </FormItem>
              <FormItem {...formItemLayout}  label="跳转页面编码">
                {getFieldDecorator('pageCode', {
                  rules: [{ required: true, message: '请输入跳转页面编码'}],
                  initialValue:pageCode
                })(
                  <Input placeholder='请输入跳转页面编码' autoComplete="off"/>
                )}
              </FormItem>
              <FormItem {...formItemLayout} label="活动spuid">
      					{getFieldDecorator('activityPdSpuIds', {
                  initialValue:activityPdSpuIds,
                  rules: [{ required: true, message: '请输入活动spuid'}],
      					})(
      						<TextArea rows='5' placeholder='请输入活动spuid'/>
      					)}
      				</FormItem>
              <FormItem {...formItemLayout} label="备注">
      					{getFieldDecorator('remark', {
                  initialValue:remark
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
