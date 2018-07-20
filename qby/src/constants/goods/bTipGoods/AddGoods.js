import React,{ Component } from 'react';
import { connect } from 'dva';
import {
  Form,Row,Col,
  Input,Button,Icon,
  Select ,AutoComplete,Upload,
  message,Radio,DatePicker
} from 'antd';
import moment from 'moment'
import {
  goodsBrandApi,
  goodSaveApi,
  searchValApi,
  saveValApi
} from '../../../services/goodsCenter/baseGoods.js';
import UpLoadFile from './components/UpLoadFile/index.js';
import GoodsInfo from './components/GoodsInfo/index.js';
import EditableCell from './components/EditableCell/index.js';
import Creatlabel from './components/Creatlabel/index.js'
import AddGoodsDesc from '../components/AddGoodsDesc/index.js'
import './AddGoods.css';


const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;

const formItemLayout = {
  labelCol: {
    span: 6
  },
  wrapperCol: {
    span: 6
  }
};
const formItemLayout2 = {
  labelCol: {
    span: 6
  },
  wrapperCol: {
    span: 14
  }
};

class AddGoodsForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      brandDataSource:[],
      disabledOne:true,
      disabledTwo:true,
      specOneId:'',//商品规格
    }
  }
  componentWillMount() {
    this.initGoodslabel();
    this.initPage()
  }

  //编辑or新增
  initPage() {
    const { pdSpuId, source } =this.props.data;
    if(pdSpuId) {
      this.props.dispatch({
        type:'addGoods/fetchGoodsInfo',
        payload:{
          pdSpuId,
          source
        }
      })
    } else {
      this.props.dispatch({
        type:'addGoods/resetData'
      })
    }
  }
  //初始化商品规格，分类,品牌
  initGoodslabel() {
    this.props.dispatch({
      type:'addGoods/fetchGoodsType',
      payload:{
				enabled:true
			}
    })
    this.props.dispatch({
      type:'addGoods/fetchCategory',
      payload:{
				getChildren:false,
				enabled:true,
				type:'2'
			}
    })
  }
  //品牌搜索
  handleSearch(value) {
    goodsBrandApi({name:value})
    .then(res => {
      if(res.code == '0') {
        const { brands } = res;
        let data = brands.map(el=>(
          {
            text:el.name,
            value:el.pdBrandId
          }
        ))
        this.setState({
          brandDataSource:data
        })
      }
    })
  }
  //取消
  onCancel(){
    const { key } = this.props.data;
    const pane = eval(sessionStorage.getItem("pane"));
    if(pane.length<=1){return}
    this.props.dispatch({
      type:'addGoods/resetData'
    })
    this.props.dispatch({
            type:'tab/initDeletestate',
            payload:key
    });

  }
  //提交
  handleSubmit = (e) => {
    const { pdSpuId, source } =this.props.data;
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      console.log(values)
      if (!err) {
        if(pdSpuId) {
          values = Object.assign(values,{
            pdSpuId,
            source
          })
        } else {
          values = Object.assign(values,{ source })
        }
        if(source == 1) {
          this.saveOnLineGoods(values)
        } else {
          this.saveOutLineGoods(values)
        }
      }
    });
  }
  //提交api
  saveOnLineGoods(values) {
    goodSaveApi(values)
    .then(res=> {
      console.log(res)
    },error=> {
      console.log(error)
    })
  }
  //提交线下api
  saveOutLineGoods(values) {
    goodSaveApi(values)
    .then(res=> {
      console.log(res)
    },error=> {
      console.log(error)
    })
  }
  //商品规格1change事件
  handleChangeOne =(option)=> {
    this.setState({
      disabledOne:!option,
      specOneId:option
    })
    let emptyArr = [];
    this.props.dispatch({
      type:'addGoods/handleSpec',
      payload:{specOne:emptyArr,specTwo:emptyArr}
    })
  }
  //商品规格2change事件
  handleChangeTwo =(option)=> {
    this.setState({
      disabledTwo:!option
    })
  }
  //删除商品属性
  deleteGoodsLabel(tags,type) {
    this.props.dispatch({
      type:'addGoods/deleteSpec',
      payload:{
        payloadVal:tags,
        type
      }
    })
  }
  //新建商品属性
  addGoodsLabel(inputValue,type) {
    const { specOneId } =this.state;
    const values={
			pdTypeId:specOneId,
      inputValue,
      type
		}
    this.searchVal(values);
  }
  //查询Api
  searchVal(values) {
    const { pdTypeId,inputValue,type} = values;
    let params = {
          pdTypeId,
    			enabled:true,
    			firstent:true,
        }
    searchValApi(params)
    .then(res => {
      const { pdTypeVals } =res;
      const filterValues = pdTypeVals.filter((el) => {
        return el.name == inputValue;
      })
      let payloadVal = {
        name:filterValues[0].name,
        key:filterValues[0].pdTypeValId
      }
      if(filterValues.length >0) {
        this.props.dispatch({
          type:'addGoods/addSpec',
          payload:{payloadVal,type}
        })
      } else {
        let paramsTwo={
              pdTypeVal:{
                pdTypeId,
                name:inputValue,
                status:'1'
              }
        }
        this.goSaveTypeVal(values);
      }
    },err => {

    })
  }
  //保存value值
  goSaveTypeVal(values) {
    const { pdTypeId,inputValue,type} = values;
    const params={
              pdTypeVal:{
                pdTypeId,
                name:inputValue,
                status:'1'
              }
          }
    saveValApi(params)
    .then(res => {
      this.searchVal(values)
    }, err=> {
      console.log(err)
    })
  }


  render() {
    const { getFieldDecorator } = this.props.form;
    const {
      goodsCategory,
      goodsType,
      pdSpu,
      fileList,
    } = this.props.addGoods;
    return(
      <div className="add-goods-components">
        <Form className="qtools-form-components">
          <Row wrap>
            <Col span={24}>
              <FormItem label='商品名称' {...formItemLayout}>
                 {
                   getFieldDecorator('name', {
                     rules: [{ required: true, message: '请输入商品名称'}],
                     initialValue:pdSpu.name
                   })(
                     <Input placeholder="请输入商品名称" disabled/>
                   )
                 }
               </FormItem>
            </Col>
            <Col span={24}>
              <FormItem label='B端名称' {...formItemLayout}>
                 {
                   getFieldDecorator('bname', {
                     rules: [{ required: true, message: '请输入商品名称'}],
                     initialValue:pdSpu.name
                   })(
                     <Input placeholder="请输入商品名称"/>
                   )
                 }
               </FormItem>
            </Col>
            <Col span={24}>
              <FormItem label='一级分类' {...formItemLayout}>
                 {
                   getFieldDecorator('pdCategory1Id',{
                     rules: [{ required: true, message: '请选择商品分类'}],
                     initialValue:pdSpu.pdCategory1Id
                   })(
                    <Select placeholder="请选择商品分类" disabled>
                      {
                        goodsCategory.length>0 &&
                        goodsCategory.map((ele,index) => (
                          <Option value={ele.pdCategoryId} key={ele.pdCategoryId}>{ele.name}</Option>
                        ))
                      }
                    </Select>
                   )
                 }
               </FormItem>
            </Col>
            <Col span={24}>
              <FormItem label='二级分类' {...formItemLayout}>
                 {
                   getFieldDecorator('pdCategory2Id',{
                     rules: [{ required: true, message: '请选择商品类型'}],
                     initialValue:pdSpu.pdCategory2Id
                   })(
                     <Select placeholder="请选择商品类型" disabled>
                       {
                         goodsType.length>0 &&
                         goodsType.map((ele,index) => (
                           <Option value={ele.pdTypeId} key={ele.pdTypeId}>{ele.name}</Option>
                         ))
                       }
                     </Select>
                   )
                 }
               </FormItem>
            </Col>
            <Col span={24}>
              <FormItem label='商品图片' {...formItemLayout2}>
                 <UpLoadFile
                   fileList={fileList}
                   getFieldDecorator={getFieldDecorator}/>
               </FormItem>
            </Col>
            <Col span={24}>
              <FormItem label='商品信息' {...formItemLayout2}>
                 <GoodsInfo
                   getFieldDecorator={getFieldDecorator}
                   isHasSize={this.props.addGoods.specOne.length>0?true:false}/>
               </FormItem>
            </Col>
            <Col span={24}>
              <FormItem label='箱规销售' {...formItemLayout}>
                 {getFieldDecorator('containerSpec',{
                   rules: [{ required: true, message: '请选择商品状态'}]
                 })(
                   <Input placeholder="Username" />
                 )}
               </FormItem>
            </Col>
            <Col span={24}>
              <FormItem label='上新商品' {...formItemLayout}>
                 {getFieldDecorator('isNew')(
                   <RadioGroup>
       							<Radio value={true}>是</Radio>
       							<Radio value={false}>否</Radio>
       						 </RadioGroup>
                 )}
               </FormItem>
            </Col>
            <Col span={24}>
              <FormItem label='畅销商品' {...formItemLayout}>
                 {getFieldDecorator('isHot')(
                   <RadioGroup>
       							<Radio value={true}>是</Radio>
       							<Radio value={false}>否</Radio>
       						 </RadioGroup>
                 )}
               </FormItem>
            </Col>
            <Col span={24}>
              <FormItem label='直邮商品' {...formItemLayout}>
                 {getFieldDecorator('isDirectExpress')(
                   <RadioGroup>
       							<Radio value={true}>是</Radio>
       							<Radio value={false}>否</Radio>
       						 </RadioGroup>
                 )}
               </FormItem>
            </Col>
            <Col span={24}>
              <FormItem label='预售商品' {...formItemLayout}>
                 {getFieldDecorator('isPresell')(
                   <RadioGroup>
       							<Radio value={true}>是</Radio>
       							<Radio value={false}>否</Radio>
       						 </RadioGroup>
                 )}
               </FormItem>
            </Col>
            <Col span={24}>
              <FormItem label='试销天数' {...formItemLayout}>
                 {
                   getFieldDecorator('trialDay',{
                     initialValue:moment('2015-06-06')
                   })(
                      <Input placeholder="Username" />
                   )
                 }
               </FormItem>
            </Col>
            <Col span={24}>
              <FormItem label='缺货天数' {...formItemLayout}>
                 {
                   getFieldDecorator('outStockDay',{
                     initialValue:moment('2015-06-06')
                   })(
                      <Input placeholder="Username" />
                   )
                 }
               </FormItem>
            </Col>
            <Col span={24}>
              <FormItem label='缺货率' {...formItemLayout}>
                 {
                   getFieldDecorator('outStockRate',{
                     initialValue:moment('2015-06-06')
                   })(
                      <Input placeholder="Username" />
                   )
                 }
               </FormItem>
            </Col>
            <Col span={24}>
              <FormItem label='目标周转天数' {...formItemLayout}>
                 {
                   getFieldDecorator('targetTurnoverDay',{
                     initialValue:moment('2015-06-06')
                   })(
                      <Input placeholder="Username" />
                   )
                 }
               </FormItem>
            </Col>
            <Col span={24}>
              <FormItem label='商品描述' {...formItemLayout}>
                <AddGoodsDesc
                  getFieldDecorator={getFieldDecorator}/>
               </FormItem>
            </Col>
            <Col span={24}>
              <FormItem>
                <div className="btns-list">
                 <Button type="default" onClick={this.onCancel.bind(this)}>取消</Button>
                 <Button type="primary" onClick={this.handleSubmit.bind(this)}>保存</Button>
                </div>
               </FormItem>
            </Col>
          </Row>
        </Form>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { addGoods } = state;
  return { addGoods }
}

const BtipAddGoods = Form.create()(AddGoodsForm);
export default connect(mapStateToProps)(BtipAddGoods);
