
import {GetServerData} from '../../services/services';
import { Button, Icon } from 'antd';
import { connect } from 'dva';
import SpTable from './table';
import SearchForms from './search';

class OperateIndex extends React.Component{
	addNew = () =>{
		const paneitem={title:'新建门店',key:'403000edit',componkey:'403000edit',data:null}
  		this.props.dispatch({
	    	type:'tab/firstAddTab',
	    	payload:paneitem
		});
  	}
  	render(){
     	return(
        	<div className='content_box'>
                <SearchForms/>
				<Button 
					type="primary" 
					size='large'
					className='mt20'
					onClick={this.addNew}
				>
					新建门店
				</Button>
             	<div className='mt15'><SpTable/></div>
        	</div>
      	)
	}	
}

export default connect()(OperateIndex);
