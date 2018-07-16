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
  message
} from 'antd';
import { goodsBrandApi, goodSaveApi } from '../../../services/goodsCenter/baseGoods.js';
import UpLoadFile from './components/UpLoadFile/index.js';
import GoodsInfo from './components/GoodsInfo/index.js';
import EditableCell from './components/EditableCell/index.js'
import './AddGoods.css';


const FormItem = Form.Item;
const Option = Select.Option;

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
      pdSpu:this.props.addGoods.pdSpu,
      fileList:this.props.addGoods.fileList,
    }
  }
  componentWillMount() {
    this.initGoodslabel();
    this.initPage()
  }
  componentWillReceiveProps(props) {
    this.setState({
      pdSpu:props.addGoods.pdSpu,
      fileList:props.addGoods.fileList,
    })
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
        this.saveGoods(values)
      }
    });
  }
  //提交api
  saveGoods(values) {
    goodSaveApi(values)
    .then(res=> {
      console.log(res)
    },error=> {
      console.log(error)
    })
  }


  render() {
    const { getFieldDecorator } = this.props.form;
    const { goodsCategory=[], goodsType=[] } = this.props.addGoods;
    const { pdSpu, fileList } = this.state;
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
                          <Option value={ele.pdCategoryId} key={index}>{ele.name}</Option>
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
                           <Option value={ele.pdCategoryId} key={index}>{ele.name}</Option>
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
                 {getFieldDecorator('guige1')(
                   <Input placeholder="Username" />
                 )}
               </FormItem>
            </Col>
            <Col span={24}>
              <FormItem label='商品规格2' {...formItemLayout}>
                 {getFieldDecorator('guige2')(
                   <Input placeholder="Username" />
                 )}
               </FormItem>
            </Col>
            <Col span={24}>
              <FormItem label='商品信息' {...formItemLayout2}>
                <div>
                 {getFieldDecorator('guige2')(
                   <GoodsInfo getFieldDecorator={getFieldDecorator}/>
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
