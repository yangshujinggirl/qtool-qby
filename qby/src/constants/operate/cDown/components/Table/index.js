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
        key:'pdCode',
        render:(text,record,index)=>{
          const {getFieldDecorator,FormItem} = this.props;

          return(
            <FormItem>
              {
                getFieldDecorator('pdCode'+index,{
                  initialValue:record.pdCode,
                  rules:[{
                    validator:this.validateCode
                  }]
                })(
                  <Input placeholder='请输入商品编码' onBlur={this.searchGood}/>
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
        title: '零售价',
        key:'toCprice',
        dataIndex: 'toCprice',
      },{
        title: '金卡价',
        key:'goldCardPrice',
        dataIndex: 'goldCardPrice',
      },{
        title: '银卡价',
        key:'silverCardPrice',
        dataIndex: 'silverCardPrice',
      },{
        title: '活动特价',
        key:'activityPrice',
        dataIndex: 'activityPrice',
        render:(text,record,index)=>{
          const {getFieldDecorator,FormItem} = this.props;
          const validatePrice=(rule,value,callback)=> {
            if(Number(value)>Number(record.toCprice) ){
              callback('当前特价超过零售价，请谨慎填写')
            };
            if(Number(value)<Number(record.toCprice) ){
              callback('当前特价小于成本价，请谨慎填写')
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
                  <Input placeholder='请输入活动进价'/>
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
  //商品编码回车
  searchGood=(e)=>{
    const {value} = e.target;
    value.replace(/\s+/g,'');
    this.props.form.validateFieldsAndScroll(['pdCode'+index],(err)=>{
      if(!err){
        getGoodInfoApi({pdCode:value}).then(res=>{
          if(res.code=='0'){
            const {pdSpu} = res;
            pdSpu.pdCode=value;
            pdSpu.displayName=res.displayName;
            this.props.changeList(index,pdSpu)
          };
        });
      };
    });
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
