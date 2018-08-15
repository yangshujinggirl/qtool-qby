import React, { Component} from 'react'
import { Form, Select, Input, Button, message, Upload, Icon} from 'antd'
import {connect} from 'dva'
import { resourceDetailApi, addStaffApi  } from '../../../services/cooperate/marketResource'
// import UpLoadImg from '../../../components/UploadImg/index.js';
import AddImgText from '../../../components/AddTextImg/index.js';
import './index.less'
const FormItem = Form.Item;
const TextArea = Input.TextArea;
const Option = Select.Option;
const formItemLayout = {
  labelCol: {span:3},
  wrapperCol: {span:6}
}

class AddStaff extends Component{
  constructor(props){
    super(props);
    this.state={
      DescArr:[],
      fields:null,
      listDate:null,
      loading:false,
    }
  }
  //确认添加
  save =()=> {
    this.props.form.validateFieldsAndScroll((err,values) => {
      if(values.marketTypeId=='供应商'){
        values.marketTypeId = 1
      }else if(values.marketTypeId=='媒体'){
        values.marketTypeId = 2
      }else if(values.marketTypeId=='品牌商'){
        values.marketTypeId = 3
      }else if(values.marketTypeId=='其他'){
        values.marketTypeId = 4
      }
      const { DescArr } = this.state;
      let marketResCp;
      marketResCp = [];
      DescArr.map( (item,index)=> {
        let obj = {};
        if(!item.content){
          marketResCp = [];
        }else{
          obj.type = item.type;
          obj.content = item.content;
          marketResCp.push(obj);
        }
      });

      //判断是修改还是新增
      var values_
      if(this.props.data){
        const marketResId = this.props.data.marketResId
        values_ = {marketRes:{marketResCp,...values,marketResId:marketResId}}
      }else{
        values_ ={marketRes:{marketResCp,...values}}
      };
      if(!err){
        this.setState({
          loading:true
        })
        this.submit(values_)
      };
    })
  }
  submit(values){
    addStaffApi(values)
    .then(res=>{
      if(res.code == '0'){
        this.setState({
          loading:false
        });
        message.success('成功');
        this.props.dispatch({
            type:'marketResource/fetchList',
            payload:{...this.props.data.listParams}
        });
        if(this.props.data){
          this.props.dispatch({
              type:'tab/initDeletestate',
              payload:this.props.componkey+this.props.data.marketResId
          });
        }else{
          this.props.dispatch({
              type:'tab/initDeletestate',
              payload:this.props.componkey
          });
        }

      }else{
        this.setState({
          loading:false
        })
      }
    });
  }
  //取消
  cancel =()=> {
    this.props.dispatch({
				type:'tab/initDeletestate',
				payload:this.props.componkey
		});
  }
  //初始化
  componentDidMount(){
      console.log(this.props)
    this.setState({DescArr:[]});
    if(this.props.data){
      const marketResId = {marketResId:this.props.data.marketResId};
      resourceDetailApi(marketResId)
      .then(res => {
        if(res.code=='0'){
          this.setState({
            listDate:res.marketRes,
            DescArr:JSON.parse(res.marketRes.content)
          });
        };
      },err=>{
      })
    }
  }
  //添加文本/图片
  addContent =(type)=>{
    let { DescArr } = this.state;
    if(type=='text'){
      DescArr.push({type:1,content:''})
    }else{
      DescArr.push({type:2,content:''})
    }
    this.setState({DescArr});
  }
//图片更改-----》更改state的值
  changeState =(DescArr)=> {
    this.setState({DescArr})
  }
  render(){
    const fileDomain=eval(sessionStorage.getItem('fileDomain'));
    const { getFieldDecorator } = this.props.form;
    const { listDate, DescArr }= this.state;
    if(listDate){
      for(var key in listDate){
        if(listDate['marketTypeId']==1){
          listDate['marketTypeStr'] = '供应商'
        }else if(listDate['marketTypeId']==2){
          listDate['marketTypeStr'] = '媒体'
        }else if(listDate['marketTypeId']==3){
          listDate['marketTypeStr'] = '品牌商'
        }else if(listDate['marketTypeId']==4){
          listDate['marketTypeStr'] = 'KOI'
        }else if(listDate['marketTypeId']==5){
          listDate['marketTypeStr'] = '其他'
        }
      }
    }
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
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
                initialValue:listDate?listDate.marketTypeStr:[]
              })(
                <Select placeholder="请选择资源类型">
                  <Option value={1}>供应商</Option>
                  <Option value={2}>媒体</Option>
                  <Option value={3}>品牌商</Option>
                  <Option value={4}>其他</Option>
                </Select>
              )}
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
          <AddImgText
            DescArr = {DescArr}
            addContent = {this.addContent}
            changeState = {this.changeState}
           />
         <FormItem wrapperCol={{ offset: 3}} style={{marginTop:'30px'}}>
            <Button style={{marginRight:'60px'}} onClick={this.cancel}>取消</Button>
            <Button type="primary" onClick={this.save} loading={this.state.loading}>确定</Button>
          </FormItem>
        </Form>
      </div>
    )
  }
}

const AddStaffs = Form.create()(AddStaff);
function mapStateToProps(state){
  const { marketResource } = state;
  return { marketResource }
}

export default connect(mapStateToProps)(AddStaffs)
