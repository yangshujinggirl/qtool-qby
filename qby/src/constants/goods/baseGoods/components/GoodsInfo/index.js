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
import UpLoadFile from './UpLoadFile.js';

const FormItem = Form.Item;

class GoodsInfo extends Component {
  constructor(props) {
    super(props);
  }
  renderName =(text, record, index)=> {
    const { pdSkus } = this.props.addGoods;
    return  <div>
              {
                this.props.form.getFieldDecorator(`pdSkus[${index}].name`,{
                  initialValue:pdSkus[index].name
                })(
                  <Input  disabled/>
                )
              }
            </div>
  }
  renderCode =(text, record, index)=> {
    const { pdSkus,specData } = this.props.addGoods;
    let name = specData.specOne.length == 0?'code':`pdSkus[${index}].code`;
    return  <div>
              {
                this.props.form.getFieldDecorator(name,{
                  initialValue:pdSkus[index].code
                })(
                  <Input placeholder="请输入商品编码" />
                )
              }
            </div>
  }
  renderBarcode =(text, record, index)=> {
    const { pdSkus, specData } = this.props.addGoods;
    let name = specData.specOne.length == 0?'barcode':`pdSkus[${index}].barcode`;
    return  <div>
                 {this.props.form.getFieldDecorator(name,{
                   initialValue:pdSkus[index].barcode
                 })(
                   <Input placeholder="请输入商品条码" />
                 )}
             </div>
  }
  renderSalePrice =(text, record, index)=> {
    const { pdSkus, specData } = this.props.addGoods;
    let name = specData.specOne.length == 0?'salePrice':`pdSkus[${index}].salePrice`;
    return  <div>
              {
                 this.props.form.getFieldDecorator(name,{
                   initialValue:pdSkus[index].salePrice
                 })(
                   <Input placeholder="请输入售价" />
                 )
              }
             </div>
  }
  renderPurchasePricee =(text, record, index)=> {
    const { pdSkus, specData } = this.props.addGoods;
    let name = specData.specOne.length == 0?'purchasePrice':`pdSkus[${index}].purchasePrice`;
    return  <div>
               {this.props.form.getFieldDecorator(name,{
                 initialValue:pdSkus[index].purchasePrice
               })(
                 <Input placeholder="请输入采购价格" />
               )}
             </div>
  }
  renderReceivePrice =(text, record, index)=> {
    const { pdSkus, specData } = this.props.addGoods;
    let name = specData.specOne.length == 0?'receivePrice':`pdSkus[${index}].receivePrice`;
    return  <div>
               {this.props.form.getFieldDecorator(name,{
                 initialValue:pdSkus[index].receivePrice
               })(
                 <Input placeholder="请输入到货价格" />
               )}
             </div>
  }
  renderDeliveryPrice =(text, record, index)=> {
    const { pdSkus, specData } = this.props.addGoods;
    let name = specData.specOne.length == 0?'deliveryPrice':`pdSkus[${index}].deliveryPrice`;
    return  <div>
               {
                 this.props.form.getFieldDecorator(name,{
                   initialValue:pdSkus[index].deliveryPrice
                 })(
                   <Input placeholder="请输入出库价格" />
                 )
               }
             </div>
  }
  renderTypes =(text, record, index)=> {
    const { pdSkus } = this.props.addGoods;
    let fileList = [];
    if(pdSkus.fileList) {
      fileList.push(record.fileList);
    }
    return  <UpLoadFile
             form={this.props.form}
             fileList={fileList}
             name={`pdSkus[${index}].picUrl`}/>
  }
  render() {
    const { pdSkus,specData } = this.props.addGoods;
    console.log(pdSkus)
    return(
      <div>
        <Table dataSource={pdSkus} pagination={false} bordered={true}>
          {
            specData.specOne.length>0&&
            <Table.Column title="商品规格" width={120} key ={0} render={this.renderName}/>
          }
          <Table.Column title="商品编码" key ={1} render={this.renderCode}/>
          <Table.Column title="商品条码" key ={2} render={this.renderBarcode}/>
          <Table.Column title="售价" key ={3} render={this.renderSalePrice}/>
          <Table.Column title="采购价格" key ={4} render={this.renderPurchasePricee} />
          <Table.Column title="到货价格" key ={5} render={this.renderReceivePrice}/>
          <Table.Column title="出库价格" key ={6} render={this.renderDeliveryPrice}/>
          {
            specData.specOne.length>0&&
            <Table.Column title="上传图片" key ={7} render={this.renderTypes}/>
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
