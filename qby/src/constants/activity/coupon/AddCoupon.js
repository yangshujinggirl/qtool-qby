import React,{ Component } from 'react';
import { Form, Select, Input, Button , message, Row, Col,DatePicker,Radio,Checkbox } from 'antd';
import { connect } from 'dva'
import { addCouponApi } from '../../../services/activity/coupon'
import GoodList from '../../../components/importData/index'
import ShopList from '../../../components/importData/index'
import './index.css'
const FormItem = Form.Item;
const Option = Select.Option;
const TextArea = Input.TextArea;
const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;
const { RangePicker } = DatePicker;
import moment from 'moment'
class AddCoupon extends Component {
  constructor(props){
    super(props);
    this.state={
      couponValidDay:true,
      couponValidDate:false,
      goodList:[{pdCode:'',name:'',displayName:''}],
      shopList:[{spShopId:'',shopName:''}],
    }
    this.options1 = [
      { label: '不可与限时直降同享', value: '1'},
      { label: '不可与秒杀同享', value: '2' },
    ];
  }


  //保存
  handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
      if(!err){
        const {couponValidDate,..._values} = values;
        const {couponWarningEmail,couponWarningQty} = this.state;
        _values.couponWarningEmail = couponWarningEmail;
        _values.couponWarningQty = couponWarningQty;
        if(couponValidDate&&couponValidDate[0]){
          _values.couponValidDateST = moment(values.couponValidDate[0]).format('YYYY-MM-DD HH:mm:ss');
          _values.couponValidDateET = moment(values.couponValidDate[1]).format('YYYY-MM-DD HH:mm:ss');
        };
        addCouponApi(_values)
        .then(res => {
          if(res.code=='0'){
            this.props.dispatch({
    					type:'coupon/fetchList',
    					payload:{}
    				})
            this.props.dispatch({
    						type:'tab/initDeletestate',
    						payload:this.props.componkey
    				});
            message.success(res.message,.8);
          }
        },err=>{
          message.error('请求失败')
        })
      }
    });
  }
  //单选框选择
  choice =(e)=> {
    const value = e.target.value;
    if(value==1){
      this.setState({couponValidDay:true,couponValidDate:false})
    }else if(value==2){
      this.setState({couponValidDay:false,couponValidDate:true})
    };
    this.props.form.resetFields(['couponValidDay','couponValidDate']);
  }
  //取消
  cancel =()=> {
    this.props.dispatch({
        type:'tab/initDeletestate',
        payload:this.props.componkey
    });
  }
  //添加商品
  addGood =()=> {
    const {goodList} = this.state;
    const list={spShopId:'',shopName:''};
    goodList.push(list)
    this.setState({
      goodList
    });
  }
  //删除商品
  deleteGood =(index)=> {
    const {goodList} = this.state;
    goodList.splice(index,1);
    this.props.form.resetFields([`pdCode`+index]);
    this.setState({
      goodList
    });
  }
  //添加门店
  addMd =()=> {
    const {shopList} = this.state;
    const list={spShopId:'',name:''};
    shopList.push(list)
    this.setState({
      shopList
    });
  }
  //删除门店
  deleteMd =(index)=> {
    const {shopList} = this.state;
    shopList.splice(index,1);
    this.props.form.resetFields([`spShopId`+index]);
    this.setState({
      shopList
    });
  }
  //导入门店list
  getShopFile=(list,index)=>{
    this.setState({shopList:list});
  }
  //导入商品list
  getGoodFile=(list)=>{
    this.setState({goodList:list});
  }
  //改变门店list
  changeShopList=(list,index)=>{
    const {shopList} = this.state;
    shopList[index] = list;
    this.setState({shopList});
  }
  //改变商品list
  changeGoodList=(list,index)=>{
    const {goodList} = this.state;
    goodList[index] = list;
    this.setState({goodList});
  }
  onShopChange=(e)=>{
    const {value} = e.target;
    if(String(value)){
      this.setState({
        shopScope:value
      });
    };
  }
  onGoodChange =(e)=> {
    const {value} = e.target;
    if(String(value)){
      this.setState({
        spuScope:value
      });
    };
  }
  //获取预警优惠券张数
  getCouponQty=(e)=>{
    const {value} = e.target;
    if(value){
      this.setState({
        couponWarningQty:value
      });
    };
  }
  //获取预警邮箱
  getCouponEmail=(e)=>{
    const {value} = e.target;
    if(value){
      this.setState({
        couponWarningEmail:value
      });
    };
  }
  render(){
    var users = [
      { 'user': 'barney',  'active': true },
      { 'user': 'fred',    'active': false },
      { 'user': 'pebbles', 'active': false }
    ];
    console.log(_.dropRightWhile(users, function(o) { return o.active; }));

    const {goodList,shopList,shopScope,spuScope} = this.state;
    const radioStyle = {
      display: 'block',
      height: '30px',
      lineHeight: '30px',
    };
    const { getFieldDecorator } = this.props.form;
    return(
      <div className='addCoupon'>
        	<Form className="addUser-form operatebanner-form">
            <div className='title'>基本信息</div>
            <FormItem
              label="优惠券名称"
              labelCol={{ span: 3,offset: 1 }}
              wrapperCol={{ span: 14 }}
            >
              {getFieldDecorator('couponName', {
                  rules: [{ required: true, message: '请输入优惠券名称'}],
                })(
                  <div>
                    <Input
                      placeholder="请输入10字以内优惠券名称"
                      style={{width:'280px'}}
                      maxLength='10'
                      autoComplete="off"
                    />　
                    <span className='tips'>该名称将在前端给用户展示，请谨慎填写</span>
                  </div>
              )}
            </FormItem>
            <Row>
              <Col className='radio'>
                <FormItem
                  label="优惠券有效期"
                  labelCol={{ span: 3,offset: 1 }}
                  wrapperCol={{ span: 8 }}
                >
                  {getFieldDecorator('couponValid',{
                      rules: [{ required: true, message: '请选择券有效期' }],

                  })(
                    <RadioGroup onChange = {this.choice}>
                        <Radio value={1}>用户领取时间起</Radio>
                        <Radio value={2}>特定时间到</Radio>
                    </RadioGroup>
                  )}
                </FormItem>
              </Col>
              <Col className='limitDay'>
                <FormItem>
                  {getFieldDecorator('couponValidDay',{
                    rules: [{ required:this.state.couponValidDay, message: '请填写用户领取时间' }],
                  })(
                    <div>
                      <Input style={{width:'140px'}} disabled = {!this.state.couponValidDay} />　天可用
                      <span className='tips'>0代表领取当天</span>
                    </div>
                  )}
                </FormItem>
                <FormItem>
                   {getFieldDecorator('couponValidDate',{
                       rules: [{ required:this.state.couponValidDate , message: '请填写特定时间' }],
                    })(
                      <RangePicker
                        showTime
                        format="YYYY-MM-DD HH:mm:ss"
                      />
                   )}
                </FormItem>
              </Col>
            </Row>
            <FormItem
              label="优惠券金额"
              labelCol={{ span: 3,offset: 1 }}
              wrapperCol={{ span: 14 }}
            >
            {getFieldDecorator('couponMoney', {
              rules: [
                {required: true, message: '请输入优惠券金额'},
                {pattern:/^(([1-9][0-9]*)|(([0]\.\d{0,2}|[1-9][0-9]*\.\d{0,2})))$/,
                message: '请输入最多2位小数正数'}
              ],
            })(
              <div><Input style={{width:'255px'}} placeholder = '请输入优惠券金额'/>　元</div>
            )}
            </FormItem>
            <FormItem
              label='使用门槛'
              labelCol={{ span: 3,offset: 1 }}
              wrapperCol={{ span: 14 }}
            >
              {getFieldDecorator('couponFullAmount', {
                rules: [{required: true, message: '请输入优惠券金额'},{pattern:/^[^[+]{0,1}(\d+)$/,message: '请输入正整数'}],
              })(
                <div><span>满　</span><Input style={{width:'205px'}} />　元可用　　<span className='tips'>只可输入0，正整数</span></div>
              )}　
            </FormItem>
            <FormItem
              label='优惠券数'
              labelCol={{ span: 3,offset: 1 }}
              wrapperCol={{ span: 14 }}
            >
            {getFieldDecorator('couponCount', {
              rules: [{required: true, message: '请输入优惠券'},{pattern:/^(?:[0-9]{0,4}|10000)$/,message: '0-10000之间的正整数'}],
            })(
              <div><Input placeholder='请输入0-10000的正整数' style={{width:'255px'}}/>　张</div>
            )}
            </FormItem>
            <FormItem
              label='发放方式'
              labelCol={{span:3,offset:1}}
              wrapperCol={{span:14}}>
              {
                getFieldDecorator('couponUseScene',{
                  rules:[{required: true, message: '请选择使用商品范围'}]
                })(
                  <RadioGroup>
                    <Radio style={radioStyle} value={1}>注册领取</Radio>
                    <Radio style={radioStyle} value={3}>手动领取</Radio>
                    <Radio style={radioStyle} value={2}>注券</Radio>
                  </RadioGroup>
                )
              }
            </FormItem>
            <FormItem
              label='使用限制'
              labelCol={{span:3,offset:1}}
              wrapperCol={{span:14}}>
              {
                getFieldDecorator('couponUsageLimit',{
                })(
                  <CheckboxGroup options={this.options1}/>
                )
              }<span className='tips'>若不选，则无使用限制</span>
            </FormItem>
            <FormItem
              label='剩余数量预警'
              labelCol={{ span: 3,offset: 1 }}
              wrapperCol={{ span: 14 }}
            >
              <div><span>剩余　</span><Input onBlur={this.getCouponQty} style={{width:'100px'}} />　张优惠券时预警，预警邮箱　　<Input onBlur={this.getCouponEmail} style={{width:'200px'}}/></div>
            </FormItem>
            <FormItem
              label='优惠券说明'
              labelCol={{ span: 3,offset: 1 }}
              wrapperCol={{ span: 14 }}
            >
            {getFieldDecorator('couponExplain', {
              rules:[{required: true, message: '请输入优惠券说明'}]
            })(
                <TextArea style={{width:'255px'}} placeholder='请输入优惠券说明，50字以内' maxLength='50' rows={6} />
            )}
          </FormItem>
          <FormItem
            label='优惠券备注'
            labelCol={{ span: 3,offset: 1 }}
            wrapperCol={{ span: 14 }}
          >
          {getFieldDecorator('couponRemark', {
          })(
              <TextArea style={{width:'255px'}} placeholder='请输入300字以下优惠券备注' maxLength='300' rows={6} />
          )}
          </FormItem>
          <div className='title'>使用范围</div>
          <Row>
            <Col span={6} >
              <FormItem
                label='适用商品类型'
                labelCol={{span:3,offset:1}}
                wrapperCol={{span:8}}>
                {
                  getFieldDecorator('couponUseScope',{
                    rules:[{required: true, message: '请选择适用商品类型'}],
                  })(
                    <RadioGroup>
                      <Radio style={radioStyle} value={4}>全部商品</Radio>
                      <Radio style={radioStyle} value={2}>保税商品</Radio>
                      <Radio style={radioStyle} value={5}>指定品牌</Radio>
                    </RadioGroup>
                  )
                }
              </FormItem>
            </Col>
            <Col span={4}>
              <FormItem>
                {getFieldDecorator('code',{
                })(
                    <Input autoComplete="off"/>
                )}
              </FormItem>
            </Col>
          </Row>
          <FormItem
            label='选择商品'
            labelCol={{span:3,offset:1}}
            wrapperCol={{span:14}}>
            {
              getFieldDecorator('spuScope',{
                rules:[{required: true, message: '请选择选择商品'}],
                onChange:this.onGoodChange
              })(
                <RadioGroup>
                  <Radio value={0}>全部可用</Radio>
                  <Radio value={1}>指定商品可用</Radio>
                  <Radio value={2}>指定商品不可用</Radio>
                </RadioGroup>
              )
            }
          </FormItem>
          <FormItem
            className='table_list'
            label=''
            labelCol={{span:4,offset:1}}
            wrapperCol={{span:10}}>
            {
              (spuScope==1||spuScope==2) &&
              <GoodList
                FormItem={FormItem}
                getFieldDecorator={getFieldDecorator}
                getFile={this.getGoodFile}
                dataSource={goodList}
                delete={this.deleteGood}
                add={this.addGood}
                changeList={this.changeGoodList}
                addText='+商品'
                type='2'/>
            }
          </FormItem>
          <FormItem
            label='适用门店类型'
            labelCol={{span:3,offset:1}}
            wrapperCol={{span:8}}>
            {
              getFieldDecorator('couponShopScope',{
                rules:[{required: true, message: '请选择适用门店类型'}]
              })(
                <RadioGroup>
                  <Radio style={radioStyle} value={0}>全部门店</Radio>
                  <Radio style={radioStyle} value={1}>加盟店</Radio>
                  <Radio style={radioStyle} value={2}>直联营店</Radio>
                </RadioGroup>
              )
            }
          </FormItem>
          <FormItem
            label='选择门店'
            labelCol={{span:3,offset:1}}
            wrapperCol={{span:14}}>
            {
              getFieldDecorator('shopScope',{
                rules:[{required: true, message: '请选择选择商品'}],
                onChange:this.onShopChange
              })(
                <RadioGroup>
                  <Radio value={0}>全部可用</Radio>
                  <Radio value={1}>指定门店可用</Radio>
                  <Radio value={2}>指定门店不可用</Radio>
                </RadioGroup>
              )
            }
          </FormItem>
          {
            (shopScope==1 || shopScope==2)&&
            <FormItem
              className='table_list'
              label=''
              labelCol={{span:5}}
              wrapperCol={{span:10}}>
              {
                  <ShopList
                    FormItem={FormItem}
                    getFieldDecorator={getFieldDecorator}
                    getFile={this.getShopFile}
                    dataSource={shopList}
                    delete={this.deleteMd}
                    add={this.addMd}
                    changeList={this.changeShopList}
                    addText='+门店'
                    type='1'/>
              }
            </FormItem>
          }
        	<FormItem style={{marginLeft:'140px'}}>
          		<Button style={{marginRight:'100px'}} onClick={this.cancel}>取消</Button>
          		<Button type="primary" onClick={this.handleSubmit}>保存</Button>
        	</FormItem>
        	</Form>
      </div>
    )
  }
}
const AddCoupons = Form.create()(AddCoupon);
function mapStateToProps(state){
  const { coupon } = state;
  return coupon
}
export default connect(mapStateToProps)(AddCoupons);
