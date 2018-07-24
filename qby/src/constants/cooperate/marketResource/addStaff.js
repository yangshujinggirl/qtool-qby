import React, { Component} from 'react'
import { Form, Select, Input, Button, message, Upload, Icon} from 'antd'
import {connect} from 'dva'
import { addStafdfApi } from '../../../services/cooperate/marketResource'
import { resourceDetailApi } from '../../../services/cooperate/marketResource'
import UpLoadImg from '../../../components/UploadImg/index.js';
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
      addText:['text'],
      addImg:['img'],
      date:null
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
    const date = {name:'zhouhongye'}
    const resourceId = this.props.data.resourceId;
    resourceDetailApi(resourceId)
    .then(res => {
      this.setDate({date:res.date})
    },err=>{

    })
  }
  addText =()=>{
    let { addText } =this.state;
    addText.push('tesssxt')
    this.setState({
      addText
    });
  }
  render(){
    const { getFieldDecorator } = this.props.form;
    const listDate = this.state.date;
    return(
      <div>
        <Form>
          <FormItem
            {...formItemLayout}
            label='联系人'
          >
            {
              getFieldDecorator('accountUser', {
                rules: [{ required: true, message: '请输入联系人'}],
                initialValue:listDate?listDate.accountUser:null
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
              getFieldDecorator('contactTel', {
                rules: [{ required: true, message: '请输入联系电话'}],
                initialValue:listDate?listDate.contactTel:null
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
              getFieldDecorator('type', {
                rules: [{ required: true, message: '请选择资源类型'}],
                initialValue:listDate?listDate.type:null
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
              getFieldDecorator('resourceMail', {
                initialValue:listDate?listDate.resourceMail:null
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
              getFieldDecorator('companyName', {
                initialValue:listDate?listDate.companyName:null
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
              getFieldDecorator('sCompanyName', {
                initialValue:listDate?listDate.sCompanyName:null
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
              getFieldDecorator('position', {
                initialValue:listDate?listDate.position:null
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
              getFieldDecorator('bankName', {
                initialValue:listDate?listDate.bankName:null
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
              getFieldDecorator('accountName', {
                initialValue:listDate?listDate.accountName:null
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
              getFieldDecorator('children', {
                initialValue:listDate?listDate.children:null
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
            this.state.addText.map((item,index)=>{
              return(
                <div>
                  {getFieldDecorator(`text${index}`)(
                      <Input style={{width:'80%'}} placeholder='请输入'/>
                  )}
                  <a style={{float:'right',color:'#2fcea6'}}>删除</ a>
                </div>
                )
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
