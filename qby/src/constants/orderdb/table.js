import React from 'react';
import { connect } from 'dva';
import EditableTable from '../../components/table/tablebasic';
import TableLink from '../../components/table/tablelink';

class OrderdbTable extends React.Component {
	constructor(props) {
        super(props);
        this.columns = [{
          title: '调拨单号',
          dataIndex: 'allocationNo',
          render: (text, record) => {
            return (
              <TableLink text={text} hindClick={this.editInfo.bind(this,record)} type='1'/>
            );
          }
        }, {
            title: '调出仓库',
            dataIndex: 'outWsName'
        },{ 
            title: '调入仓库',
            dataIndex: 'callWsName'
        },{
            title: '商品数量',
            dataIndex: 'qtySum'
        },{
            title: '订单状态',
            dataIndex: 'statusStr'
        },{
            title: '下单时间',
            dataIndex: 'createTime'
        }];
    }
    
    //点击表格上的修改按钮操作
    editInfo = (record) =>{
       const spExchangeId=String(record.spExchangeId);
       const paneitem={title:'订单详情',key:'206000edit'+spExchangeId+'info',data:{spExchangeId:spExchangeId},componkey:'206000info'}
       this.props.dispatch({
         type:'tab/firstAddTab',
         payload:paneitem
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
        values.limit=limit;
        values.currentPage=currentPage;
        this.props.dispatch({
            type:'orderdb/fetch',
            payload:{code:'qerp.web.sp.exchange.query',values:values}
        });
        this.props.dispatch({ type: 'tab/loding', payload:true});
    }

    selectChange=(selectedRowKeys,selectedRows)=>{
        this.props.dispatch({
          type:'orderdb/select',
          payload:{selectedRowKeys,selectedRows}
        })
    }

    render() {
        return (
          <EditableTable 
            dataSource={this.props.tableList} 
            columns={this.columns} 
            footer={true}
            bordered={true}
            pageChange={this.pageChange.bind(this)}
            pageSizeChange={this.pageSizeChange.bind(this)}
            total={this.props.total}
            limit={this.props.limit}
            current={Number(this.props.currentPage)+1}
            select={this.props.overorderobj?true:false}
            selectType='radio'
            selectChange={this.selectChange.bind(this)}
            selectedRowKeys={this.props.selectedRowKeys}
            />
        );
	}
	componentDidMount(){
    //执行初始化数据方法获取list
		this.initList(this.props.values,this.props.limit,this.props.currentPage);
	}
    
}

function mapStateToProps(state) {
    const {tableList,total,limit,currentPage,values,selectedRowKeys} = state.orderdb;
    return {tableList,total,limit,currentPage,values,selectedRowKeys};
}

export default connect(mapStateToProps)(OrderdbTable);
 


