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

const FormItem = Form.Item;

class GoodsInfo extends Component {
  constructor(props) {
    super(props);
  }
  renderCode =(text, record, index)=> {
    const { pdSpu } = this.props.addGoods;
    return  <div>
              {
                this.props.form.getFieldDecorator(`pdSkus[${index}].code`,{
                  initialValue:pdSpu.pdSkus[index].code
                })(
                  <Input placeholder="请输入商品编码" />
                )
              }
            </div>
  }
  renderBarcode =(text, record, index)=> {
    const { pdSpu } = this.props.addGoods;
    return  <div>
                 {this.props.form.getFieldDecorator(`pdSkus[${index}].barcode`,{
                   initialValue:pdSpu.pdSkus[index].barcode
                 })(
                   <Input placeholder="请输入商品条码" />
                 )}
             </div>
  }
  renderSalePrice =(text, record, index)=> {
    const { pdSpu } = this.props.addGoods;
    return  <div>
              {
                 this.props.form.getFieldDecorator(`pdSkus[${index}].salePrice`,{
                   initialValue:pdSpu.pdSkus[index].salePrice
                 })(
                   <Input placeholder="请输入售价" />
                 )
              }
             </div>
  }
  renderPurchasePricee =(text, record, index)=> {
    const { pdSpu } = this.props.addGoods;
    return  <div>
               {this.props.form.getFieldDecorator(`pdSkus[${index}].purchasePrice`,{
                 initialValue:pdSpu.pdSkus[index].purchasePrice
               })(
                 <Input placeholder="请输入采购价格" />
               )}
             </div>
  }
  renderReceivePrice =(text, record, index)=> {
    const { pdSpu } = this.props.addGoods;
    return  <div>
               {this.props.form.getFieldDecorator(`pdSkus[${index}].receivePrice`,{
                 initialValue:pdSpu.pdSkus[index].receivePrice
               })(
                 <Input placeholder="请输入到货价格" />
               )}
             </div>
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
  renderTips =(text, record, index)=> {
    const { pdSpu } = this.props.addGoods;
    return  <div>
               {this.props.form.getFieldDecorator(`pdSkus[${index}].goodsExplain`,{
                 initialValue:pdSpu.pdSkus[index].goodsExplain
               })(
                 <Input placeholder="30字以内，C端展示谨慎填写" autoComplete="off" maxLength='30'/>
               )}
             </div>
  }
  render() {
    const { pdSpu } = this.props.addGoods;
    console.log(pdSpu)
    return(
      <div>
        <Table dataSource={pdSpu.pdSkus} pagination={false} bordered={true}>
          {
            this.props.isHasSize&&
            <Table.Column title="商品规格" dataIndex='name' key ={0}/>
          }
          <Table.Column title="商品编码" dataIndex='code' key ={1} render={this.renderCode}/>
          <Table.Column title="商品条码" dataIndex='barcode' key ={2} render={this.renderBarcode}/>
          <Table.Column title="售价"  dataIndex='salePrice' key={3} render={this.renderSalePrice}/>
          <Table.Column title="到货价格" dataIndex='receivePrice' key ={5} render={this.renderReceivePrice}/>
          <Table.Column title="出库价格" dataIndex='deliveryPrice' key ={6} render={this.renderDeliveryPrice}/>
          {
            this.props.isHasSize&&
            <Table.Column title="SKU图片" key ={7} render={this.renderDeliveryPrice}/>
          }
          <Table.Column title="商品提示"  key ={8} render={this.renderTips}/>
        </Table>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { addGoods }  = state;
  return { addGoods };
}
export default connect(mapStateToProps)(GoodsInfo);
