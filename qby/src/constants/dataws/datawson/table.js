import { connect } from 'dva';
import EditableTable from '../../../components/table/tablebasic';

class DatawsonTable extends React.Component {
	constructor(props) {
        super(props);
    }

	//分页方法
	pageChange=(page,pageSize)=>{
        this.initstockList(this.props.values,pageSize,Number(page-1))
	}
	//pagesize变化
	pageSizeChange=(current,size)=>{
      this.initstockList(this.props.values,size,0)
	}

    //列表数据请求
    initstockList=(values,limit,currentPage)=>{
        values.limit=limit;
        values.currentPage=currentPage;
        this.props.dispatch({
            type:'dataws/fetch',
            payload:{code:'qerp.web.pd.invdata.query',values:values}
        });
        this.props.dispatch({ type: 'tab/loding', payload:true});
    }

    render() {
        return (
			<EditableTable
				dataSource={this.props.invdatas}
				columns={this.props.headArr}
				pageChange={this.pageChange.bind(this)}
				pageSizeChange={this.pageSizeChange.bind(this)}
				total={this.props.total}
				limit={this.props.limit}
                current={Number(this.props.currentPage)+1}
                bordered={true}
                scroll={{ x: '160%'}}
                footer={true}
				/>
        );
	}


}

function mapStateToProps(state) {
    const {headArr,invdatas,total,limit,currentPage,values} = state.dataws;
    return {headArr,invdatas,total,limit,currentPage,values};
}

export default connect(mapStateToProps)(DatawsonTable);
