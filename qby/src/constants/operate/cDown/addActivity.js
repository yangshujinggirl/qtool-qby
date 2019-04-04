import React,{ Component } from 'react';
import { Form,Input, Button,message,DatePicker,Row,Col,Checkbox,Radio } from 'antd';
import GoodList from '../../../components/importData/index'
import ShopList from '../../../components/importData/index'
import Uploadimg from '../../../components/UploadImg/onlyOneImg.js'
import {getInfoApi,addGoodApi,updataGoodApi} from '../../../services/operate/bActPrice'
import { connect } from 'dva'
const FormItem = Form.Item;
const TextArea = Input.TextArea;
const {RangePicker} = DatePicker;
const CheckboxGroup = Checkbox.Group;
const RadioGroup = Radio.Group;
import './index.less'
import UploadData from './components/Upload'
import moment from 'moment'
class Addactivity extends Component {
  constructor(props){
    super(props);
    this.state = {
      warmTime:moment(),
      activityPlat:[],
      shipmentPlat:[1,2],
      isStoreProfit:1,
      activityCostbearer:1,
      remark:'',
      shopType:'',
      beginTime:moment().format('YYYY-MM-DD HH:mm:ss'),
      endTime:moment().add(1,'days').format('YYYY-MM-DD HH:mm:ss'),
      goodList:[{pdCode:'',name:'',displayName:'',toCprice:'',goldCardPrice:'',silverCardPrice:'',activityPrice:''}],
      shopList:[{spShopId:'',shopName:''}],
      options:[
        { label:'线上APP', value:1},
        { label:'线下POS', value:2},
      ],
      optionsWithDisabled:[
        { label:'门店', value:1},
        { label:'仓库', value:2},
      ],
      imageUrl:''
    };
  }
  componentDidMount =()=> {
    if(this.props.data){
      const {activityId} = this.props.data;
      getInfoApi({activityId}).then(res=>{
        if(res.code=='0'){
          const {activityInfo,goodsInfos} = res;
          let activityPlat = [];
          if(activityInfo.activityPlat){
            activityPlat = activityInfo.activityPlat.split('-');
            for(var i=0;i<activityPlat.length;i++){
              activityPlat[i] = Number(activityPlat[i])
            };
          };
          this.setState({
            imageUrl:activityInfo.commodityPic,
            name:activityInfo.name,
            beginTime:activityInfo.beginTime,
            endTime:activityInfo.endTime,
            remark:activityInfo.remark,
            warmTime:activityInfo.warmTime,
            activityPlat,
            // shipmentPlat:activityInfo.shipmentPlat&&activityInfo.shipmentPlat.split('-'),
            // isStoreProfit:activityInfo.isStoreProfit,
            // activityCostbearer:activityInfo.activityCostbearer,
            shopType:activityInfo.shopType,
            goodList:goodsInfos,
            shopList:res.shopList
          });
        };
      })
    };
  }
  //保存
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if(!err){
        const {actTime,warmTime,..._values} = values;
        if(new Date(warmTime).getTime() > new Date(actTime[0]).getTime()){ //if预热时间大于活动时间
          message.error('预热时间需早于活动开始时间')
        }else{
          if(actTime && actTime[0]){
            _values.beginTime = moment(actTime[0]).format('YYYY-MM-DD hh:mm:ss');
            _values.endTime = moment(actTime[1]).format('YYYY-MM-DD hh:mm:ss');
          };
          if(warmTime){
            _values.warmTime = moment(warmTime).format('YYYY-MM-DD hh:mm:ss');
          };
          _values.productList = this.state.goodList;
          _values.shopList = this.state.shopList;
          _values.commodityPic = this.state.imageUrl;
          _values.type = 3;
          if(this.props.data){ //修改
            _values.activityId = this.props.data.activityId;
            this.sendRequest(_values)
          }else{
            this.sendRequest(_values)
          };
        };
      };
    });
  }
  sendRequest =(values)=> {
    if(this.props.data){
      updataGoodApi(values).then(res=>{
        if(res.code == '0'){
          message.success('修改成功');
          this.props.dispatch({
            type:'tab/initDeletestate',
            payload:this.props.componkey+this.props.data.activityId
          });
          this.props.dispatch({
            type:'bActPrice/fetchList',
            payload:{type:3}
          })
        };
      })
    }else{
      addGoodApi(values).then(res=>{
        if(res.code == '0'){
          message.success('新增成功');
          this.props.dispatch({
            type:'tab/initDeletestate',
            payload:this.props.componkey
          });
          this.props.dispatch({
            type:'bActPrice/fetchList',
            payload:{type:3}
          })
        };
      });
    };
  }
  //取消
  cancel =()=> {
    let {componkey} = this.props;
    if(this.props.data){
      componkey = componkey + this.props.data.activityId;
    };
    this.props.dispatch({
        type:'tab/initDeletestate',
        payload:componkey
    });
  }
  //导入商品list
  getGoodFile=(list)=>{
    this.setState({goodList:list});
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
    this.props.form.resetFields([`pdCode`+index,'activitySupplyPrice'+index]);
    this.setState({
      goodList
    });
  }
  //改变商品list
  changeGoodList=(list,index)=>{
    const {goodList} = this.state;
    goodList[index] = list;
    this.setState({goodList});
  }
  //改变门店list
  changeShopList=(list,index)=>{
    const {shopList} = this.state;
    shopList[index] = list;
    this.setState({shopList});
  }
  // 更新商品list
  updataList =(goodList)=> {
    this.setState({goodList});
  }
  //导入门店list
  getShopFile=(list,index)=>{
    this.setState({shopList:list});
  }
  addMd =()=> {
    const {shopList} = this.state;
    const list={shopId:'',shopName:''};
    shopList.push(list)
    this.setState({
      shopList
    });
  }
  deleteMd =(index)=> {
    const {shopList} = this.state;
    shopList.splice(index,1);
    this.props.form.resetFields([`shopId`+index]);
    this.setState({
      shopList
    });
  }
  //修改图片
  changeImg=(imageUrl)=>{
    this.setState({
      imageUrl
    });
  }
  beforeUpload =(file)=> {
    const isJPG = file.type === 'image/png';
    if (!isJPG) {
      message.error('仅支持png格式',.8);
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('上传内容大于2M，请选择2M以内的文件',.8);
    }
    return isJPG && isLt2M;
  }
  //活动门店变化的时候
  actShopChange =(e)=> {
    const {value} = e.target;
    if(value){
      this.setState({
        shopType:value
      });
    };
  }
  //验证生效时间
  validataTime =(rule,value,callback)=> {
    const start = new Date(value[0]).getTime();
    const end = new Date(value[1]).getTime();
    if(end-start > 31536000000){
      callback('活动时间范围不可超过1年')
    };
    callback()
  }
  render(){
    const radioStyle = {
     display: 'block',
     height: '30px',
     lineHeight: '30px',
   };
   const {
     name,
     goodList,
     shopList,
     beginTime,
     endTime,
     warmTime,
     activityPlat,
     shipmentPlat,
     isStoreProfit,
     activityCostbearer,
     remark,
     type,
     options,
     optionsWithDisabled,
     imageUrl,
     shopType
   } = this.state;
    const { getFieldDecorator } = this.props.form;
    const { cBanner } = this.props;
    return(
      <div className='add_act add_cAct'>
        	<Form >
            <div className='title'>基本信息</div>
            <FormItem
              label="活动名称"
              labelCol={{ span:3}}
              wrapperCol={{ span:6}}>
              {getFieldDecorator('name', {
                  initialValue:name,
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
              wrapperCol={{ span:6}}>
              {getFieldDecorator('actTime', {
                  initialValue:[moment(beginTime),moment(endTime)],
                  rules: [
                    { required: true, message: '请选择活动时间'},
                    { validator: this.validataTime}
                  ],
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
              wrapperCol={{ span:10}}>
              {getFieldDecorator('warmTime', {
                  initialValue:moment(warmTime),
                  rules: [{ required: true, message: '请选择预热时间'}],
                })(
                   <DatePicker showTime format="YYYY-MM-DD HH:mm:ss"/>
                )}　<span className='suffix_tips'>预热时间需早于活动开始时间</span>
            </FormItem>
            <FormItem
              label="活动平台"
              labelCol={{ span:3}}
              wrapperCol={{ span:6}}>
              {getFieldDecorator('activityPlat', {
                  initialValue:activityPlat,
                  rules: [{ required: true, message: '请输入优惠券名称'}],
                })(
                <CheckboxGroup options={options}/>
                )}
            </FormItem>
            <FormItem
              label="出货平台"
              labelCol={{ span:3}}
              wrapperCol={{ span:6}}>
              {getFieldDecorator('shipmentPlat', {
                  initialValue:shipmentPlat,
                  rules: [{ required: true, message: '请输入优惠券名称'}],
                })(
                  <CheckboxGroup
                    disabled
                    options={optionsWithDisabled}/>
                )}
            </FormItem>
            <FormItem
              label="是否生成门店利润"
              labelCol={{ span:3}}
              wrapperCol={{ span:6}}>
              {getFieldDecorator('isStoreProfit', {
                  initialValue:isStoreProfit,
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
              wrapperCol={{ span:6}}>
            {getFieldDecorator('activityCostbearer', {
                initialValue:activityCostbearer,
                rules: [{ required: true, message: '请选择活动成本承担方'}],
              })(
                <RadioGroup disabled>
                  <Radio value={1}>是</Radio>
                  <Radio value={0}>否</Radio>
                </RadioGroup>
              )}
            </FormItem>
            <FormItem
              className='must-pic'
              label="活动商品悬浮图"
              labelCol={{ span:3}}
              wrapperCol={{ span:6}}>
              <Uploadimg
                imageUrl={imageUrl}
                name='imgFile'
                action='/erpWebRest/qcamp/upload.htm?type=brand'
                beforeUpload={this.beforeUpload}
                changeImg={this.changeImg}/>
              <span className='suffix_tips'>仅支持png格式</span>
            </FormItem>
            <FormItem
              label="活动备注"
              labelCol={{ span: 3}}
              wrapperCol={{ span: 6}}
              className='act_remark'>
              {getFieldDecorator('remark', {
                  initialValue:remark,
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
                className='table_temp_list'
              >
                <GoodList
                  form={this.props.form}
                  FormItem={FormItem}
                  getFieldDecorator={getFieldDecorator}
                  getFile={this.getGoodFile}
                  dataSource={goodList}
                  delete={this.deleteGood}
                  add={this.addGood}
                  changeList={this.changeGoodList}
                  updataList={this.updataList}
                  addText='+商品'
                  type='5'/>
              </FormItem>
              <FormItem
                label="活动门店"
                labelCol={{ span:3}}
                wrapperCol={{ span:6}}>
              {getFieldDecorator('shopType', {
                  initialValue:shopType,
                  rules: [{ required: true, message: '请选择活动成本承担方'}],
                  onChange:this.actShopChange
                })(
                  <RadioGroup>
                    <Radio style={radioStyle} value={1}>全部门店</Radio>
                    <Radio style={radioStyle} value={2}>加盟店</Radio>
                    <Radio style={radioStyle} value={3}>直联营店</Radio>
                    <Radio style={radioStyle} value={4}>指定门店</Radio>
                  </RadioGroup>
                )}
              </FormItem>
              {
                shopType == 4 &&
                <FormItem
                    className='table_temp_list'
                    label="选择门店"
                    labelCol={{ span: 4}}
                    wrapperCol={{ span: 12}}>
                    <ShopList
                      form={this.props.form}
                      FormItem={FormItem}
                      getFieldDecorator={getFieldDecorator}
                      getFile={this.getShopFile}
                      dataSource={shopList}
                      delete={this.deleteMd}
                      add={this.addMd}
                      changeList={this.changeShopList}
                      addText='+门店'
                      type='1'/>
                </FormItem>
              }
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
