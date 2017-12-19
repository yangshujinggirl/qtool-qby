import { Table ,Pagination} from 'antd';


class EditableTable extends React.Component {
    rowClassName=(record, index)=>{
        if (index % 2) {
            return 'table_gray'
        }else{
            return 'table_white'
        }
    }
    hindChange=(pagination,filters,sorter)=>{
        const pageChange=this.props.pageChange
        pageChange(pagination)
    }


    render() {
        const rowSelection = {
            selectedRowKeys:this.props.selectedRowKeys,
            onChange: this.onSelectChange,
            type:this.props.selectType
        };
        return (
            <Table 
                bordered 
                dataSource={this.props.dataSource} 
                columns={this.props.columns} 
                pagination={Number(this.props.total)>Number(this.props.limit)?{pageSize:Number(this.props.limit),total:Number(this.props.total),current:Number(this.props.currentPage)+1}:false}
                rowClassName={this.rowClassName.bind(this)}
                onChange={this.hindChange.bind(this)}
                title={() => this.props.title}
                />
        );
    }
}

export default EditableTable


