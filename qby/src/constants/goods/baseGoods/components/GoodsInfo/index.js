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
    const { pdSkus } = this.props.addGoods;
    return  <div>
              {
                this.props.form.getFieldDecorator(`pdSkus[${index}].code`,{
                  initialValue:pdSkus[index].code
                })(
                  <Input placeholder="请输入商品编码" />
                )
              }
            </div>
  }
  renderBarcode =(text, record, index)=> {
    const { pdSkus } = this.props.addGoods;
    return  <div>
                 {this.props.form.getFieldDecorator(`pdSkus[${index}].barcode`,{
                   initialValue:pdSkus[index].barcode
                 })(
                   <Input placeholder="请输入商品条码" />
                 )}
             </div>
  }
  renderSalePrice =(text, record, index)=> {
    const { pdSkus } = this.props.addGoods;
    return  <div>
              {
                 this.props.form.getFieldDecorator(`pdSkus[${index}].salePrice`,{
                   initialValue:pdSkus[index].salePrice
                 })(
                   <Input placeholder="请输入售价" />
                 )
              }
             </div>
  }
  renderPurchasePricee =(text, record, index)=> {
    const { pdSkus } = this.props.addGoods;
    return  <div>
               {this.props.form.getFieldDecorator(`pdSkus[${index}].purchasePrice`,{
                 initialValue:pdSkus[index].purchasePrice
               })(
                 <Input placeholder="请输入采购价格" />
               )}
             </div>
  }
  renderReceivePrice =(text, record, index)=> {
    const { pdSkus } = this.props.addGoods;
    return  <div>
               {this.props.form.getFieldDecorator(`pdSkus[${index}].receivePrice`,{
                 initialValue:pdSkus[index].receivePrice
               })(
                 <Input placeholder="请输入到货价格" />
               )}
             </div>
  }
  renderDeliveryPrice =(text, record, index)=> {
    const { pdSkus } = this.props.addGoods;
    return  <div>
               {
                 this.props.form.getFieldDecorator(`pdSkus[${index}].deliveryPrice`,{
                   initialValue:pdSkus[index].deliveryPrice
                 })(
                   <Input placeholder="请输入出库价格" />
                 )
               }
             </div>
  }
  render() {
    const { pdSkus } = this.props.addGoods;
    return(
      <div>
        <Table dataSource={pdSkus} pagination={false} bordered={true}>
          {
            this.props.isHasSize&&
            <Table.Column title="商品规格" dataIndex='name' key ={0}/>
          }
          <Table.Column title="商品编码" key ={1} render={this.renderCode}/>
          <Table.Column title="商品条码" key ={2} render={this.renderBarcode}/>
          <Table.Column title="售价" key ={3} render={this.renderSalePrice}/>
          <Table.Column title="采购价格" key ={4} render={this.renderPurchasePricee} />
          <Table.Column title="到货价格" key ={5} render={this.renderReceivePrice}/>
          <Table.Column title="出库价格" key ={6} render={this.renderDeliveryPrice}/>
          {
            this.props.isHasSize&&
            <Table.Column title="上传图片" key ={7} render={this.renderDeliveryPrice}/>
          }

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
