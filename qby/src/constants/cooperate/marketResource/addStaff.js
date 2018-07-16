import React, { Component} from 'react'
import { Form, Select, Input, Button, message, Upload, Icon} from 'antd'
import {connect} from 'dva'
const FormItem = Form.Item;
const TextArea = Input.TextArea;
const Option = Select.Option;
const formItemLayout = {
  labelCol: {span:6},
  wrapperCol: {span:8}
}
class AddStaff extends Component{
  //确认添加
  save(){
    this.props.form.validateFieldsAndScroll((err,values) => {
      this.props.dispatch({
        type:'marketResource/addStaff',
        payload:values
      })
    })
  }
  //取消
  cancel(){

  }
  //添加文本
  addText(){

  }
  //添加图片
  addImg(){

  }

  render(){

    const { getFieldDecorator } = this.props.form;
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
              })(
                <Input placeholder='请输入16字以下的联系人' maxLength='16' autoComplete="off"/>
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
              })(
                <Select placeholder="请选择资源类型">
                  <Option value="0">供应商</Option>
                  <Option value="10">媒体</Option>
                  <Option value="20">品牌商</Option>
                  <Option value="20">KOl</Option>
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
              })(
                <Input placeholder='请输入32字以下的联系微信' maxLength='32' autoComplete="off"/>
              )
            }
          </FormItem>
          <FormItem
            {...formItemLayout}
            label='联系邮箱'
          >
            {
              getFieldDecorator('resourceMail', {
              })(
                <Input placeholder='请输入64字以下的联系邮箱' maxLength='64' autoComplete="off"/>
              )
            }
          </FormItem>
          <FormItem
            {...formItemLayout}
            label='公司全称'
          >
            {
              getFieldDecorator('companyName', {
              })(
                <Input placeholder='请输入32字以下的公司名称' maxLength='32' autoComplete="off"/>
              )
            }
          </FormItem>
          <FormItem
            {...formItemLayout}
            label='公司简称'
          >
            {
              getFieldDecorator('sCompanyName', {
              })(
                <Input placeholder='请输入32字以下的公司简称' maxLength='32' autoComplete="off"/>
              )
            }
          </FormItem>
          <FormItem
            {...formItemLayout}
            label='所在部门'
          >
            {
              getFieldDecorator('department', {
              })(
                <Input placeholder='请输入32字以下的所在部门' maxLength='32' autoComplete="off"/>
              )
            }
          </FormItem>
          <FormItem
            {...formItemLayout}
            label='所在职位'
          >
            {
              getFieldDecorator('position', {
              })(
                <Input placeholder='请输入32字以下的所在职位' maxLength='32' autoComplete="off"/>
              )
            }
          </FormItem>
          <FormItem
            {...formItemLayout}
            label='开户银行'
          >
            {
              getFieldDecorator('bankName', {
              })(
                <Input placeholder='请输入32字以下的银行名称' maxLength='32' autoComplete="off"/>
              )
            }
          </FormItem>
          <FormItem
            {...formItemLayout}
            label='银行卡号'
          >
            {
              getFieldDecorator('bankNo', {
              })(
                <Input placeholder='请输入32字以下的银行卡号' maxLength='32' autoComplete="off"/>
              )
            }
          </FormItem>
          <FormItem
            {...formItemLayout}
            label='开户名'
          >
            {
              getFieldDecorator('accountName', {
              })(
                <Input placeholder='请输入32字以下的开户名' maxLength='32' autoComplete="off"/>
              )
            }
          </FormItem>
          <FormItem
            {...formItemLayout}
            label='子女情况'
          >
            {
              getFieldDecorator('children', {
              })(
                <TextArea rows={5} placeholder='请输入100字以下的子女情况' autoComplete="off"/>
              )
            }
          </FormItem>
          <FormItem
            {...formItemLayout}
            label='其他备注'
          >
            {
              getFieldDecorator('remark', {
              })(
                <TextArea rows={6} placeholder='请输入200字以下的其他备注' autoComplete="off"/>
              )
            }
          </FormItem>
          <FormItem
            {...formItemLayout}
            label='合作记录'
          >
            {
              getFieldDecorator('accountName', {
              })(
                <div>
                  <Button style={{marginRight:'30px'}}>添加文本</Button>
                  <Button>添加图片</Button>
                </div>
              )
            }
          </FormItem>
          <FormItem
            {...formItemLayout}
            label='人员描述'
          >
            {
              getFieldDecorator('accountName', {
              })(
                <Input placeholder='请输入人员描述'/>
              )
            }
          </FormItem>
          <FormItem
            {...formItemLayout}
            label='添加图片'
          >
            {
              getFieldDecorator('accountName', {
              })(
                <Upload
                  name="avatar"
                  className="avatar-uploader"
                >
                </Upload>
              )
            }
          </FormItem>
          <FormItem wrapperCol={{ offset: 7}} style={{marginTop:'30px'}}>
            <Button style={{marginRight:'30px'}}>取消</Button>
            <Button type="primary" onClick={()=>this.save()}>确定</Button>
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
