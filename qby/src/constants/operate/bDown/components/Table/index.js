import React,{Component} from 'react'
import {Table,Form,Input,Button} from 'antd'
const {FormItem} = Form.Item
const {Column} = Table
import {getGoodInfoApi} from '../../../../../services/operate/bActPrice/index'
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
                  <Input placeholder='请输入商品编码' onBlur={(e)=>this.searchGood(e,index)}/>
                )
              }
            </FormItem>
          )
        }
      },{
        title: '商品名称',
        key:'name',
        dataIndex: 'name',
      },{
        title: '商品规格',
        key:'displayName',
        dataIndex: 'displayName',
      },{
        title: '供价',
        key:'toBPrice',
        dataIndex: 'toBPrice',
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
            if(Number(value)>Number(record.toBPrice) ){
              callback('活动进价超过供价，请谨慎填写')
            };
            if(Number(value)<Number(record.costPrice) ){
              callback('活动供价小于合同进价，请谨慎填写')
            };
            callback();
          };
          return(
            <FormItem>
              {
                getFieldDecorator('activityPrice'+index,{
                  initialValue:record.activityPrice,
                  rules:[
                  {pattern:/^\d+(\.\d{0,2})?$/,message:'小于等于两位小数的数字'},
                  {validator:validatePrice}]
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
    if(value){
      value.replace(/\s+/g,'');
      const isRepeat = tableList.find(item=>item.pdCode == value);
      if(isRepeat){
        callback("商品编码重复");
      };
      callback();
    };
  }
  //商品编码请求详情
  searchGood=(e,index)=>{
    const {value} = e.target;
    if(value){
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
