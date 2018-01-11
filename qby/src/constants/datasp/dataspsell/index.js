// import {GetServerData} from '../../../services/services';
import { Button, Icon } from 'antd';
import { connect } from 'dva';
import Cardlist from '../../../components/card/cardlist';
import Cards from '../../../components/card/catds';
// import {Getexpont} from '../../../services/expont';

class DataspsellIndex extends React.Component{
	state = {};
  	render(){
     	return(
        	<div>
				<Cards/>
                <Cardlist/>
				
        	</div>
      	)
  	}
}


function mapStateToProps(state) {
	// const {values} = state.datawshis;
	return {};
}
export default connect(mapStateToProps)(DataspsellIndex);
