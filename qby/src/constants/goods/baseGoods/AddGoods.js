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
  saveValApi,
  goodSaveOutLineApi,
  getCountryListApi,
  getWareListApi
} from '../../../services/goodsCenter/baseGoods.js';
import UpLoadFileModal from '../components/UpLoadFileModal/index.js';
import GoodsInfo from './components/GoodsInfo/index.js';
import OutLineGoodsInfo from './components/OutLineGoodsInfo/index.js';
import EditableCell from './components/EditableCell/index.js';
import Creatlabel from './components/Creatlabel/index.js';
import UploadDropImg from '../../../components/UploadDropImg/upload.js';

import {
NumberOption,
WarehouseOption,
GoosStatusOption,
SalePropertyOption,
LotStatusOption
} from '../../../components/FixedDataSource';
import './AddGoods.less';


const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;

const formItemLayout = {
  labelCol: {
    span: 8
  },
  wrapperCol: {
    span: 6
  }
};
const formItemLayout2 = {
  labelCol: {
    span: 4
  },
  wrapperCol: {
    span: 16
  }
};
const formItemLayout3 = {
  labelCol: {
    span: 8
  },
  wrapperCol: {
    span: 16
  }
};

class AddGoodsForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spuIdPics:[],//商品图片
      isBrandDirectMail:false,
      pdTaxWarehouses:[],
      brandDataSource:[],
      loading:false,
      isEdit:false
    }
  }
  componentDidMount() {
    this.initPage();
    this.initGoodslabel();
    this.getWareList();
  }
  getWareList =()=> {
    getWareListApi()
    .then(res=>{
      if(res.code == '0'){
        this.setState({
          pdTaxWarehouses:res.pdTaxWarehouses
        })
      }
    })
  }
  //编辑or新增
  initPage() {
    const { pdSpuId, source } = this.props.data;
    if(pdSpuId) {
      this.props.dispatch({
        type:'addGoods/fetchGoodsInfo',
        payload:{
          pdSpuId,
          source
        },
        callback:(spuIdPics)=>{
          this.setState({
            spuIdPics
          });
        }
      });
      this.setState({
        isEdit:true
      });
    } else {
      this.props.dispatch({ //如果是新增先重置deliveryExplain的值
        type:'addGoods/setdeliveryExplain',
        payload:{deliveryExplain:false}
      });
      this.setState({
        isEdit:false
      });
    };
  }
  //初始化商品规格，分类,品牌
  initGoodslabel() {
    const { pdSpuId, source } =this.props.data;
    this.props.dispatch({
      type:'addGoods/resetData',
      payload:source
    });
    this.props.dispatch({
      type:'addGoods/fetchGoodsType',
      payload:{
				enabled:true
			}
    })
    this.props.dispatch({
      type:'addGoods/fetchCategory',
      payload:{
        level:1,
        parentId:null
			}
    });
  }
  //分类change事件
  handleChangeLevel(level,selected){
    let { isLevelTwo, isLevelThr, isLevelFour } = this.state;
    level++;
    this.props.dispatch({
      type:'addGoods/fetchCategory',
      payload:{
        level,
        parentId:selected
      }
    })
    //请空表单中的value值
    switch(level) {
      case 2:
        this.props.form.setFieldsValue({
          pdCategory2Id:'',
          pdCategory3Id:'',
          pdCategory4Id:''
        });
        break;
      case 3:
        this.props.form.setFieldsValue({
          pdCategory3Id:'',
          pdCategory4Id:''
        });
        break;
      case 4:
        this.props.form.setFieldsValue({
          pdCategory4Id:''
        });
        break;
    }
  }
  //品牌搜索
  handleSearch(value) {
    this.props.dispatch({ type: 'tab/loding', payload:true});
    goodsBrandApi({name:value})
    .then(res => {
      if(res.code == '0') {
        const { brands } = res;
        let data = brands.map(el=>(
          {
            text:el.name,
            value:el.pdBrandId
          }
        ));
        this.props.dispatch({ type: 'tab/loding', payload:false});
        this.setState({
          brandDataSource:data
        })
      }
    })
  }
  //国家搜索
  handleSearchCountry(value) {
    this.props.dispatch({ type: 'tab/loding', payload:true});
    getCountryListApi({name:value,status:1})
    .then(res => {
      if(res.code == '0') {
        const { countrys } = res;
        let data = countrys.map(el=>(
          {
            text:el.name,
            value:el.pdCountryId
          }
        ))
        this.props.dispatch({ type: 'tab/loding', payload:false});
        this.setState({
          countryDataSource:data
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
    });
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
      if (!err) {
        if(pdSpuId) {
          values = Object.assign(values,{
            pdSpuId
          });
        };
        values = this.formParams(values);
        this.saveOnLineGoods({iPdSpu:values},source);
      }
    });
  }
  //格式化数据
  formParams(values) {
    if(values && values.taxRate){
      if(values.taxRate.indexOf("%") != -1){
        values.taxRate = values.taxRate.replace("%","");
      };
      values.name = values.name.trim();
    };
    //取出store中id品牌，国家
    values.pdBrandId = this.props.addGoods.autoComplete.pdBrandId;
    values.pdCountryId = this.props.addGoods.autoComplete.pdCountryId;
    //处理商品图片
    let spuPics = this.state.spuIdPics;
    //处理商品信息,如果是skus商品
    let pdSkus = values.pdSkus;
    if(pdSkus&&pdSkus.length>0) {
      let { pdSkus: paramsPdSkus, sizeIdList, specData } =this.props.addGoods;
      pdSkus.map((el,index) => {
        el.pdType1Id = sizeIdList.pdSkusSizeOne;//规格1id
        //选好规格，属性2没选时，属性置Null
        if(specData.specTwo.length == 0) {
          el.pdType2Id = null;//规格2id
        } else {
          el.pdType2Id = sizeIdList.pdSkusSizeTwo;//规格2id
        }
        el.pdType1ValId = paramsPdSkus[index].pdType1ValId;//属性1id
        el.pdType2ValId = paramsPdSkus[index].pdType2ValId;//属性2id
        //格式化商品信息图片
        if(el.picUrl&&(el.picUrl instanceof Array)) {
          if(el.picUrl.length>0) {
            if(el.picUrl[0].url) {
              el.picUrl = el.picUrl[0].name;
            } else {
              el.picUrl = el.picUrl[0].response.data[0];
            };
          } else {
            el.picUrl = '';
          };
        }
        return el
      })
    }
    //处理时间
    if(values.listTimeEnd&&values.listTimeStart) {
      values.listTimeStart = moment(values.listTimeStart).format('YYYY-MM-DD')
      values.listTimeEnd = moment(values.listTimeEnd).format('YYYY-MM-DD')
    }
    values ={...values,spuPics, pdSkus};
    return values;
  }
  //提交api
  saveOnLineGoods(values,source) {
    let tips = this.state.isEdit?'修改成功':'新建成功';
    this.setState({
      loading:true
    })
    let saveApi;
    if(source == 1) {//线上
      saveApi = goodSaveApi;
    } else {//线下
      saveApi = goodSaveOutLineApi;
    }
    saveApi(values)
    .then(res=> {
      const { code } =res;
      if(code == '0') {
        this.setState({
          loading:false
        })
        message.success(tips,1);
        this.onCancel();
        this.props.dispatch({
          type:'baseGoodsList/fetchList',
          payload:{...this.props.data.listParams}
        })
      } else {
        this.setState({
          loading:false
        })
      }
    },error=> {
    })
  }
  //商品规格change事件
  handleChangeOne(type,option) {
    //重置商品规格id,商品属性
    if(option==0&&type=='one') {
      this.props.form.setFieldsValue({
        pdSkus:undefined
      })
    }
    this.props.dispatch({
      type:'addGoods/changeTypesId',
      payload:{
        typeId:option,
        type
      }
    })
  }
  //删除商品属性
  deleteGoodsLabel(tags,type) {
    let forms = this.props.form;
    //删除时要清掉form中的历史值，重置pdSkus
    let currentDeleteObj = [];//当前被删项
    if(type == 'one') {
      this.props.addGoods.pdSkus.map((el,index) => {
        if(el.pdType1ValId == tags.key) {
          currentDeleteObj.push(el)
        }
      })
    } else {
      this.props.addGoods.pdSkus.map((el,index) => {
        if(el.pdType2ValId == tags.key) {
          currentDeleteObj.push(el)
        }
      })
    }
    let pdSkus = forms.getFieldsValue(['pdSkus']);
    currentDeleteObj.map((el,index) => {
      pdSkus.pdSkus.map((ee,idx) => {
        if(el.name == ee.name) {
          pdSkus.pdSkus.splice(idx,1);
        }
      })
    })
    forms.setFieldsValue({
      pdSkus:pdSkus.pdSkus
    });
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
    const { pdSkusSizeOne, pdSkusSizeTwo } =this.props.addGoods.sizeIdList;
    let pdTypeId;
    if(type == 'one') {
      pdTypeId = pdSkusSizeOne;
    } else {
      pdTypeId = pdSkusSizeTwo;
    }
    const values={
			pdTypeId,
      inputValue,
      type
		}
    this.searchVal(values);
  }
  //查询Api
  searchVal(values) {
    this.props.dispatch({ type: 'tab/loding', payload:true});
    const { pdTypeId,inputValue,type} = values;
    let params = {
          pdTypeId,
    			enabled:true,
    			firstent:true,
        }
    searchValApi(params)
    .then(res => {
      const { pdTypeVals } =res;
      //查询属性列表是否为空
      if(pdTypeVals.length ==0) {
        this.goSaveTypeVal(values);
        return;
      }
      //查询是否存在属性
      const filterValues = pdTypeVals.filter((el) => {
        return el.name == inputValue;
      })
      if(filterValues.length >0) {
        let payloadVal = {
          name:filterValues[0].name,
          key:filterValues[0].pdTypeValId
        }
        this.props.dispatch({
          type:'addGoods/addSpec',
          payload:{payloadVal,type}
        })
      } else {
        this.goSaveTypeVal(values);
      }
      this.props.dispatch({ type: 'tab/loding', payload:false});
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
    })
  }
  //季节商品change事件
  changeSeason =(e)=> {
    const value = e.target.value;
    this.props.dispatch({
      type:'addGoods/setLinkageLabel',
      payload:{
        type:'season',
        value:!!value,
      }
    })
    this.props.form.resetFields(['listTimeStart','listTimeEnd']);
  }
  changeBrand =(e)=> {
    const value = e.target.value;
    this.props.dispatch({
      type:'addGoods/setdeliveryExplain',
      payload:{deliveryExplain:value}
    });
    this.props.form.resetFields('deliveryExplain');
  }
  //批次管理change事件
  changeLotStatus =(e)=> {
    const value = e.target.value;
    this.props.dispatch({
      type:'addGoods/setLinkageLabel',
      payload:{
        type:'lot',
        value:!!value,
      }
    })
    this.props.form.resetFields(['expdays','lotType','lotLimitInDay']);
  }
  //品牌，国家选中事件
  autoSelect(type,e) {
    this.props.dispatch({
      type:'addGoods/setAutoCompleteId',
      payload:{
        type,
        selectId:e
      }
    })
  }
  //比例自定义校验
  validatorShareRatio(rule, value, callback) {
    if(value && value>=100) {
      callback('分成比例不能大于100');
    } else if(value && value==0){
      callback('分成比例不能小于0');
    }else{
      callback();
    }
  }
  //校验配送说明
  handleDelivery =(rule, value, callback)=> {
    if(value){
      if(value>30 || value == 0){
        callback('请输入1~30整数')
      };
    };
    callback();
  }
  //更新商品图片
  updateSpuIdPics =(spuIdPics)=> {
    this.setState({
      spuIdPics
    });
  }
  render() {
    const {deliveryExplain} = this.props.addGoods;
    const { getFieldDecorator } = this.props.form;
    const {
      categoryData,
      goodsType,
      pdSpu,
      fileList,
      sizeIdList,
      specData,
      linkageLabel,
    } = this.props.addGoods;
    const { loading,pdTaxWarehouses,isBrandDirectMail,spuIdPics} =this.state;
    return(
      <div className="add-goods-components" >
        <Form className="qtools-form-components">
          <Row wrap>
            <Col span={24}>
              <FormItem label='商品名称' {...formItemLayout}>
                 {
                   getFieldDecorator('name', {
                     rules: [{ required: true, message: '请输入商品名称'}],
                     initialValue:pdSpu.name
                   })(
                     <Input placeholder="请输入商品名称" maxLength='32' autoComplete="off"/>
                   )
                 }
               </FormItem>
            </Col>
            <Col span={24}>
              <FormItem label='一级分类' {...formItemLayout}>
                 {
                   getFieldDecorator('pdCategory1Id',{
                     rules: [{ required: true, message: '请选择商品分类'}],
                     initialValue:pdSpu.pdCategory1Id,
                     onChange:(select)=>this.handleChangeLevel(1,select)
                   })(
                    <Select placeholder="请选择商品分类">
                      {
                        categoryData.categoryLevelOne.length>0 &&
                        categoryData.categoryLevelOne.map((ele,index) => (
                          <Option
                            value={ele.pdCategoryId}
                            key={ele.pdCategoryId}>{ele.name}</Option>
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
                     initialValue:pdSpu.pdCategory2Id,
                     onChange:(select)=>this.handleChangeLevel(2,select)
                   })(
                     <Select
                       placeholder="请选择商品类型"
                       disabled={categoryData.isLevelTwo}
                       autoComplete="off">
                       {
                         categoryData.categoryLevelTwo.length>0 &&
                         categoryData.categoryLevelTwo.map((ele,index) => (
                           <Option
                             value={ele.pdCategoryId}
                             key={ele.pdCategoryId}>{ele.name}</Option>
                         ))
                       }
                     </Select>
                   )
                 }
               </FormItem>
            </Col>
            <Col span={24}>
              <FormItem label='三级分类' {...formItemLayout}>
                 {
                   getFieldDecorator('pdCategory3Id',{
                     rules: [{ required: true, message: '请选择商品类型'}],
                     initialValue:pdSpu.pdCategory3Id,
                     onChange:(select)=>this.handleChangeLevel(3,select)
                   })(
                     <Select
                       placeholder="请选择商品类型"
                       disabled={categoryData.isLevelThr}
                       autoComplete="off">
                       {
                         categoryData.categoryLevelThr.length>0 &&
                         categoryData.categoryLevelThr.map((ele,index) => (
                           <Option
                             value={ele.pdCategoryId}
                             key={ele.pdCategoryId}>{ele.name}</Option>
                         ))
                       }
                     </Select>
                   )
                 }
               </FormItem>
            </Col>
            <Col span={24}>
              <FormItem label='四级分类' {...formItemLayout}>
                 {
                   getFieldDecorator('pdCategory4Id',{
                     rules: [{ required: true, message: '请选择商品类型'}],
                     initialValue:pdSpu.pdCategory4Id,
                   })(
                     <Select
                       placeholder="请选择商品类型"
                       disabled={categoryData.isLevelFour}
                       autoComplete="off">
                       {
                         categoryData.categoryLevelFour.length>0 &&
                         categoryData.categoryLevelFour.map((ele,index) => (
                           <Option
                             value={ele.pdCategoryId}
                             key={ele.pdCategoryId}>{ele.name}</Option>
                         ))
                       }
                     </Select>
                   )
                 }
               </FormItem>
            </Col>
            <Col span={24}>
              <FormItem label='品牌' {...formItemLayout}>
                 {
                   getFieldDecorator('pdBrandId',{
                     rules: [{ required: true, message: '请选择商品品牌'}],
                     initialValue:pdSpu.pdBrand&&pdSpu.pdBrand.name
                   })(
                     <AutoComplete
                      dataSource={this.state.brandDataSource}
                      onSearch={this.handleSearch.bind(this)}
                      onSelect={(e)=>this.autoSelect('brand',e)}
                      placeholder="请选择商品品牌"/>
                   )
                 }
               </FormItem>
            </Col>
            <Col span={24}>
              <FormItem label='国家地区' {...formItemLayout}>
                 {getFieldDecorator('pdCountryId',{
                   rules: [{ required: true, message: '请选择国家地区'}],
                   initialValue:pdSpu.ipdCountry&&pdSpu.ipdCountry.name
                 })(
                    <AutoComplete
                     onSelect={(e)=>this.autoSelect('country',e)}
                     dataSource={this.state.countryDataSource}
                     onSearch={this.handleSearchCountry.bind(this)}
                     placeholder="请输入国家地区"/>
                 )}
               </FormItem>
            </Col>
            <Col span={24}>
              <FormItem label='商品图片' {...formItemLayout3}>
                <div id="goods-pic">
                   <UploadDropImg
                      name="imgFile"
                      action='/erpWebRest/qcamp/upload.htm?type=spu'
                      imgBoxs={spuIdPics}
                      updatePropsImgbox={this.updateSpuIdPics}
                   />
                 </div>
               </FormItem>
            </Col>
            <Col span={24}>
              <FormItem label='商品规格1' {...formItemLayout}>
                 {
                   getFieldDecorator('pdType1Id',{
                     initialValue:sizeIdList.pdSkusSizeOne,
                     onChange:(selected)=>this.handleChangeOne('one',selected)
                   })(
                    <Select
                      placeholder="请选择商品分类"
                      autoComplete="off">
                      <Option value={0} key={0}>无</Option>
                      {
                        goodsType.length>0 &&
                        goodsType.map((ele,index) => (
                          <Option
                            value={ele.pdTypeId}
                            key={ele.pdTypeId}>{ele.name}</Option>
                        ))
                      }
                    </Select>
                   )
                 }
                 <Creatlabel
                   disabled={sizeIdList.pdSkusSizeOne?false:true}
                   deleteGoodsLabel={this.deleteGoodsLabel.bind(this)}
                   addGoodsLabel={this.addGoodsLabel.bind(this)}
                   level="one"/>
               </FormItem>
            </Col>
            {
              sizeIdList.pdSkusSizeOne&&specData.specOne.length>0&&
              <Col span={24}>
                <FormItem label='商品规格2' {...formItemLayout}>
                   {
                     getFieldDecorator('pdType2Id',{
                       initialValue:sizeIdList.pdSkusSizeTwo,
                       onChange:(selected)=>this.handleChangeOne('two',selected)
                     })(
                      <Select placeholder="商品规格2" autoComplete="off">
                        <Option value={0} key={0}>无</Option>
                        {
                          goodsType.length>0 &&
                          goodsType.map((ele,index) => (
                            <Option value={ele.pdTypeId} key={ele.pdTypeId}>{ele.name}</Option>
                          ))
                        }
                      </Select>
                     )
                   }
                   <Creatlabel
                     disabled={sizeIdList.pdSkusSizeTwo?false:true}
                     deleteGoodsLabel={this.deleteGoodsLabel.bind(this)}
                     addGoodsLabel={this.addGoodsLabel.bind(this)}
                     level="two"/>
                 </FormItem>
              </Col>
            }
            {
              this.props.data.source==1?
              <GoodsInfo
                form={this.props.form}/>
                :
              <OutLineGoodsInfo
                form={this.props.form}/>
            }
            {
              this.props.data.source==1?
              <div>
                <Col span={24}>
                  <FormItem label='保税仓库' {...formItemLayout}>
                     {getFieldDecorator('pdTaxWarehouseId',{
                       rules: [{ required: true, message: '请选择保税仓库'}],
                       initialValue:pdSpu.pdTaxWarehouse && pdSpu.pdTaxWarehouse.pdTaxWarehouseId
                     })(
                       <Select placeholder="请选择" allowClear={false}>
                         {pdTaxWarehouses.length>0 &&
                           pdTaxWarehouses.map((el) => (
                             <Option value={el.pdTaxWarehouseId} key={el.pdTaxWarehouseId}>{el.name}</Option>
                           ))
                         }
                       </Select>
                     )}
                   </FormItem>
                </Col>
                <Col span={24}>
                  <FormItem label='关税综合税率' {...formItemLayout}>
                     {getFieldDecorator('taxRate',{
                       rules: [{ required: true, message: '请选择关税综合税率'}],
                       initialValue:pdSpu.taxRate
                     })(
                       <Select placeholder="请选择" allowClear={false}>
                         <Option key={0} value='6.3'>6.3%</Option>
                         <Option key={1} value='7'>7%</Option>
                         <Option key={2} value='9.1'>9.1%</Option>
                         <Option key={3} value='9.2'>9.2%</Option>
                         <Option key={4} value='11.2'>11.2%</Option>
                         <Option key={5} value='17.889'>17.889%</Option>
                         <Option key={6} value='20.222'>20.222%</Option>
                         <Option key={7} value='23.059'>23.059%</Option>
                         <Option key={8} value='25.529'>25.529%</Option>
                         <Option key={9} value='28.875'>28.875%</Option>
                         <Option key={10} value='31.5'>31.5%</Option>

                       </Select>
                     )}
                   </FormItem>
                </Col>
                <Col span={24}>
                  <FormItem label='分成比例' {...formItemLayout} className="addonAfter-inputs-common">
                     {getFieldDecorator('shareRatio',{
                       initialValue:pdSpu.shareRatio&&Number(pdSpu.shareRatio)||'',
                       rules: [
                         {required:true,message:"请输入分成比例"},
                         { pattern:/^\d+(\.\d{0,2})?$/,message:'请输入小于等于两位小数的数字'},
                         { validator:this.validatorShareRatio }
                       ]
                     })(
                       <Input placeholder="请输入分成比例" autoComplete="off" addonAfter="%"/>
                     )}
                   </FormItem>
                </Col>
              </div>
              :
              <div>
                <Col span={24}>
                  <FormItem label='商品状态' {...formItemLayout}>
                     {getFieldDecorator('spuStatus',{
                       rules: [{ required: true, message: '请选择商品状态'}],
                       initialValue:pdSpu.spuStatus
                     })(
                       <Select placeholder="请选择商品状态" autoComplete="off">
                         {
                           GoosStatusOption.map((el) => (
                             <Option value={el.key} key={el.key}>{el.value}</Option>
                           ))
                         }
                       </Select>
                     )}
                   </FormItem>
                </Col>
                <Col span={24}>
                  <FormItem label='销售属性' {...formItemLayout}>
                     {getFieldDecorator('salesAttr',{
                       rules: [{ required: true, message: '请选择销售属性'}],
                       initialValue:pdSpu.salesAttr
                     })(
                       <Select placeholder="请选择销售属性" autoComplete="off">
                         {
                           SalePropertyOption.map((el) => (
                             <Option value={el.key} key={el.key}>{el.value}</Option>
                           ))
                         }
                       </Select>
                     )}
                   </FormItem>
                </Col>
                <Col span={24}>
                  <FormItem label='品牌直供' {...formItemLayout}>
                     {getFieldDecorator('brandDirectMail',{
                       rules:[{required:true, message: '请输入品牌直供'}],
                       initialValue:pdSpu.brandDirectMail||0,
                       onChange:this.changeBrand
                     })(
                       <RadioGroup>
                         {
                           NumberOption.map((el) => (
                             <Radio value={el.key} key={el.key}>{el.value}</Radio>
                           ))
                         }
           						 </RadioGroup>
                     )}
                   </FormItem>
                </Col>
                <Col span={24}>
                  <FormItem label='配送说明' {...formItemLayout3}>
                    品牌直邮，预计　
                     {getFieldDecorator('deliveryExplain',{
                       rules: [
                         {required:deliveryExplain, message: '请输入配送说明'},
                         {pattern:/^[0-9]*$/,message:'请输入1~30整数'},
                         {validator: this.handleDelivery}
                       ],
                       initialValue:pdSpu.deliveryExplain||''
                     })(
                       <Input style={{width:'120px'}} placeholder='请输入1~30整数' disabled={!deliveryExplain}/>
                     )}
                      　工作日内发货
                   </FormItem>
                </Col>
                <Col span={24}>
                  <FormItem label='季节商品' {...formItemLayout}>
                     {getFieldDecorator('isSeasonSpu',{
                       rules: [{ required: true, message: '请选择季节商品'}],
                       initialValue:pdSpu.isSeasonSpu||0,
                       onChange:this.changeSeason
                     })(
                       <RadioGroup>
                         {
                           NumberOption.map((el) => (
                             <Radio value={el.key} key={el.key}>{el.value}</Radio>
                           ))
                         }
           						 </RadioGroup>
                     )}
                   </FormItem>
                </Col>
                <Col span={24}>
                  <FormItem label='上市时间' {...formItemLayout}>
                     {getFieldDecorator('listTimeStart',{
                       rules: [{ required: linkageLabel.isTimeRequired, message: '请选择上市时间'}],
                       initialValue:pdSpu.listTimeStart?moment(pdSpu.listTimeStart,'YYYY-MM-DD'):null
                     })(
                       <DatePicker disabled={!linkageLabel.isTimeRequired}/>
                     )}
                   </FormItem>
                </Col>
                <Col span={24}>
                  <FormItem label='下市时间' {...formItemLayout}>
                     {getFieldDecorator('listTimeEnd',{
                       rules: [{ required: linkageLabel.isTimeRequired, message: '请选择下市时间'}],
                       initialValue:pdSpu.listTimeEnd?moment(pdSpu.listTimeEnd,'YYYY-MM-DD'):null
                     })(
                       <DatePicker disabled={!linkageLabel.isTimeRequired}/>
                     )}
                   </FormItem>
                </Col>
                <Col span={24}>
                  <FormItem label='批次管理' {...formItemLayout}>
                     {getFieldDecorator('lotStatus',{
                       initialValue:pdSpu.lotStatus||0,
                       onChange:this.changeLotStatus
                     })(
                       <RadioGroup>
                         {
                           LotStatusOption.map((el) => (
                             <Radio value={el.key} key={el.key}>{el.value}</Radio>
                           ))
                         }
             					 </RadioGroup>
                     )}
                   </FormItem>
                </Col>
                <Col span={24}>
                  <FormItem label='保质期' {...formItemLayout}>
                     {getFieldDecorator('expdays',{
                       initialValue:pdSpu.expdays,
       								 rules: [
                         {required:linkageLabel.isLotRequired,message:'请输入保质期'},
                         {pattern:/^[0-9]*$/,message:'天数只能是整数'}
                       ],
                     })(
                       <Input
                         placeholder="请输入保质期"
                         disabled={!linkageLabel.isLotRequired}
                         autoComplete="off"/>
                     )}
                   </FormItem>
                </Col>
                <Col span={24}>
                  <FormItem label='保质依据' {...formItemLayout}>
                     {getFieldDecorator('lotType',{
                       initialValue:pdSpu.lotType||1
                     })(
                        <RadioGroup disabled={!linkageLabel.isLotRequired}>
                          <Radio value={1} key={1}>生产日期</Radio>
                          <Radio value={2} key={2}>到期日期</Radio>
                        </RadioGroup>
                     )}
                   </FormItem>
                </Col>
                <Col span={24}>
                  <FormItem label='禁止入库' {...formItemLayout}>
                     {getFieldDecorator('lotLimitInDay',{
                       rules: [
                         {required:linkageLabel.isLotRequired,message:'请输入天数'},
                         {pattern:/^[0-9]*$/,message:'天数只能是整数'}
                       ],
                       initialValue:pdSpu.lotLimitInDay,
                     })(
                       <Input
                         disabled={!linkageLabel.isLotRequired}
                         placeholder="请输入天数"
                         autoComplete="off"/>
                     )}
                   </FormItem>
                </Col>
                <Col span={24}>
                  <FormItem label='分成类别' {...formItemLayout}>
                     {getFieldDecorator('shareType',{
                       initialValue:pdSpu.shareType||0
                     })(
                       <RadioGroup>
         								<Radio value={1} key={1}>食品类</Radio>
         								<Radio value={0} key={0}>非食品类</Radio>
         							</RadioGroup>
                     )}
                   </FormItem>
                </Col>
              </div>
            }
            <Col span={24}>
              <FormItem>
                <div className="btns-list">
                 <Button type="default" onClick={this.onCancel.bind(this)}>取消</Button>
                 <Button
                   loading={loading}
                   type="primary"
                   onClick={this.handleSubmit.bind(this)}>保存</Button>
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

const AddGoods = Form.create()(AddGoodsForm);
export default connect(mapStateToProps)(AddGoods);
