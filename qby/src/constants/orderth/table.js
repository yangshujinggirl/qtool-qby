import React from 'react';
import { connect } from 'dva';
import EditableTable from '../../components/table/tablebasic';
import TableLink from '../../components/table/tablelink';

class OrderthTable extends React.Component {
	constructor(props) {
        super(props);
        this.columns = [{
          title: '退货单号',
          dataIndex: 'asnNo',
          render: (text, record) => {
            return (
              <TableLink text={text} hindClick={this.lookInfo.bind(this,record)} type='1'/>
            );
          }
        },{
          title: '门店名称',
          dataIndex: 'name'
        }, {
          title: '商品数量',
          dataIndex: 'qtySum'
        },{
          title: '订单金额',
          dataIndex: 'amountSum'
        },{
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
            title: '下单时间',
            dataIndex: 'createTime'
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
	this.columnsrole = [{
		title: '退货单号',
		dataIndex: 'asnNo',
		render: (text, record) => {
		  return (
			<TableLink text={text} hindClick={this.lookInfo.bind(this,record)} type='1'/>
		  );
		}
	  },{
		title: '门店名称',
		dataIndex: 'name'
	  }, {
		title: '商品数量',
		dataIndex: 'qtySum'
	  },{
		title: '订单金额',
		dataIndex: 'amountSum'
	  },{
      title: '到货数量',
      dataIndex: 'qtyReceived'
    },{
      title: '到货金额',
      dataIndex: 'moneyReceived'
    },{
		title: '订单状态',
		dataIndex: 'statusStr'
	  },{
		  title: '下单时间',
		  dataIndex: 'createTime'
	  }
  	];
    }
    
    //点击表格上的修改按钮操作
    lookInfo = (record) =>{
       const wsAsnId=String(record.wsAsnId);
       const paneitem={title:'退货单详情',key:'203000edit'+wsAsnId+'info',data:{wsAsnId:wsAsnId},componkey:'203000info'}
       this.props.dispatch({
         type:'tab/firstAddTab',
         payload:paneitem
       })
    }

    //点击表格上的修改按钮操作
    editInfo = (record) =>{
      const wsAsnId=String(record.wsAsnId);
       const paneitem={title:'修改退货单',key:'203000edit'+wsAsnId,data:{wsAsnId:wsAsnId},componkey:'203000edit'}
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
        values.type = "20";
        this.props.dispatch({
            type:'orderth/fetch',
            payload:{code:'qerp.web.ws.asn.query',values:values}
        });
        this.props.dispatch({ type: 'tab/loding', payload:true});
	}
	
	//列表数据选择
	selectChange=(selectedRowKeys,selectedRows)=>{
		this.props.dispatch({
		  	type:'orderth/select',
		  	payload:{selectedRowKeys,selectedRows}
		})
	}

    render() {
        return (
          <EditableTable 
            bordered={true}
            dataSource={this.props.tableList} 
            columns={this.props.addorderobj?this.columns:this.columnsrole} 
            footer={true}
            pageChange={this.pageChange.bind(this)}
            pageSizeChange={this.pageSizeChange.bind(this)}
            total={this.props.total}
            limit={this.props.limit}
            current={Number(this.props.currentPage)+1}
            select={this.props.addorderobj?true:false}
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
    const {tableList,total,limit,currentPage,values,selectedRowKeys,selectedRows} = state.orderth;
    return {tableList,total,limit,currentPage,values,selectedRowKeys,selectedRows};
}

export default connect(mapStateToProps)(OrderthTable);
 


