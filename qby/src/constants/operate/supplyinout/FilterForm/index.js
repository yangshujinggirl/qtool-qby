import React, { Component } from 'react'
import {connect} from 'dva'
import {
  Form,
  Row,
  Col,
  Input,
  Button,
  Select,
  DatePicker
}from 'antd'
import moment from 'moment';
import {timeForMat} from '../../../../utils/meth';
const FormItem = Form.Item;
const Option = Select.Option;
const RangePicker = DatePicker.RangePicker

class NormalForm extends Component{
  //点击搜索
  handleSubmit = (e) => {
    this.props.form.validateFieldsAndScroll((err, values) => {
      console.log(values)
      const{rangePicker,..._values} = values;
      if(rangePicker&&rangePicker[0]){
        _values.dateStart =  moment(rangePicker[0]).format('YYYY-MM-DD');
        _values.dateEnd = moment(rangePicker[1]).format('YYYY-MM-DD');
      };
      this.props.submit && this.props.submit(_values);
    })
  }
  //初始化
  render(){
    const defaultTime = [moment(timeForMat(30).t2), moment(timeForMat(30).t1)]
    const { getFieldDecorator }= this.props.form;
    return(
      <div>
        <Form className="qtools-condition-form">
          <div className='search-form-outwrap'>
            <div className="search-form-wrap">
                <FormItem label='结算单号'>
                  {getFieldDecorator('settlementNo')(
                      <Input placeholder='请输入结算单号' autoComplete="off"/>
                  )}
                </FormItem>
                <FormItem label='供应商名称'>
                  {getFieldDecorator('name')(
                    <Input placeholder='请输入供应商名称' autoComplete="off"/>
                  )}
                </FormItem>
                <FormItem label='类型'>
                    {getFieldDecorator('type')(
                    <Select allowClear={true} placeholder="请选择类型" className='select'>
                        <Option value={10}>采退费用 </Option>
                        <Option value={21}>货到采购费用 </Option>
                        <Option value={22}>票到采购费用</Option>
                        <Option value={23}>现结采购费用</Option>
                        <Option value={24}>现结多付收款</Option>
                    </Select>
                    )}
                </FormItem>
                <FormItem label='是否已结算'>
                    {getFieldDecorator('status')(
                    <Select allowClear={true} placeholder="请选择是否已结算" className='select'>
                        <Option value={1}>是</Option>
                        <Option value={0}>否</Option>
                    </Select>
                    )}
                </FormItem>
                <FormItem label='关联业务人员'>
                  {getFieldDecorator('userName')(
                    <Input placeholder='请输入关联业务人员' autoComplete="off"/>
                  )}
                </FormItem>
                <FormItem label='收支筛选'>
                    {getFieldDecorator('payType')(
                    <Select allowClear={true} placeholder="请选择收支筛选" className='select'>
                        <Option value={10}>应收</Option>
                        <Option value={20}>应付</Option>
                    </Select>
                    )}
                </FormItem>
                <FormItem
                    label="结算到期日"
                >
                  {getFieldDecorator('rangePicker',{
                    initialValue:defaultTime
                  })(
                    <RangePicker showTime format="YYYY-MM-DD"/>
                  )}
                </FormItem>
            </div>
          </div>
          <div className="search-submit-btn">
              <Button
                htmlType="submit"
                type="primary"
                size='large'
                onClick={()=>this.handleSubmit()}>
                  搜索
              </Button>
          </div>
        </Form>
      </div>
    )
  }
}

const FilterForm = Form.create({
  onValuesChange:(props, changedValues, allValues) => {
    props.onValuesChange(allValues);
  }
})(NormalForm)
function mapStateToProps(state){
  const { supplyinout } = state;
  return {supplyinout}
}
export default connect(mapStateToProps)(FilterForm)
