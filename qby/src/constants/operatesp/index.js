
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
		const rolelists=this.props.data.rolelists
		// //新增采购单
		const addorder=rolelists.find((currentValue,index)=>{
			return currentValue.remark=="qerp.web.sp.exchange.save"
		})
		//导出数据
		const expontdata=rolelists.find((currentValue,index)=>{
			return currentValue.remark=="qerp.web.sys.doc.task"
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
					新建门店
				</Button>
				:null
				}
				
             	<div className='mt15'><SpTable addorderobj={addorder}/></div>
        	</div>
      	)
	}	
}

export default connect()(OperateIndex);
