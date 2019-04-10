import React,{ Component } from 'react';
import { AutoComplete, Form, Select, Input, Button , message, Row, Col,DatePicker,Radio,Checkbox,Tag} from 'antd';
import { connect } from 'dva'
import { addCouponApi,getGoodTypeApi,getCouponInfoApi } from '../../../services/activity/coupon'
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
      pdList:[{pdCode:'',name:'',displayName:''}],
      shopList:[{spShopId:'',shopName:''}],
      goodTypeList:[],
      selectedBrands:[],
      coupon:{
        couponUseScope:4,
        couponShopScope:0,
        shopScope:0,
        spuScope:0,
        couponValid:1,
        couponValidDateST:moment().format('YYYY-MM-DD HH:mm:ss'),
        couponValidDateET:moment().add(1,'days').format('YYYY-MM-DD HH:mm:ss')
      },
    }
    this.options1 = [
      { label: '不可与限时直降同享',value:1},
      { label: '不可与秒杀同享',value:2 },
    ];
  }

  componentDidMount(){
    if(this.props.data){ //修改
      const {couponId} = this.props.data
      // getCouponInfoApi({couponId}).then(res=>{
        const result = {
          code:'0',
          coupon:{
            couponName:'qqq',
            couponValid:1,//有效期 1领取2特定
            couponValidDay:0,
            couponValidDateST:'2019-04-04 12:30:45',
            couponValidDateET:'2019-04-04 12:30:46',
            couponMoney:100,
            couponFullAmount:100,
            couponCount:1,
            couponUseScene:1,
            couponUsageLimit:[1],
            couponWarningQty:1,
            couponWarningEmail:'17701799531@163.com',
            couponRemark:'备注',
            spuScope:1,
            shopScope:1,
            couponExplain:'说明'
          },
          activityProduct:{
            couponUseScope:5,
            brandList:[{
              name:1,
              pdBrandId:1
            }]
          },
          activityShop:{
            couponShopScope:2,
            shopList:[{
              spShopId:1,
              name:'周虹烨的门店'
            }]
          },
          pdList:[{
            pdCode:'111',
            name:'zhy',
            pdSpuId:1,
            pdSkuId:1,
            displayName:'红色'
          }],
        };
        if(result.code == '0'){
          const {coupon,activityProduct,activityShop,pdList} = result;
          const {couponShopScope,shopList} = activityShop;
          const {couponUseScope,brandList} = activityProduct;
          coupon.couponShopScope = couponShopScope;
          coupon.couponUseScope = couponUseScope;
          this.setState({
            coupon,
            pdList,
            shopList,
          });
        };
      // })
    }
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
    const {pdList} = this.state;
    const list={spShopId:'',shopName:''};
    pdList.push(list)
    this.setState({
      pdList
    });
  }
  //删除商品
  deleteGood =(index)=> {
    const {pdList} = this.state;
    pdList.splice(index,1);
    this.props.form.resetFields([`pdCode`+index]);
    this.setState({
      pdList
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
    this.setState({pdList:list});
  }
  //改变门店list
  changeShopList=(list,index)=>{
    const {shopList} = this.state;
    shopList[index] = list;
    this.setState({shopList});
  }
  //改变商品list
  changepdList=(list,index)=>{
    const {pdList} = this.state;
    pdList[index] = list;
    this.setState({pdList});
  }
  //选择门店变化的时候
  onShopChange=(e)=>{
    const {value} = e.target;
    const {coupon} = this.state;
    const newCoupon = _.assign(coupon,{spuScope:value});
    this.setState({
      coupon:newCoupon
    })
  }
  //选择商品变化的时候
  onGoodChange =(e)=> {
    const {value} = e.target;
    const {coupon} = this.state;
    const newCoupon = _.assign(coupon,{spuScope:value});
    this.setState({
      coupon:newCoupon
    })
  }
  //获取预警优惠券张数
  getCouponQty=(e)=>{
    const {value} = e.target;
    const {coupon} = this.state;
    const newCoupon = _.assign(coupon,{couponWarningQty:value})
    if(value){
      this.setState({
        coupon:newCoupon
      });
    };
  }
  //获取预警邮箱
  getCouponEmail=(e)=>{
    const {value} = e.target;
    const {coupon} = this.state;
    const newCoupon = _.assign(coupon,{couponWarningEmail:value})
    if(value){
      this.setState({
        coupon:newCoupon
      });
    };
  }
  //商品类型选中
  onGoodTypeSelect =(value,option)=> {
    const {selectedBrands} = this.state;
    const isRepeat = selectedBrands.find(item=>item.value == option.props.value)
    if(!isRepeat){ //不重复才会进行下去
      if(selectedBrands.length<10){
        const obj={};
        obj.value = option.props.value;
        obj.text = option.props.children;
        selectedBrands.push(obj);
        this.setState({
          selectedBrands
        });
      }else{
        message.warning('最多可指定10个品牌');
      };
    };
  }
  //删除品牌
  handleClose=(removedTag)=> {
    const tags = this.state.selectedBrands.filter(tag => tag !== removedTag);
    this.setState({ selectedBrands:tags });
  }
  // 商品类型搜搜
  onGoodTypeSearch =(value)=> {
    getGoodTypeApi({name:value})
    .then(res=>{
      if(res.code == '0'){
        const goodTypeList=[];
        res.brandList && res.brandList.map(item=>{
          const obj = {};
          obj.value = item.pdBrandId;
          obj.text = item.name;
          goodTypeList.push(obj)
        });
        this.setState({
          goodTypeList
        });
      };
    });
    // const res={code:0,brandList:[{pdBrandId:1,name:'zhou'},{pdBrandId:2,name:'hong'}]}
  }
  //商品适用范围发生变化
  couponUseScopeChange =(e)=> {
    const {value} = e.target;
    const {coupon} = this.state;
    const newCoupon = _.assign(coupon,{couponUseScope:value});
    this.setState({
      coupon:newCoupon
    })
  }
  //适用门店类型发生变化时
  couponShopScopeChange =(e)=> {
    const {value} = e.target;
    const {coupon} = this.state;
    const newCoupon = _.assign(coupon,{couponShopScope:value});
    this.setState({
      coupon:newCoupon
    })
  }
  render(){
    const {
      shopList,
      pdList,
      shopScope,
      spuScope,
      goodTypeList,
      selectedBrands,
      couponUseScopeValue,
      couponShopScopeValue,
      coupon,
    } = this.state;
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
                  initialValue:coupon.couponName,
                  rules: [{ required: true, message: '请输入优惠券名称'}],
                })(
                  <Input
                    placeholder="请输入10字以内优惠券名称"
                    style={{width:'280px'}}
                    maxLength='10'
                    autoComplete="off"
                  />　
              )}<span className='suffix_tips'>该名称将在前端给用户展示，请谨慎填写</span>
            </FormItem>
            <Row>
              <Col className='radio'>
                <FormItem
                  label="优惠券有效期"
                  labelCol={{ span: 3,offset: 1 }}
                  wrapperCol={{ span: 8 }}
                >
                  {getFieldDecorator('couponValid',{
                      initialValue:coupon.couponValid,
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
                    initialValue:coupon.couponValidDay,
                    rules: [{ required:this.state.couponValidDay, message: '请填写用户领取时间' }],
                  })(
                    <Input style={{width:'140px'}} disabled = {!this.state.couponValidDay}/>
                  )}　天可用<span className='suffix_tips'>0代表领取当天</span>
                </FormItem>
                <FormItem>
                   {getFieldDecorator('couponValidDate',{
                       initialValue:[moment(coupon.couponValidDateST),moment(coupon.couponValidDateET)],
                       rules: [{ required:this.state.couponValidDate , message: '请填写特定时间' }],
                    })(
                      <RangePicker
                        showTime
                        format="YYYY-MM-DD HH:mm:ss"
                        disabled = {!this.state.couponValidDate}
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
              initialValue:coupon.couponMoney,
              rules: [
                {required: true, message: '请输入优惠券金额'},
                {pattern:/^(([1-9][0-9]*)|(([0]\.\d{0,2}|[1-9][0-9]*\.\d{0,2})))$/,
                message: '请输入最多2位小数正数'}
              ],
            })(
              <Input style={{width:'255px'}} placeholder = '请输入优惠券金额'/>
            )}　元
            </FormItem>
            <FormItem
              label='使用门槛'
              labelCol={{ span: 3,offset: 1 }}
              wrapperCol={{ span: 14 }}
            >满　
              {getFieldDecorator('couponFullAmount', {
                initialValue:coupon.couponFullAmount,
                rules: [
                  {required: true, message: '请输入优惠券金额'},
                  {pattern:/^[^[+]{0,1}(\d+)$/,message: '请输入正整数'}
                ],
              })(
                <Input style={{width:'205px'}}/>
              )}　元可用　　<span className='suffix_tips'>只可输入0，正整数</span>　
            </FormItem>
            <FormItem
              label='优惠券数'
              labelCol={{ span: 3,offset: 1 }}
              wrapperCol={{ span: 14 }}
            >
            {
                getFieldDecorator('couponCount', {
                  initialValue:coupon.couponCount,
                  rules: [
                    {required: true, message: '请输入优惠券'},
                    {pattern:/^(?:[0-9]{0,4}|10000)$/,message: '0-10000之间的正整数'}
                  ],
              })(
                <Input placeholder='请输入0-10000的正整数' style={{width:'255px'}}/>
              )
            }　张
            </FormItem>
            <FormItem
              label='发放方式'
              labelCol={{span:3,offset:1}}
              wrapperCol={{span:14}}>
              {
                getFieldDecorator('couponUseScene',{
                  initialValue:coupon.couponUseScene,
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
                  initialValue:coupon.couponUsageLimit,
                })(
                  <CheckboxGroup options={this.options1}/>
                )
              }<span className='suffix_tips'>若不选，则无使用限制</span>
            </FormItem>
            <FormItem
              label='剩余数量预警'
              labelCol={{ span: 3,offset: 1 }}
              wrapperCol={{ span: 14 }}
            >
              <div>
                <span>剩余　</span>
                <Input value={coupon.couponWarningQty} onChange={this.getCouponQty} style={{width:'100px'}} />　张优惠券时预警，预警邮箱　　
                <Input value={coupon.couponWarningEmail} onChange={this.getCouponEmail} style={{width:'200px'}}/>
            </div>
            </FormItem>
            <FormItem
              label='优惠券说明'
              labelCol={{ span: 3,offset: 1 }}
              wrapperCol={{ span: 14 }}
            >
            {getFieldDecorator('couponExplain', {
              initialValue:coupon.couponExplain,
              rules:[{required: true, message: '请输入优惠券说明'}]
            })(
                <TextArea style={{width:'255px'}} placeholder='请输入优惠券说明，50字以内' maxLength='50' rows={6} />
            )}<span className='suffix_tips'>该名称将在前端给用户展示，请谨慎填写</span>
          </FormItem>
          <FormItem
            label='优惠券备注'
            labelCol={{ span: 3,offset: 1 }}
            wrapperCol={{ span: 14 }}
          >
          {getFieldDecorator('couponRemark', {
            initialValue:coupon.couponRemark,
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
                    initialValue:coupon.couponUseScope,
                    rules:[{required: true, message: '请选择适用商品类型'}],
                    onChange:this.couponUseScopeChange
                  })(
                    <RadioGroup>
                      <Radio style={radioStyle} value={4}>全部商品</Radio>
                      <Radio style={radioStyle} value={1}>一般贸易商品</Radio>
                      <Radio style={radioStyle} value={2}>保税商品</Radio>
                      <Radio style={radioStyle} value={5}>指定品牌</Radio>
                    </RadioGroup>
                  )
                }
              </FormItem>
            </Col>
            <Col span={4}>
              <FormItem>
                <div>
                  <AutoComplete
                    onSelect={this.onGoodTypeSelect}
                    onSearch={this.onGoodTypeSearch}
                    dataSource={goodTypeList}/>
                  {selectedBrands.length>0 &&
                    selectedBrands.map((item,index)=>(
                      <Tag
                        closable
                        onClose={(e)=>{
                          e.preventDefault();
                          this.handleClose(item)}
                        }>
                        {item.text}
                      </Tag>
                    ))
                  }
                </div>
              </FormItem>
            </Col>
          </Row>
          <FormItem
            label='选择商品'
            labelCol={{span:3,offset:1}}
            wrapperCol={{span:14}}>
            {
              getFieldDecorator('spuScope',{
                initialValue:coupon.spuScope,
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
            className='table_temp_list coupon_list'
            labelCol={{span:4,offset:1}}
            wrapperCol={{span:10}}>
            {
              (coupon.spuScope==1||coupon.spuScope==2) &&
              <GoodList
                couponUseScope={coupon.couponUseScope}
                FormItem={FormItem}
                getFieldDecorator={getFieldDecorator}
                getFile={this.getGoodFile}
                dataSource={pdList}
                delete={this.deleteGood}
                add={this.addGood}
                changeList={this.changepdList}
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
                initialValue:coupon.couponShopScope,
                rules:[{required: true, message: '请选择适用门店类型'}],
                onChange:this.couponShopScopeChange
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
                initialValue:coupon.shopScope,
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
            (coupon.shopScope==1 || coupon.shopScope==2)&&
            <FormItem
              className='table_temp_list coupon_list'
              label=''
              labelCol={{span:5}}
              wrapperCol={{span:10}}>
              {
                  <ShopList
                    couponShopScope={coupon.couponShopScope}
                    FormItem={FormItem}
                    getFieldDecorator={getFieldDecorator}
                    getFile={this.getShopFile}
                    dataSource={shopList}
                    delete={this.deleteMd}
                    add={this.addMd}
                    changeList={this.changeShopList}
                    addText='+门店'
                    type='12'/>
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
