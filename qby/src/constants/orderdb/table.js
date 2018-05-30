import React from 'react';
import { connect } from 'dva';
import EditableTable from '../../components/table/tablebasic';
import TableLink from '../../components/table/tablelink';


class OrderdbTable extends React.Component {
	constructor(props) {
        super(props);
        this.columns = [
            {
                title: '调拨单号',
                dataIndex: 'allocationNo',
                render: (text, record) => {
                  return (
                     <TableLink text={text} hindClick={this.editInfo.bind(this,record)} type='1'/>
                );
            }
        },
        {
            title: '调出仓库',
            dataIndex: 'outWsName'
        },
        {
            title: '调入仓库',
            dataIndex: 'callWsName'
        },
        {
            title: '商品数量',
            dataIndex: 'qtySum'
        },
        {
            title: '到货数量',
            dataIndex: 'statusStr1'
        },
        {
            title: '订单状态',
            dataIndex: 'statusStr'
        },
        {
            title: '下单时间',
            dataIndex: 'createTime'
        }];
    }
    
    //跳转到订单详情
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
         this.props.getPageSizeDate(pageSize,Number(page-1))
    }
    //pagesize变化
    pageSizeChange=(current,size)=>{
          this.props.getPageSizeDate(size,Number(current-1))
    }
    //单选框选择
    selectChange=(selectedRowKeys,selectedRows)=>{
        this.props.getSelectDate(selectedRowKeys,selectedRows)
    }

    render() {
        return (
          <EditableTable 
                dataSource={this.props.datasource} 
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
}

export default connect()(OrderdbTable);

 


