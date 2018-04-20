import React from 'react';
import {GetServerData} from '../../services/services';
import { Button, Icon } from 'antd';
import { connect } from 'dva';
import OperatememberSearch from './search';
import OperatememberTable from './table';
import MyUploadMember from './upload';

class OperatememberIndex extends React.Component{
    state = {};
    handleDownload=()=>{
        window.open('../../static/member.xlsx')
    }
    
  	render(){
     	return(
        	<div className='content_box'>
                <OperatememberSearch/>
             		<div className='mt20'>
                        {/* <Button type="primary" size='large' className='mr10' onClick={this.handleDownload} style={{display:'inline-block'}}>
                            下载导入模板
                        </Button>
                        <MyUploadMember/> */}
                        <div className="mt15">
                            <OperatememberTable/>
                        </div>
                     </div>
        	</div>
      	)
	}
	  
	componentDidMount(){}
}

function mapStateToProps(state) {
	return {};
}

export default connect(mapStateToProps)(OperatememberIndex);
