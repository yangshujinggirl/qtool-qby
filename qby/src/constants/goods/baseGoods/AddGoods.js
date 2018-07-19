import React,{ Component } from 'react';
import { connect } from 'dva';
import {
  Form,
  Row,
  Col,
  Input,
  Button,
  Icon,
  Select ,
  AutoComplete,
  Upload,
  message,
  Radio,
  DatePicker
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
      // pdSpu:this.props.addGoods.pdSpu,
      // fileList:this.props.addGoods.fileList,
      disabledOne:true,
      disabledTwo:true,
      specOneId:'',
      specOne:[],//规格1
      specTwo:[],//规格2
      goodsSize:[],
    }
  }
  componentWillMount() {
    this.initGoodslabel();
    this.initPage()
  }
  componentWillReceiveProps(props) {
    // console.log('componentWillReceiveProps')
    // console.log(props)
    // this.setState({
    //   pdSpu:props.addGoods.pdSpu,
    //   fileList:props.addGoods.fileList,
    // })
  }
  //取消
  onCancel(){
    const { key } = this.props.data;
    const pane = eval(sessionStorage.getItem("pane"));
    if(pane.length<=1){
      return
    }
    this.props.dispatch({
            type:'tab/initDeletestate',
            payload:key
      });
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
      goodsCategory=[],
      goodsType=[],
      pdSpu,
      fileList
    } = this.props.addGoods;
    // const { pdSpu, fileList } = this.state;
    // console.log(this.props.addGoods.pdSpu)
    // console.log(this.state.pdSpu)
    // console.log(this.props.addGoods.fileList)
    // console.log(this.state.fileList)
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
                     <Input placeholder="请输入商品名称" />
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
                    <Select placeholder="请选择商品分类">
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
                     <Select placeholder="请选择商品类型">
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
              <FormItem label='三级分类' {...formItemLayout}>
                 {
                   getFieldDecorator('pdCategory3Id',{
                     rules: [{ required: true, message: '请选择商品类型'}],
                   })(
                     <Select placeholder="请选择商品类型">
                       {
                         goodsType.length>0 &&
                         goodsType.map((ele,index) => (
                           <Option value={ele.pdCategoryId} key={index}>{ele.name}</Option>
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
                   })(
                     <Select placeholder="请选择商品类型">
                       {
                         goodsType.length>0 &&
                         goodsType.map((ele,index) => (
                           <Option value={ele.pdCategoryId} key={index}>{ele.name}</Option>
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
                   getFieldDecorator('pdBrandname',{
                     rules: [{ required: true, message: '请选择商品品牌'}],
                   })(
                     <AutoComplete
                      dataSource={this.state.brandDataSource}
                      onSearch={this.handleSearch.bind(this)}
                      placeholder="请选择商品品牌"/>
                   )
                 }
               </FormItem>
            </Col>
            <Col span={24}>
              <FormItem label='国家地区' {...formItemLayout}>
                 {getFieldDecorator('pdCountryBrandId',{
                   rules: [{ required: true, message: '请选择国家地区'}],
                 })(
                    <Input placeholder="请输入国家地区" />
                 )}
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
              <FormItem label='商品规格1' {...formItemLayout}>
                 {
                   getFieldDecorator('guige1',{
                     rules: [{ required: true, message: '请选择商品分类1'}],
                     initialValue:pdSpu.pdCategory1Id,
                     onChange:this.handleChangeOne
                   })(
                    <Select placeholder="请选择商品分类">
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
                   disabled={this.state.disabledOne}
                   deleteGoodsLabel={this.deleteGoodsLabel.bind(this)}
                   addGoodsLabel={this.addGoodsLabel.bind(this)}
                   level="one"/>
               </FormItem>
            </Col>
            {
              this.props.addGoods.specOne.length>0&&
              <Col span={24}>
                <FormItem label='商品规格2' {...formItemLayout}>
                   {
                     getFieldDecorator('gui',{
                       rules: [{ required: true, message: '请选择商品规格2'}],
                       initialValue:pdSpu.pdCategory2Id,
                       onChange:this.handleChangeTwo
                     })(
                      <Select placeholder="请选择商品分类">
                        <Option value={0} key={0}>无</Option>
                        {
                          goodsCategory.length>0 &&
                          goodsCategory.map((ele,index) => (
                            <Option value={ele.pdCategoryId} key={ele.pdCategoryId}>{ele.name}</Option>
                          ))
                        }
                      </Select>
                     )
                   }
                   <Creatlabel
                     disabled={this.state.disabledTwo}
                     deleteGoodsLabel={this.deleteGoodsLabel.bind(this)}
                     addGoodsLabel={this.addGoodsLabel.bind(this)}
                     level="two"/>
                 </FormItem>
              </Col>
            }
            <Col span={24}>
              <FormItem label='商品信息' {...formItemLayout2}>
                <div>
                 {getFieldDecorator('guige2')(
                   <GoodsInfo
                     getFieldDecorator={getFieldDecorator}
                     isHasSize={this.props.addGoods.specOne.length>0?true:false}
                     datasource={this.props.tags}/>
                 )}
                 </div>
               </FormItem>
            </Col>
            <Col span={24}>
              <FormItem label='批量设置' {...formItemLayout2}>
                 <div style={{display:'flex',textAlign:'center'}}>
   									<EditableCell text='售价' title='salePrice'/>
   									<EditableCell text='采购价格' title='salePrice'/>
   									<EditableCell text='到货价格' title='receivePrice'/>
   									<EditableCell text='出库价格' title='deliveryPrice'/>
                </div>
               </FormItem>
            </Col>
            {
              this.props.data.source==1?
              <div>
                <Col span={24}>
                  <FormItem label='保税仓库' {...formItemLayout}>
                     {getFieldDecorator('warehouseId',{
                       rules: [{ required: true, message: '请选择保税仓库'}]
                     })(
                       <Input placeholder="Username" />
                     )}
                   </FormItem>
                </Col>
                <Col span={24}>
                  <FormItem label='分成比例' {...formItemLayout}>
                     {getFieldDecorator('shareRatio')(
                       <Input placeholder="Username" />
                     )}
                   </FormItem>
                </Col>
              </div>
              :
              <div>
                <Col span={24}>
                  <FormItem label='商品状态' {...formItemLayout}>
                     {getFieldDecorator('spuStatus',{
                       rules: [{ required: true, message: '请选择商品状态'}]
                     })(
                       <Input placeholder="Username" />
                     )}
                   </FormItem>
                </Col>
                <Col span={24}>
                  <FormItem label='销售属性' {...formItemLayout}>
                     {getFieldDecorator('salesAttr',{
                       rules: [{ required: true, message: '请选择销售属性'}]
                     })(
                       <Input placeholder="Username" />
                     )}
                   </FormItem>
                </Col>
                <Col span={24}>
                  <FormItem label='季节商品' {...formItemLayout}>
                     {getFieldDecorator('isSeasonSpu')(
                       <RadioGroup>
           							<Radio value={true}>是</Radio>
           							<Radio value={false}>否</Radio>
           						 </RadioGroup>
                     )}
                   </FormItem>
                </Col>
                <Col span={24}>
                  <FormItem label='上市时间' {...formItemLayout2}>
                     {getFieldDecorator('listTimeStart',{
                       initialValue:moment('2015-06-06')
                     })(
                       <DatePicker />
                     )}
                     至
                     {getFieldDecorator('listTimeEnd')(
                       <DatePicker />
                     )}
                   </FormItem>
                </Col>
                <Col span={24}>
                  <FormItem label='批次管理' {...formItemLayout}>
                     {getFieldDecorator('lotStatus')(
                       <RadioGroup>
             							<Radio value='1'>是</Radio>
             							<Radio value='0'>否</Radio>
             					 </RadioGroup>
                     )}
                   </FormItem>
                </Col>
                <Col span={24}>
                  <FormItem label='保质期' {...formItemLayout}>
                     {getFieldDecorator('expdays',{
                       // initialValue:this.props.expdays,
       								 rules: [{pattern:/^[0-9]*$/,message:'天数只能是整数'}],
                     })(
                       <Input placeholder="Username" />
                     )}
                   </FormItem>
                </Col>
                <Col span={24}>
                  <FormItem label='保质依据' {...formItemLayout}>
                     {getFieldDecorator('lotType')(
                        <RadioGroup disabled={this.props.lotStatus=='1'?false:true}>
                          <Radio value='1'>生产日期</Radio>
                          <Radio value='2'>到期日期</Radio>
                        </RadioGroup>
                     )}
                   </FormItem>
                </Col>
                <Col span={24}>
                  <FormItem label='禁止入库' {...formItemLayout}>
                     {getFieldDecorator('lotLimitInDay',{
                       rules: [{pattern:/^[0-9]*$/,message:'天数只能是整数'}],
                     })(
                       <Input placeholder="Username" />
                     )}
                   </FormItem>
                </Col>
                <Col span={24}>
                  <FormItem label='分成类别' {...formItemLayout}>
                     {getFieldDecorator('shareType')(
                       <RadioGroup>
         								<Radio value='1'>食品类</Radio>
         								<Radio value='0'>非食品类</Radio>
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

const AddGoods = Form.create()(AddGoodsForm);
export default connect(mapStateToProps)(AddGoods);
