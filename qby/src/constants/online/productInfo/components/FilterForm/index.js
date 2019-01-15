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
import {removeSpace} from '../../../../../utils/meth';
const FormItem = Form.Item;
const Option = Select.Option;

class NormalForm extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if(values.pdSpuId){
        values.pdSpuId = values.pdSpuId.replace(/\s+/g, "");
      };
      removeSpace(values);
      this.props.submit && this.props.submit(values)
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return(
        <Form className="qtools-condition-form">
          <div className='search-form-outwrap'>
            <div className="search-form-wrap">
              <FormItem label='SPU ID'>
                 {getFieldDecorator('pdSpuId')(
                   <Input placeholder="请输入小于12位的spuid" maxLength='11' autoComplete="off"/>
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
                 {getFieldDecorator('warehouseId')(
                   <Select placeholder="请选择" allowClear={false} allowClear={true}>
                     {
                       WarehouseOption.map((el) => (
                         <Option value={el.key} key={el.key}>{el.value}</Option>
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
const FilterForm = Form.create({})(NormalForm);

export default FilterForm;
