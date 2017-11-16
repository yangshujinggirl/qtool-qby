import { Table ,Pagination} from 'antd';
import TableLink from './tablelink';


class Paginations extends React.Component {
    onShowSizeChange=(current,size)=>{
        this.props.pageSizeChange(current,size)
    }
    onChange=(page,pageSize)=>{
        this.props.pageChange(page,pageSize)
    }
    render() {
        const pages=localStorage.getItem('pagesize')
        console.log(pages)
        return (
            <Pagination showSizeChanger onShowSizeChange={this.onShowSizeChange}  onChange={this.onChange} total={this.props.total} pageSize={pages?Number(pages):10}/>
        );
    }
}


class EditableTable extends React.Component {
    render() {
        return (
            <Table bordered dataSource={this.props.dataSource} columns={this.props.columns} footer={() => <Paginations pageChange={this.props.pageChange} pageSizeChange={this.props.pageSizeChange} total={this.props.total}/>} pagination={false}/>
        );
    }
}

export default EditableTable


