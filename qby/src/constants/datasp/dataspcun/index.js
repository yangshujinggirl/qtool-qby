
import {GetServerData} from '../../../services/services';
import {Getexpont} from '../../../services/expont';
import { Button, Icon } from 'antd';
import { connect } from 'dva';
import DataspcunTable from './table';
import DataspcunSearch from './search';

class DataspcunIndex extends React.Component{
	state = {};

	//导出数据
	exportData = () => {
		const data=this.props.values;
		const result=Getexpont('qerp.web.ws.inv.spu.export',data)
	}

  	render(){
		const adminType=eval(sessionStorage.getItem('adminType'));
     	return(
        	<div>
                <DataspcunSearch/>
                    <Button 
						type="primary" 
						size='large'
						className='mt10'
						onClick={this.exportData}
					>
                        导出数据
					</Button>
             		<div className='mt15'><DataspcunTable/></div>
        	</div>
      	)
  	}
}

function mapStateToProps(state) {
	// const {values} = state.stock;
    return {};
}

export default connect(mapStateToProps)(DataspcunIndex);
