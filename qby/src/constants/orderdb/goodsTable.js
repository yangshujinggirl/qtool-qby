import React from 'react';
import { connect } from 'dva';
import { Form, Select, Input, Button, Radio, DatePicker, message,AutoComplete,Table, Upload} from 'antd';
import {GetServerData} from '../../services/services';
import { deepcCloneObj } from '../../utils/commonFc';
class GoodsInfoTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count:1
        }
        this.columns = [{
            title: '商品编码',
            dataIndex: 'code',
            render: (text, record, index) => {
                return (
                    <div className={record.codeline?null:'data_waring'}>
                        <Input value={this.props.goodsInfo[index].code} placeholder="请输入商品编码" 
                        onChange={this.handleChangeCode.bind(this, index)} 
                        onBlur={this.handleChangeCode.bind(this, index)}/>
                    </div>
                )
            }
        },{
            title: '调出数量',
            dataIndex: 'qty',
            render: (text, record, index) => {
                return (
                    <div className={record.qtyline?null:'data_waring'}>
                        <Input value={this.props.goodsInfo[index].qty} placeholder="预订数量" 
                        onChange={this.handleChangeQty.bind(this, index)} 
                        onBlur={this.handleChangeQty.bind(this, index)}/>
                    </div>
                )
            }
        },{
			title: '',
			dataIndex: 'operation',
			render: (text, record, index) => {
				return (
                    this.props.goodsInfo.length > 1 ?
                    (<div style={{color: '#35bab0', cursor:'pointer'}} 
                        onClick={this.onDelete.bind(this,index)}>删除</div>
                    ):
                    null
				);
			}
		}];
    }

    // code变化
    handleChangeCode=(index, e)=>{
        let temDataSource =deepcCloneObj(this.props.goodsInfo);
        const codevalue=e.target.value;
        temDataSource[index].code = codevalue
        if(codevalue=='' || codevalue==undefined || codevalue==null){
            temDataSource[index].codeline = false;
            message.error('请输入商品编码');
        }else{
            temDataSource[index].codeline = true;
        }
        this.syncGoodsInfo(temDataSource);
    }

    // qty变化
    handleChangeQty=(index, e)=>{
        const qtyvalue=e.target.value;
        let temDataSource =deepcCloneObj(this.props.goodsInfo);
        temDataSource[index].qty = qtyvalue
        const str=/^[1-9]\d*$/
        const patt=str.test(qtyvalue)
        if(patt){
            temDataSource[index].qtyline = true;
        }else{
            temDataSource[index].qtyline = false;
            message.error('请输入正整数的商品数量');
        }
        this.syncGoodsInfo(temDataSource);
    }

    //删除
    onDelete = (index) => {
        let tempDataSource = deepcCloneObj(this.props.goodsInfo);
            tempDataSource.splice(index, 1);
            this.syncGoodsInfo(tempDataSource);
    }

    //新加
    handleAdd = () => {
        let dataList = deepcCloneObj(this.props.goodsInfo);
        const newData = {
            key: this.state.count+1,
            Code:'',
            qty: '',
            retailPrice:'',
            codeline:true,
            qtyline:true,
        };
        dataList.push(newData);
        this.setState({
            count: this.state.count + 1
        },function(){
            this.props.dispatch({
                type:'orderdb/syncGoodsInfo',
                payload:dataList
            })
        });
    }

    syncGoodsInfo = (tempDataSource) =>{
        this.props.dispatch({
            type:'orderdb/syncGoodsInfo',
            payload:tempDataSource
        })
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
    const {goodsInfo}  = state.orderdb;
    return {goodsInfo};
}

export default connect(mapStateToProps)(GoodsInfoTable);