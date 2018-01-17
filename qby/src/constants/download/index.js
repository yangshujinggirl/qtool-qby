import EditableTable from '../../components/table/tablebasic';
import {Getexpont} from '../../services/expont';
import {GetServerData} from '../../services/services';

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
                    <div className={record.state=='1'?'theme-color pointer':'placehold-color'} onClick={this.hindDown.bind(this,record)}>下载</div>
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
        if(record.state=='1'){
            window.open(record.filePath)
        }
    }

    getdownlist=(limit,currentPage)=>{
        const values={limit:limit,currentPage:currentPage}
        const result=GetServerData('qerp.web.sys.doc.list',values);
        result.then((res) => {
            return res;
        }).then((json) => {
            if(json.code=='0'){
               const sysDownloadDoc=json.sysDownloadDoc
               this.setState({
                    dataSource:sysDownloadDoc,
                    limit:json.limit,
                    total:json.total,
                    currentPage:json.currentPage
               }) 
            }
        })    
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
            dataSource={this.state.dataSource} 
            columns={this.columns}
            footer={true}
            pageChange={this.pageChange.bind(this)}
            pageSizeChange={this.pageSizeChange.bind(this)}
            total={this.state.total}
            limit={this.state.limit}
            current={Number(this.state.currentPage)+1}
            />
		)
    }
    componentDidMount(){
        this.getdownlist(10,0)
    }
}

export default DownloadIndex;
