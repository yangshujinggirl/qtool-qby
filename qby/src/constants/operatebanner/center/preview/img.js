import { Form, Select, Input, Button,Upload, Icon, message,Radio} from 'antd';
import React from 'react';

class ShowImgs extends React.Component{
	constructor(props) {
	    super(props);
	    this.state = {}
	}

	editItem = () =>{
		
	}

	deleteItem = ()=>{
		
	}
    
    //上移元素
	upItem = () =>{
		
	}

    //下移元素
	downItem = () =>{
		
	}

	render(){
		return (
                <div className='preview-img selected-border'>
                    <div className='preview-img-wrapper' onClick={this.editItem.bind(this)}>
                            {/* <img src={this.props.fileDomain+this.props.currentData.text}/> */}
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
}
export default ShowImgs;