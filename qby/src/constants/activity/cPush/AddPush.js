import React,{ Component } from 'react';
import { Form, Select, Input, Button , message, Row, Col, DatePicker, Radio, Checkbox } from 'antd';
import { createcPushApi,cpushInfoApi } from '../../../services/activity/cPush'
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
class Cpush extends Component {
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
      allUser:false,
      specialUser:false,
      info:{}
    }
  }
  //修改时初始化数据
  componentDidMount(){
    if(this.props.data){
      const id = this.props.data.bsPushId;
      cpushInfoApi({bsPushId:id})
      .then(res => {
        if(res.code == '0'){
          const info = res.bsPush;
          if(info.alertType == 10) info.bannerIdNum = info.alertTypeContent;
          if(info.alertType == 20) info.code = info.alertTypeContent;
          if(info.alertType == 30) info.H5Url = info.alertTypeContent;
          if(info.alertType == 40) info.textInfo = info.alertTypeContent;
          if(info.pushPerson == 0){
            info.pushPerson = null;
            info.pushPersonType = 0;
            this.setState({allUser:true,specialUser:false})
          }else{
            info.pushPersonType = 1;
            info.pushPerson = (info.pushPerson).replace(/-/g,'\n');
            this.setState({allUser:false,specialUser:true})
          }
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
  //判断推送时间哪个---disable
  isPushPerson =(e)=> {
    const values = e.target.value;
    if(values == 0){
      this.setState({allUser:true,specialUser:false})
    }else if(values == 1){
      this.setState({allUser:false,specialUser:true})
    };
    this.props.form.setFields({
      pushPerson:{ value:null },
    });
  }
  //判断推送类型哪个---disable
  isPushType =(values)=> {
    if(values == 10){
      this.setState({  bannerIdNum:true,code:false,H5Url:false,textInfo:false})
    }else if(values == 20){
      this.setState({  bannerIdNum:false,code:true,H5Url:false,textInfo:false})
    }else if(values == 30){
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
      if(values.pushPersonType!=1){
        values.pushPerson= 0
      }
      this.formatValue(values);
      if(values.pushPerson!=0){
        const userMobiles = values.pushPerson;
        const isMobileFalse = this.formatMobiles(userMobiles);
        if(isMobileFalse){
          message.error('一行只能输入一个手机号码',.8)
        }else{
          if(!err){
            this.submit(values);
          };
        };
      }else{
        this.submit(values);
      }
    });
  }
  formatMobiles =(userMobiles,values,err)=> { //保存--推送人群格式化
    let mobileArr = [];
    let isTrue = false;
    if(userMobiles.indexOf("\n")!=-1){
      mobileArr = userMobiles.split('\n');
      mobileArr.map((item,index)=>{
        if(item.length>11){
          isTrue = true;
        };
        return item;
      });
    }else{
      if(userMobiles.length>11){
        isTrue = true;
      };
    };
    return isTrue;
  }
  submit(values){
    createcPushApi(values)
    .then(res => {
      if(res.code=='0'){
        message.success(res.message);
        if(this.props.data){ //如果是修改才到列表历史页
          this.initChangeDeletestate();
          this.props.dispatch({
            type:'cPush/fetchList',
            payload:{...this.props.data.listParams}
          });
        }else{
          this.initDeletestate();
          this.props.dispatch({
            type:'cPush/fetchList',
            payload:{}
          });
        };
      };
    })
  }
  //保存
  //请求数据格式化
  formatValue(values){
    const { bannerIdNum,code,H5Url,textInfo } = values;
    let obj = Object.assign({},{bannerIdNum,code,H5Url,textInfo})
    for(var key in obj){
      if(obj[key]){ //推送内容格式化
          values.alertTypeContent = obj[key];
      };
    };
    if(values.pushPersonType == 0){
      values.pushPerson = 0
    }
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
    this.props.form.setFields({ //全部置为null
      bannerIdNum:{value:null},
      code:{value: null},
      H5Url:{value:null},
      textInfo:{value:null},
    });
  }
  //推送时间变化的时候
  choice =(e)=> {
    const values = e.target.value;
    this.isPushTime(values)
    if(this.props.data){
      this.props.form.setFields({ //设置都为null
        pushTime:{value:null}
      });
    }else{
      this.props.form.resetFields(['createTime','pushTime'])
    };
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
      pushPersonType
    } = this.state.info;
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
                      <DatePicker
                        showTime
                        format="YYYY-MM-DD HH:mm:ss"
                        disabled={!this.state.pushTime}/>
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
            <Row>
              <Col span={6}>
                <FormItem
                  label="推送人群"
                  labelCol={{ span: 3,offset: 1 }}
                  wrapperCol={{ span:6}}
                >
                {getFieldDecorator('pushPersonType', {
                  rules: [{ required: true, message: '请选择推送人群' }],
                  initialValue:isChange?pushPersonType:null
                })(
                  <RadioGroup onChange={this.isPushPerson}>
                    <Radio value={0}>全部用户</Radio>
                    <Radio value={1}>特定用户</Radio>
                  </RadioGroup>
                )}
                </FormItem>
              </Col>
              <Col span={6}>
                <FormItem>
                  {getFieldDecorator('allUser',{
                  })(
                    <div style={{height:'32px'}}></div>
                  )}
                </FormItem>
                <FormItem>
                  {getFieldDecorator('pushPerson',{
                    rules: [{ required: this.state.specialUser, message: '请输入特定用户'}],
                    initialValue:isChange?pushPerson:null
                  })(
                      <TextArea placeholder='少于1000行' disabled={!this.state.specialUser} rows={6}/>
                  )}
                </FormItem>
              </Col>
            </Row>
          	<FormItem wrapperCol={{ offset: 3}}>
            		<Button style={{marginRight:'100px'}} onClick={this.cancel}>取消</Button>
            		<Button type="primary" onClick={this.handleSubmit}>保存</Button>
          	</FormItem>
        	</Form>
      </div>
    )
  }
}
const Cpushs = Form.create()(Cpush);
function mapStateToProps(state){
  const { cPush } = state;
  return cPush
}

export default connect(mapStateToProps)(Cpushs);
