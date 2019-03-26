import React,{Component} from 'react';
import {Table,Input,Button,message} from 'antd'
import ImportGood from './Upload'
import './index.less'
import {getShopInfoApi,getGoodInfoApi} from '../../services/getInfo'

class GoodTable extends Component{
  constructor(props){
    super(props)
    this.state={}
    this.columns1 = [{
        title:'门店ID',
        dataIndex:'spShopId',
        key:'spShopId',
        render:(text,record,index)=>{
          const {getFieldDecorator,FormItem} = this.props;
          return(
           <FormItem>
           {
             getFieldDecorator('spShopId'+index,{
               initialValue:record.shopId,
             })(
               <Input placeholder='请输入商品ID' onBlur={(e)=>this.getInfo(e,index,'1')}/>
             )
           }
          </FormItem>
        )}
      },{
        title:'门店名称',
        dataIndex:'name',
        key:'name'
      },{
        key:'operate',
        render:(text,record,index)=>{
          return(
            this.props.dataSource.length>1 &&
            <a className='theme-color' onClick={()=>this.delete(index)}>删除</a>
          )
        }
      }
    ]
    this.columns2 = [{
        title:'商品编码',
        dataIndex:'pdCode',
        render:(text,record,index)=>{
          const {getFieldDecorator,FormItem} = this.props;
          return(
           <FormItem>
           {
             getFieldDecorator('pdCode'+index,{
               initialValue:record.pdCode
             })(
               <Input placeholder='请输入商品编码' onBlur={(e)=>this.getInfo(e,index,'2')}/>
             )
           }
          </FormItem>
        )}
      },{
        title:'商品名称',
        dataIndex:'name',
      },{
        title:'规格',
        dataIndex:'displayName',
      },{
        render:(text,record,index)=>{
          return(
            this.props.dataSource.length>1 &&
            <a className='theme-color' onClick={()=>this.delete(index)}>删除</a>
          )
        }
      }
    ]
  }
  //根据商品编码/商品ID获取信息
  getInfo =(e,index,type)=> { //type:1-->根据id请求接口， 2：根据商品编码获取接口
    const {value} = e.target;
    if(value){
      const {dataSource} = this.props;
      let isRepeat = false;
      /*  ----商品id--------  */
      if(type==1){
        if(dataSource.length>1){isRepeat = dataSource.find(item=>item.spShopId == value)}
        if(!isRepeat){
          getShopInfoApi({spShopId:value}).then(res=>{
            if(res.code=='0'){
              if(res.spShop){
                const list = {};
                list.spShopId = value;
                list.name = res.spShop.name;
                this.props.changeList(list,index)
              };
            };
          });
        }else{
          message.error('门店Id重复',.8)
        };
      };
      /*  ----商品编码--------  */
      if(type==2){
        if(dataSource.length>1){isRepeat = dataSource.find(item=>item.pdCode == value)}
        if(!isRepeat){
          getGoodInfoApi({pdCode:value}).then(res=>{
            if(res.code=='0'){
              if(res.pdSpu){
                const list = {};
                list.pdCode = value;
                list.name = res.pdSpu.name;
                list.displayName = res.displayName;
                this.props.changeList(list,index)
              };
            };
          });
        }else{
          message.error('商品编码重复',.8)
        };
      };
    };
  }
  //导入门店
  onShopChange =(info)=> {
    const {pdSpuAsnLists} = info.file.response;
    this.props.getFile(pdSpuAsnLists)
  }
  //导入商品
  onGoodChange =(info)=> {
    const {pdSpuAsnLists} = info.file.response;
    this.props.getFile(pdSpuAsnLists)
  }
  //删除
  delete =(index)=> {
    this.props.delete(index)
  }
  //下载模板
  downLoad =()=> {
    if(this.props.type==1){ //门店模板
      window.open('../../static/md.xlsx')
    };
    if(this.props.type==2){//商品编码模板
      window.open('../../static/act_good.xlsx')
    };
  }
  //添加
  add=()=>{
    this.props.add()
  };
  render(){
    console.log(this.props.dataSource.length)
    //type:1--->门店ID模板（columns1）   2：--->商品编码模板(column2)
    const {dataSource,type,addText} = this.props
    dataSource.map((item,index)=>{
      item.key=index;
    });
    return(
      <div className='good_table'>
        <Table
          pagination={false}
          columns={
            type==1 ? this.columns1 : (type==2 ? this.columns2:null)
          }
          dataSource={dataSource}/>
        <div>
          {type==1 ?
            <ImportGood
              title='导入门店'
              name='mfile'
              action='/erpWebRest/webrest.htm?code=qerp.web.pd.spu.import'
              onChange={this.onShopChange}
              />
           :(
               type==2 ?
               <ImportGood
                 title='导入活动商品'
                 name='mfile'
                 action='/erpWebRest/webrest.htm?code=qerp.web.pd.spu.import'
                 onChange={this.onGoodChange}
                />
               : null
           )
          }
          <Button className='down_temp' type='primary' onClick={this.downLoad}>下载导入模板</Button>
          <Button onClick={this.add}>{addText}</Button>
        </div>
      </div>
    )
  }
}
export default GoodTable
