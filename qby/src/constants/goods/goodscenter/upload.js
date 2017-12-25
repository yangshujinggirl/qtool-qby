import { connect } from 'dva';
import { Upload, Icon, Modal } from 'antd';

// 商品图片上传组件
class PicturesWall extends React.Component {
	state = {
		previewVisible: false,
		previewImage: '',
		fileList: this.props.fileList
	};
	handleCancel = () => this.setState({ previewVisible: false })
	handlePreview = (file) => {
		this.setState({
			previewImage: file.url || file.thumbUrl,
			previewVisible: true
		});
	}
	handleChange = ({ fileList }) => {
		console.log(fileList)
		this.setState({fileList})
		var s=fileList.every(function(currentValue){
			return  currentValue.status=='done'
		})
		if(s){
			const spuPics=[]
			for(var i=0;i<fileList.length;i++){
				spuPics.push(fileList[i].response.data[0])
			}
			this.props.dispatch({
				type:'goods/uploads',
				payload:spuPics
		  	})
		}



		
	}
	beforeUpload=(file)=>{
	const isJPG = file.type === 'image/jpeg';
	const isPNG = file.type === 'image/png';
	if (!isJPG && !isPNG) {
	message.error('仅支持jpg/jpeg/png格式');
	}
	const isLt2M = file.size / 1024 / 1024 < 2;
	if (!isLt2M) {
	message.error('图片文件需小于2MB');
	}
	return (isJPG || isPNG) && isLt2M;
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
			 beforeUpload={this.beforeUpload}
			action="/erpWebRest/qcamp/upload.htm?type=spu"
			listType="picture-card"
			fileList={fileList}
			onPreview={this.handlePreview}
			onChange={this.handleChange}
			name="imgFile"
		>
		{fileList.length >= 1000 ? null : uploadButton}
		</Upload>
		<Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
			<img alt="example" style={{ width: '100%' }} src={previewImage} />
		</Modal>
	</div>
		)



	}

	







	}

	function mapStateToProps(state) {
		const {fileList} = state.goods;
		return {fileList};
	}

	export default connect(mapStateToProps)(PicturesWall);