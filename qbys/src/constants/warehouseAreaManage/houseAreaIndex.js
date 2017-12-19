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
		this.newAreaModal.changeVisible(true,null,'新建库区');
	}

	//修改库区
	editInfo = (info,headText) =>{
		this.newAreaModal.changeVisible(true,info,headText);
	}

	//请求仓库列表
	wsList=()=>{
        this.props.dispatch({
            type:'IndexPage/wslistfetch',
            payload:{code:'qerp.web.ws.warehouse.all.list',values:{}}
        })
	}
	
  	render(){
		const adminType=eval(sessionStorage.getItem('adminType'));
     	return(
        	<div className='content_box'>
                <HouseAreaSearch/>
				{
					adminType !='10'?
					<Button 
						type="primary" 
						onClick={this.addNewHouseArea.bind(this)}
						size='large'
						className='mt20'
					>
						新建库区
					</Button>
					:
					null
				}
             		<div className='mt15'><HouseAreaTable openModal={this.editInfo.bind(this)}/></div>
					 <NewAreaModal wrappedComponentRef={(inst) => this.newAreaModal = inst}/>
        	</div>
      	)
	}
	  
	componentDidMount(){
		this.wsList()
	}
}

function mapStateToProps(state) {
	const {warehouses}=state.IndexPage;
    return {warehouses};
}

export default connect(mapStateToProps)(HouseAreaIndex);
