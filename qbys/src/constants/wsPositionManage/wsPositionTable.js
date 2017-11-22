import React from 'react';
import { connect } from 'dva';
import EditableTable from '../../components/table/tablemodel';
import TableLink from '../../components/table/tablelink';

class HousePositionTable extends React.Component {
	constructor(props) {
        super(props);
		this.columns = [{
            title: '库区',
            dataIndex: 'wsArea.name'
          },{
            title: '库位',
            dataIndex: 'code'
          },{
            title: '库位打印编码',
            dataIndex: 'codePrint'
          }, {
            title: '库位类型',
            dataIndex: 'typeStr'
          },{
            title: '库位状态',
            dataIndex: 'statusStr'
          },{
            title: '操作',
            dataIndex: 'opation',
            render: (text, record) => {
              return (
                <TableLink text='修改' hindClick={this.editInfo.bind(this,record)}/>
              );
            }
        }];   
    }
    
    //点击表格上的修改按钮操作
    editInfo = (record) =>{
        this.props.openModal(record);
    }

	//分页方法
	pageChange=(page,pageSize)=>{
        this.initHousePositionList(this.props.values,pageSize,Number(page-1))
	}
	//pagesize变化
	pageSizeChange=(current,size)=>{
        this.initHousePositionList(this.props.values,size,Number(current-1))
	}
    
    //列表数据请求   
    initHousePositionList=(values,limit,currentPage)=>{
        values.limit=limit;
        values.currentPage=currentPage;
        this.props.dispatch({
            type:'wsPositionManage/fetch',
            payload:{code:'qerp.web.ws.bin.query',values:values}
        });
        this.props.dispatch({ type: 'tab/loding', payload:true});
    }

    render() {
        return (
			<EditableTable 
				dataSource={this.props.housePositionList} 
				columns={this.columns} 
				pageChange={this.pageChange.bind(this)}
				pageSizeChange={this.pageSizeChange.bind(this)}
				total={this.props.total}
				limit={this.props.limit}
				/>
        );
	}
	componentDidMount(){
        //执行初始化数据方法获取list
		this.initHousePositionList(this.props.values,this.props.limit,this.props.currentPage);
	}
    
}

function mapStateToProps(state) {
    const {housePositionList,total,limit,currentPage,values} = state.wsPositionManage;
    return {housePositionList,total,limit,currentPage,values};
}

export default connect(mapStateToProps)(HousePositionTable);
