import React from 'react';
import { connect } from 'dva';
import EditableTable from '../../components/table/tablebasic';
import TableLink from '../../components/table/tablelink';

class OrdermdTable extends React.Component {
	constructor(props) {
        super(props);
        this.columns = [{
          title: '订单号',
          dataIndex: 'orderNo',
          render: (text, record) => {
            return (
              <TableLink text={text} hindClick={this.editInfo.bind(this,record)} type='1'/>
            );
          }
        },{
          title: '门店名称',
          dataIndex: 'shopName'
        }, {
          title: '商品数量',
          dataIndex: 'qtySum'
        },{
          title: '订单金额',
          dataIndex: 'amountSum'
        },{
          title: '订单状态',
          dataIndex: 'statusStr'
        },{
          title: '订单来源',
          dataIndex: 'sourceName'
        },{
          title: '订单类型',
          dataIndex: 'typeStr'
        },{
          title: '收货人',
          dataIndex: 'recName'
        }, {
          title: '下单时间',
          dataIndex: 'createTime'
        }];
    }
    
    //点击表格上的修改按钮操作
    editInfo = (record) =>{
       const spOrderId=String(record.spOrderId)
       const paneitem={title:'订单详情',key:'201000edit'+spOrderId+'info',data:{spOrderId:spOrderId},componkey:'201000info'}
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
            type:'ordermd/fetch',
            payload:{code:'qerp.web.sp.order.query',values:values}
        });
        this.props.dispatch({ type: 'tab/loding', payload:true});
    }

    render() {
        return (
          <EditableTable 
            dataSource={this.props.tableList} 
            columns={this.columns} 
            footer={true}
            pageChange={this.pageChange.bind(this)}
            pageSizeChange={this.pageSizeChange.bind(this)}
            total={this.props.total}
            limit={this.props.limit}
            current={Number(this.props.currentPage)+1}
            bordered={true}
            // loading={true}
            />
        );
	}
	componentDidMount(){
    //执行初始化数据方法获取list
		// this.initList(this.props.values,this.props.limit,this.props.currentPage);
	}
    
}

function mapStateToProps(state) {
    const {tableList,total,limit,currentPage,values} = state.ordermd;
    return {tableList,total,limit,currentPage,values};
}

export default connect(mapStateToProps)(OrdermdTable);
 


