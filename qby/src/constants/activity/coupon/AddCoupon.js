import React,{ Component } from 'react';
import { AutoComplete, Form, Select, Input, Button , message, Row, Col,DatePicker,Radio,Checkbox,Tag} from 'antd';
import { connect } from 'dva'
import { addCouponApi,getGoodTypeApi,getCouponInfoApi,updataCouponPackApi} from '../../../services/activity/coupon'
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
      brandList:[],
      coupon:{
        couponUseScope:'4',
        couponShopScope:0,
        shopScope:0,
        spuScope:0,
        couponValid:1,
        couponValidDateST:moment().format('YYYY-MM-DD HH:mm:ss'),
        couponValidDateET:moment().add(1,'days').format('YYYY-MM-DD HH:mm:ss')
      },
      couponId:''
    }
    this.options1 = [
      { label: '不可与限时直降同享',value:1},
      { label: '不可与秒杀同享',value:2 },
    ];
  }

  componentDidMount(){
    if(this.props.data.couponId){ //修改
      this.initPage();
    };
  }
  initPage =()=> {
    const {couponId} = this.props.data;
    getCouponInfoApi({couponId}).then(res=>{
      if(res.code == '0'){
        const {couponInfo,activityProduct,activityShop,pdList} = res;
        const {couponShopScope,shopList} = activityShop||{couponShopScope:'',shopList:null};
        const {couponUseScope,brandList} = activityProduct||{couponUseScope:'',brandList:null};
        let {couponUsageLimit} = couponInfo;
        if(couponUsageLimit){
          couponUsageLimit = couponUsageLimit && couponUsageLimit.split('-');
          for(var i=0;i<couponUsageLimit.length;i++){
            couponUsageLimit[i] = Number(couponUsageLimit[i]);
          };
        };
        brandList&&brandList.map(item=>{
          item.text = item.name;
          item.value = item.pdBrandId;
        });
        brandList&&brandList.map(item=>{
          delete item.name;
          delete item.pdBrandId;
        });
        couponInfo.couponUsageLimit = couponUsageLimit;
        couponInfo.couponShopScope = couponShopScope;
        couponInfo.couponUseScope = couponUseScope;
        if(couponInfo.couponValid==1){
          this.setState({
            couponValidDay:true,
            couponValidDate:false,
          });
        }else{
          this.setState({
            couponValidDay:false,
            couponValidDate:true,
          });
        };
        this.setState({
          coupon:couponInfo,
          pdList,
          shopList,
          brandList,
          couponId,
        });
      };
    });
  }
  //保存
  handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFieldsAndScroll((err, values) => {
      if(!err){
        const _values = this.formatValue(values);
        if(!_values) return;
        if(this.state.couponId){//修改优惠券
          _values.couponId = this.state.couponId;
          const componkey = this.props.componkey+this.state.couponId;
          this.sendRequest(updataCouponPackApi,_values,componkey)
        }else{ //新增
          this.sendRequest(addCouponApi,_values,this.props.componkey)
        };
      };
    });
  }
  sendRequest =(requestApi,values,componkey)=> {
    requestApi(values).then(res=>{
      if(res.code=='0'){
        this.props.dispatch({
          type:'coupon/fetchList',
          payload:{
            ...this.state.inputValues,
            limit:this.props.data1.limit,
            currentPage:this.props.data1.currentPage
          }
        });
        this.props.dispatch({
            type:'tab/initDeletestate',
            payload:componkey
        });
        message.success(res.message,.8);
      };
    })
  }
  formatValue=(values)=>{
    const {couponWarningEmail,couponWarningQty} = this.state.coupon;
    const {couponCount} = values;
    if(Number(couponWarningQty)>Number(couponCount)){
       message.error('剩余优惠券数不可超过当前发放数',.8)
       return
    };
    const {shopList,pdList,brandList} = this.state;
    const brands = _.cloneDeep(brandList)
    values.pdList = pdList;
    values.spList = shopList;
    brands&&brands.map(item=>{
      item.name = item.text;
      item.pdBrandId = item.value;
      return item
    });
    brands&&brands.map(item=>{
      delete item.text;
      delete item.value;
    });
    for (var key in values){
      if(key.includes('pdCode')||key.includes('spShopId')){
        delete values[key]
      };
    };
    values.brandList = brands;
    values.couponWarningEmail = couponWarningEmail;
    values.couponWarningQty = couponWarningQty;
    const {couponValidDate,..._values} = values;
    if(couponValidDate&&couponValidDate[0]){
      _values.couponValidDateST = moment(values.couponValidDate[0]).format('YYYY-MM-DD HH:mm:ss');
      _values.couponValidDateET = moment(values.couponValidDate[1]).format('YYYY-MM-DD HH:mm:ss');
    };
    return _values;
  }
  //单选框选择
  choice =(e)=> {
    const value = e.target.value;
    if(value==1){
      this.setState({couponValidDay:true,couponValidDate:false});
      this.props.form.setFieldsValue({couponValidDate:null,});
    }else if(value==2){
      this.setState({couponValidDay:false,couponValidDate:true});
      this.props.form.setFieldsValue({couponValidDay:''});
    };
  }
  //取消
  cancel =()=> {
    if(this.state.couponId){
      this.props.dispatch({
        type:'tab/initDeletestate',
        payload:this.props.componkey+this.state.couponId
      });
    }else{
      this.props.dispatch({
        type:'tab/initDeletestate',
        payload:this.props.componkey
      });
    };
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
    debugger
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
    const newCoupon = _.assign(coupon,{shopScope:value});
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
    this.setState({
      coupon:newCoupon
    });
  }
  //获取预警邮箱
  getCouponEmail=(e)=>{
    const {value} = e.target;
    const {coupon} = this.state;
    const newCoupon = _.assign(coupon,{couponWarningEmail:value})
    this.setState({
      coupon:newCoupon
    });
  }
  //商品类型选中
  onGoodTypeSelect =(value,option)=> {
    const {brandList} = this.state;
    const isRepeat = brandList.find(item=>item.value == option.props.value)
    if(!isRepeat){ //不重复才会进行下去
      if(brandList.length<10){
        const obj={};
        obj.value = option.props.value;
        obj.text = option.props.children;
        brandList.push(obj);
        this.setState({
          brandList
        });
      }else{
        message.warning('最多可指定10个品牌');
      };
    };
  }
  //删除品牌
  handleClose=(removedTag)=> {
    const tags = this.state.brandList.filter(tag => tag !== removedTag);
    this.setState({ brandList:tags });
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
  //适用商品类型发生变化
  couponUseScopeChange =(e)=> {
    this.props.form.resetFields(['pdCode0']);
    let {pdList} = this.state;
    pdList = [{pdCode:'',name:'',displayName:''}];
    this.setState({ //商品列表中的商品要根据适用商品类型来判断---->所以当商品类型变化的时候，要清空商品列表
      pdList
    });
    const {value} = e.target;
    const {coupon} = this.state;
    const newCoupon = _.assign(coupon,{couponUseScope:value});
    this.setState({
      coupon:newCoupon
    })
  }
  //适用门店类型发生变化时
  couponShopScopeChange =(e)=> {
    this.props.form.resetFields(['spShopId0']);
    let {shopList} = this.state;
    shopList = [{spShopId:'',shopName:''}];
    this.setState({ //门店列表中的门店要根据适用门店类型来判断---->所以当门店类型变化的时候，要清空门店列表
      shopList
    });
    const {value} = e.target;
    const {coupon} = this.state;
    const newCoupon = _.assign(coupon,{couponShopScope:value});
    this.setState({
      coupon:newCoupon
    });
  }
  //验证优惠券数修改时只能增加不能减少
  validataCouponCount =(rule,value,callback)=> {
    if(this.state.couponId){
      if(Number(value) < this.state.coupon.couponCount){
        callback('')
      };
      callback();
    };
  }
  render(){
    console.log(this.state.brandList)
    const {
      shopList,
      pdList,
      shopScope,
      spuScope,
      goodTypeList,
      brandList,
      couponUseScopeValue,
      couponShopScopeValue,
      coupon,
    } = this.state;
    const brandIds = [];
    brandList&&brandList.length>0 && brandList.map(item=>{
      brandIds.push(Number(item.value))
    });
    const isEdit = Boolean(this.state.couponId);
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
                    disabled={isEdit}
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
                    <RadioGroup onChange = {this.choice} disabled={isEdit}>
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
                    <Input style={{width:'140px'}} disabled = {!this.state.couponValidDay||isEdit} autoComplete="off"/>
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
                        disabled = {!this.state.couponValidDate||isEdit}
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
              <Input style={{width:'255px'}} placeholder = '请输入优惠券金额' disabled={isEdit} autoComplete="off"/>
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
                  {pattern:/^([1-9]\d*|[0]{1,1})$/,message: '请输入正整数'}
                ],
              })(
                <Input style={{width:'205px'}} disabled={isEdit} autoComplete="off"/>
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
                    {pattern:/^(?:[0-9]{0,4}|10000)$/,message: '0-10000之间的正整数'},
                    {validator:isEdit&&this.validataCouponCount}
                  ],
              })(
                <Input placeholder='请输入0-10000的正整数' style={{width:'255px'}} autoComplete="off"/>
              )
            }　张{isEdit&&<span className='suffix_tips'>修改优惠券总量时只能增加不能减少，请谨慎设置</span>}
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
                  <RadioGroup disabled={isEdit}>
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
                  <CheckboxGroup options={this.options1} disabled={isEdit}/>
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
                <Input value={coupon.couponWarningQty} onChange={this.getCouponQty} style={{width:'100px'}} autoComplete="off"/>　张优惠券时预警，预警邮箱　　
                <Input value={coupon.couponWarningEmail} onChange={this.getCouponEmail} style={{width:'200px'}} autoComplete="off"/>
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
                <TextArea style={{width:'255px'}} placeholder='请输入优惠券说明，50字以内' maxLength='50' rows={6} disabled={isEdit}/>
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
            <Col span={6}>
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
                    <RadioGroup disabled={isEdit}>
                      <Radio style={radioStyle} value='4'>全部商品</Radio>
                      <Radio style={radioStyle} value='1'>一般贸易商品</Radio>
                      <Radio style={radioStyle} value='2'>保税商品</Radio>
                      <Radio style={radioStyle} value='5'>指定品牌</Radio>
                    </RadioGroup>
                  )
                }
              </FormItem>
            </Col>
            { (!isEdit && coupon.couponUseScope == 5) &&
              <Col span={10} style={{'paddingTop':'136px'}}>
                <FormItem>
                  <div>
                    <AutoComplete
                      style={{ width: 200 }}
                      onSelect={this.onGoodTypeSelect}
                      onSearch={this.onGoodTypeSearch}
                      onFocus={this.onGoodTypeSearch}
                      dataSource={goodTypeList}/>
                      <div>
                        {brandList.length>0 &&
                          brandList.map((item,index)=>(
                            <Tag
                              key={index}
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
                  </div>
                </FormItem>
              </Col>
            }
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
                <RadioGroup disabled={isEdit}>
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
              (!isEdit && (coupon.spuScope==1||coupon.spuScope==2) ) &&
              <GoodList
                form={this.props.form}
                couponUseScope={coupon.couponUseScope}
                FormItem={FormItem}
                getFieldDecorator={getFieldDecorator}
                getFile={this.getGoodFile}
                dataSource={pdList}
                delete={this.deleteGood}
                add={this.addGood}
                changeList={this.changepdList}
                brandIds={brandIds}
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
                <RadioGroup disabled={isEdit}>
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
                <RadioGroup disabled={isEdit}>
                  <Radio value={0}>全部可用</Radio>
                  <Radio value={1}>指定门店可用</Radio>
                  <Radio value={2}>指定门店不可用</Radio>
                </RadioGroup>
              )
            }
          </FormItem>
          {
            (!isEdit&&(coupon.shopScope==1 || coupon.shopScope==2))&&
            <FormItem
              className='table_temp_list coupon_list'
              label=''
              labelCol={{span:5}}
              wrapperCol={{span:10}}>
              {
                  <ShopList
                    form={this.props.form}
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
