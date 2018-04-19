import { Upload, Icon, Modal ,message} from 'antd';
import { connect } from 'dva';

const fileDomain=eval(sessionStorage.getItem('fileDomain'));
function beforeUpload(file){
	const isJPG = file.type === 'image/jpeg';
	const isPNG = file.type === 'image/png';
	if (!isJPG && !isPNG) {
	message.error('仅支持jpg/jpeg/png格式',.8);
}
const isLt2M = file.size / 1024 / 1024 < 2;
if (!isLt2M) {
	message.error('图片文件需小于2MB',.8);
}

return (isJPG || isPNG) && isLt2M;
}
class SkuPicturesWall extends React.Component {
state = {
	previewVisible: false,
	previewImage: '',
	fileList: this.props.url==null?[]:[{
		uid: -1,
		status: 'done',
		url:eval(sessionStorage.getItem('fileDomain'))+this.props.url,
	}]
};

handleCancel = () => this.setState({ previewVisible: false })

handlePreview = (file) => {
	this.setState({
	previewImage: file.url || file.thumbUrl,
	previewVisible: true,
	});
}




// handleChange = ({ fileList }) => {
// 	this.setState({fileList})
// 	var s=fileList.every(function(currentValue){
// 		return  currentValue.status=='done'
// 	})
// 	if(s){
// 		var goodindodatasouce=this.props.goodindodatasouce.slice(0)
// 		for(var i=0;i<fileList.length;i++){
// 			goodindodatasouce[this.props.index].picUrl=fileList[i].response.data[0]
// 		}

// 		//处理table的数据
// 		this.props.dispatch({
// 			type:'goods/goodindodatasouce',
// 			payload:goodindodatasouce
// 		})
// 	}

// }


handleChange = (info) => {
	console.log(info)
	if(info.file.status === 'uploading'){
		const fileList=info.fileList
		this.setState({
			fileList:fileList
		})
	}
	if(info.file.status === 'done'){
		const fileList=info.fileList
		this.setState({
			fileList:fileList
		},function(){
			const fileList=this.state.fileList
			var goodindodatasouce=this.props.goodindodatasouce.slice(0)
			for(var i=0;i<fileList.length;i++){
				goodindodatasouce[this.props.index].picUrl=fileList[i].response.data[0]
			}
			//处理table的数据
			this.props.dispatch({
				type:'onlinegood/goodindodatasouce',
				payload:goodindodatasouce
			})
		})
	}
	if(info.file.status === 'removed'){
		console.log(23)
		const fileList=info.fileList
		this.setState({
			fileList:fileList
		},function(){
			const fileList=this.state.fileList
			console.log(fileList.length)
			var goodindodatasouce=this.props.goodindodatasouce.slice(0)
			if(fileList.length>0){
				for(var i=0;i<fileList.length;i++){
					goodindodatasouce[this.props.index].picUrl=fileList[i].response.data[0]
				}
			}else{
				goodindodatasouce[this.props.index].picUrl=null
			}



			console.log(goodindodatasouce)
			//处理table的数据
			this.props.dispatch({
				type:'onlinegood/goodindodatasouce',
				payload:goodindodatasouce
			})
		})
	}



}



render() {
	const { previewVisible, previewImage, fileList } = this.state;
	const uploadButton = (
	<div>
		<Icon type="plus" />
		<div className="ant-upload-text">添加图片</div>
	</div>
	);
	return (
	<div className="clearfix">
		<Upload
		action="/erpWebRest/qcamp/upload.htm?type=content"
		listType="picture-card"
		fileList={fileList}
		onPreview={this.handlePreview}
		onChange={this.handleChange}
		name="imgFile"
		beforeUpload={beforeUpload}
		index={this.props.index}
		>
		{fileList.length >= 1 ? null : uploadButton}
		</Upload>
		<Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
		<img alt="example" style={{ width: '100%' }} src={previewImage} />
		</Modal>
	</div>
	);
}
}

function mapStateToProps(state) {
	const {fileList,goodindodatasouce} = state.onlinegood;
	return {fileList,goodindodatasouce};
}

export default connect(mapStateToProps)(SkuPicturesWall);