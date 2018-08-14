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


import UpLoadFile from '../GoodsInfo/UpLoadFile.js';
import EditableCell from '../EditableCell/index.js';

const formItemLayout2 = {
  labelCol: {
    span: 4
  },
  wrapperCol: {
    span: 20
  }
};
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
                  <Input disabled className="goods-name"/>
                )
              }
            </div>
  }
  renderCode =(text, record, index)=> {
    const { pdSkus, specData } = this.props.addGoods;
    let name = specData.specOne.length == 0?'code':`pdSkus[${index}].code`;
    return  <div>
              {
                this.props.form.getFieldDecorator(name,{
                  initialValue:pdSkus[index].code
                })(
                  <Input
                    placeholder="请输入商品编码"
                    autoComplete="off"/>
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
    let name = specData.specOne.length == 0?'toBPrice':`pdSkus[${index}].toBPrice`;
    return  <div>
              {
                 this.props.form.getFieldDecorator(name,{
                   initialValue:pdSkus[index].toBPrice
                 })(
                   <Input placeholder="请输入售价" autoComplete="off"/>
                 )
              }
             </div>
  }
  renderPurchasePricee =(text, record, index)=> {
    const { pdSkus, specData } = this.props.addGoods;
    let name = specData.specOne.length == 0?'toCPrice':`pdSkus[${index}].toCPrice`;
    return  <div>
               {this.props.form.getFieldDecorator(name,{
                 initialValue:pdSkus[index].toCPrice
               })(
                 <Input placeholder="请输入零售价" autoComplete="off"/>
               )}
             </div>
  }
  renderReceivePrice =(text, record, index)=> {
    const { pdSkus, specData } = this.props.addGoods;
    let name = specData.specOne.length == 0?'tagPrice':`pdSkus[${index}].tagPrice`;
    return  <div>
               {this.props.form.getFieldDecorator(name,{
                 initialValue:pdSkus[index].tagPrice
               })(
                 <Input placeholder="请输入建议零售价" autoComplete="off"/>
               )}
             </div>
  }
  renderDeliveryPrice =(text, record, index)=> {
    const { pdSkus, specData } = this.props.addGoods;
    let name = specData.specOne.length == 0?'costPrice':`pdSkus[${index}].costPrice`;
    return  <div>
               {
                 this.props.form.getFieldDecorator(name,{
                   initialValue:pdSkus[index].costPrice
                 })(
                   <Input placeholder="请输入进货价" autoComplete="off"/>
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
    const { pdSkus, specData } = this.props.addGoods;
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
            <Table.Column title="商品规格" width={120} key ={0} render={this.renderName}/>
          }
          <Table.Column title="商品编码" key ={1} render={this.renderCode}/>
          <Table.Column title="商品条码" key ={2} render={this.renderBarcode}/>
          <Table.Column title="售价" key ={3} render={this.renderSalePrice}/>
          <Table.Column title="零售价" key ={4} render={this.renderPurchasePricee} />
          <Table.Column title="建议零售价" key ={5} render={this.renderReceivePrice}/>
          <Table.Column title="进货价" key ={6} render={this.renderDeliveryPrice}/>
          {
            specData.specOne.length>0&&
            <Table.Column title="上传图片" key ={7} render={this.renderTypes}/>
          }

        </Table>
      </FormItem>
    </Col>
    <Col span={24}>
      <FormItem label='批量设置' {...formItemLayout2}>
         <div style={{display:'flex',textAlign:'center'}}>
            <EditableCell text='售价' title='toBPrice'/>
            <EditableCell text='零售价' title='toCPrice'/>
            <EditableCell text='建议零售价' title='costPrice'/>
            <EditableCell text='进货价' title='tagPrice'/>
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
