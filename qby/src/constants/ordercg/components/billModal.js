import React, { Component } from 'react';
import { Modal, Button, Form, Table, Input, message} from 'antd'
import {connect} from 'dva'
const FormItem = Form.Item;
import './index.less'

class BillModal extends Component{
  constructor(props){
    super(props)
    this.state={
      asnNo:null,
      wsAsnId:null,
      amountSum:null,
      billInfo:[]
    };
    const that = this
    this.columns = [{
        title: '发票号',
        dataIndex: 'invoiceCode',
        render(text,record,index){
          return(
            <FormItem>
              {
  				      that.props.form.getFieldDecorator(`record[${index}].invoiceCode`,{
                  rules:[
                    {required:true,message:'请输入发票号'},
                    {pattern:/^[^ ]+$/,message:'不能包含空格'},
                  ],
      						initialValue:record.invoiceCode,
      					})(
      						 <Input placeholder="请输入发票号" autoComplete="off"/>
      					)
      				}
            </FormItem>
          )
        }
      },{
        title: '发票金额',
        dataIndex: 'invoiceAmount',
        render(text,record,index){
          return(
            <FormItem>
              {
      					that.props.form.getFieldDecorator(`record[${index}].invoiceAmount`,{
                  rules:[
                    {required:true,message:'请输入发票金额'},
                    {pattern:/^\d+(\.\d{0,2})?$/,message:'尽包含两位小数'},
                  ],
      						initialValue:record.invoiceAmount,
      					})(
      						 <Input placeholder="请输入发票金额" autoComplete="off"/>
      					)
      				}
            </FormItem>
          )
        }
      },
      {
        title: '',
        dataIndex: 'delete',
        render(text,record,index){
          return(
            <a
              href='javascript:;'
              onClick={()=>that.handDelete(index)}
              className="theme-color delete">
              删除
            </a>
          )
        }
      },
    ]
  }

  handleAdd =()=> {
		let { dataSource } = this.props.billInfo;
		dataSource.push({
			invoiceCode:null,
			invoiceAmount:null,
		})
		this.props.handleAdd(dataSource)
	}
  handDelete(index) {
    const {dataSource}=this.props.billInfo;
    dataSource.splice(index,1);
    this.props.handDelete(dataSource)
	}
  clearForm =()=> {
    this.props.form.resetFields(['record']);
  }
  onCancel =()=> {
    this.props.onCancel(this.clearForm);
  }
  //点击确定
  onOk =()=> {
    this.props.form.validateFieldsAndScroll((err,values)=>{
      if(!err){
        let hash = {};
        let index = 0;
        let { record } = values;
        record.map((item)=> {
          if(hash[item.invoiceCode]){
            index++;
          }else{
            hash[item.invoiceCode] = 1;
          };
        });
        if(index){ //有重复发票
          message.warning('不可输入重复的发票号');
        }else{
          let total=0;
          record.map((item)=> {
            total+=Number(item.invoiceAmount);
          });
          const invoices = values.record;
          const { asnNo,amountSum,wsAsnId} = this.props.billInfo;
          const values_ = {asnNo,amountSum,wsAsnId,invoices}
          if(total < Number(amountSum) || total == Number(amountSum) ){
            this.props.onOk(values_,total,this.clearForm);
          }else{
            message.error('发票总金额不可超过到货总金额',.8);
          }
        };
      };
    });
  };
  render(){
    const { getFieldDecorator } = this.props.form;
    const { asnNo, amountSum, dataSource } = this.props.billInfo;
    return(
      <div>
        <Modal
          title="发票管理"
          visible={this.props.visible}
          onOk={this.onOk}
          onCancel={this.onCancel}
          wrapClassName="billmodal"
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
              {
                dataSource.length>0 &&
                <Table
                  bordered={false}
                  pagination={false}
                  dataSource={dataSource}
                  columns={this.columns}
                  getFieldDecorator={getFieldDecorator}
                >
                </Table>
              }
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
