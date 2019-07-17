import React, { Component } from 'react';
import { connect } from 'dva';
import { Form,Button,Input,Row,Col,DatePicker,message,Select} from 'antd';
import moment from 'moment';
import Upload from '../../../components/UploadImg/onlyOneImg';
import {addThemeApi,updataThemeApi} from '../../../services/operate/themeAct/index'
const FormItem = Form.Item;
const TextArea = Input.TextArea;
const Option = Select.Option
import './index.less'


class AddTheme extends  Component {
  constructor(props) {
    super(props);
    this.state={
      isLoading:false,
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
    if(this.props.data.infos){
      const {infos} = this.props.data;
      const {pics} = infos;
      const pdSpuIds = infos.pdThemeActivityDetail;
      const tempArr = _.cloneDeep(pdSpuIds)
      let activityPdSpuIds='';
      tempArr.map((item,index)=>{
        if(index < (pdSpuIds.length-1) )
        item.pdSpuId = item.pdSpuId+'\n'
      });
      tempArr.map((item,index)=>{
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
    if(this.props.data.infos){
      let {themeActivityId} = this.props.data.infos
      this.props.dispatch({
        type:'tab/initDeletestate',
        payload:this.props.componkey+themeActivityId
      });
    }else{
      this.props.dispatch({
        type:'tab/initDeletestate',
        payload:this.props.componkey
      });
    }
  }
  handleSubmit =()=> {
    this.props.form.validateFieldsAndScroll((err,values)=>{
      if(!err){
        const {imageUrl} = this.state;
        if(imageUrl){
          const {time,..._values} = values;
          if(time && time[0]){
            _values.showTimeStart = moment(time[0]).format('YYYY-MM-DD HH:mm:ss')
            _values.showTimeEnd = moment(time[1]).format('YYYY-MM-DD HH:mm:ss')
          }
          const tempActivityPdSpuIds = values.activityPdSpuIds.split('\n').filter(item => item);
          for(var i=0;i<tempActivityPdSpuIds.length;i++){
            tempActivityPdSpuIds[i] = Number(tempActivityPdSpuIds[i])
          };
          _values.activityPdSpuIds = tempActivityPdSpuIds;
          _values.pics = imageUrl;
          this.setState({isLoading:true})
          if(this.props.data.infos){ //修改
            _values.themeActivityId = this.state.infos.themeActivityId;
            updataThemeApi(_values).then(res=>{
              if(res.code == '0'){
                message.success('修改成功');
                this.props.dispatch({
                  type:'tab/initDeletestate',
                  payload:this.props.componkey+this.props.data.infos.themeActivityId
                });
                this.props.dispatch({
                  type:'themeAct/fetchList',
                  payload:{...this.props.data.inputValues}
                });
                this.setState({isLoading:false})
              }else{
                this.setState({isLoading:false})
              };
            })
          }else{
            addThemeApi(_values).then(res=>{
              if(res.code=='0'){
                message.success('新增成功');
                this.props.dispatch({
                  type:'tab/initDeletestate',
                  payload:this.props.componkey
                });
                this.props.dispatch({
                  type:'themeAct/fetchList',
                  payload:{...this.props.data.inputValues}
                });
                this.setState({isLoading:false})
              }else{
                this.setState({isLoading:false})
              };
            });
          };
        }else{
          message.error('请添加商品图片')
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
    const {imageUrl,isLoading} = this.state;
    const {themeName,pageCode,remark} = this.state.infos;
    const formItemLayout = {
      labelCol: { span:3 },
      wrapperCol: { span:6 },
    };
    return (
      	<Form className="add_theme">
          	<div className='head_title'>基础信息</div>
              <FormItem {...formItemLayout}  label="主题活动名称">
      					{getFieldDecorator('themeName', {
      						rules: [{ required: true, message: '请输入主题活动名称，15字符以内'}],
      						initialValue:themeName
      					})(
      						<Input placeholder='请输入主题活动名称，15字符以内' maxLength='15' autoComplete="off"/>
      					)}
      				</FormItem>
              <FormItem {...formItemLayout}  label="主题活动副标题">
      					{getFieldDecorator('themeName2', {
      						rules: [{ required: true, message: '请输入主题活动副标题，15字符以内'}],
      						initialValue:themeName
      					})(
      						<Input placeholder='请输入主题活动副标题，15字符以内' maxLength='15' autoComplete="off"/>
      					)}
      				</FormItem>
              <FormItem {...formItemLayout}  label="主题活动状态">
      					{getFieldDecorator('themeName1', {
      						rules: [{ required: true, message: '请选择主题活动状态'}],
      						initialValue:themeName
      					})(
      						<Select>
                    <Option value={1}>上线</Option>
                    <Option value={2}>下线</Option>
                  </Select>
      					)}
      				</FormItem>    
              <FormItem {...formItemLayout} label="主题活动描述">
      					{getFieldDecorator('remark', {
                  initialValue:remark
      					})(
      						<TextArea rows='3' maxLength='50' placeholder='请输入主题活动名称，50字符以内'/>
      					)}
      				</FormItem>
              <FormItem {...formItemLayout} label="活动图片" className='must-pic'>
                <div className='home_pic'>
                  <Upload
                    name='imgFile'
                    action='/erpWebRest/qcamp/upload.htm?type=brand'
                    imageUrl = {imageUrl}
                    changeImg = {this.changeImg}
                    beforeUpload={this.beforeUpload}
                  />
                  <span>首页展示图片，图片尺寸为366*339，格式为jpg</span>
                </div>
                <div className='list_pic'>
                  <Upload
                    name='imgFile'
                    action='/erpWebRest/qcamp/upload.htm?type=brand'
                    imageUrl = {imageUrl}
                    changeImg = {this.changeImg}
                    beforeUpload={this.beforeUpload}
                  />
                  <span>列表页展示图片，图片尺寸为686*365，格式为jpg</span>
                </div>
              </FormItem>
              <FormItem {...formItemLayout}  label="跳转页面编码">
                {getFieldDecorator('pageCode', {
                  rules: [{ required: true, message: '请输入跳转页面编码'}],
                  initialValue:pageCode
                })(
                  <Input placeholder='请输入跳转页面编码' autoComplete="off"/>
                )}
              </FormItem>
              <FormItem {...formItemLayout} className='btn_cancel_save'>
                <Row type="flex" justify="space-around">
                  <Col offset={4}>
                    <Button onClick={this.cancel}>取消</Button>
                  </Col>
                  <Col>
                    <Button loading={isLoading} onClick={this.handleSubmit} type="primary">保存</Button>
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
