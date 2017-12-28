import {GetServerData} from '../../../services/services';
import { Button, Icon } from 'antd';
import { connect } from 'dva';
//
import ShowImgs from './preview/img';
import ShowGoods from './preview/good';
import ShowText from './preview/text';
import ShowRule from './preview/rule';

class CenterPreview extends React.Component{
	state = {};
    
  	render(){
     	return(
        	<div className='center-preview'>
                <div className='area-name'>
                    <span></span>
                    <p>预览区</p>
                </div>
                <div className='preview-content'>
                    <ShowImgs/>
                    <ShowGoods/>
                    <ShowText/>
                    <ShowRule/>
                </div>
            </div>
      	)
	}
	  
	componentDidMount(){}
}

function mapStateToProps(state) {
	return {};
}

export default connect(mapStateToProps)(CenterPreview);