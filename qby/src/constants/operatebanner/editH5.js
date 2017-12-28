import { Form, Select, Input, Button,Upload, Icon, message } from 'antd';
import React from 'react';
import {GetServerData} from '../../services/services';
import {deepcCloneObj} from '../../utils/commonFc';
import '../../style/h5_config.css';
//引入三部分区域
import LeftAddType from './left/index';
import CenterPreview from './center/index';
import RightConfig from './right/index';

class H5_configure extends React.Component{
	constructor(props) {
	    super(props);
	    this.state = {}
	}

	render(){
		return (
			<div className='content_box h5-wrapper'>
                <div className='white_box h5-container'>
                   <LeftAddType/>
				   <CenterPreview/>
				   <RightConfig/>
                </div>
            </div>
		)
	}

  componentDidMount(){
		if(this.props.data){
			let data = {
				'pdBannerId':this.props.data.pdBannerId
			}
			const result=GetServerData('qerp.web.pd.banner.config.info',data);
			result.then((res) => {
				return res;
			}).then((json) => {
				if(json.code == "0"){
					
				}else{
					message.error(json.message);
				}
			}) 
		}
  }

}

export default H5_configure;