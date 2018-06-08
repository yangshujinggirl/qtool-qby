import React from 'react';
import { connect } from 'dva';
import {Modal, Button } from 'antd';
import EditableTable from '../../components/table/tablebasic';
import {GetServerData} from '../../services/services';
import TableLink from '../../components/table/tablelink';

const confirm = Modal.confirm;

class OrdercgTable extends React.Component {
	constructor(props) {
        super(props);
        this.columns = [
			{
				title: '采购单号',
				dataIndex: 'asnNo',
				render: (text, record) => {
					return (
						<TableLink text={text} hindClick={this.lookInfo.bind(this,record)} type='1'/>
					);
				}
			},
			{
				title: '供应商名称',
				dataIndex: 'name'
			}, 
			{
				title: '商品数量',
				dataIndex: 'qtySum'
			},
			{
			title: '订单金额',
			dataIndex: 'amountSum'
			},
			{
				title: '到货数量',
				dataIndex: 'amountSum1'
			},
			{
				title: '到货金额',
				dataIndex: 'amountSum2'
			},
			{
			title: '订单状态',
			dataIndex: 'statusStr'
			},
			{
				title: '预计送达时间',
				dataIndex: 'expectedTime'
			},
			{
			title: '付款状态',
			dataIndex: 'payStatusStr',
			},
			{
				title: '操作',
				dataIndex: 'opation',
				render: (text, record) => {
				return(
					record.status == 10?
						<TableLink text='修改' hindClick={this.editInfo.bind(this,record)} type="1"/>
						:null
				);
				}
			}
		];
		
		this.columnsrole = [
			{
				title: '采购单号',
				dataIndex: 'asnNo',
				render: (text, record) => {
				return (
						<TableLink text={text} hindClick={this.lookInfo.bind(this,record)} type='1'/>
				);
				}
			},
			{
				title: '供应商名称',
				dataIndex: 'name'
			}, 
			{
				title: '商品数量',
				dataIndex: 'qtySum'
			},
			{
				title: '订单金额',
				dataIndex: 'amountSum'
			},
			{
				title: '到货数量',
				dataIndex: 'qtyReceived'
			},
			{
				title: '到货金额',
				dataIndex: 'moneyReceived'
			},
			{
				title: '订单状态',
				dataIndex: 'statusStr'
			},
			{
			title: '预计送达时间',
			dataIndex: 'expectedTime'
			},
			{
				title: '付款状态',
				dataIndex: 'payStatusStr'
			}
		];

    }
    
    //点击表格上的修改按钮操作
    lookInfo = (record) =>{
       const wsAsnId=String(record.wsAsnId);
       const paneitem={title:'订单详情',key:'202000edit'+wsAsnId+'info',data:{wsAsnId:wsAsnId},componkey:'202000info'}
       this.props.dispatch({
         type:'tab/firstAddTab',
         payload:paneitem
       })
    }
    //修改采购单
    editInfo = (record) =>{
      const wsAsnId=String(record.wsAsnId);
       const paneitem={title:'修改采购单',key:'202000edit'+wsAsnId,data:{wsAsnId:wsAsnId},componkey:'202000edit'}
       this.props.dispatch({
         type:'tab/firstAddTab',
         payload:paneitem
       })
    }

    //改变付款状态
    changePayStatus = (record) =>{
		let values = {};
        values.wsAsnId = record.wsAsnId;
        if(record.payStatus == "10"){
            values.payStatus = "20";
        }else{
            values.payStatus = "10";
        }
        const result=GetServerData('qerp.web.ws.asn.payStatus',values);
        result.then((res) => {
            return res;
        }).then((json) => {
            if(json.code=='0'){
              this.initList(this.props.values,this.props.limit,this.props.currentPage)
            }
        })


    
    }

    //分页方法
    pageChange=(page,pageSize)=>{
          this.initList(this.props.values,pageSize,Number(page-1))
    }
    //pagesize变化
    pageSizeChange=(current,size)=>{
          this.initList(this.props.values,size,0)
    }
    
    //列表数据请求   
    initList=(values,limit,currentPage)=>{
       values.type = "10";
        values.limit=limit;
        values.currentPage=currentPage;
        this.props.dispatch({
            type:'ordercg/fetch',
            payload:{code:'qerp.web.ws.asn.query',values:values}
        });
        this.props.dispatch({ type: 'tab/loding', payload:true});
    }

    //列表数据选择
	selectChange=(selectedRowKeys,selectedRows)=>{
      	this.props.dispatch({
        	type:'ordercg/select',
        	payload:{selectedRowKeys,selectedRows}
      	})
  	}
  
    render() {
        return (
            <EditableTable 
              dataSource={this.props.tableList} 
              columns={this.props.addorderobj?this.columns:this.columnsrole} 
              footer={true}
              pageChange={this.pageChange.bind(this)}
              pageSizeChange={this.pageSizeChange.bind(this)}
              bordered={true}
              select={true}
              selectType='radio'
              selectChange={this.selectChange.bind(this)}
              selectedRowKeys={this.props.selectedRowKeys}
              total={this.props.total}
              limit={this.props.limit}
              current={Number(this.props.currentPage)+1}
              />
        );
	}
	componentDidMount(){
    //执行初始化数据方法获取list
		this.initList(this.props.values,this.props.limit,this.props.currentPage);
	}
    
}

function mapStateToProps(state) {
    const {tableList,total,limit,currentPage,values,selectedRowKeys,selectedRows} = state.ordercg;
    return {tableList,total,limit,currentPage,values,selectedRowKeys,selectedRows};
}

export default connect(mapStateToProps)(OrdercgTable);
 


