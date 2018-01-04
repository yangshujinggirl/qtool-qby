import {GetServerData} from '../../../services/services';
import { Button, Icon } from 'antd';
import { connect } from 'dva';
import DatawshisTable from './table';
import DatawshisSearch from './search';
import {Getexpont} from '../../../services/expont';

class DatawshisIndex extends React.Component{
	state = {};

	//导出数据
	exportData = () => {
		const data=this.props.values;
		const result=Getexpont('qerp.web.ws.inv.bin.export',data)
	}
	
  	render(){
     	return(
        	<div>
                <DatawshisSearch/>
				<Button 
						type="primary" 
						size='large'
						className='mt20'
						onClick={this.exportData}
					>
                        导出数据
					</Button>
             	<div className='mt15'><DatawshisTable/></div>
        	</div>
      	)
  	}
}


function mapStateToProps(state) {
	const {values} = state.datawshis;
	return {values};
}
export default connect(mapStateToProps)(DatawshisIndex);
