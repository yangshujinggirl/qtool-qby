import React from 'react';
import { connect } from 'dva';
import { Form, Select, Input, Button, Radio, DatePicker, message,AutoComplete,Table, Upload} from 'antd';
import {GetServerData} from '../../services/services';
import { deepcCloneObj } from '../../utils/commonFc';
class GoodsInfoTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rowCount:1
        }
        this.columns = [{
            title: '商品编码',
            dataIndex: 'pdCode',
            render: (text, record, index) => {
                return (
                    <Input value={this.props.goodsInfo[index].pdCode} placeholder="请输入商品编码" 
                    onChange={this.handleChangeCode.bind(this, index)} 
                    onBlur={this.onBluepdCode.bind(this,index)}/>
                )
            }
        },{
            title: '采退数量',
            dataIndex: 'qty',
            render: (text, record, index) => {
                return (
                    <Input value={this.props.goodsInfo[index].qty} placeholder="采退数量" 
                    onChange={this.handleChangeQty.bind(this, index)}/>
                )
            }
        },{
			title: '采退价格',
			dataIndex: 'price',
			render: (text, record, index) => {
				return (
                    <Input value={this.props.goodsInfo[index].price} placeholder="采退价格" 
                    onChange={this.handleChangePrice.bind(this, index)}/>
				);
			}
		},{
            title: '商品名称',
            dataIndex: 'name',
            width:"100px",
            render: (text, record, index) => {
                return (
                    <p style={{textAlign:'center'}}>{this.props.goodsInfo[index].name}</p>
                );
            }
          },
          {
            title: '商品规格',
            dataIndex: 'names',
            width:"100px",
            render: (text, record, index) => {
                return (
                    <p style={{textAlign:'center'}}>{this.props.goodsInfo[index].names}</p>
                );
            }
          },{
            title: '',
            dataIndex: 'operation',
            width:'80px',
            render: (text, record, index) => {
              return (
                this.props.goodsInfo.length > 1
                ?
                <div style={{color: '#35bab0', cursor:'pointer'}} onClick={this.onDelete.bind(this,index)}>删除</div>
                :
                null
              );
            }
          }];
    }


    onDelete = (index)=>{
        let tempDataSource = deepcCloneObj(this.props.goodsInfo);
        tempDataSource.splice(index, 1);
        this.syncGoodsInfo(tempDataSource);
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
        }
        let data = {pdCode:pdCode};
        const result=GetServerData('qerp.web.pd.spu.list',data);
        result.then((res) => {
            return res;
        }).then((json) => {
            if(json.code=='0'){
                tempDataSource[index].price = json.pdSpu.costPrice;
                tempDataSource[index].name = json.pdSpu.costPrice;
                tempDataSource[index].names = json.pdSpu.costPrice;

                this.props.dispatch({
                    type:'orderct/syncGoodsInfo',
                    payload:tempDataSource
                })
            }
        })
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
            type:'orderct/syncGoodsInfo',
            payload:tempDataSource
        })
    }

    handleAdd = () => {
        let dataList = deepcCloneObj(this.props.goodsInfo);
        const newData = {
            key: this.state.rowCount+1,
            pdCode:'',
            qty: '',
            price:'',
            name:null,
            names:null
        };
        dataList.push(newData);
        this.setState({
            rowCount: this.state.rowCount + 1
        },function(){
            this.props.dispatch({
                type:'orderct/syncGoodsInfo',
                payload:dataList
            })
        });
    }

    render() {
        return (
          <div style={{marginTop:'0px'}}>
            <Table dataSource={this.props.goodsInfo} style = {{padding:0}} columns={this.columns} pagination={false} showHeader={true} bordered={false} className='OrderCenterEidt'/>
            <Button style={{margin:'15px 10px 0 7px', width:'100px'}} onClick={this.handleAdd}>+商品</Button>
          </div>
        );
    }
}

function mapStateToProps(state) {
    const {goodsInfo}  = state.orderct;
    return {goodsInfo};
}

export default connect(mapStateToProps)(GoodsInfoTable);