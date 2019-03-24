import React,{ Component } from 'react';
import { Form,Input, Button,message,DatePicker,Row,Col} from 'antd';
import TableList from './components/Table/index'
import { connect } from 'dva'
const FormItem = Form.Item;
const TextArea = Input.TextArea;
const {RangePicker} = DatePicker;
import './index.less'

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
  importData =()=> {

  }
  render(){
    const {tableList} = this.state;
    tableList.map((item,index)=>{
      item.key = index;
    });
    const { getFieldDecorator } = this.props.form;
    const { cBanner } = this.props;
    return(
      <div className='add_act'>
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
              className='act_remark'
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
          <Button className='import_good' onClick={this.importData} type='primary'>导入商品</Button>
          <Button className='download_temp' onClick={this.downLoad} type='primary'>下载导入模板</Button>
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
