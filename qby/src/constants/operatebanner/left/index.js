import {GetServerData} from '../../../services/services';
import { Button, Icon } from 'antd';
import { connect } from 'dva';

class LeftAddType extends React.Component{
	state = {};
	
	//新增添加的类型  
	addNewItem = (type) =>{
        console.log(type);
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
	return {};
}

export default connect(mapStateToProps)(LeftAddType);