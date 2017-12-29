import { Form, Select, Input, Button,Upload, Icon, message } from 'antd';
import React from 'react';
import { connect } from 'dva';
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
	    this.state = {};
	}

	//保存总的信息
    saveArrList = () =>{
		var data = {};
		data.pdBannerId = this.props.data.pdBannerId;
		data.pdBannerConfig = this.props.configArr;
		if(data.pdBannerConfig.length){
			for(var i=0;i<data.pdBannerConfig.length;i++){
				if(data.pdBannerConfig[i].type=='4'){
				  if(!data.pdBannerConfig[i].text){
					  data.pdBannerConfig[i].text==null
				  }else{
					  data.pdBannerConfig[i].text=data.pdBannerConfig[i].text.replace(/\n/g,"#&#")
				  }
				}
		  	}
		  	const result=GetServerData('qerp.web.pd.banner.config.save',data);
			result.then((res) => {
				return res;
			}).then((json) => {
				if(json.code == '0'){
					message.success('保存成功');
					// if (this.props.bannerEdit) {
					// 	Hinedremove('404000EditH5'+this.props.bannerId)
					// }else{
					// 	Hinedremove('404000NewH5')
					// }
				}
		   })
		}else{
			message.error('请先填写配置信息');
		}
	}

	render(){
		return (
			<div className='content_box h5-wrapper'>
                <div className='white_box h5-container'>
                   <LeftAddType/>
				   <CenterPreview/>
				   <RightConfig/>
				   <div className='submit-buttons'>
                        <button className='submit-cancel'>取消</button>
                        <button className='submit-save' onClick={this.saveArrList}>保存</button>
                   </div>
                </div>
            </div>
		)
	}

	componentDidMount(){
		if(this.props.data){
			if(!this.props.data.addNew){
				let data = {
					'pdBannerId':this.props.data.pdBannerId
				}
				const result=GetServerData('qerp.web.pd.banner.config.info',data);
				result.then((res) => {
					return res;
				}).then((json) => {
					if(json.code == "0"){
						let initdataArr=[];
						let pdBannerConfig=json.pdBannerConfig
						for(var i=0;i<pdBannerConfig.length;i++){
							if(pdBannerConfig[i].type=='4'){
								if(!pdBannerConfig[i].text){
									pdBannerConfig[i].text=pdBannerConfig[i].text
								}else{
									pdBannerConfig[i].text=pdBannerConfig[i].text.replace(/#&#/g,"\n")
								}
							}
						}
						initdataArr = pdBannerConfig;
						this.props.dispatch({
							type:'h5config/syncConfigArr',
							payload:initdataArr
						});
						this.props.dispatch({
							type:'h5config/syncCurrentItem',
							payload:0
						});
					}
				}) 
			}
		}
	}

}

function mapStateToProps(state) {
	const {configArr,currentItem}= state.h5config;
	return {configArr,currentItem};
}

export default connect(mapStateToProps)(H5_configure);