import React from 'react';
import { connect } from 'dva';
import { Form, Select, Input, Button, Radio, DatePicker, message,AutoComplete,Table, Upload} from 'antd';
import {GetServerData} from '../../services/services';
import { deepcCloneObj } from '../../utils/commonFc';
class GoodsInfoTable extends React.Component {
    constructor(props) {
        super(props);
        this.columns = [{
            title: '商品编码',
            dataIndex: 'pdCode',
            render: (text, record, index) => {
                return (
                    <Input 
                        value={this.props.goodsInfo[index].pdCode} 
                        disabled
                        />
                )
            }
        },{
            title: '商品名称',
            dataIndex: 'pdName',
            render: (text, record, index) => {
                return (
                    <div className='border_none'>
                        <Input value={this.props.goodsInfo[index].pdName}  disabled/>
                    </div>
                )
            }
        },{
			title: '商品规格',
			dataIndex: 'pdSkuType',
			render: (text, record, index) => {
				return (
					<div className='border_none'>
						<Input value={this.props.goodsInfo[index].pdSkuType} disabled/>
					</div>
				);
			}
		},{
			title: '退货数量',
			dataIndex: 'qty',
			render: (text, record, index) => {
				return (
					<div className={record.qtyline?null:'data_waring'}>
						<Input value={this.props.goodsInfo[index].qty} placeholder="退货数量" onChange={this.handleChangeQty.bind(this, index)}/>
					</div>
				);
		    }
		},{
            title: '退货价格',
            dataIndex: 'price',
            render: (text, record, index) => {
                return (
                    <div className={record.priceline?null:'data_waring'}>
                        <Input value={this.props.goodsInfo[index].price} placeholder="退货价格" 
                                onChange={this.handleChangePrice.bind(this, index)}  
                                onBlur={this.handleBlurPrice.bind(this, index)}/>
					</div>
                );
            }
        }];
    }

    //退货数量修改时
    handleChangeQty=(index, e)=>{
        const qtyvalue= e.target.value;
        const str=/^[0-9]*$/
        const patt=str.test(qtyvalue)
        if(patt){
            let temDataSource =deepcCloneObj(this.props.goodsInfo);
            temDataSource[index].qty =qtyvalue;
            temDataSource[index].qtyline =true;
            this.props.dispatch({
                type:'orderth/syncGoodsInfo',
                payload:temDataSource
            })
        }else{
            let temDataSource = deepcCloneObj(this.props.goodsInfo);
            temDataSource[index].qty =qtyvalue;
            temDataSource[index].qtyline =false;
            message.error('只能输入数字')
            this.props.dispatch({
                type:'orderth/syncGoodsInfo',
                payload:temDataSource
            })
        }
    }

    //修改退货价格
    handleChangePrice=(index, e)=>{
        const qtyvalue= e.target.value;
        const str=/^[0-9]+(\.\d{1,2})?$/
        const patt=str.test(qtyvalue)
        if(patt){
            let temDataSource = deepcCloneObj(this.props.goodsInfo);
            temDataSource[index].price = e.target.value;
            temDataSource[index].priceline =true;
            this.props.dispatch({
                type:'orderth/syncGoodsInfo',
                payload:temDataSource
            })
        }else{
            let temDataSource = deepcCloneObj(this.props.goodsInfo);
            temDataSource[index].price = e.target.value;
            temDataSource[index].priceline =false;
            this.props.dispatch({
                type:'orderth/syncGoodsInfo',
                payload:temDataSource
            })
        }
    }

    //当退货价格失去焦点时
    handleBlurPrice=(index, e)=>{
        const qtyvalue= e.target.value;
        const str=/^[0-9]+(\.\d{1,2})?$/
        const patt=str.test(qtyvalue)
        if(patt){
            let temDataSource = deepcCloneObj(this.props.goodsInfo);
            temDataSource[index].price = e.target.value;
            temDataSource[index].priceline =true;
            this.props.dispatch({
                type:'orderth/syncGoodsInfo',
                payload:temDataSource
            })
        }else{
            let temDataSource = deepcCloneObj(this.props.goodsInfo);
            temDataSource[index].price = e.target.value;
            temDataSource[index].priceline =false;
            this.props.dispatch({
                type:'orderth/syncGoodsInfo',
                payload:temDataSource
            })
            message.error('价格可输入最多两位小数的非负数')
        }
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
          </div>
        );
    }
}

function mapStateToProps(state) {
    const {goodsInfo}  = state.orderth;
    return {goodsInfo};
}

export default connect(mapStateToProps)(GoodsInfoTable);