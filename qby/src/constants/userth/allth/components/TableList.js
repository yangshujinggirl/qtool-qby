import {Component} from 'react'
import {Table,Form,Input,Button} from 'antd'
const FormItem = Form.Item
class TableList extends Component {
  constructor(props){
    super(props);
    this.state = {
    };
    this.columns1 = [{
				width:'100px',
			  title: '商品编码',
			  dataIndex: 'pdCode',
			}, {
				width:'100px',
			  title: '商品名称',
			  dataIndex: 'pdName',
			}, {
				width:'70px',
			  title: '商品规格',
			  dataIndex: 'displayName',
			}, {
				width:'100px',
			  title: '购买数量/已退数量',
			  dataIndex: 'buyCount',
			  render: (text,record) => (
			    <div>{record.buyCount}/{record.returnCount}</div>
			  ),
			}, {
				width:'100px',
			  title: '实付金额/已退金额',
			  key: 'orderQuota',
			  render: (text, record) => (
			     <div>{record.orderQuota}/{record.returnQuota}</div>
			  ),
			}, {
				width:'80px',
			  title: '可退金额',
			  dataIndex: 'canReturnQuota',
			}, {
				width:'100px',
			  title: '退款数量',
				render: (text, record,index) => {
					const { getFieldDecorator } = this.props.form;
					const handleReturnCount =(rule,value,callback)=>
          {
						const {buyCount,returnCount} = record;
						if (value && value >(Number(buyCount)-Number(returnCount))) {
							 callback('不可超剩余数量')
					 	};
							 callback();
					};
					return(
              <FormItem className='applyReturnCount'>
								{
									getFieldDecorator(`applyReturnCount`+index, {
										rules: [
											{ required: true, message: '请输入退款数量'},
											{	pattern:/^([1-9][0-9]*){1,3}$/,message:'请输入大于0的整数'},
											{ validator: handleReturnCount }
										],
									})(<Input onBlur={this.getReturnCount.bind(this,index)} disabled={record.buyCount == record.returnCount}/>)
								}
              </FormItem>
				 	)
				},
			}, {
				width:'100px',
			  title: '退款金额',
				dataIndex:'applyReturnQuota',
				render: (text, record, index) => {
					if(!this.props.returnType && record.applyReturnCount){ //如果是售中直接计算
						return (
							<Input value={text} disabled />
						)
					}else{ //售后
						const { getFieldDecorator } = this.props.form;
						const handleReturnQuota =(rule,value,callback)=> {
							const {orderQuota,returnQuota} = record;
							if (value && value >(Number(orderQuota)-Number(returnQuota))) {
								 callback('不可超可退金额')
							};
								 callback();
						};
						return(
							<FormItem className='applyReturnCount'>
								{
									getFieldDecorator(`applyReturnQuota`+index, {
			 	 					 rules: [
			 							 { required: true, message: '请输入退款金额'},
			 							 {	pattern:/^\d+(\.\d{0,2})?$/,message:'小于等于两位小数的数字'},
									 	 { validator: handleReturnQuota }
			 						 ],
			 	 				 })(<Input onBlur={this.getReturnQuota.bind(this,index)} disabled={record.buyCount == record.returnCount}/>)
								}
							</FormItem>
						)
				};
			},
			}, {
				width:'60px',
			  title: '',
			  key: 'operate',
			  render: (text, record, index) => (
					this.props.productList.length > 1 ?
			    	<a href="javascript:;" onClick={this.delete.bind(this,index)} className="theme-color">删除</a>
					:null
			  ),
			}];
			this.columns2=[{
					width:'100px',
				  title: '商品编码',
				  dataIndex: 'pdCode',
				}, {
					width:'100px',
				  title: '商品名称',
				  dataIndex: 'pdName',
				}, {
					width:'70px',
				  title: '商品规格',
				  dataIndex: 'displayName',
				}, {
					width:'100px',
				  title: '购买数量',
					key:2,
				  dataIndex:'returnCount'
				}, {
					width:'100px',
				  title: '退款数量',
					key:'1',
				  dataIndex:'returnCount',
					render:(text,record)=>{
						return(<Input disabled value={text}/>)
					}
			 },]
  }
  componentWillMount =()=>{
    this.setState({
      orderNo:this.props.orderNo
    })
  }
  componentWillReceiveProps=(props)=>{
    if(props.orderNo != this.state.orderNo){
      this.resetFields();
      this.setState({orderNo:props.orderNo})
    }
  }
  resetFields=()=>{
    this.props.form.resetFields()
  }
//得到的退款金额
	getReturnQuota =(index,e)=> {
		this.props.productList[index].applyReturnQuota = Number(e.target.value);
	  this.props.productListChange(this.props.productList);
	}
  //得到退款数量
  getReturnCount =(index,e)=> {
    const {productList,returnType} = this.props;
    const {value} = e.target; //退款数量
    if(!returnType){ //如果是售中直接计算出退款金额--->不可编辑
      let returnMoney;
      let item = productList[index];
      if(value == item.buyCount - item.returnCount){ //退款数量等于剩余可退 --->表示全退---->用实付-已退（保证两者相加等于全部）
        returnMoney = item.orderQuota - item.returnQuota;
        item.applyReturnQuota = returnMoney;
      }else{ //单价 * 数量
        returnMoney = Number((item.orderQuota/item.buyCount * Number(value) ).toFixed(2));
        item.applyReturnQuota = returnMoney;
      };
    }
    productList[index].applyReturnCount = Number(value);
    this.props.productListChange(productList);
  }
  //删除
	delete =(index)=> {
		this.props.productList.splice(index,1);
    this.props.productListChange(this.props.productList);
	}
  render(){
    const {productList,columns} = this.props;
    return(
      <Table
        style = {{padding:0}}
        pagination={false}
        showHeader={true}
        bordered={false}
        className='OrderCenterEidt'
        dataSource={productList}
        columns={columns==1 ? this.columns1 : this.columns2} />
    )
  }
}
const TableLists = Form.create({})(TableList);
export default TableLists;
