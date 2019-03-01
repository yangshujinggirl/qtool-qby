import React from 'react';
import { connect } from 'dva';
import EditableTable from '../../components/table/tablebasic';
import TableLink from '../../components/table/tablelink';

class OperateinoutTable extends React.Component {
	constructor(props) {
        super(props);
        this.columns = [
        {
            title: '费用名称',
            dataIndex: 'name',
            render: (text, record) => {
                return (
                    <TableLink text={text} hindClick={this.lookInfo.bind(this,record)} type='1'/>
                );
            }
        },
        {
            title: '门店名称',
            dataIndex: 'shopName'
        }, {
            title: '费用类型',
            dataIndex: 'typeStr'
        },{
            title: '金额变化',
            dataIndex: 'amount'
        },{
            title: '时间',
            dataIndex: 'dayTime'
        }
    ];
    }

    //点击表格上的修改按钮操作
    lookInfo = (record) =>{
        if(record.type=='11'){
            const spVoucherId=String(record.outId)
            const paneitem={title:'充值详情',key:'402000edit'+spVoucherId+'info',data:{spVoucherId:spVoucherId},componkey:'402000infoCZ'}
            this.props.dispatch({
                type:'tab/firstAddTab',
                payload:paneitem
            })
        }
        if(record.type=='21'){
            const paneitem={title:'订单详情',key:'402000edit'+record.outId+'info21',data:{spOrderId:record.outId},componkey:'402000infoOrder'}
            this.props.dispatch({
                type:'tab/firstAddTab',
                payload:paneitem
            })
        }
        if(record.type=='22'){
            const paneitem={title:'物流详情',key:'402000edit'+record.outId+'infows',data:{spExpressFeeId:record.outId},componkey:'402000info'}
            this.props.dispatch({
                type:'tab/firstAddTab',
                payload:paneitem
            })
        }

        if(record.type=='25'){
            const paneitem={title:'收银对账',key:'402000edit'+record.spMoneyDetailId+'infomoney',data:{spShopId:record.spShopId,type:record.type,dayTime:record.dayTime,spMoneyDetailId:record.spMoneyDetailId},componkey:'402000infoMoney'}
            this.props.dispatch({
                type:'tab/firstAddTab',
                payload:paneitem
            })
        }
        if(record.type=='24'){
            const paneitem={title:'订单详情',key:'402000edit'+record.outId+'info24',data:{spOrderId:record.outId},componkey:'402000infoOrder'}
            this.props.dispatch({
                type:'tab/firstAddTab',
                payload:paneitem
            })
        }
        if(record.type == '31'){
          const paneitem={title:'调拨详情',key:'402000edit'+ record.outId + 'info25',data:{Id:record.outId,No:record.name,type:31},componkey:'402000infoExchange'}
          this.props.dispatch({
            type:'tab/firstAddTab',
            payload:paneitem
          })
        }
        if(record.type == '32'){
          const paneitem={title:'调拨详情',key:'402000edit'+ record.outId + 'info26',data:{Id:record.outId,No:record.name,type:32},componkey:'402000infoExchange'}
          this.props.dispatch({
            type:'tab/firstAddTab',
            payload:paneitem
          })
        }
				if(record.type == '33'){
          const paneitem={title:'订单详情',key:'402000edit'+ record.outId + 'info27',data:{pdSpuId:record.outId,No:record.name,type:33},componkey:'207000edit'}
          this.props.dispatch({
            type:'tab/firstAddTab',
            payload:paneitem
          })
        }
				if(record.type == '34'){
          const paneitem={title:'提现详情',key:'402000edit'+ record.outId + 'info28',data:{spCarryCashId:record.outId,No:record.name,type:34},componkey:'408100info'}
          this.props.dispatch({
            type:'tab/firstAddTab',
            payload:paneitem
          })
        }
				if(record.type == '35'){
          const paneitem={title:'提现详情',key:'402000edit'+ record.outId + 'info29',data:{spCarryCashId:record.outId,type:35},componkey:'408100info'}
          this.props.dispatch({
            type:'tab/firstAddTab',
            payload:paneitem
          })
        }
				if(record.type == '36'){
          const paneitem={title:'退款详情',key:'402000edit'+ record.outId + 'info30',data:{orderReturnId:record.outId,type:'detail'},componkey:'208000info'}
          this.props.dispatch({
            type:'tab/firstAddTab',
            payload:paneitem
          })
        }
				if(record.type == '37'){
          const paneitem={title:'订单详情',key:'402000edit'+ record.outId + 'info31',data:{orderId:record.outId,type:37},componkey:'207000edit'}
          this.props.dispatch({
            type:'tab/firstAddTab',
            payload:paneitem
          })
        }

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
        values.limit=limit;
        values.currentPage=currentPage;
        this.props.dispatch({
            type:'operateinout/fetch',
            payload:{code:'qerp.web.sp.money.detail',values:values}
        });
        this.props.dispatch({ type: 'tab/loding', payload:true});
    }

    render() {
				const tableList = this.props.tableList;
				tableList.map((item,index)=>{
					if(item.type==35){
						item.amount = '+'+item.amount;
					}
					return item;
				})
        return (
          <EditableTable
            dataSource={tableList}
            columns={this.columns}
            bordered={true}
            footer={true}
            pageChange={this.pageChange.bind(this)}
            pageSizeChange={this.pageSizeChange.bind(this)}
            total={this.props.total}
            limit={this.props.limit}
            current={Number(this.props.currentPage)+1}
            />
        );
	}
}

function mapStateToProps(state) {
    const {tableList,total,limit,currentPage,values} = state.operateinout;
    return {tableList,total,limit,currentPage,values};
}

export default connect(mapStateToProps)(OperateinoutTable);
