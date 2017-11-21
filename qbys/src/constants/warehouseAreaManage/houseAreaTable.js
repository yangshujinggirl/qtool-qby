import React from 'react';
import { connect } from 'dva';
import EditableTable from '../../components/table/tablemodel';
import TableLink from '../../components/table/tablelink';

class HouseAreaTable extends React.Component {
	constructor(props) {
		super(props);
		this.columns = [{
            title: '库区',
            dataIndex: 'name'
          },{
            title: '库区编码',
            dataIndex: 'code'
          },{
            title: '库区状态',
            dataIndex: 'statusStr'
          }, {
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
        console.log('修改用户信息',record);
        this.props.openModal(record);
    }

	//分页方法
	pageChange=(page,pageSize)=>{
        this.initWarehouseList(this.props.values,pageSize,Number(page-1))
	}
	//pagesize变化
	pageSizeChange=(current,size)=>{
        this.initWarehouseList(this.props.values,size,Number(current-1))
	}

	//账号列表数据
	initAccountList=(limit,currentPage)=>{
        this.props.dispatch({
            type:'account/fetch',
            payload:{code:'qerp.web.ur.user.query',values:{limit:limit,currentPage:currentPage}}
		})
		this.props.dispatch({ type: 'tab/loding', payload:true}) 
    }
    
    
    //列表数据请求   
    initHouseAreaList=(values,limit,currentPage)=>{
        values.limit=limit
        values.currentPage=currentPage
        console.log(values);
        this.props.dispatch({
            type:'houseAreaManage/fetch',
            payload:{code:'qerp.web.ws.area.query',values:values}
        });
        this.props.dispatch({ type: 'tab/loding', payload:true});
    }

    render() {
        return (
			<EditableTable 
				dataSource={this.props.houseAreaList} 
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
		this.initHouseAreaList(this.props.values,this.props.limit,this.props.currentPage);
	}
    
}

function mapStateToProps(state) {
    const {houseAreaList,total,limit,currentPage,values} = state.houseAreaManage;
    return {houseAreaList,total,limit,currentPage,values};
}

export default connect(mapStateToProps)(HouseAreaTable);
 


