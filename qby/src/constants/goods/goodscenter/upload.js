import { connect } from 'dva';
import { Upload, Icon, Modal ,message} from 'antd';


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
// 商品图片上传组件
class PicturesWall extends React.Component {
	state = {
		previewVisible: false,
		previewImage: '',
		fileList: this.props.fileList,
		loading:false

	};
	handleCancel = () => this.setState({ previewVisible: false })
	handlePreview = (file) => {
		this.setState({
			previewImage: file.url || file.thumbUrl,
			previewVisible: true
		});
	}
	

	handleChange = (info) => {
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
				const spuPics=[]
				for(var i=0;i<fileList.length;i++){
					spuPics.push(fileList[i].response.data[0])
				}
				this.props.dispatch({
					type:'goods/uploads',
					payload:spuPics
				  })
			})
		}
		if(info.file.status === 'removed'){
			const fileList=info.fileList
			this.setState({
				fileList:fileList
			},function(){
				const spuPics=[]
				for(var i=0;i<fileList.length;i++){
					spuPics.push(fileList[i].response.data[0])
				}
				this.props.dispatch({
					type:'goods/uploads',
					payload:spuPics
				  })
			})
		}


	}


	setinitfileList=(value)=>{
		this.setState({
			fileList:value
		})
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
				beforeUpload={beforeUpload}
				action="/erpWebRest/qcamp/upload.htm?type=spu"
				listType="picture-card"
				fileList={fileList}
				onPreview={this.handlePreview}
				onChange={this.handleChange}
				// showUploadList={false}
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
	componentDidMount(){
		const methup={}
		methup.setinitfileList=this.setinitfileList
		this.props.dispatch({
			type:'goods/methup',
			payload:methup
		})
	}
	







	}

	function mapStateToProps(state) {
		const {fileList} = state.goods;
		return {fileList};
	}

	export default connect(mapStateToProps)(PicturesWall);





	