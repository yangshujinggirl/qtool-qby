import {GetServerData} from '../../../services/services';
import { Button, Icon } from 'antd';
import { connect } from 'dva';
import DatawstimeTable from './table';
import DatawstimeSearch from './search';

class DatawstimeIndex extends React.Component{
	state = {};
	
  	render(){
     	return(
        	<div>
                <DatawstimeSearch/>
             	<div className='mt30'><DatawstimeTable/></div>
        	</div>
      	)
  	}
}

export default connect()(DatawstimeIndex);
