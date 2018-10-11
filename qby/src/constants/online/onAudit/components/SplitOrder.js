import React,{ Component }from 'react'
import { connect } from 'dva'
import {Modal,Form,Input} from 'antd'
import Qtable from '../../../../components/Qtable/index';
const FormItem = Form.Item;
import {accAdd,accMul,Subtr} from '../../../../utils/operate'

class SplitOrderModal extends Component{
  constructor(props){
    super(props);
    this.state = {
      newList:[],
      totalActPrcie:0
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
        dataIndex:'size',
      },{
        title:'原数量',
        dataIndex:'qty',
      },{
        title:'原实付金额',
        dataIndex:'payAmount',
      },{
        title:'剩余数量',
        dataIndex:'surpulsQty',
      },{
        title:'拆分数量',
        dataIndex:'apart',
        render:(text,record,index)=>{
          const { getFieldDecorator } = this.props.form;
          const maxNum = record.qty;
          const reg = new RegExp("^(?:[0-"+maxNum+"]"+"{0,1})"+"$");
          return(
            <Form>
              <FormItem>
                {getFieldDecorator(`apart`+index,{
                  rules:[{pattern:reg,message:'请输入小于原数量的整数'}]
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
        dataIndex:'size',
      },{
        title:'数量',
        dataIndex:'apart',
      },{
        title:'商品实付金额',
        dataIndex:'',
        render:(text,record,index)=>{
          const goodPrice = (Number(record.payAmount)/Number(record.qty)*Number(record.apart)).toFixed(2)
          return(<span>{goodPrice}</span>)
        },
      }];
  }
  //取消
  onCancel =()=>{
    this.setState({newList:[],totalActPrcie:0})
    this.props.onCancel()
  }
  //订单拆分input失去焦点
  onSplitBlur =(record,e)=>{
    this.props.form.validateFieldsAndScroll((err)=>{
      const index = record.key;
      const attr = "apart"+index;
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
      const surpulsQty = Number(record.qty)-Number(value) //剩余数量
      apartList.map((item,index)=>{
        if(item.key==record.key){
          item.surpulsQty = surpulsQty;
        };
        return item;
      });
      /* ---------------------修改剩余数量--------------------- */
      record.apart = value;
      const obj = this.isExit(record);
      if(obj.isConsist){ //存在就替换
        obj.newList.splice(obj.currentIndex,1,record);
      }else{//不存在就新增
        obj.newList.push(record);
      };
      /* --------------新增实付金额总和-------------- */
      let totalActPrcie = 0;
      obj.newList.map((item,index)=>{
        let price = Number((Number(item.payAmount)/Number(item.qty)*Number(item.apart)).toFixed(2));
        let newPrice = accMul(price,100);
        totalActPrcie+=newPrice;
      });
      totalActPrcie = totalActPrcie/100;
      let newObj = obj.newList;
      let ecSuborderSurplusPayAmount = Subtr(Number(record.actmoney),totalActPrcie);
      /* --------------新增实付金额总和-------------- */
      this.setState({newList:obj.newList,totalActPrcie})
      this.props.dataChange(apartList,ecSuborderSurplusPayAmount)
    }else{ //没值(如果是0就清掉)
      const obj = this.isExit(record);
      if(obj.isConsist){ //数组中原本存在，现在为0就清掉
        obj.newList.splice(obj.currentIndex,1);
      };
      this.setState({newList:obj.newList})
    };
  }
  //判断数组里是否含有这组值，并记录现在这组值在新增数组中所处的位置
  isExit =(record)=> {
    const key = record.key; //唯一标识
    let {newList} = this.state;
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
  onOk =()=> {
    const {newList} = this.state
    this.props.onOk(newList)
  }
  render(){
    const {visible,apartList,ecSuborderId,apartListCode,ecSuborderPayAmount,ecSuborderSurplusPayAmount} = this.props;
    const {newList,totalActPrcie} = this.state;
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
                <p>原始订单号：{apartListCode}</p>
                <p>　
                  <span>原始订单实付金额：{ecSuborderPayAmount}</span>　
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
                <p>新增订单号：YH02130000700001</p>
                <p>
                  <span>新订单实付金额：{totalActPrcie}</span>
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
