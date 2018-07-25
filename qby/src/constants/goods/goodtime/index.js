
import {GetServerData} from '../../../services/services';
import { Button, Icon } from 'antd';
import { connect } from 'dva';
import GoodtimeTable from './table';
import SearchForms from './search';

class GoodtimeIndex extends React.Component{
	addNew = () =>{
		const paneitem={title:'新建定时',key:'305000edit',componkey:'305000edit',data:null}
  		this.props.dispatch({
	    	type:'tab/firstAddTab',
	    	payload:paneitem
		});
  	}
  	render(){
		const rolelists=this.props.data.rolelists
		//增改定时
		const addorder=rolelists.find((currentValue,index)=>{
			return currentValue.url=="qerp.web.pd.task.time.save"
		})
     	return(
        	<div className='content_box'>
                <SearchForms/>
				{
					addorder?
					<Button
						type="primary"
						size='large'
						className='mt20'
						onClick={this.addNew}
					>
						新增定时
					</Button>
					:null
				}

             	<div className='mt15'><GoodtimeTable/></div>
        	</div>
      	)
	}
}

export default connect()(GoodtimeIndex);
