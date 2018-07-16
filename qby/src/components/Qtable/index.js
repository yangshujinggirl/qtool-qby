import React ,{ Component } from 'react';
import { Table } from 'antd';


class QTable extends Component {
  constructor(props) {
    super(props);
     this.rowSelection = {
      type:'radio',
      onChange:(selectedRowKeys, selectedRows) =>{},
    }
  }
  //绑定方法
  processData(data) {
    data && data.map((item, i) => {
        item.onOperateClick = (type) => { this.props.onOperateClick(item, type) };
    })
    return data;
  }
  //表格样式
  rowClassName=(record, index)=>{
      if (index % 2) {
          return 'table_gray'
      }else{
          return 'table_white'
      }
  }
  render() {
    const dataSource = this.processData(this.props.dataSource);
    const { select, columns, } = this.props;
    return(
      <Table
        pagination={false}
        bordered={true}
        dataSource={dataSource}
        columns = {this.props.columns}
        rowClassName={this.rowClassName}
        rowSelection={select?this.rowSelection:null}/>
    )
  }
}


export default QTable;