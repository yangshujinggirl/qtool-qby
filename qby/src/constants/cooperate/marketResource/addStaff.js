import React, { Component} from 'react'
import { Form, Select, Input, Button, message, Upload, Icon} from 'antd'
import {connect} from 'dva'
import { resourceDetailApi, addStaffApi  } from '../../../services/cooperate/marketResource'
import UpLoadImg from '../../../components/UploadImg/index.js';
import './index.less'
const FormItem = Form.Item;
const TextArea = Input.TextArea;
const Option = Select.Option;
const formItemLayout = {
  labelCol: {span:6},
  wrapperCol: {span:8}
}

class AddStaff extends Component{
  constructor(props){
    super(props);
    this.state={
      fileList:[],
      DescArr:null,
      fileds:null
    }
  }
  //确认添加
  save =()=> {
    this.props.form.validateFieldsAndScroll((err,values) => {
      if(!err){
        this.submit(values)
      }
    })
  }
  submit(values){
    addStaffApi(values)
    .then(res=>{
      message.successs('成功')
    },err=>{
      message.error('失败')
    })
  }
  //取消
  cancel =()=> {
    console.log(this.props)
    this.props.dispatch({
				type:'tab/initDeletestate',
				payload:this.props.componkey
		});
  }
  //添加图片
  addImg(){

  }

  componentDidMount(){
    console.log(this.props)
    if(this.props.data){
      const marketResId = {marketResId:this.props.data.marketResId};
      resourceDetailApi(marketResId)
      .then(res => {
        if(res.code=='0'){
          debugger
          this.setState({
            fields:res.marketRes,
            DescArr:JSON.parse(res.marketRes.content)
          })
        }
      },err=>{

      })
    }
  }
  //添加文本
  addText =()=>{
    let { addText } =this.state;
    addText.push('tesssxt')
    this.setState({
      addText
    });
  }

