import React from 'react';
import {GetServerData} from '../../services/services';
import { Button, Icon } from 'antd';
import { connect } from 'dva';
// import '../../style/account_center.css';
import EditableTableInfo from '../../components/table/table_info';
// import WrappedAdvancedSearchForm from './search';

class WarehouseInfo extends React.Component{
	constructor(props) {
    	super(props);
    	this.columns1 = [{
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
	







  	render(){
     	return(
        	<div>
                <EditableTableInfo columns={this.columns1} dataSource={this.state.dataSource}/>
        	</div>
      	)
      }
    componentDidMount(){
        


      }
      
}

export default connect()(WarehouseInfo);
