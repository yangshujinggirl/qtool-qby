import EditableTable from '../../components/table/tablebasic';
import {Getexpont} from '../../services/expont';
import {GetServerData} from '../../services/services';
import { connect } from 'dva';

class DownloadIndex extends React.Component{
    constructor(props) {
		super(props);
		this.columns = [
            {
              title: '数据名称',
              dataIndex: 'fileName'
            }, {
              title: '数据申请时间',
              dataIndex: 'createTime'
            },{
              title: '数据产生时间',
              dataIndex: 'generatedTime'
            }, {
              title: '数据状态',
              dataIndex: 'fileStatusStr'
            },{
              title: '操作',
              dataIndex: 'statusStr',
              render: (text, record) => {
                return (
                    <div className={record.type=='1'?'theme-color pointer':'placehold-color'} onClick={this.hindDown.bind(this,record)}>下载</div>
                );
              }
            }];  
        
        this.state={
            dataSource:[{
                voucherNo:'123',
                shopName:'2012-01-12',
                amount:'2013-12-13',
                createTime:'已生成',
                state:'1',
                id:'00123',
            }]
        }
    }
    hindDown=(record)=>{
        if(record.type=='1'){
            window.open(record.filePath)
        }
    }
    getdownlist=(limit,currentPage)=>{
        const values={limit:limit,currentPage:currentPage}
        this.props.dispatch({
            type:'downlaod/fetch',
            payload:{code:'qerp.web.sys.doc.list',values:values}
        });   
    }
    //分页方法
	pageChange=(page,pageSize)=>{
		this.getdownlist(pageSize,Number(page-1))
	}
	//pagesize变化
	pageSizeChange=(current,size)=>{
		this.getdownlist(size,0)
	}
	render(){
		return(
            <EditableTable 
            bordered={true} 
            dataSource={this.props.sysDownloadDoc} 
            columns={this.columns}
            footer={true}
            pageChange={this.pageChange.bind(this)}
            pageSizeChange={this.pageSizeChange.bind(this)}
            total={this.props.total}
            limit={this.props.limit}
            current={Number(this.props.currentPage)+1}
            />
		)
    }
    componentDidMount(){
        this.getdownlist(15,0)
    }

}

function mapStateToProps(state) {
	const {sysDownloadDoc,total,limit,currentPage} = state.downlaod;
	return {sysDownloadDoc,total,limit,currentPage};
}
export default connect(mapStateToProps)(DownloadIndex);