import React,{Component} from 'react'
import {Table,Form,Input,Button} from 'antd'
const {FormItem} = Form.Item
const {Column} = Table

import './index.less'

class TableList extends Component{
  constructor(props){
    super(props);
    this.state={
    }
    this.columns1 = [
      {
        title: '商品编码',
        key:'code',
        render:(text,record,index)=>{
          const {getFieldDecorator,FormItem} = this.props;

          return(
            <FormItem>
              {
                getFieldDecorator('code'+index,{
                  initialValue:record.code,
                  rules:[{
                    validator:this.validateCode
                  }]
                })(
                  <Input placeholder='请输入商品编码' onBlur={this.searchGood} autoComplete='off'/>
                )
              }
            </FormItem>
          )
        }
      },{
        title: '商品名称',
        key:'pdName',
        dataIndex: 'pdName',
      },{
        title: '商品规格',
        key:'displayName',
        dataIndex: 'displayName',
      },{
        title: '合同进价',
        key:'costPrice',
        dataIndex: 'costPrice',
      },{
        title: '活动进价',
        key:'activityPrice',
        dataIndex: 'activityPrice',
        render:(text,record,index)=>{
          const {getFieldDecorator,FormItem} = this.props;
          const validatePrice=(rule,value,callback)=> {
            if(Number(value)>Number(record.costPrice) ){
              callback('活动进价大于合同进价，请谨慎填写')
            };
            callback();
          };
          return(
            <FormItem>
              {
                getFieldDecorator('activityPrice'+index,{
                  initialValue:record.activityPrice,
                  rules:[{
                    validator:validatePrice
                  }]
                })(
                  <Input placeholder='请输入活动进价' autoComplete='off'/>
                )
              }
            </FormItem>
          )
        }
      },{
        render:(text,record,index)=>(
          this.props.tableList.length > 1&&
          <a href="javascript:;" onClick={()=>this.deleteGood(index)} className="theme-color">删除</a>
        )
      },
    ]
  }

  //验证商品编码重复
  validateCode=(rule,value,callback)=>{
    const {tableList} = this.props;
    value.replace(/\s+/g,'');
    const isRepeat = tableList.find(item=>item.code==value);
    if(isRepeat){
      callback("商品编码重复")
    };
    callback();
  }
  //请求商品详情
  searchGood=(e)=>{
    const {value} = e.target;
  }
  //删除一行
  deleteGood =(index)=> {
    this.props.deleteGood(index)
  }
  //增加一行
  addGoods =()=> {
    this.props.addGoods()
  }
  render(){
  const {tableList} = this.props
    return(
      <div>
        <Table
          className='OrderCenterEidt add_act_good'
          pagination={false}
          bordered={false}
          columns={this.columns1}
          dataSource={tableList}
        />
      <Button onClick={this.addGoods}>+商品</Button>
      </div>
    )
  }
}
export default TableList
