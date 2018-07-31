import React,{ Component } from 'react';
import { connect } from 'dva';
import {
  Form,Row,Col,
  Input,Button,Icon,
  Select ,AutoComplete,Upload,
  message,Radio,DatePicker
} from 'antd';
import moment from 'moment';
import {
  goodSaveApi,
  saveValApi
} from '../../../services/goodsCenter/bTipGoods.js';
import AddGoodsDesc from '../components/AddGoodsDesc/index.js';

import Qtable from '../../../components/Qtable';
import { DetailColumns, DetailSizeColumns} from './columns/detailColumns'
import './AddGoods.less';


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
  }
  componentWillMount() {
    this.initPage()
  }
  initPage() {
    const { pdSpuId, source } =this.props.data;
    this.props.dispatch({
      type:'bTipAddGoods/fetchGoodsInfo',
      payload:{
        spuId:pdSpuId,
      }
    })
  }
  //取消
  onCancel(){
    const { key } = this.props.data;
    const pane = eval(sessionStorage.getItem("pane"));
    if(pane.length<=1){return}
    this.props.dispatch({
      type:'bTipAddGoods/resetData'
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
        values = Object.assign(values,{
          pdSpuId,
          source
        })
        values = this.formtParams(values);
        this.saveGoods(values)
      }
    });
  }
  //参数格式化
  formtParams(values) {
    let pdSpuInfo = values.pdSpuInfo;
    if(pdSpuInfo) {
      pdSpuInfo.map((el) => {
        if(el.content instanceof Array) {
          if(el.content[0].response) {
            el.content = el.content[0].response.data[0]
          } else {
            el.content = el.content[0].name
          }
          el.type = '2'
        } else {
          el.type = '1'
        }
        return el;
      })
    }
    return values;
  }
  //提交api
  saveGoods(values) {
    goodSaveApi(values)
    .then(res=> {
      this.onCancel()
    },error=> {
      console.log(error)
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { pdSpu } = this.props.bTipAddGoods;
    return(
      <div className="btip-add-goods-components">
        <Form className="qtools-form-components">
          <Row wrap>
            <Col span={24}>
              <FormItem label='商品名称' {...formItemLayout}>
                 <label>{pdSpu.name}</label>
               </FormItem>
            </Col>
            <Col span={24}>
              <FormItem label='B端名称' {...formItemLayout}>
                 {
                   getFieldDecorator('bname', {
                     rules: [{ required: true, message: '请输入商品名称'}],
                     initialValue:pdSpu.bname
                   })(
                     <Input placeholder="请输入B端名称" autoComplete="off"/>
                   )
                 }
               </FormItem>
            </Col>
            <Col span={24}>
              <FormItem label='一级分类' {...formItemLayout}>
                 <label>{pdSpu.pdCategory1Name}</label>
               </FormItem>
            </Col>
            <Col span={24}>
              <FormItem label='二级分类' {...formItemLayout}>
                 <label>{pdSpu.pdCategory2Name}</label>
               </FormItem>
            </Col>
            <Col span={24}>
              <FormItem label='商品图片' {...formItemLayout2}>
                <ul className="img-list-wrap">
                  <li className="img-item"></li>
                  <li className="img-item"></li>
                </ul>
              </FormItem>
            </Col>
            <Col span={24}>
              <FormItem label='商品信息' {...formItemLayout2}>
                 <Qtable
                   columns={pdSpu.isSkus?DetailSizeColumns:DetailColumns}
                   dataSource={pdSpu.pdSkus}/>
               </FormItem>
            </Col>
            <Col span={24}>
              <FormItem label='箱规销售' {...formItemLayout}>
                 {getFieldDecorator('containerSpec',{
                   rules: [
                     { required: true, message: '请选择商品状态'},
                     { pattern:/^[0-9]*$/,message:'请输入数字'}
                   ],
                   initialValue:pdSpu.containerSpec
                 })(
                   <Input placeholder="请输入箱规销售" autoComplete="off"/>
                 )}
               </FormItem>
            </Col>
            <Col span={24}>
              <FormItem label='上新商品' {...formItemLayout}>
                 {getFieldDecorator('isNew',{
                   initialValue:pdSpu.isNew
                 })(
                   <RadioGroup>
       							<Radio value={true} value={true}>是</Radio>
       							<Radio value={false} value={false}>否</Radio>
       						 </RadioGroup>
                 )}
               </FormItem>
            </Col>
            <Col span={24}>
              <FormItem label='畅销商品' {...formItemLayout}>
                 {getFieldDecorator('isHot', {
                   initialValue:pdSpu.isNew
                 })(
                   <RadioGroup>
       							<Radio value={true} value={true}>是</Radio>
       							<Radio value={false} value={false}>否</Radio>
       						 </RadioGroup>
                 )}
               </FormItem>
            </Col>
            <Col span={24}>
              <FormItem label='直邮商品' {...formItemLayout}>
                 {getFieldDecorator('isDirectExpress',{
                   initialValue:pdSpu.isDirectExpress
                 })(
                   <RadioGroup>
       							<Radio value={1} value={1}>是</Radio>
       							<Radio value={0} value={0}>否</Radio>
       						 </RadioGroup>
                 )}
               </FormItem>
            </Col>
            <Col span={24}>
              <FormItem label='预售商品' {...formItemLayout}>
                 {getFieldDecorator('isPresell',{
                   initialValue:pdSpu.isPresell
                 })(
                   <RadioGroup>
       							<Radio value={1} value={1}>是</Radio>
       							<Radio value={0} value={0}>否</Radio>
       						 </RadioGroup>
                 )}
               </FormItem>
            </Col>
            <Col span={24}>
              <FormItem label='试销天数' {...formItemLayout}>
                 {
                   getFieldDecorator('trialDay',{
                     initialValue:pdSpu.trialDay,
                     rules: [{pattern:/^[0-9]*$/,message:'天数只能是整数'}],
                   })(
                      <Input placeholder="请输入试销天数" autoComplete="off"/>
                   )
                 }
               </FormItem>
            </Col>
            <Col span={24}>
              <FormItem label='缺货天数' {...formItemLayout}>
                 {
                   getFieldDecorator('outStockDay',{
                     initialValue:pdSpu.outStockDay,
                     rules: [{pattern:/^[0-9]*$/,message:'天数只能是整数'}],
                   })(
                      <Input placeholder="请输入缺货天数" autoComplete="off"/>
                   )
                 }
               </FormItem>
            </Col>
            <Col span={24}>
              <FormItem label='缺货率' {...formItemLayout}>
                 {
                   getFieldDecorator('outStockRate',{
                     initialValue:pdSpu.outStockRate,
                     rules: [{ pattern:/^[0-9]*$/,message:'请输入数字'}],
                   })(
                      <Input placeholder="请输入缺货率" autoComplete="off"/>
                   )
                 }
               </FormItem>
            </Col>
            <Col span={24}>
              <FormItem label='目标周转天数' {...formItemLayout}>
                 {
                   getFieldDecorator('targetTurnoverDay',{
                     initialValue:pdSpu.targetTurnoverDay,
                     rules: [{pattern:/^[0-9]*$/,message:'天数只能是整数'}],
                   })(
                      <Input placeholder="请输入目标周转天数" autoComplete="off"/>
                   )
                 }
               </FormItem>
            </Col>
            <Col span={24}>
              <FormItem label='商品描述' {...formItemLayout}>
                {
                  pdSpu.pdSpuInfo&&
                  <AddGoodsDesc
                    dataSource={pdSpu.pdSpuInfo}
                    form={this.props.form}/>
                }
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
  const { bTipAddGoods } = state;
  return { bTipAddGoods }
}

const BtipAddGoods = Form.create()(AddGoodsForm);
export default connect(mapStateToProps)(BtipAddGoods);
