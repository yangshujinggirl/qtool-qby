import React,{ Component } from 'react';
import { Form, Select, Input, Button , message, Row, Col, DatePicker, Radio, Checkbox } from 'antd';
import { createBpushApi } from '../../../services/activity/bPush'
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
class AddCoupon extends Component {
  constructor(props){
    super(props);
    this.state = {
      componkey:this.props.componkey,
      createTime:false,
      pushTime:false,
      bannerIdNum:false,
      code:false,
      H5Url:false,
      textInfo:false
    }
  }
  //修改时初始化数据
  componentDidMount(){
    if(this.props.data){
      const id = this.props.data.bsPushId;
    }
  }
  initDeletestate(){
    this.props.dispath({
      type:'tab/initDeletestate',
      payload:this.props.componkey
    });
  }
  //保存
  handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
      this.formatValue(values);
      if(!err){
        createBpushApi(values)
        .then(res => {
          if(res.code=='0'){
            message.success(res.message);
            this.initDeletestate();
            this.props.dispath({
              type:'cPush/fetchList',
              payload:values
            });
          };
        })
      };
    });
  }
  formatValue(values){
    let obj = Object.assign({},values.bannerIdNum,values.code,values.H5Url,values.textInfo)
    for(var key in obj){
      if(obj[key]){
          values.alertTypeContent = obj[key];
      };
    };
    values.pushPerson = values.pushPerson.join('-');
    values.pushTime = moment(values.pushTime).format('YYYY-MM-DD HH:mm:ss');
    if(this.props.data){ //带入不同的推送状态
      values.status = this.props.data.status;
      values.bsPushId = this.props.data.bsPushId;
    }else{
      values.status = 10;
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
    if(value == 10){
      this.setState({  bannerIdNum:true,code:false,H5Url:false,textInfo:false})
    }else if(value == 20){
      this.setState({  bannerIdNum:false,code:true,H5Url:false,textInfo:false})
    }else if(value == 30){
      this.setState({  bannerIdNum:false,code:false,H5Url:true,textInfo:false})
    }else{
      this.setState({  bannerIdNum:false,code:false,H5Url:false,textInfo:true})
    };
    this.props.form.resetFields(['bannerIdNum','code','H5Url','textInfo'])
  }
  //推送时间变化的时候
  choice =(e)=> {
    const value = e.target.value;
    if(value == 1){
      this.setState({createTime:true,pushTime:false})
    }else if(value == 0){
      this.setState({createTime:false,pushTime:true})
    };
    this.props.form.resetFields(['createTime','pushTime'])
  }

  render(){
    const { getFieldDecorator } = this.props.form;
    const { cBanner } = this.props;
    const radioStyle = {
      display: 'block',
      height: '30px',
      lineHeight: '30px',
    };
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
                })(
                  <RadioGroup onChange={this.choice}>
                    <Radio value="1">立即推送</Radio>
                    <Radio value="0">定时推送</Radio>
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
              rules: [{ required: true, message: '请选择推送内容' }]
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
                  })(
                      <Input disabled={!this.state.bannerIdNum} autoComplete="off"/>
                  )}
                </FormItem>
                <FormItem>
                  {getFieldDecorator('code',{
                    rules: [{ required: this.state.code, message: '请输入商品编码' }],
                  })(
                      <Input disabled={!this.state.code} autoComplete="off"/>
                  )}
                </FormItem>
                <FormItem>
                  {getFieldDecorator('H5Url',{
                    rules: [{ required: this.state.H5Url, message: '请输入H5连接URL' }],
                  })(
                    <Input disabled={!this.state.H5Url} autoComplete="off"/>
                  )}
                </FormItem>
                <FormItem>
                  {getFieldDecorator('textInfo',{
                    rules: [{ required:this.state.textInfo, message: '请输入文本信息' }],
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
const AddcBanner = Form.create()(AddCoupon);
function mapStateToProps(state){
  const { bPush } = state;
  return bPush
}

export default connect(mapStateToProps)(AddcBanner);
