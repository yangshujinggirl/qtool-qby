import { Table, Input, Icon, Button, Popconfirm } from 'antd';


class EditableTableInfo extends React.Component {
  	constructor(props) {
    	super(props);
    	this.columns = [{
      title: 'age',
      dataIndex: 'age',
    }, {
      title: 'address',
      dataIndex: 'address',
    }];

    this.state = {
      dataSource: [{
        key: '0',
        name: 'Edward King 0',
        age: '32',
        address: 'London, Park Lane no. 0',
      }, {
        key: '1',
        name: 'Edward King 1',
        age: '32',
        address: 'London, Park Lane no. 1',
      }],
      count: 2,
    };
  }
  
  rowClassName=(record, index)=>{
	if (index % 2) {
	  return 'table_gray'
	}else{
	  return 'table_white'
	}
  }
  render() {
    const { dataSource } = this.state;
	const columns = this.columns;
	const title='heads'
    return (
		<Table bordered 
				dataSource={dataSource} 
				columns={columns} 
				pagination={false}
				rowClassName={this.rowClassName.bind(this)}
				title={() => title}
				/>
    );
  }
}


export default EditableTableInfo
