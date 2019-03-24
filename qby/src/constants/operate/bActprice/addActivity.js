import React,{ Component } from 'react';
import { Form,Input, Button,message,DatePicker,} from 'antd';
import TableList from './components/Table/index'
import { connect } from 'dva'
const FormItem = Form.Item;
const TextArea = Input.TextArea;
const {RangePicker} = DatePicker;

class Addactivity extends Component {
  constructor(props){
    super(props);
    this.state={
      tableList:[{code:'20170324',pdName:'胡罗比',displayName:'1',activityPrice:'0.1',costPrice:'0.2'}]}
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
      const temp =[{code:'',pdName:'',displayName:'',activityPrice:'',costPrice:''}]
      tableList.push(temp);
      this.setState({
        tableList
      });
  }
  deleteGood=(index)=>{
    const {tableList} = this.state;
    tableList.splice(index,1);
    this.props.form.resetFields([`code`+index,`activityPrice`+index]);
    this.setState({
      tableList
    });
  }
  render(){
    const {tableList} = this.state;
    tableList.map((item,index)=>{
      item.key = index;
    });
    const { getFieldDecorator } = this.props.form;
    const { cBanner } = this.props;
    return(
      <div className='addCoupon'>
        	<Form className="addUser-form operatebanner-form">
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
              label="活动备注"
              labelCol={{ span: 3}}
              wrapperCol={{ span: 6}}
            >
              {getFieldDecorator('couponName', {
                  rules: [{ required: true, message: '请输入活动备注'}],
                })(
                <TextArea style={{width:'280px'}} placeholder="请输入活动备注"/>
              )}
            </FormItem>
            <FormItem
              label="活动商品"
              labelCol={{ span: 3}}
              wrapperCol={{ span: 18}}
            >
              <TableList
                getFieldDecorator={getFieldDecorator}
                FormItem = {FormItem}
                tableList={tableList}
                addGoods={this.addGoods}
                deleteGood={this.deleteGood}
              />
            </FormItem>
        	</Form>
      </div>
    )
  }
}
const Addactivitys = Form.create()(Addactivity);
export default Addactivitys;
