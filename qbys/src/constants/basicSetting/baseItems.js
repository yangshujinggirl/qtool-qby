import React from 'react';
import {GetServerData} from '../../services/services';
import {deepcCloneObj} from '../../utils/commonFc';
import { Button, Icon,Tabs,Checkbox} from 'antd';
import { connect } from 'dva';

class BaseItems extends React.Component{
    state = {};

    //下移
    downItem = () =>{
        let index = this.props.index;
        let listArrTemporary =deepcCloneObj(this.props.orderArr);
        if(index == listArrTemporary.length -1) {
            return;
        }
        this.swapItems(listArrTemporary, index, index + 1);
        this.props.dispatch({
	    	type:'jedit/syncOrderArr',
	    	payload:listArrTemporary
	  	});
    }

    //上移
    upItem = () =>{
        let index = this.props.index;
        let listArrTemporary =deepcCloneObj(this.props.orderArr);
        if(index == 0) {
            return;
        }
        this.swapItems(listArrTemporary, index, index - 1);
        this.props.dispatch({
	    	type:'jedit/syncOrderArr',
	    	payload:listArrTemporary
	  	});
    }
  
    //元素移动
   swapItems = (arr, index1, index2)=> {
        arr[index1] = arr.splice(index2, 1, arr[index1])[0];
    };

  	render(){       
     	return(
             <div className="mb10">
                 <div className="wsName">{this.props.wsName}</div>
                 {
                     this.props.index == 0
                     ?
                     (<div className="wsOperate ml30"><Icon type="arrow-down" onClick={this.downItem}/></div>)
                     :
                     (
                         this.props.index == this.props.orderArr.length-1?
                         <div className="wsOperate ml30">
                            <Icon type="arrow-up" className="mr10" onClick={this.upItem}/>
                         </div>
                         :
                         <div className="wsOperate ml30">
                            <Icon type="arrow-up" className="mr10" onClick={this.upItem}/>
                            <Icon type="arrow-down" onClick={this.downItem}/>
                         </div>
                    )
                 }
                 <div className="clearfix"></div>
             </div>
      	)
  	}
}

function mapStateToProps(state) {
    const {orderArr} = state.jedit;
    return {orderArr};
}

export default connect(mapStateToProps)(BaseItems);
