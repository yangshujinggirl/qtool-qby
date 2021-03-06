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
import EditableCell from '../EditableCell/index.js';
import './index.less';

const FormItem = Form.Item;

const formItemLayout2 = {
  labelCol: {
    span: 4
  },
  wrapperCol: {
    span: 20
  }
};

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
                  <Input  disabled className="goods-name" key={index}/>
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
                  <Input placeholder="请输入商品编码" autoComplete="off"/>
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
                   <Input placeholder="请输入商品条码" autoComplete="off"/>
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
                   <Input placeholder="请输入售价" autoComplete="off"/>
                 )
              }
             </div>
  }
  renderPurchasePricee =(text, record, index)=> {
    const { pdSkus, specData } = this.props.addGoods;
    let name = specData.specOne.length == 0?'purchasePrice':`pdSkus[${index}].purchasePrice`;
    return  <FormItem className='purchasePrice-input'>
               {this.props.form.getFieldDecorator(name,{
                 rules:[{pattern:/^\d+(\.\d{0,4})?$/,message:'仅限四位小数'}],
                 initialValue:pdSkus[index].purchasePrice
               })(
                 <Input placeholder="请输入采购价格" autoComplete="off"/>
               )}
             </FormItem>
  }
  renderReceivePrice =(text, record, index)=> {
    const { pdSkus, specData } = this.props.addGoods;
    let name = specData.specOne.length == 0?'receivePrice':`pdSkus[${index}].receivePrice`;
    return  <div>
               {this.props.form.getFieldDecorator(name,{
                 initialValue:pdSkus[index].receivePrice
               })(
                 <Input placeholder="请输入到货价格" autoComplete="off"/>
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
                   <Input placeholder="请输入出库价格" autoComplete="off"/>
                 )
               }
             </div>
  }
  renderTypes =(text, record, index)=> {
    let fileList = [];
    if(record.fileList) {
      fileList = record.fileList
    }
    return  <UpLoadFile
             form={this.props.form}
             fileList={fileList}
             index={index}/>
  }
  render() {
    const { pdSkus,specData } = this.props.addGoods;
    return(
      <div className="pdSkus-goods-info-tabels">
        <Col span={24}>
          <FormItem label='商品信息' {...formItemLayout2}>
            <Table
              dataSource={pdSkus}
              rowKey={(record) =>record.key}
              pagination={false}
              bordered={true}>
              {
                specData.specOne.length>0&&
                <Table.Column title="商品规格" width='10%' key ='name' render={this.renderName}/>
              }
                <Table.Column title="商品编码" key ='code' render={this.renderCode}/>
                <Table.Column title="商品条码" key ='barcode' render={this.renderBarcode}/>
                <Table.Column title="售价" key ='salePrice' render={this.renderSalePrice}/>
                <Table.Column title="采购价格" key ='purchasePrice' render={this.renderPurchasePricee} />
                <Table.Column title="到货价格" key ='receivePrice' render={this.renderReceivePrice}/>
                <Table.Column title="出库价格" key ='deliveryPrice' render={this.renderDeliveryPrice}/>
              {
                specData.specOne.length>0&&
                <Table.Column title="上传图片" key ='picUrl' render={this.renderTypes}/>
              }

            </Table>
          </FormItem>
        </Col>
        <Col span={24}>
          <FormItem label='批量设置' {...formItemLayout2}>
             <div style={{display:'flex',textAlign:'center'}}>
                <EditableCell text='售价' title='salePrice'/>
                <EditableCell text='采购价格' title='purchasePrice'/>
                <EditableCell text='到货价格' title='receivePrice'/>
                <EditableCell text='出库价格' title='deliveryPrice'/>
            </div>
           </FormItem>
        </Col>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { addGoods }  = state;
  return { addGoods };
}
export default connect(mapStateToProps)(GoodsInfo);
