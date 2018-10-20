import React,{ Component }from 'react'
import { connect } from 'dva'
import {Modal,Form,Input,message} from 'antd'
import Qtable from '../../../../components/Qtable/index';
const FormItem = Form.Item;
import {accAdd,accMul,Subtr} from '../../../../utils/operate'
import {deepcCloneObj} from "../../../../utils/commonFc"

class SplitOrderModal extends Component{
  constructor(props){
    super(props);
    this.state = {
      newList:[],
      newEcSuborderPayAmount:0
    }
    /* -----------------------------修改前的colums(上面的)---------------- */
    this.columns1 = [{
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
        title:'剩余数量',
        dataIndex:'surplusQty',
      },{
        title:'拆分数量',
        dataIndex:'auditQty',
        render:(text,record,index)=>{
          const { getFieldDecorator } = this.props.form;
          var method = "handleConfirmQty"+record.key;
          method = (rule, value, callback) => {
              const { getFieldValue } = this.props.form;
              if (value && value > record.qty && /^[0-9]*$/.test(value)) {
                  callback('输入小于原数量的整数')
              };
              callback();
          }
          return(
            <Form>
              <FormItem>
                {getFieldDecorator(`auditQty`+record.key,{
                  rules:[{validator: method}]
                })(
                  <Input onBlur={(e)=>this.onSplitBlur(record,e)}/>
                )}
              </FormItem>
            </Form>
          )
        }
      },];

    /* -----------------------------修改后的colums(下面的)---------------- */
    this.columns2= [{
        title:'商品编码',
        dataIndex:'code',
      },{
        title:'商品名称',
        dataIndex:'name',
      },{
        title:'规格',
        dataIndex:'displayName',
      },{
        title:'数量',
        dataIndex:'auditQty',
      },{
        title:'商品实付金额',
        dataIndex:'actPaymoney',
        render:(text,record,index)=>{
          const goodPrice = (Number(record.payAmount)/Number(record.qty)*Number(record.auditQty)).toFixed(2)
          return(<span>{goodPrice}</span>)
        },
      }];
  }
  //取消
  onCancel =()=>{
    // this.setState({newEcSuborderPayAmount:0})
    this.props.onCancel()
  }
  //订单拆分input失去焦点
  onSplitBlur =(record,e)=>{
    this.props.form.validateFieldsAndScroll((err)=>{
      const index = record.key;
      const attr = "auditQty"+index;
      const value = e.target.value;
      if(err && !(err.hasOwnProperty(attr))){ //有错，当前列无错
        this.handleSplitOrder(record,value)
      }else if(!err){ //无错
        this.handleSplitOrder(record,value)
      }
    })
  }
  //拆分订单做处理--->是新增替换还是删除
  handleSplitOrder =(record,value)=> {
    const {apartList} = this.props;
    if(Number(value) ){ //有值
      /* ---------------------修改剩余数量--------------------- */
      const surplusQty = Number(record.qty)-Number(value) //剩余数量
      apartList.map((item,index)=>{
        if(item.key==record.key){
          item.surplusQty = surplusQty;
        };
        return item;
      });
      /* ---------------------修改剩余数量--------------------- */
      record.auditQty = Number(value);
      const obj = this.isExit(record);
      if(obj.isConsist){ //存在就替换
        obj.newList.splice(obj.currentIndex,1,record);
      }else{//不存在就新增
        obj.newList.push(record);
      };
      /* --------------新增实付金额总和-------------- */
      let newEcSuborderPayAmount = 0;
      obj.newList.map((item,index)=>{
        let price = Number((Number(item.payAmount)/Number(item.qty)*Number(item.auditQty)).toFixed(2));
        let newPrice = accMul(price,100);
        newEcSuborderPayAmount+=newPrice;
      });
      newEcSuborderPayAmount = newEcSuborderPayAmount/100;
      let newObj = obj.newList;
      let ecSuborderSurplusPayAmount = Subtr(Number(this.props.suborderPayAmount),newEcSuborderPayAmount); //剩余金额
      /* --------------新增实付金额总和-------------- */
      let newList = obj.newList;
      // this.setState({newList:obj.newList,newEcSuborderPayAmount})
      this.props.dataChange(apartList,ecSuborderSurplusPayAmount,newEcSuborderPayAmount,newList)
    }else{ //没值(如果是0就清掉)
      const obj = this.isExit(record);
      if(obj.isConsist){ //数组中原本存在，现在为0就清掉
        obj.newList.splice(obj.currentIndex,1);
      };
      let newList = obj.newList;
      // this.setState({newList:obj.newList})
      this.props.dataChangeList(newList)
    };
  }
  //判断数组里是否含有这组值，并记录现在这组值在新增数组中所处的位置
  isExit =(record)=> {
    const key = record.key; //唯一标识
    let {newList} = this.props;
    let currentIndex;
    const isConsist = newList.some((item,index)=>{
      if(item.key == key ){
        currentIndex = index;
      };
      return (item.key == key);
    });
    const obj = {isConsist,currentIndex,newList}
    return obj
  }
  clearForm =()=> {
    this.props.form.resetFields();
  }
  onOk =()=> {
    this.props.form.validateFieldsAndScroll((err)=>{
      if(!err && Boolean(this.props.newList[0])){
        const {newEcSuborderPayAmount} = this.props;
        const {newList,ecSuborderId,suborderPayAmount,ecSuborderSurplusPayAmount,newEcSuborderNo,apartList}=this.props;
        let [qtySum,oldQtySum] = [0,0];
        const arr = deepcCloneObj(newList);
        arr.map((item,index)=>{
          qtySum+=Number(item.auditQty);
          item.oldpayAmount = item.payAmount;
          item.payAmount = (Number(item.oldpayAmount)/Number(item.qty)*Number(item.auditQty)).toFixed(2);
          item.oldQty = item.qty;
          item.qty=item.auditQty;
        });
        apartList.map((item,index)=>{
          oldQtySum+=Number(item.qty);
        })
        const obj={
          oldSuborder:{ecSuborderId,ecSuborderPayAmount:suborderPayAmount,ecSuborderSurplusPayAmount,spus:apartList},
          newSuborder:{newEcSuborderNo,newEcSuborderPayAmount,qtySum,spus:arr}
        };
        if(qtySum != oldQtySum ){
          this.props.onOk(obj,this.clearForm)
        }else{
          message.error("不可将原订单中的全部拆分至新订单")
        };
      }else{
        message.error("请正确填写拆分数量");
      };
    })
  }
  render(){
    const {newEcSuborderPayAmount,newList,visible,apartList,ecSuborderNo,newEcSuborderNo,suborderPayAmount,ecSuborderPayAmount,ecSuborderSurplusPayAmount} = this.props;
    // const {newEcSuborderPayAmount} = this.state;
    return(
      <div>
        <Modal
          width={920}
          title='订单拆分'
          visible={visible}
          onCancel={this.onCancel}
          onOk={this.onOk}
        >
          <div className='wrapper_order'>
            <div className='old_order'>
              <div className='origin_order'>
                <p>原始订单号：{ecSuborderNo}</p>
                <p>　
                  <span>原始订单实付金额：{suborderPayAmount}</span>　
                  <span>订单剩余实付金额：{ecSuborderSurplusPayAmount}</span>
                </p>
              </div>
              <Qtable
                dataSource={apartList}
                columns={this.columns1}
                bordered
              />
            </div>
            <div className='old_order'>
              <div className='origin_order'>
                <p>新增订单号：{newEcSuborderNo}</p>
                <p>
                  <span>新订单实付金额：{newEcSuborderPayAmount}</span>
                </p>
              </div>
              <Qtable
                dataSource={newList}
                columns={this.columns2}
                bordered
              />
            </div>
          </div>
        </Modal>
      </div>
    )
  }
}
const SplitOrderModals = Form.create()(SplitOrderModal);
export default SplitOrderModals
