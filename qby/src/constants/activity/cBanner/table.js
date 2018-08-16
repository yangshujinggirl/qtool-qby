import React from 'react';
import { connect } from 'dva';
import EditableTable from '../../../components/table/tablebasic';
import TableLink from '../../../components/table/tablelink';

class OperatebannerTable extends React.Component {
	constructor(props) {
        super(props);
        this.columns = [{
                title: 'banner名称',
                dataIndex: 'name'
          },{
                title: 'banner id',
                dataIndex: 'pdBannerId'
          }, {
                title: '状态',
                dataIndex: 'statusStr'
          },
          {
                title: '创建人',
                dataIndex: 'urUserName'
          },
          {
                title: '创建时间',
                dataIndex: 'createTime'
          },
          {
                title: '修改人',
                dataIndex: 'updateUrUserName'
          },{
                title: '操作',
                dataIndex: 'operation',
                render: (text, record) => {
                    return (
                        <TableLink text="修改" hindClick={this.editInfo.bind(this,record)} type='1'/>
                    );
                }
          }];
    }

    //点击表格上的修改按钮操作
    editInfo = (record) =>{
        const pdBannerId=String(record.pdBannerId);
        const paneitem={title:'banner修改',key:'1002000edit'+pdBannerId,data:{pdBannerId:pdBannerId},componkey:'1002000edit'}
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
            type:'operatebanner/fetch',
            payload:{code:'qerp.web.pd.cbanner.list',values:values}
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
    const {tableList,total,limit,currentPage,values} = state.operatebanner;
    return {tableList,total,limit,currentPage,values};
}

export default connect(mapStateToProps)(OperatebannerTable);
