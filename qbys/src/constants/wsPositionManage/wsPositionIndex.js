import React from 'react';
import {GetServerData} from '../../services/services';
import { Button, Icon } from 'antd';
import { connect } from 'dva';
import '../../style/house_area.css';
//库位table
import HousePositionTable from './wsPositionTable';
//库位搜索部分
import HousePositionSearch from './wsPositionSearch';
//新建库位弹出框
import NewPositionModal from './wsPositionModal';
class HousePositionIndex extends React.Component{
	state = {
	};

	//新建库位弹出框
    addNewHousePosition = () =>{
		this.newPositionModal.changeVisible(true,null);
	}

    //当点击table修改单条数据信息时
	editInfo = (info) =>{
		this.newPositionModal.changeVisible(true,info);
	}
	
  	render(){
     	return(
        	<div className='content_box'>
                <HousePositionSearch/>
					<Button 
						type="primary" 
						onClick={this.addNewHousePosition.bind(this)}
						size='large'
						className='mt30'
					>
                        新建库位
					</Button>
             		<div className='mt30'><HousePositionTable openModal={this.editInfo.bind(this)}/></div>
					 <NewPositionModal wrappedComponentRef={(inst) => this.newPositionModal = inst}/>
        	</div>
      	)
  	}
}

export default connect()(HousePositionIndex);
