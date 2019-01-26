import React from 'react';
import { connect } from 'dva';
import { Form, Select, Input, Button, Radio, DatePicker, message,AutoComplete,Table, Upload} from 'antd';
import {GetServerData} from '../../services/services';
import { deepcCloneObj } from '../../utils/commonFc';
class GoodsInfoTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        dataSource: [{
            key: 0,
            pdCode:'',
            qty: '',
            price:''
        }],
        rowCount:1
    }
    this.columns = [{
      title: '商品编码',
      dataIndex: 'pdCode',
      width:'150px',
      render: (text, record, index) => {
          return (
            <Input
                value={this.props.goodsInfo[index].pdCode}
                placeholder="请输入商品编码"
                onChange={this.handleChangeCode.bind(this, index)}
                onBlur={this.onBluepdCode.bind(this,index)}/>
          )
        }
      },
      {
        title: '采购数量',
        dataIndex: 'qty',
        width:'100px',
        render: (text, record, index) => {
            return (
                <Input
                    value={this.props.goodsInfo[index].qty}
                    placeholder="采购数量"
                    onChange={this.handleChangeQty.bind(this, index)}
                    />
            )
        }
      },
      {
        title: '采购价格',
        dataIndex: 'price',
        width:'100px',
        render: (text, record, index) => {
          return (
            <Input
                value={this.props.goodsInfo[index].price}
                placeholder="采购价格"
                onChange={this.handleChangePrice.bind(this, index)}
              />
          );
        }
      },
      {
        title: '商品名称',
        dataIndex: 'name',
        width:"100px",
        render: (text, record, index) => {
          console.log(this.props)
            return (
              record.isDetail
              ?
                  <p style={{textAlign:'center'}}>{this.props.goodsInfo[index].pdName}</p>
              :
                <p style={{textAlign:'center'}}>{this.props.goodsInfo[index].name}</p>
            );
          }
        },
        {
          title: '商品规格',
          dataIndex: 'displayName',
          width:"100px",
          render: (text, record, index) => {
              return (
                record.isDetail
                ?
                  <p style={{textAlign:'center'}}>{this.props.goodsInfo[index].pdSkuType}</p>
                :
                  <p style={{textAlign:'center'}}>{this.props.goodsInfo[index].displayName}</p>
              );
            }
          },
          {
            title: '创建时间',
            dataIndex: 'createTime',
            width:"100px",
            render: (text, record, index) => {
              return (
                  <p style={{textAlign:'center'}}>{this.props.goodsInfo[index].createTime}</p>
              );
            }
          },
          {
            title: '',
            dataIndex: 'operation',
            width:'80px',
            render: (text, record, index) => {
              return (
                this.props.goodsInfo.length > 1
                ?<div
                  style={{color: '#35bab0', cursor:'pointer'}}
                  onClick={this.onDelete.bind(this,index)}>删除</div>
                :null
              );
            }
          }
        ];
    }
    componentDidMount(){

        const mdopdermeth={
            funct:this.settable
        }
        this.props.dispatch({
            type:'ordercg/mdopdermeth',
            payload:mdopdermeth
        })
    }
    settable=(value)=>{
      value.key = this.state.rowCount+1;
      this.setState({
        rowCount: this.state.rowCount + 1
      },function(){
        this.props.dispatch({
            type:'ordercg/syncGoodsInfo',
            payload:value
        });
      });
    }
    addGoods = () =>{
      let dataList = deepcCloneObj(this.props.goodsInfo);
      const newData = {
        key: this.state.rowCount+1,
        pdCode:'',
        qty: '',
        price:'',
        name:null,
        displayName:null,
      };
      dataList.push(newData);
      this.setState({
        rowCount: this.state.rowCount + 1
      },function(){
        this.props.dispatch({
            type:'ordercg/syncGoodsInfo',
            payload:dataList
        });
      });
    }
    handleChangeCode = (index,e) =>{
      let tempDataSource = deepcCloneObj(this.props.goodsInfo);
      tempDataSource[index].pdCode = e.target.value;
      this.syncGoodsInfo(tempDataSource);
    }
    onBluepdCode = (index) =>{
      let tempDataSource = deepcCloneObj(this.props.goodsInfo);
      let pdCode = tempDataSource[index].pdCode;
      if (!pdCode) {
          return;
      };
      let data = {pdCode:pdCode};
      const result=GetServerData('qerp.web.pd.spu.list',data);
      result.then((res) => {
          return res;
      }).then((json) => {
        if(json.code=='0'){
          tempDataSource[index].price = json.pdSpu.costPrice;
          tempDataSource[index].name=json.pdSpu.name;
          tempDataSource[index].displayName=json.displayName;
          tempDataSource[index].createTime=json.pdSpu.createTime;
          tempDataSource[index].isDetail=false;
          this.props.dispatch({
              type:'ordercg/syncGoodsInfo',
              payload:tempDataSource
          });
        };
      });
    }
    handleChangeQty = (index,e) =>{
      let tempDataSource = deepcCloneObj(this.props.goodsInfo);
      tempDataSource[index].qty = e.target.value;
      this.syncGoodsInfo(tempDataSource);
    }
    handleChangePrice = (index,e)=>{
      let tempDataSource = deepcCloneObj(this.props.goodsInfo);
      tempDataSource[index].price = e.target.value;
      this.syncGoodsInfo(tempDataSource);
    }
    onDelete = (index)=>{
      let tempDataSource = deepcCloneObj(this.props.goodsInfo);
      tempDataSource.splice(index, 1);
      this.syncGoodsInfo(tempDataSource);
    }
    syncGoodsInfo = (tempDataSource) =>{
      this.props.dispatch({
          type:'ordercg/syncGoodsInfo',
          payload:tempDataSource
      })
    }

    render() {
      return (
        <div style={{marginTop:'0px'}}>
          <Table dataSource={this.props.goodsInfo} style = {{padding:0}} columns={this.columns} pagination={false} showHeader={true} bordered={false} className='OrderCenterEidt'/>
          <Button style={{margin:'15px 10px 0 7px', width:'100px'}} onClick={this.addGoods}>+商品</Button>
        </div>
      );
    }
}

function mapStateToProps(state) {
    const {goodsInfo} = state.ordercg;
    return {goodsInfo};
}

export default connect(mapStateToProps)(GoodsInfoTable);
