import React from 'react';
import {GetServerData} from '../../services/services';
import { Button, Icon } from 'antd';
import { connect } from 'dva';
//库区table
import HouseAreaTable from './houseAreaTable';
//库区搜索部分
import HouseAreaSearch from './houseAreaSearch';

class HouseAreaIndex extends React.Component{
    addNewHouseArea = () =>{
        console.log('新建库区');
		// const paneitem={title:'新增账号',key:'601000edit',componkey:'601000edit',data:null}
  		// this.props.dispatch({
	    // 	type:'tab/firstAddTab',
	    // 	payload:paneitem
	  	// })
  	}
  	render(){
     	return(
        	<div className='content_box'>
                <HouseAreaSearch/>
					<Button 
						type="primary" 
						onClick={this.addNewHouseArea.bind(this)}
						size='large'
					>
                        新建库区
					</Button>
             		<div className='mt30'><HouseAreaTable/></div>
        	</div>
      	)
  	}
}

export default connect()(HouseAreaIndex);
