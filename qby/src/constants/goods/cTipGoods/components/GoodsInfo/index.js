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
import Imgmodel from '../../../../../components/model/modelimg';
import './index.less';
const FormItem = Form.Item;

class GoodsInfo extends Component {
  constructor(props) {
    super(props);
  }
  //比例自定义校验
  validatorGoldPrice(rule, value, callback,record) {
    let price = (record.toCPrice).toFixed(2);
    let minPrice = (price*0.8).toFixed(2);
    let maxPrice = record.toCPrice;

    if(value>maxPrice||) {
      callback('分成比例不能大于100');
    } else if(value<minPrice){
      callback('分成比例不能大于100');
    } else {
      callback();
    }
  }
  validatorPrice(rule, value, callback,record) {
    let price = (record.toCPrice).toFixed(2);
    let goldPrice = record.goldCardPrice;
    let minPrice = (price*0.9).toFixed(2);
    let maxPrice = record.toCPrice;
    if(value>maxPrice) {
      callback('分成比例不能大于100');
    } else if(value<minPrice){
      callback('分成比例不能大于100');
    } else {
      callback();
    }
  }
  renderGoldPrice =(text, record, index)=> {
    const { pdSpu } = this.props.cTipAddGoods;
    return  <FormItem className='purchasePrice-input'>
              {this.props.form.getFieldDecorator(`pdSkus[${index}].goldCardPrice`,{
                rules:[
                  {required: true, message: '请输入价格'},
                  {pattern:/^[0-9]+([.]{1}[0-9]+){0,1}$/,message:'仅限2位小数'},
                  {validator:(rule, value, callback)=>this.validatorGoldPrice(rule, value, callback,record)}
                ],
                initialValue:pdSpu.pdSkus[index].goldCardPrice
              })(
                <Input placeholder="请输入金卡价格" autoComplete="off"/>
              )}
            </FormItem>
  }
  renderSilverPrice =(text, record, index)=> {
    const { pdSpu } = this.props.cTipAddGoods;
    return  <FormItem className='purchasePrice-input'>
              {this.props.form.getFieldDecorator(`pdSkus[${index}].silverCardPrice`,{
                rules:[
                  { required: true, message: '请输入价格'},
                  {pattern:/^[0-9]+([.]{1}[0-9]+){0,1}$/,message:'仅限2位小数'},
                  {validator:(rule, value, callback)=>this.validatorPrice(rule, value, callback,record)}
                ],
                initialValue:pdSpu.pdSkus[index].silverCardPrice
              })(
                <Input placeholder="请输入银卡价格" autoComplete="off"/>
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
    console.log(pdSpu)
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
