import React from 'react';
import {GetServerData} from '../../services/services';
import { Button, Icon } from 'antd';
import { connect } from 'dva';
import '../../style/house_area.css';
//库区table
import HouseAreaTable from './houseAreaTable';
//库区搜索部分
import HouseAreaSearch from './houseAreaSearch';
//新建库区弹出框
import NewAreaModal from './newHouseAreaModal';
class HouseAreaIndex extends React.Component{
	state = {
	};

	//新建库区弹出框
    addNewHouseArea = () =>{
		this.newAreaModal.changeVisible(true,null);
	}

	editInfo = (info) =>{
		this.newAreaModal.changeVisible(true,info);
	}
	
  	render(){
     	return(
        	<div className='content_box'>
                <HouseAreaSearch/>
					<Button 
						type="primary" 
						onClick={this.addNewHouseArea.bind(this)}
						size='large'
						className='mt30'
					>
                        新建库区
					</Button>
             		<div className='mt30'><HouseAreaTable openModal={this.editInfo.bind(this)}/></div>
					 <NewAreaModal wrappedComponentRef={(inst) => this.newAreaModal = inst}/>
        	</div>
      	)
  	}
}

export default connect()(HouseAreaIndex);
