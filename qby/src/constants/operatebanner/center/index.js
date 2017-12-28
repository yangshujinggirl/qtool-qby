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
                {
                    this.props.configArr.length?
                    <div className='preview-content'>
                        {
                            this.props.configArr.map((elem, index) =>{
                                if(elem.type == 1){
                                    return <ShowImgs key={index} data={elem} index={index}/>;
                                }else if(elem.type == 2){
                                    return <ShowGoods key={index} data={elem} index={index}/>;
                                }else if(elem.type == 3){
                                    return <ShowText key={index} data={elem} index={index}/>;
                                }else{
                                    return <ShowRule key={index} data={elem} index={index}/>;
                                }
                            })
                        }
                    </div>
                    :null
                }
            </div>
      	)
	}
	  
	componentDidMount(){}
}

function mapStateToProps(state) {
    const {configArr}= state.h5config;
	return {configArr};
}

export default connect(mapStateToProps)(CenterPreview);