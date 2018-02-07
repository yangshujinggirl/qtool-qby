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
            title: '收支情况',
            dataIndex: 'amount'
        }];
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
            const paneitem={title:'物流详情',key:'402000edit'+record.outId+'info',data:{spExpressFeeId:record.outId},componkey:'402000info'}
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
        return (
          <EditableTable 
            dataSource={this.props.tableList} 
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
	componentDidMount(){
    //执行初始化数据方法获取list
		this.initList(this.props.values,this.props.limit,this.props.currentPage);
	}
    
}

function mapStateToProps(state) {
    const {tableList,total,limit,currentPage,values} = state.operateinout;
    return {tableList,total,limit,currentPage,values};
}

export default connect(mapStateToProps)(OperateinoutTable);
 


