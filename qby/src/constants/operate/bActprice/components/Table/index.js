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
        render:(text,record,index)=>{
          const {getFieldDecorator,FormItem} = this.props
          return(
            <FormItem>
              {
                getFieldDecorator('code',{
                  initialValue:record.code
                })(
                  <Input placeholder='请输入商品编码'/>
                )
              }
            </FormItem>
          )
        }
      },{
        title: '商品名称',
        dataIndex: 'pdName',
      },{
        title: '商品规格',
        dataIndex: 'displayName',
      },{
        title: '合同进价',
        dataIndex: 'costPrice',
      },{
        title: '活动进价',
        dataIndex: 'activityPrice',
        render:(text,record,index)=>{
          const {getFieldDecorator,FormItem} = this.props
          return(
            <FormItem>
              {
                getFieldDecorator('activityPrice',{
                  initialValue:record.activityPrice
                })(
                  <Input placeholder='请输入活动进价'/>
                )
              }
            </FormItem>
          )
        }
      },{
        title:'',
        render:(text,record,index)=>(
          this.props.tableList.length > 1&&
          <a href="javascript:;" onClick={this.deleteGood} className="theme-color">删除</a>
        )
      }
    ]
  }
  deleteGood =()=> {
    this.props.deleteGood()
  }
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
