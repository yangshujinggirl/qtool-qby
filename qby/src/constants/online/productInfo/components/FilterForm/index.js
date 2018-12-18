import React, { Component } from 'react';
import {
  Form,
  Row,
  Col,
  Input,
  Button,
  Icon,
  Select ,
  DatePicker
} from 'antd';
import { WarehouseOption } from '../../../../../components/FixedDataSource';
import { getWareListApi } from '../../../../../services/goodsCenter/baseGoods.js';
const FormItem = Form.Item;
const Option = Select.Option;

class NormalForm extends Component {
  constructor(props){
    super(props);
    this.state={
      pdTaxWarehouses:[]
    }
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if(values.pdSpuId){
        values.pdSpuId = values.pdSpuId.replace(/\s+/g, "");
      };
      this.props.submit && this.props.submit(values)
    });
  }
  getWareList =()=> {
    getWareListApi()
    .then(res=>{
      if(res.code == '0'){
        this.setState({
          pdTaxWarehouses:res.pdTaxWarehouses
        })
      }
    })
  }
  componentWillMount() {
    this.getWareList();
  }
  render() {
    const {pdTaxWarehouses} = this.state;
    const { getFieldDecorator } = this.props.form;
    return(
        <Form className="qtools-condition-form">
          <div className='search-form-outwrap'>
            <div className="search-form-wrap">
              <FormItem label='SPU ID'>
                 {getFieldDecorator('pdSpuId')(
                   <Input placeholder="请输入spuid" autoComplete="off"/>
                 )}
              </FormItem>
              <FormItem label='商品编码'>
                 {getFieldDecorator('code')(
                   <Input placeholder="请输入商品编码" autoComplete="off"/>
                 )}
               </FormItem>
              <FormItem label='商品名称'>
                 {getFieldDecorator('oname')(
                   <Input placeholder="请输入商品名称" autoComplete="off"/>
                 )}
               </FormItem>
              <FormItem label='商品条码'>
                 {getFieldDecorator('barCode')(
                   <Input placeholder="请输入商品名称" autoComplete="off"/>
                 )}
               </FormItem>
              <FormItem label='商品品牌'>
                 {getFieldDecorator('pdBrandName')(
                   <Input placeholder="请输入商品品牌" autoComplete="off"/>
                 )}
               </FormItem>
              <FormItem label='商品状态'>
                 {getFieldDecorator('status')(
                   <Select placeholder="请选择售卖状态" allowClear={true}>
                     <Option value={20} key={20}>停售</Option>
                     <Option value={10} key={10}>售卖</Option>
                   </Select>
                 )}
               </FormItem>
              <FormItem label='保税仓库'>
                 {getFieldDecorator('pdTaxWarehouseId')(
                   <Select placeholder="请选择" allowClear={false} allowClear={true}>
                     {
                       pdTaxWarehouses.map((el) => (
                         <Option value={el.pdTaxWarehouseId} key={el.pdTaxWarehouseId}>{el.name}</Option>
                       ))
                     }
                   </Select>
                 )}
               </FormItem>
              <div className="search-submit-btn">
                 <Button type="primary" htmlType="submit" size='large' onClick={this.handleSubmit.bind(this)}>搜索</Button>
               </div>
            </div>
          </div>
        </Form>
    )
  }
}
const FilterForm = Form.create({
  onValuesChange:(props, changedValues, allValues) => {
    props.onValuesChange(allValues);
  }
})(NormalForm);

export default FilterForm;
