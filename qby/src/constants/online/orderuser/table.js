import EditableTable from '../../../components/table/tablebasic';
import TableLink from '../../../components/table/tablelink';
import { connect } from 'dva';


class SearchTable extends React.Component {
	constructor(props) {
        super(props);
        this.columns = [
            {
                title: '订单号',
                dataIndex: 'shopName1',
                render: (text, record) => {
					return (
						<TableLink text={text} hindClick={this.lookInfo.bind(this,record)} type='1'/>
					);
				}
            }, 
            {
                title: '有赞订单号',
                dataIndex: 'amount2'
            },
            {
                title: '归属门店',
                dataIndex: 'shopName3'
            }, 
            {
                title: '商品数量',
                dataIndex: 'amount4'
            },
            {
                title: '订单金额',
                dataIndex: 'shopName5'
            }, 
            {
                title: '实际支付金额',
                dataIndex: 'amount6'
            },
            {
                title: '订单状态',
                dataIndex: 'shopName7'
            },
            {
                title: '推送仓库',
                dataIndex: 'shopName8'
            },
            {
                title: '下单时间',
                dataIndex: 'shopName9'
            }
        ];
    }
 
    //跳转到详情页面
    lookInfo=(record)=>{
        const wsAsnId=String(record.wsAsnId);
        const paneitem={title:'订单详情',key:'801000edit'+wsAsnId+'info',data:{wsAsnId:wsAsnId},componkey:'801000info'}
        this.props.dispatch({
            type:'tab/firstAddTab',
            payload:paneitem
        })
    }
    //分页方法
    pageChange=(page,pageSize)=>{
        this.props.getPageSizeDate(pageSize,Number(page-1))
    }
    //pagesize变化
    pageSizeChange=(current,size)=>{
        this.props.getPageSizeDate(size,Number(current-1))
    }

    selectChange=(selectedRowKeys,selectedRows)=>{
        this.props.getSelectDate(selectedRowKeys,selectedRows)
    }
    render() {
        return (
            <EditableTable 
                select={true}
                selectType='checkbox'
                selectChange={this.selectChange.bind(this)}
                selectedRowKeys={this.props.selectedRowKeys}
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

export default connect()(SearchTable);
 


