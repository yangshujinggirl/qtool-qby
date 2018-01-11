import {GetServerData} from '../../../services/services';
import { Button, Icon } from 'antd';
import { connect } from 'dva';
// import DatawshisTable from './table';
// import DatawshisSearch from './search';
import {Getexpont} from '../../../services/expont';

class DataspsellIndex extends React.Component{
	state = {};
  	render(){
     	return(
        	<div>
                123
				
        	</div>
      	)
  	}
}


function mapStateToProps(state) {
	// const {values} = state.datawshis;
	return {};
}
export default connect(mapStateToProps)(DataspsellIndex);
