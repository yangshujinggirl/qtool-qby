import { Form, Select, Input, Button,Upload, Icon, message,Radio} from 'antd';
import {deepcCloneObj} from '../../../../utils/commonFc';
const { TextArea } = Input;

import { connect } from 'dva';
class ShowText extends React.Component{
	constructor(props) {
	    super(props);
	    this.state = {
	    }
	}

	editItem = () =>{
		this.props.dispatch({
            type:'h5config/syncCurrentItem',
            payload:this.props.index
        });
	}

	deleteItem = ()=>{
		let tempConfigArr = deepcCloneObj(this.props.configArrPre);
        tempConfigArr.splice(this.props.index,1);
        this.props.dispatch({
            type:'h5config/syncConfigArrPre',
            payload:tempConfigArr
        });
        this.props.dispatch({
            type:'h5config/syncCurrentItem',
            payload:-1
        });
	}
    
    //上移元素
	upItem = () =>{
        let tempConfigArr = deepcCloneObj(this.props.configArrPre);
        tempConfigArr.map((elem, index) =>{
            elem.selected = false;
        });
        tempConfigArr[this.props.currentItem].selected = true;
        if(this.props.index == 0) {
            return;
        };
        this.swapItems(tempConfigArr, this.props.index, this.props.index - 1);
        tempConfigArr.map((elem, index) =>{
            if(elem.selected == true){
                this.props.dispatch({
                    type:'h5config/syncCurrentItem',
                    payload:index
                });
            }
        });
	}

    //下移元素
	downItem = () =>{
        let tempConfigArr = deepcCloneObj(this.props.configArrPre);
        tempConfigArr.map((elem, index) =>{
            elem.selected = false;
        });
        tempConfigArr[this.props.currentItem].selected = true;
        if(this.props.index == tempConfigArr.length -1) {
            return;
        }
        this.swapItems(tempConfigArr, this.props.index, this.props.index + 1);
        tempConfigArr.map((elem, index) =>{
            if(elem.selected == true){
                this.props.dispatch({
                    type:'h5config/syncCurrentItem',
                    payload:index
                });
            }
        })	
    }
    
    //元素移动
    swapItems = (arr, index1, index2)=> {
        arr[index1] = arr.splice(index2, 1, arr[index1])[0];
        let tempConfigArr = arr;
        this.props.dispatch({
            type:'h5config/syncConfigArrPre',
            payload:tempConfigArr
        });
    };

	render(){
		return (
	              <div className={this.props.index == this.props.currentItem?'preview-text selected-border':'preview-text'}>
                        <div className='text-content' onClick={this.editItem.bind(this)}>
                            <TextArea rows={4} value={this.props.data.text?this.props.data.text:''} className='textareas' disabled/>
                        </div>
                        <div className='button-list'>
                            <span onClick={this.upItem.bind(this)}><Icon type="up" /></span>
                            <span onClick={this.downItem.bind(this)}><Icon type="down" /></span>
                            <span onClick={this.editItem.bind(this)}>编辑</span>
                            <span onClick={this.deleteItem.bind(this)}>删除</span>
                        </div>
                   </div>
			)
	}

	componentDidMount(){
		
	}
}

function mapStateToProps(state) {
    const {configArrPre,currentItem}= state.h5config;
	return {configArrPre,currentItem};
}

export default connect(mapStateToProps)(ShowText);