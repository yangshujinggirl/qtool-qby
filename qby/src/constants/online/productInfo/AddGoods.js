import React,{ Component } from 'react';
import { connect } from 'dva';
import {
  Form,Row,Col,
  Input,Button,Icon,
  Select ,AutoComplete,Upload,
  message,Radio,DatePicker,Checkbox,Table
} from 'antd';
import moment from 'moment';
import {
  goodSaveApi,productListApi
} from '../../../services/online/productInfo.js';
import AddGoodsDesc from '../../goods/components/AddGoodsDesc/index.js';
import Imgmodel from '../../../components/model/modelimg';

import Qtable from '../../../components/Qtable';
import { DetailColumns, DetailSizeColumns} from './columns/detailColumns'
import './AddGoods.less';


const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;

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
    span: 18
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
      loading:false,
      plainOptions:[],
      dataSource:[]
    };
    this.platformOptions = [
      {label:'C端app',value:1},
      {label:'小程序',value:2}
    ]
  }
  componentWillMount() {
    this.initPage()
  }
  initPage() {
    const { pdSpuId, source } =this.props.data;
    this.props.dispatch({
      type:'productEditGoods/fetchGoodsInfo',
      payload:{spuId:pdSpuId},
      callback:(dataSource)=>{
        this.setState({dataSource})
      }
    });
    productListApi()
    .then(res => {
      let {plainOptions} = this.state;
      if(res.code == "0"){
        res.pdExplains.map((item,index) => {
          plainOptions[index] = {label:item.name,value:item.pdExplainId}
          return item;
        });
      };
      this.setState({
        plainOptions
      });
    })
  }
  //取消
  onCancel(){
    const { key } = this.props.data;
    const pane = eval(sessionStorage.getItem("pane"));
    if(pane.length<=1){return}
    this.props.dispatch({
      type:'productEditGoods/resetData'
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
      if (!err) {
        values = Object.assign(values,{pdSpuId});
        values = this.formtParams(values);
        this.saveGoods(values)
      }
    });
  }
  //参数格式化
  formtParams(values) {
    values.oname = values.oname.trim();
    values.platform = "1,2";
    //处理商品描述参数
    values.pdSpuInfo = this.state.dataSource;
    const {isSkus,pdSkus} = this.props.productEditGoods.iPdSpu;
      const skuList = [];
      pdSkus && pdSkus.map(item=>{
        if(isSkus){ //sku商品
          const obj = {};
          // obj.pdSkuId = item.pdSkuId;
          obj.code = item.code;
          obj.goodsExplain = item.goodsExplain;
          skuList.push(obj);
          values.pdSkus = skuList;
        }else{
          values.goodsExplain = item.goodsExplain;
        };
      });
    return values;
  }
  //提交api
  saveGoods(values) {
    this.setState({
      loading:true
    })
    goodSaveApi(values)
    .then(res=> {
      const { code } = res;
      if(code == '0') {
        this.setState({
          loading:false
        })
        this.onCancel();
        this.props.dispatch({
          type:'productGoodsList/fetchList',
          payload:{...this.props.data.listParams}
        })
      } else {
        this.setState({
          loading:false
        })
      }
    },error=> {
      console.log(error)
    })
  }
  //商品提示修改
  handleOperateClick =(record,index,e)=> {
    const {pdSkus} = this.props.productEditGoods.iPdSpu;
    pdSkus[index].goodsExplain = e.target.value;
    this.props.dispatch({
      type:'productEditGoods/changePdSkus',
      payload:{pdSkus}
    });
  }
  //修改dataSource
  changeSource =(dataSource)=> {
    this.setState({dataSource})
  }
  render() {
    const {dataSource} = this.state;
    dataSource.length>0 && dataSource.map((item,index)=>( //商品描述设置唯一key
      item.key=index
    ));
    const { getFieldDecorator } = this.props.form;
    const { iPdSpu, fileList } = this.props.productEditGoods;
    iPdSpu.pdSkus&&iPdSpu.pdSkus.map((item,index)=>{ //商品提示更改
      item.onOperateClick =(e)=> { this.handleOperateClick(item,index,e)}
    });
    const { loading } =this.state;
    return(
      <div className="btip-add-goods-components">
        <Form className="qtools-form-components">
          <Row wrap>
            <Col span={24}>
              <FormItem label='商品名称' {...formItemLayout}>
                 <label>{iPdSpu.name}</label>
               </FormItem>
            </Col>
            <Col span={24}>
              <FormItem label='电商名称' {...formItemLayout}>
                 {
                   getFieldDecorator('oname', {
                     rules: [{ required: true, message: '请输入商品名称'}],
                     initialValue:iPdSpu.oname
                   })(
                     <Input placeholder="请输入商品名称" autoComplete="off"/>
                   )
                 }
               </FormItem>
            </Col>
            <Col span={24}>
              <FormItem label='商品图片' {...formItemLayout3}>
                <ul className="img-list-wrap">
                  {
                    fileList.length>0&&
                    fileList.map((el,index) => (
                      <li className="img-item" key={index}>
                        <Imgmodel picUrl={el.name}/>
                      </li>
                    ))
                  }
                </ul>
              </FormItem>
            </Col>
            <Col span={24}>
              <FormItem label='一级分类' {...formItemLayout}>
                 <label>{iPdSpu.pdCategory1Name}</label>
               </FormItem>
            </Col>
            <Col span={24}>
              <FormItem label='二级分类' {...formItemLayout}>
                 <label>{iPdSpu.pdCategory2Name}</label>
               </FormItem>
            </Col>
            <Col span={24}>
              <FormItem label='商品信息' {...formItemLayout2}>
                 <Table
                   pagination={false}
                   bordered={true}
                   columns={iPdSpu.isSkus?DetailSizeColumns:DetailColumns}
                   dataSource={iPdSpu.pdSkus}/>
               </FormItem>
            </Col>
            <Col span={24}>
              <FormItem label='NEW商品' {...formItemLayout}>
                 {getFieldDecorator('isNew',{
                   initialValue:iPdSpu.eventNewO||0
                 })(
                   <RadioGroup>
       							<Radio value={1}>是</Radio>
       							<Radio value={0}>否</Radio>
       						 </RadioGroup>
                 )}
               </FormItem>
            </Col>
            <Col span={24}>
              <FormItem label='HOT商品' {...formItemLayout}>
                 {getFieldDecorator('isHot',{
                   initialValue:iPdSpu.eventHotO||0
                 })(
                   <RadioGroup>
       							<Radio value={1}>是</Radio>
       							<Radio value={0}>否</Radio>
       						 </RadioGroup>
                 )}
               </FormItem>
            </Col>
            <Col span={24}>
              <FormItem label='商品说明' {...formItemLayout}>
    						 {getFieldDecorator('pdExplainIds',{
                   initialValue:iPdSpu.pdExplains?iPdSpu.pdExplains:null
    						 })(
    							 <CheckboxGroup className='checkBox' options={this.state.plainOptions}/>
    						 )}
    				 </FormItem>
            </Col>
            <Col span={24}>
              <FormItem label='商品描述' {...formItemLayout}>
                {
                  iPdSpu.pdSpuInfo&&
                  <AddGoodsDesc
                    changeSource={this.changeSource}
                    dataSource={dataSource}
                    form={this.props.form}/>
                }
               </FormItem>
            </Col>
            <Col span={24}>
              <FormItem label='商品备注1' {...formItemLayout}>
                 {
                   getFieldDecorator('remark1', {
                     initialValue:iPdSpu.remark1
                   })(
                     <Input placeholder="请输入商品备注" autoComplete="off"/>
                   )
                 }
               </FormItem>
            </Col>
            <Col span={24}>
              <FormItem label='商品备注2' {...formItemLayout}>
                 {
                   getFieldDecorator('remark2', {
                     initialValue:iPdSpu.remark2
                   })(
                     <Input placeholder="请输入商品备注" autoComplete="off"/>
                   )
                 }
               </FormItem>
            </Col>
            <Col span={24}>
              <FormItem label='商品备注3' {...formItemLayout}>
                 {
                   getFieldDecorator('remark3', {
                     initialValue:iPdSpu.remark3
                   })(
                     <Input placeholder="请输入商品备注" autoComplete="off"/>
                   )
                 }
               </FormItem>
            </Col>
            <Col span={24}>
              <FormItem>
                <div className="btns-list">
                 <Button
                   type="default"
                   onClick={this.onCancel.bind(this)}>取消</Button>
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
  const { productEditGoods } = state;
  return { productEditGoods }
}

const BtipAddGoods = Form.create()(AddGoodsForm);
export default connect(mapStateToProps)(BtipAddGoods);
