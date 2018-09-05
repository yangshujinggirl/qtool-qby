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
      if(!this.props.total) {
        return <span></span>
      }
        return (
            <Pagination
                showSizeChanger
                onShowSizeChange={this.onShowSizeChange}
                onChange={this.onChange}
                total={this.props.total}
                current={this.props.current}
                pageSizeOptions={['15','30','50','100','200','500']}
                defaultPageSize={15}
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


      onSelectChange = (selectedRowKeys, selectedRows) => {
        this.props.selectChange(selectedRowKeys,selectedRows)
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
                footer={
                    () =>
                    <Paginations pageChange={this.props.pageChange}
                                pageSizeChange={this.props.pageSizeChange}
                                total={Number(this.props.total)}
                                current={Number(this.props.current)}

                                />

                }
                pagination={false}
                rowClassName={this.rowClassName.bind(this)}
                rowSelection={this.props.select?rowSelection:null}
                scroll={this.props.scroll}
                />
        );
    }
}

export default EditableTable
