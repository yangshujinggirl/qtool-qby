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
                {
                    this.props.currentItem >= 0?
                    (
                        this.props.configArr.length?
                        <div className='config-content'>
                        {
                            this.props.configArr[this.props.currentItem].type == 1?
                            <ImgEdit data={this.props.configArr[this.props.currentItem]}/>
                            :(
                            this.props.configArr[this.props.currentItem].type == 2?
                            <GoodsEdit data={this.props.configArr[this.props.currentItem]}/>
                            :
                            (
                                this.props.configArr[this.props.currentItem].type == 3?
                                <TextEdit data={this.props.configArr[this.props.currentItem]}/>
                                :
                                (
                                    this.props.configArr[this.props.currentItem].type == 4?
                                    <RuleEdit data={this.props.configArr[this.props.currentItem]}/>
                                    :
                                    null
                                )
                            )
                            )
                        }   
                        </div>  
                        :
                        null     
                    )
                    :
                    null
                }
            </div>
      	)
	}
	  
	componentDidMount(){}
}

function mapStateToProps(state) {
	const {configArr,currentItem}= state.h5config;
	return {configArr,currentItem};
}

export default connect(mapStateToProps)(RightConfig);