import EditableTable from '../../../components/table/tablebasic';
import TableLink from '../../../components/table/tablelink';
import { connect } from 'dva';

class SearchTable extends React.Component {
	constructor(props) {
        super(props);
        this.columns = [
            {
                title: '订单号',
                dataIndex: 'orderNo',
                render: (text, record) => {
									return (
										<TableLink text={text} hindClick={this.lookInfo.bind(this,record)} type='1'/>
									);
								}
            },
            {
                title: '有赞订单号',
                dataIndex: 'outNo'
            },
            // {
            //     title: '归属门店',
            //     dataIndex: 'shopName'
            // },
            {
                title: '商品数量',
                dataIndex: 'qty'
            },
            {
                title: '订单金额',
                dataIndex: 'amount'
            },
            {
                title: '实际支付金额',
                dataIndex: 'payAmount'
            },
            {
                title: '订单状态',
                dataIndex: 'statusStr'
            },
            {
                title: '推送仓库',
                dataIndex: 'warehouseStr'
            },
            {
                title: '下单时间',
                dataIndex: 'payTime'
            }
        ];
    }

    //跳转到详情页面
    lookInfo=(record)=>{
        const id=String(record.ecOrderId);
        const paneitem={title:'订单详情',key:'801000edit'+id+'info',data:{record:record,id:id},componkey:'801000info'}
        this.props.dispatch({
            type:'tab/firstAddTab',
            payload:paneitem
        });
    }
    //分页方法
    pageChange=(page,pageSize)=>{
        this.props.getPageSizeDate(pageSize,Number(page-1))
    }
    //pagesize变化
    pageSizeChange=(current,size)=>{
        this.props.getPageSizeDate(size,Number(current-1))
    }
    //多选框选择
    selectChange=(selectedRowKeys,selectedRows)=>{
        this.props.getSelectDate(selectedRowKeys,selectedRows)
    }
    render() {

        return (
            <EditableTable
                select={(this.props.addorder || this.props.repigood)?true:false}
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