  render(){
    const { getFieldDecorator } = this.props.form;
    const listDate = this.state.fields;
    console.log(listDate)
    const DescArr = this.state.DescArr;
    console.log(DescArr)
    return(
      <div className='addStaff'>
        <Form>
          <FormItem
            {...formItemLayout}
            label='联系人'
          >
            {
              getFieldDecorator('name', {
                rules: [{ required: true, message: '请输入联系人'}],
                initialValue:listDate?listDate.name:null
              })(
                <Input
                  placeholder='请输入16字以下的联系人'
                  maxLength='16'
                  autoComplete="off"/>
              )
            }
          </FormItem>
          <FormItem
            {...formItemLayout}
            label='联系电话'
          >
            {
              getFieldDecorator('mobile', {
                rules: [{ required: true, message: '请输入联系电话'}],
                initialValue:listDate?listDate.mobile:null
              })(
                <Input placeholder='请输入16字以下的联系电话' maxLength='16' autoComplete="off"/>
              )
            }
          </FormItem>
          <FormItem
            {...formItemLayout}
            label='资源类型'
          >
            {
              getFieldDecorator('marketTypeId', {
                rules: [{ required: true, message: '请选择资源类型'}],
                initialValue:listDate?listDate.marketTypeId:null
              })(
                <Select placeholder="请选择资源类型">
                  <Option value="0">供应商</Option>
                  <Option value="10">媒体</Option>
                  <Option value="20">品牌商</Option>
                  <Option value="30">KOl</Option>
                  <Option value="21">其他</Option>
                </Select>
              )
            }
          </FormItem>
          <FormItem
            {...formItemLayout}
            label='联系微信'
          >
            {
              getFieldDecorator('wechat', {
                initialValue:listDate?listDate.wechat:null
              })(
                <Input
                  placeholder='请输入32字以下的联系微信'
                  maxLength='32'
                  autoComplete="off"/>
              )
            }
          </FormItem>
          <FormItem
            {...formItemLayout}
            label='联系邮箱'
          >
            {
              getFieldDecorator('email', {
                initialValue:listDate?listDate.email:null
              })(
                <Input
                  placeholder='请输入64字以下的联系邮箱'
                  maxLength='64'
                  autoComplete="off"/>
              )
            }
          </FormItem>
          <FormItem
            {...formItemLayout}
            label='公司全称'
          >
            {
              getFieldDecorator('company', {
                initialValue:listDate?listDate.company:null
              })(
                <Input
                  placeholder='请输入32字以下的公司名称'
                  maxLength='32'
                  autoComplete="off"/>
              )
            }
          </FormItem>
          <FormItem
            {...formItemLayout}
            label='公司简称'
          >
            {
              getFieldDecorator('companyShort', {
                initialValue:listDate?listDate.companyShort:null
              })(
                <Input
                  placeholder='请输入32字以下的公司简称'
                  maxLength='32'
                  autoComplete="off"/>
              )
            }
          </FormItem>
          <FormItem
            {...formItemLayout}
            label='所在部门'
          >
            {
              getFieldDecorator('department', {
                initialValue:listDate?listDate.department:null
              })(
                <Input
                  placeholder='请输入32字以下的所在部门'
                  maxLength='32'
                  autoComplete="off"/>
              )
            }
          </FormItem>
          <FormItem
            {...formItemLayout}
            label='所在职位'
          >
            {
              getFieldDecorator('job', {
                initialValue:listDate?listDate.job:null
              })(
                <Input
                  placeholder='请输入32字以下的所在职位'
                  maxLength='32'
                  autoComplete="off"/>
              )
            }
          </FormItem>
          <FormItem
            {...formItemLayout}
            label='开户银行'
          >
            {
              getFieldDecorator('bank', {
                initialValue:listDate?listDate.bank:null
              })(
                <Input
                  placeholder='请输入32字以下的银行名称'
                  maxLength='32'
                  autoComplete="off"/>
              )
            }
          </FormItem>
          <FormItem
            {...formItemLayout}
            label='银行卡号'
          >
            {
              getFieldDecorator('bankNo', {
                initialValue:listDate?listDate.bankNo:null
              })(
                <Input
                  placeholder='请输入32字以下的银行卡号'
                  maxLength='32'
                  autoComplete="off"/>
              )
            }
          </FormItem>
          <FormItem
            {...formItemLayout}
            label='开户名'
          >
            {
              getFieldDecorator('bankName', {
                initialValue:listDate?listDate.bankName:null
              })(
                <Input
                  placeholder='请输入32字以下的开户名'
                  maxLength='32'
                  autoComplete="off"/>
              )
            }
          </FormItem>
          <FormItem
            {...formItemLayout}
            label='子女情况'
          >
            {
              getFieldDecorator('family', {
                initialValue:listDate?listDate.family:null
              })(
                <TextArea
                  rows={5}
                  placeholder='请输入100字以下的子女情况'
                  autoComplete="off"/>
              )
            }
          </FormItem>
          <FormItem
            {...formItemLayout}
            label='其他备注'
          >
            {
              getFieldDecorator('remark', {
                initialValue:listDate?listDate.remark:null
              })(
                <TextArea
                  rows={6}
                  placeholder='请输入200字以下的其他备注'
                  autoComplete="off"/>
              )
            }
          </FormItem>
          <FormItem
            {...formItemLayout}
            label='合作记录'
          >
            {
              getFieldDecorator('detailUrl',{
                initialValue:listDate?listDate.detailUrl:null
              })(
                <div>
                  <Button
                    style={{marginRight:'30px'}}
                    onClick={this.addText}>
                    添加文本
                  </Button>
                  <Button onClick={this.addImg}>添加图片</Button>
                </div>
              )
            }
          </FormItem>
          <FormItem
            wrapperCol={{ offset:6 ,span: 8 }}
          >
          {
            DescArr.map((item,index)=>{
              if(item.type=='1'){
                return(
                  <div key={index} className='addForm'>
                    {getFieldDecorator(`text${index}`)(
                        <Input style={{width:'80%'}} placeholder='请输入'/>
                    )}
                    <a style={{float:'right',color:'#2fcea6'}}>删除</ a>
                  </div>
                )
              }else{
                return(
                  <div key={index} className='addForm'>
                    111
                    <a style={{float:'right',color:'#2fcea6'}}>删除</ a>
                  </div>
                )
              }
            })
          }
          </FormItem>
          <FormItem wrapperCol={{ offset: 7}} style={{marginTop:'30px'}}>
            <Button style={{marginRight:'30px'}} onClick={this.cancel}>取消</Button>
            <Button type="primary" onClick={this.save}>确定</Button>
          </FormItem>
        </Form>
      </div>
    )
  }
}

const AddStaffs = Form.create()(AddStaff);
function mapStateToProps(state){
  const { marketResource } = state;
  return {marketResource}
}

export default connect(mapStateToProps)(AddStaffs)
