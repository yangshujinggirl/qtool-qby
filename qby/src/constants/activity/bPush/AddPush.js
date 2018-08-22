import React,{ Component } from 'react';
import { Form, Select, Input, Button , message, Row, Col, DatePicker, Radio, Checkbox } from 'antd';
import { createBpushApi,bpushInfoApi } from '../../../services/activity/bPush'
import { connect } from 'dva'
import './index'
import moment from 'moment'
const FormItem = Form.Item;
const Option = Select.Option;
const TextArea = Input.TextArea;
const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;
const options = [
  { label: '店主', value: '1' },
  { label: '店长', value: '2' },
  { label: '店员', value: '3' },
];;
class Bpush extends Component {
  constructor(props){
    super(props);
    this.state = {
      componkey:this.props.componkey,
      createTime:false,
      pushTime:false,
      bannerIdNum:false,
      code:false,
      H5Url:false,
      textInfo:false,
      info:{}
    }
  }
  //修改时初始化数据
  componentDidMount(){
    if(this.props.data){
      const id = this.props.data.bsPushId;
      bpushInfoApi({bsPushId:id})
      .then(res => {
        if(res.code == '0'){
          const info = res.bsPush;
          if(info.alertType == 10){
            info.bannerIdNum = info.alertTypeContent;
          }else if(info.alertType == 20){
            info.code = info.alertTypeContent;
          }else if(info.alertType == 30){
            info.H5Url = info.alertTypeContent;
          }else if(info.alertType == 40){
            info.textInfo = info.alertTypeContent;
          };
          info.pushPerson = info.pushPerson.split('-');
          this.isPushTime(info.pushNow)
          this.isPushType(info.alertType);
          this.setState({info});
        };
      })
    };
  }
  //判断推送时间哪个---disable
  isPushTime =(value)=> {
    if(value== 1){
      this.setState({createTime:true,pushTime:false})
    }else if(value == 0){
      this.setState({createTime:false,pushTime:true})
    };
  }
  //判断推送类型哪个---disable
  isPushType =(value)=> {
    if(value == 10){
      this.setState({  bannerIdNum:true,code:false,H5Url:false,textInfo:false})
    }else if(value == 20){
      this.setState({  bannerIdNum:false,code:true,H5Url:false,textInfo:false})
    }else if(value == 30){
      this.setState({  bannerIdNum:false,code:false,H5Url:true,textInfo:false})
    }else{
      this.setState({  bannerIdNum:false,code:false,H5Url:false,textInfo:true})
    };
  }
  initDeletestate =()=> {
    this.props.dispatch({
      type:'tab/initDeletestate',
      payload:this.props.componkey
    });
  }
  initChangeDeletestate(){
    const componkey = this.props.componkey+this.props.data.bsPushId;
    this.props.dispatch({
        type:'tab/initDeletestate',
        payload:componkey
    });
  }
  //保存
  handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
      this.formatValue(values);
      if(!err){
        this.submit(values); //请求
      };
    });
  }
  submit(values){
    createBpushApi(values)
    .then(res => {
      if(res.code=='0'){
        message.success(res.message);
        if(this.props.data){ //如果是修改才到列表历史页
          this.initChangeDeletestate();
          this.props.dispatch({
            type:'bPush/fetchList',
            payload:{...this.props.data.listParams}
          });
        }else{
          this.initDeletestate();
          this.props.dispatch({
            type:'bPush/fetchList',
            payload:{}
          });
        }
      };
    })
  }
  //请求数据格式化
  formatValue(values){
    let obj = Object.assign({},values.bannerIdNum,values.code,values.H5Url,values.textInfo)
    for(var key in obj){
      if(obj[key]){
          values.alertTypeContent = obj[key];
      };
    };
    if(values.pushPerson.length>1){
      values.pushPerson = values.pushPerson.join('-');
    };
    if(this.props.data){ //带入不同的推送状态
      values.status = this.props.data.status;
      values.bsPushId = this.props.data.bsPushId;
    }else{
      values.status = 10;
    };
    if(values.pushTime){
      values.pushTime = moment(values.pushTime).format('YYYY-MM-DD HH:mm:ss')
    };
  }
  //取消
  cancel =()=> {
    if(this.props.data){
      const componkey = this.props.componkey+this.props.data.bsPushId;
      this.props.dispatch({
          type:'tab/initDeletestate',
          payload:componkey
      });
    }else{
      this.initDeletestate();
    };
  }
  //推送类型变化的时候
  typeChange =(e)=> {
    const value = e.target.value;
    this.isPushType(value);
    this.props.form.resetFields(['bannerIdNum','code','H5Url','textInfo'])
  }
  //推送时间变化的时候
  choice =(e)=> {
    const value = e.target.value;
    this.isPushTime(value)
    this.props.form.resetFields(['createTime','pushTime'])
  }

  render(){
    const { getFieldDecorator } = this.props.form;
    const radioStyle = {
      display: 'block',
      height: '30px',
      lineHeight: '30px',
    };
    const isChange = Boolean(this.props.data);
    const {
      title,
      pushNow,
      pushTime,
      msgContent,
      alertType,
      bannerIdNum,
      code,
      H5Url,
      textInfo,
      pushPerson,
    } = this.state.info;
    console.log(pushPerson)
    return(
      <div className='addpush'>
        	<Form className="addUser-form operatebanner-form">
            <FormItem
              label="推送主题"
              labelCol={{ span: 3,offset: 1 }}
              wrapperCol={{ span: 9 }}
            >
              {getFieldDecorator('title', {
                  rules: [{ required: true, message: '请输入推送主题'}],
                  initialValue:isChange?title:null
                })(
                  <Input placeholder="请输入10字以内推送主题" maxLength='10' autoComplete="off"/>
              )}
            </FormItem>
            <Row>
              <Col span={6}>
                <FormItem
                  label="推送时间"
                  labelCol={{ span: 3,offset: 1 }}
                  wrapperCol={{ span:6}}
                >
                {getFieldDecorator('pushNow', {
                  rules: [{ required: true, message: '请选择推送时间' }],
                  initialValue:isChange?pushNow:null
                })(
                  <RadioGroup onChange={this.choice}>
                    <Radio value={1}>立即推送</Radio>
                    <Radio value={0}>定时推送</Radio>
                  </RadioGroup>
                )}
                </FormItem>
              </Col>
              <Col span={6}>
                <FormItem>
                  {getFieldDecorator('createTime',{
                  })(
                    <div style={{height:'32px'}}></div>
                  )}
                </FormItem>
                <FormItem>
                  {getFieldDecorator('pushTime',{
                    rules: [{ required: this.state.pushTime, message: '请输入定时推送时间'}],
                    initialValue:isChange&&this.state.info.pushTime?moment(pushTime, 'YYYY-MM-DD HH:mm:ss'):null
                  })(
                      <DatePicker  showTime format="YYYY-MM-DD HH:mm:ss" disabled={!this.state.pushTime}/>
                  )}
                </FormItem>
              </Col>
            </Row>
            <FormItem
              label='推送内容'
              labelCol={{ span: 3,offset: 1 }}
              wrapperCol={{ span: 9 }}
            >
            {getFieldDecorator('msgContent', {
              rules: [{ required: true, message: '请选择推送内容' }],
              initialValue:isChange?msgContent:null
            })(
                <TextArea placeholder='请输入30字以下推送内容' maxLength='30' rows={6} />
            )}
            </FormItem>
            <Row>
              <Col span={6}>
                <FormItem
                  label="推送类型"
                  labelCol={{ span: 3,offset: 1 }}
                  wrapperCol={{ span: 8 }}
                >
                  {getFieldDecorator('alertType',{
                      rules: [{ required: true, message: '请选择推送类型' }],
                      initialValue:isChange?alertType:null
                  })(
                    <RadioGroup  onChange={this.typeChange}>
                      <Radio style={radioStyle} value={10}>banner id</Radio>
                      <Radio style={radioStyle} value={20}>商品编码</Radio>
                      <Radio style={radioStyle} value={30}>H5连接URL</Radio>
                      <Radio style={radioStyle} value={40}>文本信息</Radio>
                    </RadioGroup>
                  )}
                </FormItem>
            </Col>
            <Col span={6}>
                <FormItem>
                  {getFieldDecorator('bannerIdNum',{
                    rules: [{ required: this.state.bannerIdNum, message: '请输入bannerid' }],
                    initialValue:isChange?bannerIdNum:null
                  })(
                      <Input disabled={!this.state.bannerIdNum} autoComplete="off"/>
                  )}
                </FormItem>
                <FormItem>
                  {getFieldDecorator('code',{
                    rules: [{ required: this.state.code, message: '请输入商品编码' }],
                    initialValue:isChange?code:null
                  })(
                      <Input disabled={!this.state.code} autoComplete="off"/>
                  )}
                </FormItem>
                <FormItem>
                  {getFieldDecorator('H5Url',{
                    rules: [{ required: this.state.H5Url, message: '请输入H5连接URL' }],
                    initialValue:isChange?H5Url:null
                  })(
                    <Input disabled={!this.state.H5Url} autoComplete="off"/>
                  )}
                </FormItem>
                <FormItem>
                  {getFieldDecorator('textInfo',{
                    rules: [{ required:this.state.textInfo, message: '请输入文本信息' }],
                    initialValue:isChange?textInfo:null
                  })(
                    <TextArea disabled={!this.state.textInfo} placeholder='请输入30字以下推送内容' maxLength='30' rows={6} />
                  )}
                </FormItem>
              </Col>
            </Row>
            <FormItem
              label="推送人群"
              labelCol={{ span: 3,offset: 1 }}
              wrapperCol={{ span: 9 }}
            >
              {getFieldDecorator('pushPerson',{
                  rules: [{ required: true, message: '请输入推送人群'}],
                  initialValue:isChange?pushPerson:null
              })(
                <CheckboxGroup options={options} />
              )}
            </FormItem>
          	<FormItem wrapperCol={{ offset: 3}}>
            		<Button style={{marginRight:'100px'}} onClick={this.cancel}>取消</Button>
            		<Button type="primary" onClick={this.handleSubmit}>保存</Button>
          	</FormItem>
        	</Form>
      </div>
    )
  }
}
const Bpushs = Form.create()(Bpush);
function mapStateToProps(state){
  const { bPush } = state;
  return bPush
}

export default connect(mapStateToProps)(Bpushs);
