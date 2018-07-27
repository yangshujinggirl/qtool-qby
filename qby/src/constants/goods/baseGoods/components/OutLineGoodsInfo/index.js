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
                 this.props.form.getFieldDecorator(`pdSkus[${index}].toBPrice`,{
                   initialValue:pdSkus[index].toBPrice
                 })(
                   <Input placeholder="请输入售价" />
                 )
              }
             </div>
  }
  renderPurchasePricee =(text, record, index)=> {
    const { pdSkus } = this.props.addGoods;
    return  <div>
               {this.props.form.getFieldDecorator(`pdSkus[${index}].toCPrice`,{
                 initialValue:pdSkus[index].toCPrice
               })(
                 <Input placeholder="请输入零售价" />
               )}
             </div>
  }
  renderReceivePrice =(text, record, index)=> {
    const { pdSkus } = this.props.addGoods;
    return  <div>
               {this.props.form.getFieldDecorator(`pdSkus[${index}].costPrice`,{
                 initialValue:pdSkus[index].costPrice
               })(
                 <Input placeholder="请输入建议零售价" />
               )}
             </div>
  }
  renderDeliveryPrice =(text, record, index)=> {
    const { pdSkus } = this.props.addGoods;
    return  <div>
               {
                 this.props.form.getFieldDecorator(`pdSkus[${index}].tagPrice`,{
                   initialValue:pdSkus[index].tagPrice
                 })(
                   <Input placeholder="请输入进货价" />
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
          <Table.Column title="零售价" key ={4} render={this.renderPurchasePricee} />
          <Table.Column title="建议零售价" key ={5} render={this.renderReceivePrice}/>
          <Table.Column title="进货价" key ={6} render={this.renderDeliveryPrice}/>
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
