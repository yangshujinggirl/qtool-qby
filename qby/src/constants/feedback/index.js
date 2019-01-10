import {GetServerData} from '../../services/services';
import { Button, Icon } from 'antd';
import { connect } from 'dva';
import SpTable from './table';
import SearchForms from './search';

class FeedbackIndex extends React.Component{
  	render(){
     	return(
        	<div className='content_box'>
                <SearchForms/>
             	<div className='mt15'><SpTable/></div>
        	</div>
      	)
	}
}

export default connect()(FeedbackIndex);
