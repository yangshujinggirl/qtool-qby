import React,{ Component }from 'react'
import { connect } from 'dva'
import {Modal,Form,Input,message} from 'antd'
import Qtable from '../../../../components/Qtable/index';
import {accAdd} from '../../../../utils/operate'
const FormItem = Form.Item;
import "../index.less"

class ChangePriceModal extends Component{
  constructor(props){
    super(props);
    this.state = {
      priceList:[],
      newTotalMoney:0,
    };
    this.columns = [{
        title:'商品编码',
        dataIndex:'code',
      },{
        title:'商品名称',
        dataIndex:'name',
      },{
        title:'规格',
        dataIndex:'displayName',
      },{
        title:'原数量',
        dataIndex:'qty',
      },{
        title:'原实付金额',
        dataIndex:'payAmount',
      },{
        title:'新实付金额',
        dataIndex:'newPayAmount',
        render:(text,record,index)=>{
          const { getFieldDecorator } = this.props.form;
          return(
            <Form>
              <FormItem>
                {getFieldDecorator(`newPayAmount`+index,{
                  rules:[{required:true,message:"请输入实付金额"},{pattern:/^\d+(\.\d{0,2})?$/,message:'仅可输入两位小数的数字'}]
                })(
                  <Input onBlur={(e)=>this.onPriceBlur(record,e)}/>
                )}
              </FormItem>
            </Form>
          )
        }
      }];
  }
  //订单拆分input失去焦点
  onPriceBlur =(record,e)=>{
    const value = e.target.value;
    const key = record.key;
    const attr = "newPayAmount" + key;
    const {priceList} = this.props;
    let currentIndex;
    record.newPayAmount = Number(value);
    this.props.form.validateFields([attr],(err)=>{
      if( Number(value) && err && !(err.hasOwnProperty(attr))){ //有错，当前列无错
        priceList.map((item,index)=>{
          if(item.key == key ){
            currentIndex = index;
          };
        });
        priceList.splice(currentIndex,1,record);
        let newTotalMoney = 0;
        priceList.map((item,index)=>{
          if(item.newPayAmount){
            newTotalMoney += item.newPayAmount;
          };
        });
        newTotalMoney = newTotalMoney.toFixed(2);
        this.props.dataChange(newTotalMoney,priceList)
      }else if( !Number(value)){ //有错（为空报的错），这时候得重新计算金额
        priceList.map((item,index)=>{
          if(item.key == key ){
            currentIndex = index;
          };
        });
        priceList[currentIndex].newPayAmount = 0;
        let newTotalMoney = 0;
        priceList.map((item,index)=>{
          if(item.newPayAmount){
            newTotalMoney += item.newPayAmount;
          };
        });
        newTotalMoney = newTotalMoney.toFixed(2);
        this.props.dataChange(newTotalMoney,priceList)
      }else if(!err){ //无错
        priceList.map((item,index)=>{
          if(item.key == key ){
            currentIndex = index;
          };
        });
        priceList.splice(currentIndex,1,record);
        let newTotalMoney=0;
        priceList.map((item,index)=>{
          newTotalMoney += item.newPayAmount
        });
        newTotalMoney = newTotalMoney.toFixed(2);
        this.props.dataChange(newTotalMoney,priceList)
      }
    });
  }
  onCancel =()=> {
    this.props.onCancel();
  }
  clearForm =()=> {
    this.props.form.resetFields();
  }
  onOk =()=> {
    this.props.form.validateFieldsAndScroll((err)=>{
      if(!err){
        this.props.onOk(this.clearForm);
      }
    })
  }
  render(){
    const {visible,priceList,oldTotalPrice,newTotalMoney} = this.props;
    return(
        <Modal
          wrapClassName="chang_price"
          width={920}
          title='修改价格'
          visible={visible}
          onCancel={this.onCancel}
          onOk={this.onOk}
        >
          <div>
            <p className='old_price'>　
              原实付金额合计：{oldTotalPrice}　新实付金额合计：{newTotalMoney}
            </p>
            <Qtable
              dataSource={priceList}
              columns={this.columns}
              bordered
            />
          </div>
        </Modal>
    )
  }
}
const ChangePriceModals = Form.create()(ChangePriceModal);
export default ChangePriceModals
