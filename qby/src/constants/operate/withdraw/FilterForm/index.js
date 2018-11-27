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
import {timeForMats} from '../../../../utils/meth';
const FormItem = Form.Item;
const Option = Select.Option;
const RangePicker = DatePicker.RangePicker

class NormalForm extends Component{
  //点击搜索
  handleSubmit = (e) => {
    this.props.form.validateFieldsAndScroll((err, values) => {
      const{rangePicker,..._values} = values;
      if(rangePicker&&rangePicker[0]){
        _values.dateStart =  moment(rangePicker[0]).format('YYYY-MM-DD HH:mm:ss');
        _values.dateEnd = moment(rangePicker[1]).format('YYYY-MM-DD HH:mm:ss');
      }
      this.props.submit && this.props.submit(_values);
    })
  }
  //初始化
  render(){
    const defaultTime = [moment(timeForMats(30).t2), moment(timeForMats(30).t1)]
    const { getFieldDecorator }= this.props.form;
    return(
      <div>
        <Form className="qtools-condition-form">
          <div className='search-form-outwrap'>
            <div className="search-form-wrap">
                <FormItem label='门店名称'>
                  {getFieldDecorator('shopName')(
                    <Input placeholder='请输入门店名称' autoComplete="off"/>
                  )}
                </FormItem>
                <FormItem label='审核状态'>
                    {getFieldDecorator('status')(
                    <Select allowClear={true} placeholder="请选择审核状态" className='select'>
                        <Option value={0}>待审核 </Option>
                        <Option value={1}>审核通过 </Option>
                        <Option value={2}>审核不通过</Option>
                    </Select>
                    )}
                </FormItem>
                <FormItem label='付款状态'>
                    {getFieldDecorator('payStatus')(
                    <Select allowClear={true} placeholder="请选择付款状态" className='select'>
                        <Option value={10}>未付款</Option>
                        <Option value={20}>付款中</Option>
                        <Option value={30}>付款成功</Option>
                        <Option value={40}>付款失败</Option>
                    </Select>
                    )}
                </FormItem>
                <FormItem label='提现单号'>
                  {getFieldDecorator('carryCashNo')(
                    <Input placeholder='请输入提现单号' autoComplete="off"/>
                  )}
                </FormItem>
                <FormItem
                    label="提现时间"
                >
                  {getFieldDecorator('rangePicker',{
                    initialValue:defaultTime
                  })(
                    <RangePicker showTime format="YYYY-MM-DD HH:mm:ss"/>
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
  const { withdraw } = state;
  return { withdraw }
}
export default connect(mapStateToProps)(FilterForm)
