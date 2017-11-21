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
        return (
            <Pagination 
                showSizeChanger 
                onShowSizeChange={this.onShowSizeChange}  
                onChange={this.onChange} 
                total={this.props.total} 
                className='tc pagination'/>
        );
    }
}


class EditableTable extends React.Component {
    rowClassName=(record, index)=>{
        if (index % 2) {
          return 'table_gray'
        }else{
          return 'table_white'
        }
      }
    render() {
        return (
            <Table 
                bordered 
                dataSource={this.props.dataSource} 
                columns={this.props.columns} 
                footer={
                    () =>
                    Number(this.props.total)>Number(this.props.limit)
                    ?
                    <Paginations pageChange={this.props.pageChange} 
                                pageSizeChange={this.props.pageSizeChange} 
                                total={this.props.total}/>
                    :
                    null
                } 
                pagination={false}
                rowClassName={this.rowClassName.bind(this)}/>
        );
    }
}

export default EditableTable


