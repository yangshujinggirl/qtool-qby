import { Table, Input, Icon, Button ,Upload, message} from 'antd';
import React from 'react';
import { connect } from 'dva';

//图片upload
function beforeUpload(file){
	const isJPG = file.type === 'image/jpeg';
	const isPNG = file.type === 'image/png';
	if (!isJPG && !isPNG) {
	message.error('仅支持jpg/jpeg/png格式',.8);
}
const isLt2M = file.size / 1024 / 1024 < 2;
if (!isLt2M) {
	message.error('上传内容大于2M，请选择2M以内的文件',.8);
}

return (isJPG || isPNG) && isLt2M;
}

class Addavatar extends React.Component {
state = {
	imageUrl:this.props.imageUrl?this.props.imageUrl:null
};
handleChange = (info) => {
if (info.file.status === 'done') {
	const urldata=info.file.response.data;
	this.setState({
		imageUrl:urldata[0],
	},function(){
			//更新到对应数组中
			const pdSpuInfo=this.props.pdSpuInfo.slice(0)
			pdSpuInfo[this.props.index].content=this.state.imageUrl
			this.props.dispatch({
				type:'goods/pdSpuInfo',
				payload:pdSpuInfo
			})
		})
	}
}

render() {
	const imageUrl = this.state.imageUrl;
	const fileDomain=eval(sessionStorage.getItem('fileDomain'));
	return (
	<Upload
		className="avatar-uploader"
		name="avatar"
		showUploadList={false}
		action="/erpWebRest/qcamp/upload.htm?type=content"
		beforeUpload={beforeUpload}
		onChange={this.handleChange}
		name="imgFile"
	>
		{
		imageUrl ?
			<div style={{width:'100px',height:'100px'}}>
				<img src={fileDomain+imageUrl} alt="" className='w100 h100'/>
			</div> 
			:
			<Icon type="plus" className="avatar-uploader-trigger" />
		}
	</Upload>
	);
}

	componentWillReceiveProps(nextProps){
		this.setState({
			imageUrl:nextProps.imageUrl
		})
	}
}


function mapStateToProps(state) {
	const {pdSpuInfo} = state.goods;
	return {pdSpuInfo};
}

export default connect(mapStateToProps)(Addavatar);
