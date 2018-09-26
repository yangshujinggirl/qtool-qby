import React , { Component } from 'react';
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
  Table
} from 'antd';
import NP from 'number-precision'
import Imgmodel from '../../../../../components/model/modelimg';
import './index.less';
const FormItem = Form.Item;

class GoodsInfo extends Component {
  constructor(props) {
    super(props);
  }
  changeGold(e,record) {
    let price = (Number(record.toCPrice)).toFixed(2);
    let minPrice = NP.times(price, 0.8);//金价官方折扣价
        minPrice = NP.round(minPrice, 2);
    let maxPrice = price;//最高价格
    const value = Number(e.nativeEvent.target.value);
    //存储当前金卡价格
    record.goldCardPrice = value;
    let status;
    //控制银卡表单
    if(value>=minPrice&&value<=maxPrice) {
      status = false;
    } else {
      status = true;
    }
    //联动校验银价表单****************************************
    let silverCardPrice = NP.round(record.silverCardPrice,2);//当前银价
    let index = record.index;
    let sDiscount = NP.times(price, 0.9);//银价官方折扣价
        sDiscount = NP.round(sDiscount, 2);;//银价官方折扣价
    let sMinPrice;//银价最小价
    let name = `pdSkus[${index}].silverCardPrice`;
    let error;
    if(value>silverCardPrice) {
      sMinPrice = value;
    } else {
      sMinPrice = sDiscount;
    }

    if(silverCardPrice>maxPrice || silverCardPrice<sMinPrice) {
      error = `请输入${sMinPrice}~${maxPrice}之间的价格`;
    } else {
      error = ''
    }
    
    this.props.form.setFields({
      [name]: {
        value: record.silverCardPrice,
        errors: [new Error(error)],
      },
    });

    this.props.dispatch({
      type:'cTipAddGoods/changeSilver',
      payload:{
        record,
        status
      }
    })
  }
  changeSilver(e,record) {
    const status = record.silverDisabled;
    const value = Number(e.nativeEvent.target.value);
    //存储当前金卡价格
    record.silverCardPrice = value;
    this.props.dispatch({
      type:'cTipAddGoods/changeSilver',
      payload:{
        record,
        status
      }
    })
  }
  validatorPattern(rule, value, callback,) {
    let pattern = /^\d+(?:\.\d{1,2})?$/;
    if(value&&!pattern.test(value)) {
      callback('仅限2位小数');
      return false;
    } else {
      callback();
      return true
    }
  }
  //比例自定义校验
  validatorGoldPrice(rule, value, callback,record) {
    value = Number(value)
    let price = (Number(record.toCPrice)).toFixed(2);
    let minPrice = (price*0.8).toFixed(2);
    let maxPrice = Number(record.toCPrice);
    if(value) {
      if(value>maxPrice || value<minPrice) {
        callback(`请输入${minPrice}~${maxPrice}之间的价格`);
      } else {
        callback();
      }
    } else {
      callback();
    }

  }
  validatorPrice(rule, value, callback,record) {
    console.log('联动校验银价')
    value = Number(value)
    let price = (Number(record.toCPrice)).toFixed(2);
    let goldPrice = Number(record.goldCardPrice);
    let silverPrice = (price*0.9).toFixed(2);
    let minPrice;
    let maxPrice = record.toCPrice;
    if(goldPrice>silverPrice) {
      minPrice = goldPrice;
    } else {
      minPrice = silverPrice;
    }
    if(value) {
      if(value>maxPrice || value<minPrice) {
        callback(`请输入${minPrice}~${maxPrice}之间的价格`);
      }
    }
    callback();
  }
  renderGoldPrice =(text, record, index)=> {
    const { pdSpu } = this.props.cTipAddGoods;
    let name = pdSpu.isSkus?`pdSkus[${index}].goldCardPrice`:'goldCardPrice'
    return  <FormItem className='purchasePrice-input'>
              {this.props.form.getFieldDecorator(name,{
                rules:[
                  {required: true, message: '请输入价格'},
                  {pattern:/^\d+(?:\.\d{1,2})?$/,message:'仅限2位小数'},
                  {validator:(rule, value, callback)=>this.validatorGoldPrice(rule, value, callback,record)}
                ],
                initialValue:pdSpu.pdSkus[index].goldCardPrice,
                onChange:(e)=>this.changeGold(e,record)
              })(
                <Input placeholder="请输入金卡价格" autoComplete="off"/>
              )}
            </FormItem>
  }
  renderSilverPrice =(text, record, index)=> {
    const { pdSpu } = this.props.cTipAddGoods;
    let name = pdSpu.isSkus?`pdSkus[${index}].silverCardPrice`:'silverCardPrice';
    return  <FormItem className='purchasePrice-input'>
              {this.props.form.getFieldDecorator(name,{
                rules:[
                  { required: true, message: '请输入价格'},
                  {pattern:/^\d+(?:\.\d{1,2})?$/,message:'仅限2位小数'},
                  {validator:(rule, value, callback)=>this.validatorPrice(rule, value, callback,record)}
                ],
                initialValue:pdSpu.pdSkus[index].silverCardPrice,
                onChange:(e)=>this.changeSilver(e,record)
              })(
                <Input placeholder="请输入银卡价格" autoComplete="off" disabled={record.silverDisabled}/>
              )}
            </FormItem>
  }
  renderDeliveryPrice =(text, record, index)=> {
    const { pdSpu } = this.props.cTipAddGoods;
    return <div>
             {
               record.picUrl !=''?
               <div className="table-img-wrap">
                 <Imgmodel picUrl={record.picUrl}/>
               </div>
              :
              null
            }
          </div>
  }
  render() {
    const { pdSpu } = this.props.cTipAddGoods;
    return(
        <Table
          className="cGoods-goodsInfo-table"
          dataSource={pdSpu.pdSkus}
          pagination={false}
          bordered={true}>
          {
            pdSpu.isSkus&&
            <Table.Column title="商品规格" dataIndex='name' key ={0}/>
          }
          <Table.Column title="商品编码" dataIndex='code' key ={1} render={this.renderCode}/>
          <Table.Column title="商品条码" dataIndex='barcode' key ={2} render={this.renderBarcode}/>
          <Table.Column title="零售价" dataIndex='toCPrice' key ={4} render={this.renderPurchasePricee} />
          <Table.Column title="金卡售价" dataIndex='goldCardPrice' key ={5} render={this.renderGoldPrice}/>
          <Table.Column title="银卡售价" dataIndex='silverCardPrice' key ={6} render={this.renderSilverPrice}/>
          {
            pdSpu.isSkus&&
            <Table.Column title="sku图片" key ={7} render={this.renderDeliveryPrice}/>
          }

        </Table>
    )
  }
}

function mapStateToProps(state) {
  const { cTipAddGoods }  = state;
  return { cTipAddGoods };
}
export default connect(mapStateToProps)(GoodsInfo);
