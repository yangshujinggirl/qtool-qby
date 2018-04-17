import EditableTable from '../../../components/table/tablebasic';

class SearchTable extends React.Component {
	constructor(props) {
        super(props);
        this.columns = [
            {
                title: '用户姓名',
                dataIndex: 'shopName1'
            }, 
            {
                title: '身份证号',
                dataIndex: 'amount2'
            },
            {
                title: '手机号',
                dataIndex: 'shopName3'
            }, 
            {
                title: '消费次数',
                dataIndex: 'amount4'
            },
            {
                title: '消费金额',
                dataIndex: 'shopName5'
            }, 
            {
                title: '初次消费时间',
                dataIndex: 'amount6'
            },
            {
                title: '最后消费时间',
                dataIndex: 'shopName7'
            }
        ];
    }
 
    //分页方法
    pageChange=(page,pageSize)=>{
        this.props.getPageSizeDate(pageSize,Number(page-1))
    }
    //pagesize变化
    pageSizeChange=(current,size)=>{
        this.props.getPageSizeDate(size,Number(current-1))
    }
    render() {
        return (
            <EditableTable 
                dataSource={this.props.datasouce} 
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
}

export default SearchTable;
 


