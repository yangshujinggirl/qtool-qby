import { Button, Icon } from 'antd';
import { connect } from 'dva';
import WsTable from './table';
class WsIndex extends React.Component{
	//点击添加按钮添加新用户信息
    addWs = () =>{
		const paneitem={title:'新增仓库',key:'601000edit',componkey:'601000edit',data:null}
  		this.props.dispatch({
	    	type:'tab/firstAddTab',
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
						className='mt30'
					>
						新增仓库
					</Button>
             		<div className='mt30'><WsTable/></div>
        	</div>
      	)
  	}
}

export default connect()(WsIndex);
