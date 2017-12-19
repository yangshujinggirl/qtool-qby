import { Button, Icon } from 'antd';
import { connect } from 'dva';
import WsTable from './table';
import '../../style/wsform_addstyle.css';

class WsIndex extends React.Component{
    addWs = () =>{
		const paneitem={title:'新增仓库',key:'90000edit',componkey:'90000edit',data:null}
  		this.props.dispatch({
	    	type:'tab/firstAddTab',
	    	payload:paneitem
		})
		this.props.dispatch({
	    	type:'wsedit/initstate',
	    	payload:paneitem
		})
  	}
  	render(){
     	return(
        	<div className='content_box'>
					<Button 
						type="primary" 
						onClick={this.addWs.bind(this)}
						size='large'
						className=''
					>
						新增仓库
					</Button>
             		<div className='mt15'>
						 <WsTable/>
					</div>
        	</div>
      	)
  	}
}

export default connect()(WsIndex);
