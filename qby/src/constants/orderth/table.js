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
              <TableLink text={text} hindClick={this.editInfo.bind(this,record)} type='1'/>
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
          title: '订单状态',
          dataIndex: 'statusStr'
        },{
            title: '预计送达时间',
            dataIndex: 'expectedTime'
        },{
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
    }
    
    //点击表格上的修改按钮操作
    editInfo = (record) =>{
       console.log(record);
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
            />
        );
	}
	componentDidMount(){
    //执行初始化数据方法获取list
		this.initList(this.props.values,this.props.limit,this.props.currentPage);
	}
    
}

function mapStateToProps(state) {
    const {tableList,total,limit,currentPage,values} = state.orderth;
    return {tableList,total,limit,currentPage,values};
}

export default connect(mapStateToProps)(OrderthTable);
 


