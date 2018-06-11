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
                    <div>
                        <Input value={this.props.goodsInfo[index].code} placeholder="请输入商品编码" 
                        onChange={this.handleChangeCode.bind(this, index)} 
                        onBlur={this.handleChangeCodeBlue.bind(this, index)} required/>
                    </div>
                )
            }
        },{
            title: '调出数量',
            dataIndex: 'qty',
            render: (text, record, index) => {
                return (
                    <div>
                        <Input value={this.props.goodsInfo[index].qty} placeholder="调出数量" 
                        onChange={this.handleChangeQty.bind(this, index)} 
                        onBlur={this.handleChangeQtyMess.bind(this, index)} required/>
                    </div>
                )
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
            dataIndex: 'displayName',
            width:"100px",
            render: (text, record, index) => {
                return (
                    <p style={{textAlign:'center'}}>{this.props.goodsInfo[index].displayName}</p>
                );
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
        }else{
            temDataSource[index].codeline = true;
        }
        this.syncGoodsInfo(temDataSource);
    }


    //code blue
    handleChangeCodeBlue=(index, e)=>{
        const temDataSource =deepcCloneObj(this.props.goodsInfo);
        const pdCode = temDataSource[index].code;
        if (!pdCode) {
            return;
        }
        let data = {code:pdCode};
        const result=GetServerData('qerp.web.pd.spu.invinfo',data);
        result.then((res) => {
            return res;
        }).then((json) => {
            if(json.code=='0'){
                temDataSource[index].name=json.pdSpu.name;
                temDataSource[index].displayName = (!json.pdSku?null:(json.pdSku.pdType2Val?json.pdSku.pdType1Val.name+'/'+json.pdSku.pdType2Val.name:json.pdSku.pdType1Val.name));
                this.syncGoodsInfo(temDataSource);
            }
        })
    }
    // qty变化
    handleChangeQty=(index, e)=>{
        const qtyvalue=e.target.value;
        let temDataSource =deepcCloneObj(this.props.goodsInfo);
        temDataSource[index].qty = qtyvalue
        this.syncGoodsInfo(temDataSource);
    }

    handleChangeQtyMess = (index,e)=>{
        const str=/^[1-9]\d*$/;
        let temDataSource =deepcCloneObj(this.props.goodsInfo);
        if(e.target.value){
            const patt=str.test(e.target.value)
            if(patt){
                temDataSource[index].qtyline = true;
            }else{
                temDataSource[index].qtyline = false;
                message.error('请输入正整数的商品数量',.8);
            }
        }
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
            name:null,
            displayName:null
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