import {GetServerData} from '../../../services/services';
import {deepcCloneObj} from '../../../utils/commonFc';
import { Button, Icon } from 'antd';
import { connect } from 'dva';

class LeftAddType extends React.Component{
	state = {};
	
	//新增添加的类型  
	addNewItem = (type) =>{
        let tempConfigArr = deepcCloneObj(this.props.configArrPre);
        let configArrEnd = deepcCloneObj(this.props.configArr);
        if(type == 2){
            tempConfigArr.push({"type":type,"template":"1"})
            configArrEnd.push({"type":type,"template":"1"})
        }else{
            tempConfigArr.push({'type':type});
            configArrEnd.push({'type':type});
        }
        this.props.dispatch({
            type:'h5config/syncConfigArrPre',
            payload:tempConfigArr
        });
        this.props.dispatch({
            type:'h5config/syncConfigArr',
            payload:configArrEnd
        });
        let tempCurrentItem = tempConfigArr.length-1;
        this.props.dispatch({
            type:'h5config/syncCurrentItem',
            payload:tempCurrentItem
        });
    }
    
  	render(){
     	return(
        	<div className='left-add'>
                <div className='area-name'>
                    <span></span>
                    <p>功能组件</p>
                </div>
                    <ul className='add-list'>
                    <li onClick={this.addNewItem.bind(this,1)}>新增图片</li>
                    <li onClick={this.addNewItem.bind(this,2)}>新增商品</li>
                    <li onClick={this.addNewItem.bind(this,3)}>新增文本</li>
                    <li onClick={this.addNewItem.bind(this,4)}>新增规则</li>
                    </ul>
            </div>
      	)
	}
	  
	componentDidMount(){}
}

function mapStateToProps(state) {
    const {configArr,configArrPre,currentItem,syncInitFc}= state.h5config;
    console.log(configArrPre);
	return {configArr,configArrPre,currentItem,syncInitFc};
}

export default connect(mapStateToProps)(LeftAddType);