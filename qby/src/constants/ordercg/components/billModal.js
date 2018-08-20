import React, { Component } from 'react';
import { Modal, Button, Form, Table, Input, message} from 'antd'
import {connect} from 'dva'
const FormItem = Form.Item;
import './index.less'

class BillModal extends Component{
  constructor(props){
    super(props)
    this.state={
      asnNo:this.props.billInfo.asnNo,
      amountSum:this.props.billInfo.amountSum,
      dataSource:this.props.billInfo.dataSource
    };
    const that = this
    this.columns = [{
        title: '发票号',
        dataIndex: 'invoiceNo',
        render(text,record,index){
          return(
            <div>
              {
  				      that.props.form.getFieldDecorator(`record[${index}].invoiceNo`,{
      						initialValue:record.invoiceNo,
      					})(
      						 <Input placeholder="请输入发票号" autoComplete="off"/>
      					)
      				}
            </div>
          )
        }
      },{
        title: 'invoiceAmount',
        dataIndex: 'invoiceAmount',
        render(text,record,index){
          return(
            <div>
              {
      					that.props.form.getFieldDecorator(`record[${index}].invoiceAmount`,{
      						initialValue:record.invoiceAmount,
      					})(
      						 <Input placeholder="请输入发票号" autoComplete="off"/>
      					)
      				}
            </div>
          )
        }
      },
      {
        title: 'delete',
        dataIndex: 'delete',
        render(text,record,index){
          return(
            <a href='javascript:;' onClick={()=>that.handDelete(index)} className="theme-color delete">删除</a>
          )
        }
      },
    ]
  }

  handleAdd =()=> {
		let { dataSource } = this.state;
		dataSource.push({
			invoiceNo:'',
			invoiceAmount:'',
		})
		this.setState({
			dataSource,
		})
	}
  handDelete(index) {
    const dataSource = this.state.dataSource;
    dataSource.splice(index,1);
    this.setState({
      dataSource:dataSource
    });
	}
  //点击确定
  onOk =()=> {
    this.props.form.validateFieldsAndScroll((err,values)=>{
      const invoices = values.record;
      const { asnNo,amountSum } = this.state
      const values_ = {asnNo,amountSum,invoices}
      this.props.onOk(values_);
    });
  }

  render(){
    const { getFieldDecorator }= this.props.form;
    const { asnNo, amountSum, dataSource } = this.state;
    return(
      <div className='billmanage'>
        <Modal
          title="发票管理"
          visible={this.props.visible}
          onOk={this.onOk}
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
                label="到货金额"
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 12 }}
            >
              <p>{amountSum}</p>
            </FormItem>
            <FormItem
                label="发票信息"
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 18 }}
            >
              <Table
                bordered={false}
                showHeader={false}
                pagination={false}
                dataSource={dataSource}
                columns={this.columns}
                getFieldDecorator={getFieldDecorator}
              >
              </Table>
              <Button onClick={this.handleAdd} type="primary">+发票</Button>
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
const BillModals = Form.create()(BillModal);
export default connect(mapStateToProps)(BillModals);
