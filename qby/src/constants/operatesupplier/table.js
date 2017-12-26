import React from 'react';
import { connect } from 'dva';
import EditableTable from '../../components/table/tablebasic';
import TableLink from '../../components/table/tablelink';

class OperatesupplierTable extends React.Component {
	constructor(props) {
        super(props);
        this.columns = [{
                title: '供应商名称',
                dataIndex: 'name'
            }, {
                title: '供应商简称',
                dataIndex: 'shortName'
            },{
                title: '合作状态',
                dataIndex: 'statusStr'
            }, {
                title: '操作',
                dataIndex: 'opation',
                render: (text, record) => {
                    return (
                        <TableLink text="修改" hindClick={this.editInfo.bind(this,record)} type='1'/>
                    );
                }
        }];
    }
    
    //点击表格上的修改按钮操作
    editInfo = (record) =>{
        const pdSupplierId=String(record.pdSupplierId);
        const paneitem={title:'修改供应商信息',key:'405000edit'+pdSupplierId,data:{pdSupplierId:pdSupplierId},componkey:'405000edit'}
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
            type:'operatesupplier/fetch',
            payload:{code:'qerp.web.pd.supplier.query',values:values}
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
    const {tableList,total,limit,currentPage,values} = state.operatesupplier;
    return {tableList,total,limit,currentPage,values};
}

export default connect(mapStateToProps)(OperatesupplierTable);