import React from 'react';
import { connect } from 'dva';
import { Form, Select, Input, Button, Radio, DatePicker, message,AutoComplete,Table, Upload} from 'antd';
import {GetServerData} from '../../services/services';
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
            render: (text, record, index) => {
                return (
                    <Input 
                        value={this.state.dataSource[index].pdCode} 
                        placeholder="请输入商品编码" 
                        onChange={this.handleChangeCode.bind(this, index)} 
                        onBlur={this.onBluepdCode.bind(this,index)}/>
                )
            }
        }, {
            title: '采购数量',
            dataIndex: 'qty',
            render: (text, record, index) => {
                return (
                    <Input 
                        value={this.state.dataSource[index].qty} 
                        placeholder="采购数量" 
                        onChange={this.handleChangeQty.bind(this, index)}
                        />
                )
            }
        },{
            title: '采购价格',
            dataIndex: 'price',
            render: (text, record, index) => {
                return (
                    <Input 
                        value={this.state.dataSource[index].price} 
                        placeholder="采购价格" 
                        onChange={this.handleChangePrice.bind(this, index)}
                        />
                );
            }
        },{
            title: '',
            dataIndex: 'operation',
            width:'50px',
            render: (text, record, index) => {
                return (
                    this.state.dataSource.length > 1?
                    <div 
                        style={{color: '#35bab0', cursor:'pointer'}} 
                        onClick={this.onDelete.bind(this,index)}>删除</div>
                        :null
                );
            }
        }];
    }

    addGoods = () =>{
        const newData = {
            key: this.state.rowCount+1,
            pdCode:'',
            qty: '',
            price:''
        };
        this.setState({
            dataSource: [...this.state.dataSource, newData],
            rowCount: this.state.rowCount + 1
        },function(){
            this.props.dispatch({
                type:'ordercg/syncGoodsInfo',
                payload:this.state.dataSource
            })
        });
    }

    handleChangeCode = (index,e) =>{
        let tempDataSource = this.state.dataSource;
        tempDataSource[index].pdCode = e.target.value;
        this.syncGoodsInfo(tempDataSource);
    }

    onBluepdCode = (index) =>{
        let tempDataSource = this.state.dataSource;
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
                this.setState({
                    dataSource:tempDataSource
                },function(){
                    this.props.dispatch({
                        type:'ordercg/syncGoodsInfo',
                        payload:this.state.dataSource
                    })
                })
            }else{
                message.error(json.message);
            }
        })
    }

    handleChangeQty = (index,e) =>{
        let tempDataSource = this.state.dataSource;
        tempDataSource[index].qty = e.target.value;
        this.syncGoodsInfo(tempDataSource);
    }

    handleChangePrice = (index,e)=>{
        let temDataSource = this.state.dataSource;
        tempDataSource[index].price = e.target.value;
        this.syncGoodsInfo(tempDataSource);
    }

    onDelete = (index)=>{
        let tempDataSource = this.state.dataSource;
        tempDataSource.splice(index, 1);
        this.syncGoodsInfo(tempDataSource);
    }

    syncGoodsInfo = (tempDataSource) =>{
        this.setState({
            dataSource:tempDataSource
        },function(){
            this.props.dispatch({
                type:'ordercg/syncGoodsInfo',
                payload:this.state.dataSource
            })
        });
    }

    render() {
        return (
          <div style={{marginTop:'0px'}}>
            <Table dataSource={this.state.dataSource} style = {{padding:0}} columns={this.columns} pagination={false} showHeader={true} bordered={false} className='OrderCenterEidt'/>
            <Button style={{margin:'15px 10px 0 7px', width:'100px'}} onClick={this.addGoods}>+商品</Button>
          </div>
        );
    }
}

function mapStateToProps(state) {
    const {goodsInfo} = state.ordercg;
    return {};
}

export default connect(mapStateToProps)(GoodsInfoTable);