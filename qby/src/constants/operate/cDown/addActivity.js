import React,{ Component } from 'react';
import { Form,Input, Button,message,DatePicker,Row,Col,Checkbox,Radio } from 'antd';
import TableList from './components/Table/index'
import { connect } from 'dva'
const FormItem = Form.Item;
const TextArea = Input.TextArea;
const {RangePicker} = DatePicker;
const CheckboxGroup = Checkbox.Group;
const RadioGroup = Radio.Group;
import './index.less'

import UploadData from './components/Upload'

class Addactivity extends Component {
  constructor(props){
    super(props);
    this.state = {
      tableList:[{pdCode:'',name:'',displayName:'',toCprice:'',goldCardPrice:'',silverCardPrice:'',activityPrice:''}],
      options:[
        { label:'线上APP', value:1},
        { label:'线下POS', value:2},
      ],
      optionsWithDisabled:[
        { label:'门店', value:1},
        { label:'仓库', value:2},
      ],
    };
  }
  //保存
  handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
      if(!err){
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
  //添加商品
  addGoods =()=> {
      const {tableList} = this.state;
      const temp={pdCode:'',name:'',displayName:'',toCprice:'',goldCardPrice:'',silverCardPrice:'',activityPrice:''}
      tableList.push(temp);
      this.setState({
        tableList
      });
  }
  deleteGood=(index)=>{
    const {tableList} = this.state;
    tableList.splice(index,1);
    this.props.form.resetFields([`pdCode`+index,`activityPrice`+index]);
    this.setState({
      tableList
    });
  }
  //新增保存
  handleSubmit=()=>{

  }
  //取消
  cancel =()=> {
    this.props.dispatch({
      type:'tab/initDeletestate',
      payload:this.props.componkey
    });
  }
  //下载模板
  downLoad =()=> {
    window.open('../../../static/b_actIn.xlsx')
  }
  //导入商品
  getFile =(pdSpuAsnLists)=> {
    this.setState({
      tableList:pdSpuAsnLists
    })
  }
  //根据
  changeList =(index,pdSpu)=> {
    const {tableList}=this.state;
    tableList[index] = pdSpu;
    this.setState({
      tableList
    });
  }
  render(){
    const radioStyle = {
     display: 'block',
     height: '30px',
     lineHeight: '30px',
   };
    const {tableList,options,optionsWithDisabled} = this.state;
    tableList.map((item,index)=>{
      item.key = index;
    });
    const { getFieldDecorator } = this.props.form;
    const { cBanner } = this.props;
    return(
      <div className='add_act add_cAct'>
        	<Form >
            <div className='title'>基本信息</div>
            <FormItem
              label="活动名称"
              labelCol={{ span:3}}
              wrapperCol={{ span:6}}
            >
              {getFieldDecorator('couponName', {
                  rules: [{ required: true, message: '请输入优惠券名称'}],
                })(
                    <Input
                      style={{width:'280px'}}
                      placeholder="请输入10字以内优惠券名称"
                      maxLength='10'
                      autoComplete="off"
                    />　
              )}
            </FormItem>
            <FormItem
              label="活动时间"
              labelCol={{ span:3}}
              wrapperCol={{ span:6}}

            >
              {getFieldDecorator('couponName', {
                  rules: [{ required: true, message: '请输入优惠券名称'}],
                })(
                  <RangePicker
                    showTime
                    style={{width:'280px'}}
                    format="YYYY-MM-DD HH:mm:ss"/>
                )}
            </FormItem>
            <FormItem
              label="预热时间"
              labelCol={{ span:3}}
              wrapperCol={{ span:6}}

            >
              {getFieldDecorator('couponName', {
                  rules: [{ required: true, message: '请输入优惠券名称'}],
                })(
                  <RangePicker
                    showTime
                    style={{width:'280px'}}
                    format="YYYY-MM-DD HH:mm:ss"/>
                )}
            </FormItem>
            <FormItem
              label="活动平台"
              labelCol={{ span:3}}
              wrapperCol={{ span:6}}

            >
              {getFieldDecorator('couponName', {
                  rules: [{ required: true, message: '请输入优惠券名称'}],
                })(
                <CheckboxGroup options={options}/>
                )}
            </FormItem>
            <FormItem
              label="出货平台"
              labelCol={{ span:3}}
              wrapperCol={{ span:6}}

            >
              {getFieldDecorator('couponName', {
                  rules: [{ required: true, message: '请输入优惠券名称'}],
                })(
                  <CheckboxGroup
                    disabled
                    options={optionsWithDisabled}
                    defaultValue={[1,2]}
                  />
                )}
            </FormItem>
            <FormItem
              label="是否生成门店利润"
              labelCol={{ span:3}}
              wrapperCol={{ span:6}}

            >
              {getFieldDecorator('isStoreProfit', {
                  initialValue:1,
                  rules: [{ required: true, message: '请输入优惠券名称'}],
                })(
                  <RadioGroup disabled>
                    <Radio value={1}>是</Radio>
                    <Radio value={0}>否</Radio>
                  </RadioGroup>
                )}
            </FormItem>
            <FormItem
              label="活动成本承担方"
              labelCol={{ span:3}}
              wrapperCol={{ span:6}}

            >
            {getFieldDecorator('activityCostbearer', {
                initialValue:1,
                rules: [{ required: true, message: '请选择活动成本承担方'}],
              })(
                <RadioGroup disabled>
                  <Radio value={1}>是</Radio>
                  <Radio value={0}>否</Radio>
                </RadioGroup>
              )}
            </FormItem>
            <FormItem
              label="活动商品悬浮图"
              labelCol={{ span:3}}
              wrapperCol={{ span:6}}
            >
            {getFieldDecorator('activityCostbearer', {
                initialValue:1,
                rules: [{ required: true, message: '请选择活动成本承担方'}],
              })(
                <RadioGroup disabled>
                  <Radio value={1}>是</Radio>
                  <Radio value={0}>否</Radio>
                </RadioGroup>
              )}
            </FormItem>
            <FormItem
              label="活动备注"
              labelCol={{ span: 3}}
              wrapperCol={{ span: 6}}
              className='act_remark'
            >
              {getFieldDecorator('couponName', {
                  rules: [{ required: true, message: '请输入活动备注'}],
                })(
                <TextArea style={{width:'280px'}} placeholder="请输入活动备注"/>
              )}
            </FormItem>
            <div className='title'>使用范围</div>
            <div className='c_act_good'>
              <FormItem
                label="活动商品"
                labelCol={{ span: 3}}
                wrapperCol={{ span: 18}}
              >
                <TableList
                  form={this.props.form}
                  getFieldDecorator={getFieldDecorator}
                  FormItem = {FormItem}
                  tableList={tableList}
                  addGoods={this.addGoods}
                  deleteGood={this.deleteGood}
                  changeList={this.changeList}
                />
              </FormItem>
              <FormItem
                label="活动门店"
                labelCol={{ span:3}}
                wrapperCol={{ span:6}}
              >
              {getFieldDecorator('shopType', {
                  initialValue:1,
                  rules: [{ required: true, message: '请选择活动成本承担方'}],
                })(
                  <RadioGroup>
                    <Radio style={radioStyle}value={1}>全部门店</Radio>
                    <Radio style={radioStyle} value={2}>加盟店</Radio>
                    <Radio style={radioStyle} value={3}>直联营店</Radio>
                    <Radio style={radioStyle} value={4}>指定门店</Radio>
                  </RadioGroup>
                )}
              </FormItem>
              <FormItem
                  label="选择门店"
                  labelCol={{ span: 4}}
                  wrapperCol={{ span: 18}}
                >
                  <TableList
                    form={this.props.form}
                    getFieldDecorator={getFieldDecorator}
                    FormItem = {FormItem}
                    tableList={tableList}
                    addGoods={this.addGoods}
                    deleteGood={this.deleteGood}
                    changeList={this.changeList}
                  />
              </FormItem>
              <UploadData getFile={this.getFile}/>
              <Button className='download_temp' onClick={this.downLoad} type='primary'>下载导入模板</Button>
            </div>
            <FormItem
              labelCol={{ span: 3}}
              wrapperCol={{ span: 16}}
              className='btn_cancel_save'>
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

      </div>
    )
  }
}
const Addactivitys = Form.create()(Addactivity);
const mapStateToProps=(state)=>{
  const {bActPrice} = state;
  return {bActPrice}
}
export default connect(mapStateToProps)(Addactivitys);
