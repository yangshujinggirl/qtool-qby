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
import '../index.css'
const FormItem = Form.Item;
const Option = Select.Option;
const RangePicker = DatePicker.RangePicker
const formItemLayout = {
    labelCol: { span:6 },
    wrapperCol: { span: 16 },
};
const timerLayout = {
    labelCol: { span:6 },
    wrapperCol: { span: 20 },
};

class NormalForm extends Component{
  //点击搜索
  handleSubmit = (e) => {
    // e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      const{rangePicker,..._values} = values;
      if(rangePicker){
        _values.createTimeST =  new Date( rangePicker[0]).getTime();
        _values.createTimeET = new Date(rangePicker[1]).getTime();
      }
      this.props.submit && this.props.submit(_values);
    })
  }
  //初始化
  render(){
    const { getFieldDecorator }= this.props.form;
    return(
      <div className='form'>
        <Form>
          <Row wrap>
              <Col span={6}>
                  <FormItem {...formItemLayout} label='商品编码'>
                    {getFieldDecorator('code')(
                        <Input placeholder='商品编码'/>
                      )}
                  </FormItem>
              </Col>
              <Col span={6}>
                  <FormItem {...formItemLayout} label='最后修改人'>
                    {getFieldDecorator('updateUserName')(
                      <Input placeholder='请输入最后修改人'/>
                    )}
                  </FormItem>
              </Col>
              <Col span={6}>
                <FormItem {...formItemLayout} label='定时操作'>
                    {getFieldDecorator('opstatus')(
                    <Select allowClear={true} placeholder="请选择" className='select'>
                        <Option value='1'>上线</Option>
                        <Option value='2'>下线</Option>
                        <Option value='3'>NEW</Option>
                        <Option value='4'>下NEW</Option>
                        <Option value='5'>HOT</Option>
                        <Option value='6'>下HOT</Option>
                    </Select>
                    )}
                </FormItem>
              </Col>
              <Col span={6}>
                <FormItem {...formItemLayout} label='状态'>
                    {getFieldDecorator('status')(
                    <Select allowClear={true} placeholder="请选择" className='select'>
                        <Option value='1'>待执行</Option>
                        <Option value='2'>已执行</Option>
                        <Option value='3'>无效</Option>
                    </Select>
                    )}
                </FormItem>
              </Col>
            </Row>
            <FormItem>
                <Button
                  className='submit'
                  type="primary"
                  size='large'
                  onClick={()=>this.handleSubmit()}>
                    搜索
                </Button>
            </FormItem>
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
  const { serverBill } = state;
  return { serverBill }
}
export default connect(mapStateToProps)(FilterForm)
