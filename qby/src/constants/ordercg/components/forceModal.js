import React, { Component } from 'react';
import { Modal, Button, Form, Input, message,Select} from 'antd'
import {connect} from 'dva'
const Option = Select.Option;
const FormItem = Form.Item;
import './index.less'

class ForceModal extends Component{
  constructor(props){
    super(props)
  }
  clearForm =()=> {
    this.props.form.resetFields(['remark'])
  }
  //点击确定
  onOk =()=> {
    this.props.form.validateFieldsAndScroll((err,values)=>{
      const { wsAsnId }= this.props.forceInfo;
      values.wsAsnId = wsAsnId;
      this.props.onOk(values,this.clearForm);
    });
  }

  render(){
    const { getFieldDecorator }= this.props.form;
    const {asnNo,qtySum,qtyReceived} = this.props.forceInfo;
    return(
      <div className='billmanage'>
        <Modal
          title="强制完成"
          visible={this.props.visible}
          onOk={this.onOk}
          onCancel={this.props.onCancel}
        >
          <Form>
            <FormItem
                label="采购单号"
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 12 }}
            >
              <p>{asnNo}</p>
            </FormItem>
            <FormItem
                label="商品数量"
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 12 }}
            >
              <p>{qtySum}</p>
            </FormItem>
            <FormItem
                label="到货数量"
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 18 }}
            >
              <p>{qtyReceived}</p>
            </FormItem>
            <FormItem
                label="强制完成原因"
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 18 }}
            >
              {getFieldDecorator('remark')(
                <Select allowClear={true} placeholder="请选择强制完成原因">
                    <Option value='有账期的少货按实收数量结款'>有账期的少货按实收数量结款</Option>
                    <Option value='无账期的少货数量在下一笔货款中抵扣'>无账期的少货数量在下一笔货款中抵扣</Option>
                    <Option value='少货用其他等价商品更换'>少货用其他等价商品更换</Option>
                    <Option value='到货少货有疑义，我方承担损失'>到货少货有疑义，我方承担损失</Option>
                    <Option value='其他'>其他</Option>
                </Select>
              )}
            </FormItem>
          </Form>
        </Modal>
      </div>
    )
  }
}

function mapStateToProps(state){
  const {ordercg} = state;
  return {ordercg};
}
const ForceModals = Form.create()(ForceModal);
export default connect(mapStateToProps)(ForceModals);
