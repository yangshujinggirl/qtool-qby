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
import {getCategoryApi} from "../../../../../services/goodsCenter/baseGoods"
const FormItem = Form.Item;
const Option = Select.Option;

class NormalForm extends Component {
  constructor(props){
    super(props)
    this.state={
      categoryList2:[]
    }
  }
  //分类发生变化
  onChange=(value)=>{
    if(!value){
      this.setState({
        categoryList2:[]
      });
      this.props.form.resetFields(["pdCategory2Id"])
    };
  }
  //一级分类选中
  onSelect=(value)=>{
    this.props.form.resetFields(["pdCategory2Id"]);
    getCategoryApi({level:2,parentId:value,status:1})
    .then(res=>{
      if(res.code == "0" ){
        this.setState({
          categoryList2:res.pdCategory
        })
      }
    })
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
        values.pdSpuId = values.pdSpuId.replace(/\s+/g, "");
        this.props.submit && this.props.submit(values)
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { categoryList } =this.props;
    const { categoryList2 } = this.state;
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
                 {getFieldDecorator('cname')(
                   <Input placeholder="请输入商品名称" autoComplete="off"/>
                 )}
               </FormItem>
              <FormItem label='商品品牌'>
                 {getFieldDecorator('pdBrandName')(
                   <Input placeholder="请输入商品品牌" autoComplete="off"/>
                 )}
               </FormItem>
              <FormItem label='一级分类'>
                 {getFieldDecorator('pdCategory1Id')(
                   <Select
                       placeholder="请选择一级分类"
                       allowClear={true}
                       onSelect={this.onSelect}
                       onChange={this.onChange}
                     >
                     {
                      categoryList.length>0&&categoryList.map((el) => (
                         <Select.Option
                           value={el.pdCategoryId}
                           key={el.pdCategoryId}>{el.name}</Select.Option>
                       ))
                     }
                   </Select>
                 )}
               </FormItem>
               <FormItem label='二级分类'>
                  {getFieldDecorator('pdCategory2Id')(
                    <Select disabled={!categoryList2.length>0} placeholder="请选择二级分类" allowClear={true}>
                      {
                       categoryList2.length>0 && categoryList2.map((el) => (
                          <Select.Option
                            value={el.pdCategoryId}
                            key={el.pdCategoryId}>{el.name}</Select.Option>
                        ))
                      }
                    </Select>
                  )}
              </FormItem>
              <FormItem label='上线状态'>
                 {getFieldDecorator('cstatus')(
                   <Select allowClear={true} placeholder="请选择上线状态" autoComplete="off">
                     <Option value={20} key={20}>下线</Option>
                     <Option value={10} key={10}>上线</Option>
                   </Select>
                 )}
               </FormItem>
               <FormItem label='NEW商品'>
                  {getFieldDecorator('isNew')(
                    <Select allowClear={true} placeholder="请选择是否上新" autoComplete="off">
                        <Option value={1} key={1}>是</Option>
                        <Option value={0} key={0}>否</Option>
                    </Select>
                  )}
                </FormItem>
               <FormItem label='HOT商品'>
                  {getFieldDecorator('isHot')(
                    <Select allowClear={true} placeholder="请选择是否畅销" autoComplete="off">
                        <Option value={1} key={1}>是</Option>
                        <Option value={0} key={0}>否</Option>
                    </Select>
                  )}
                </FormItem>
            </div>
          </div>
          <div className="search-submit-btn">
             <Button
               type="primary"
               htmlType="submit"
               size='large'
               onClick={this.handleSubmit.bind(this)}>搜索</Button>
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
