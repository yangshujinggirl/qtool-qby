import { Form, Select, Input, Button,Upload, Icon, message } from 'antd';
import React from 'react';

class H5_configure extends React.Component{
	constructor(props) {
	    super(props);
	    this.state = {}
	}

	render(){
		return (
			<div className='content_box h5-wrapper'>
                <div className='white_box h5-container'>
                   
                   sdsdsdsdsd
                   
                </div>
            </div>
			)
	}

  componentDidMount(){
    // if(this.props.bannerEdit){
    //     let data = {
    //         'pdBannerId':this.props.bannerId
    //     }
    //     const result=GetServerData('qerp.web.pd.banner.config.info',JSON.stringify(data));
    //      result.then((res) => {
    //          return res;
    //      }).then((json) => {
    //         console.log(json)
    //         if(json.code == "0"){
    //             const initdataArr=[]
    //             for(var i=0;i<json.pdBannerConfig.length;i++){
    //                 json.pdBannerConfig[i].id='init'+i
    //             }
    //             for(var i=0;i<json.pdBannerConfig.length;i++){
    //                 initdataArr.push(this.deepClone(json.pdBannerConfig[i]))
    //                 sessionStorage.setItem("initdataArr", JSON.stringify(initdataArr));
    //             }
    //             console.log(initdataArr)
    //             const pdBannerConfig=json.pdBannerConfig
    //             for(var i=0;i<pdBannerConfig.length;i++){
    //                 if(pdBannerConfig[i].type=='4'){
    //                     console.log(pdBannerConfig[i].text)
    //                     if(pdBannerConfig[i].text==null || undefined || ''){
    //                         pdBannerConfig[i].text=pdBannerConfig[i].text
    //                     }else{
    //                         pdBannerConfig[i].text=pdBannerConfig[i].text.replace(/#&#/g,"\n")
    //                     }
                        
    //                 }
    //             }



    //             this.setState({
    //                 dataArr:pdBannerConfig,
    //                 fileDomain:json.fileDomain,
    //                 initdataArr:initdataArr
    //               })
    //         }else{
    //             message.error(json.message);
    //         }
             
    //      }) 
    // }
  }

}

export default H5_configure;