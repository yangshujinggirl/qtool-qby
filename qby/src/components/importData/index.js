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
               initialValue:record.spShopId,
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
    ];
    this.columns3 = [
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
                  rules:[
                    {validator:this.validateCode},
                    {required:true,message:'请输入商品编码'}
                  ]
                })(
                  <Input placeholder='请输入商品编码' onBlur={(e)=>this.getInfo(e,index,'3')}/>
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
                  rules:[
                    {validator:validatePrice},
                    {required:true,message:'请输入活动进价'}
                  ]
                })(
                  <Input placeholder='请输入活动进价' onBlur={(e)=>this.updataList(e,index)}/>
                )
              }
            </FormItem>
          )
        }
      },{
        render:(text,record,index)=>{
          return(
            this.props.dataSource.length>1 &&
            <a className='theme-color' onClick={()=>this.delete(index)}>删除</a>
          )
        }
      },
    ];
    this.columns4 = [
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
                  rules:[
                    {validator:this.validateCode},
                    {required:true,message:'请输入商品编码'}
                  ]
                })(
                  <Input placeholder='请输入商品编码' onBlur={(e)=>this.getInfo(e,index,'4')}/>
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
        title: '活动供价',
        key:'activitySupplyPrice',
        dataIndex: 'activitySupplyPrice',
        render:(text,record,index)=>{
          const {getFieldDecorator,FormItem} = this.props;
          const validatePrice=(rule,value,callback)=> {
            if(Number(value)>Number(record.toBPrice) ){
              callback('活动供价超过供价，请谨慎填写')
            };
            if(Number(value)<Number(record.costPrice) ){
              callback('活动供价小于合同进价，请谨慎填写')
            };
            callback();
          };
          return(
            <FormItem>
              {
                getFieldDecorator('activitySupplyPrice'+index,{
                  initialValue:record.activitySupplyPrice,
                  rules:[
                  {required:true,message:'请输入活动供价'},
                  {pattern:/^\d+(\.\d{0,2})?$/,message:'小于等于两位小数的数字'},
                  {validator:validatePrice}]
                })(
                  <Input placeholder='请输入活动供价' onBlur={(e)=>this.updataList(e,index)}/>
                )
              }
            </FormItem>
          )
        }
      },{
        render:(text,record,index)=>{
          return(
            this.props.dataSource.length>1 &&
            <a className='theme-color' onClick={()=>this.delete(index)}>删除</a>
          )
        }
      },
    ];
    this.columns5 = [
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
                  rules:[
                    {required:true,message:'请输入商品编码'},
                    {validator:this.validateCode},
                  ]
                })(
                  <Input placeholder='请输入商品编码' onBlur={(e)=>this.getInfo(e,index,'5')}/>
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
        title: '零售价',
        key:'toCPrice',
        dataIndex: 'toCPrice',
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
        key:'specialPrice',
        dataIndex: 'specialPrice',
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
                getFieldDecorator('specialPrice'+index,{
                  initialValue:record.specialPrice,
                  rules:[
                    {required:true,message:'请输入活动进价'},
                    {validator:validatePrice}
                  ]
                })(
                  <Input placeholder='请输入活动进价' onBlur={(e)=>this.updataList(e,index)}/>
                )
              }
            </FormItem>
          )
        }
      },{
        render:(text,record,index)=>(
          this.props.dataSource.length>1 &&
          <a className='theme-color' onClick={()=>this.delete(index)}>删除</a>
        )
      },
    ]
  }
  updataList =(e,index)=> {
    const {value} = e.target;
    const {dataSource,type} = this.props;
    if(value){
      if(type==3){ //b活动进价
        dataSource[index].activityPrice = value;
      }else if(type == 4){ //b降
        dataSource[index].activitySupplyPrice = value;
      }else if(type == 5){ //c降
        dataSource[index].specialPrice = value;
      }
    };
    this.props.updataList(dataSource);
  }
  //根据商品获取信息
  getInfo =(e,index,type)=> { //type:1-->根据id请求接口， 2：根据商品编码获取接口
    const {value} = e.target;
    if(value){
      const {dataSource} = this.props;
      let isRepeat = false;
      /*  ----新增优惠券-->商品id--------  */
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
      /*  ----新增优惠券-->商品编码--------  */
      if(type==2||type==3||type==4||type==5){
        if(dataSource.length>1){isRepeat = dataSource.find(item=>item.pdCode == value)}
        if(!isRepeat){
          getGoodInfoApi({pdCode:value}).then(res=>{
            if(res.code=='0'){
              if(res.pdSpu){
                const list = {};
                list.pdCode = value;
                list.name = res.pdSpu.name;
                list.displayName = res.displayName;
              if(type == 3){ //b端活动进价
                  list.costPrice = res.pdSpu.costPrice;
                }else if(type == 4 ){ //b端直降
                  list.toBPrice = res.pdSpu.toBPrice;
                  list.costPrice = res.pdSpu.costPrice;
                }else if(type == 5){
                  list.toCPrice = res.pdSpu.toCPrice;
                  list.goldCardPrice = res.pdSpu.goldCardPrice;
                  list.silverCardPrice = res.pdSpu.silverCardPrice;
                }
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
    const {shopList} = info.file.response;
    this.props.getFile(shopList)
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
    if(this.props.type==3){//b端直降
      window.open('../../static/b_actIn.xlsx')
    };
    if(this.props.type==4){//b端直降
      window.open('../../static/b_low.xlsx')
    };
    if(this.props.type==5){//c端直降
      window.open('../../static/c_low.xlsx')
    };
  }
  //添加
  add=()=>{
    this.props.add()
  };
  render(){
    //type:1--->门店ID模板（columns1）   2：--->商品编码模板(column2)  3:b端商品进价商品（column3) 4:b端直降 5:c端直降
    const {dataSource,type,addText} = this.props
    dataSource.map((item,index)=>{
      item.key=index;
    });
    let Uploadtype = '';
    if(type==2) Uploadtype=''
    if(type==3) Uploadtype=1
    if(type==4) Uploadtype=2
    if(type==5) Uploadtype=3
    const uploadData = { data:JSON.stringify({type:Uploadtype}) }
    return(
      <div className='good_table'>
        <Table
          pagination={false}
          columns={
            type==1 ?
            this.columns1
            : (type==2 ?
              this.columns2
              :(type==3 ?
                this.columns3 :
                (type ==4) ?
                  this.columns4 :
                  (type ==5) ?
                   this.columns5 : null)
                )
          }
          dataSource={dataSource}/>
        <Button onClick={this.add}>{addText}</Button>
        <div className='btn_box'>
          {type==1 ?
            <ImportGood
              title='导入门店'
              name='mfile'
              action='/erpWebRest/webrest.htm?code=qerp.web.activity.shop.import'
              onChange={this.onShopChange}
              />
           :(
               type==2 || type==3 || type==4 || type==5?
               <ImportGood
                 title='导入活动商品'
                 name='mfile'
                 action='/erpWebRest/webrest.htm?code=qerp.web.activity.spu.import'
                 data={uploadData}
                 onChange={this.onGoodChange}
                />
              : null
           )
          }
          <Button className='down_temp' type='primary' onClick={this.downLoad}>下载导入模板</Button>
        </div>
      </div>
    )
  }
}
export default GoodTable
