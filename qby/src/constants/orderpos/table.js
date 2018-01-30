import React from 'react';
import { connect } from 'dva';
import EditableTable from '../../components/table/tablebasic';
import TableLink from '../../components/table/tablelink';

class OrderposTable extends React.Component {
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
        }, {
          title: '门店名称',
          dataIndex: 'spShopName'
        },{
          title: '订单类型',
          dataIndex: 'orderTypeStr'
        },{
          title: '用户类型',
          dataIndex: 'levelStr'
        },{
          title: '结算金额',
          dataIndex: 'amount'
        },{
          title: '订单状态',
          dataIndex: 'statusStr'
        },{
          title: '订单时间',
          dataIndex: 'createTime'
        }];
    }
    
    //点击表格上的修改按钮操作
    editInfo = (record) =>{
       const spOrderId=String(record.orderId);
       const paneitem={title:'订单详情',key:'205000edit'+spOrderId+'info',data:{spOrderId:spOrderId,type:record.orderType},componkey:'205000info'}
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
            type:'orderpos/fetch',
            payload:{code:'qerp.web.qpos.st.order.query',values:values}
        });
        this.props.dispatch({ type: 'tab/loding', payload:true});
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
            />
        );
	}
	componentDidMount(){
    
	}
    
}

function mapStateToProps(state) {
    const {tableList,total,limit,currentPage,values} = state.orderpos;
    return {tableList,total,limit,currentPage,values};
}

export default connect(mapStateToProps)(OrderposTable);
 


