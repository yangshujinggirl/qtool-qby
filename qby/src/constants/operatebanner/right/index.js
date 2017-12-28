import {GetServerData} from '../../../services/services';
import { Button, Icon } from 'antd';
import { connect } from 'dva';
//
import ImgEdit from './config/img';
import GoodsEdit from './config/good';
import TextEdit from './config/text';
import RuleEdit from './config/rule';

class RightConfig extends React.Component{
	state = {};
    
  	render(){
     	return(
        	<div className='right-configure'>
                <div className='area-name'>
                    <span></span>
                    <p>配置编辑区</p>
                </div>
                <div className='config-content'>
                    {/* <ImgEdit/> */}
                    {/* <GoodsEdit/> */}
                    {/* <TextEdit/> */}
                    <RuleEdit/>
                </div>       
            </div>
      	)
	}
	  
	componentDidMount(){}
}

function mapStateToProps(state) {
	return {};
}

export default connect(mapStateToProps)(RightConfig);