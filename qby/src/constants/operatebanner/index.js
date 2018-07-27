import React from 'react';
import { Button, Icon } from 'antd';
import { connect } from 'dva';
//search
import OperatebannerSearch from './search';
//table
import OperatebannerTable from './table';
import "../../style/operate_banner.css";

class OperatebannerIndex extends React.Component{
	state = {};
	addNew = () =>{
		const paneitem={title:'新建banner',key:'404000edit',componkey:'404000edit',data:null}
  		this.props.dispatch({
	    	type:'tab/firstAddTab',
	    	payload:paneitem
		});
		this.props.dispatch({
            type:'operatebanner/initState',
            payload:{}
		})
  	}

  	render(){
     	return(
        	<div className='content_box'>
                <OperatebannerSearch/>
				<Button
					type="primary"
					size='large'
					className='mt20'
					onClick={this.addNew}
				>
					新建banner
				</Button>
				<div className='mt15'><OperatebannerTable/></div>
        	</div>
      	)
	}

	componentDidMount(){}
}

function mapStateToProps(state) {
	return {};
}

export default connect(mapStateToProps)(OperatebannerIndex);
