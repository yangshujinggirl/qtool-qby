import React ,{ Component } from 'react';
import { connect } from 'dva';
import { Upload,Icon, Modal, Button,message} from 'antd';
import "./index.less"


class UpLoadFile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      previewVisible: false,
      previewImage: '',
      fileList:this.props.fileList
    }
  }
  componentWillReceiveProps(props) {
		this.setState({
			fileList: props.fileList,
		})
	}
  beforeUpload(file){
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
  handleCancel = () => this.setState({ previewVisible: false })
  handlePreview = (file) => {
    console.log(file)
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }
	handleChange = ({fileList}) => {
    if(fileList[0].status == "done"){
      this.setState({
        imageUrl:fileList[0].response.data[0]
      },function(){
          this.props.onChange&&this.props.onChange(this.state.imageUrl)
      });
    }
	}
  render() {
   const fileDomain = eval(sessionStorage.getItem("fileDomain"))
   const { previewVisible, previewImage } = this.state;
   const {imageUrl} = this.props;
   return(
      <div className="upload-wrap">
        <Upload
         style={{'width':'100%'}}
         className="avatar-uploader"
         name="imgFile"
         listType="picture-card"
         className="avatar-uploader"
         showUploadList={false}
         action="/erpWebRest/qcamp/upload.htm?type=answerConfig"
         beforeUpload={this.beforeUpload}
         onPreview={this.handlePreview}
         onChange={this.handleChange}>
         {
           imageUrl ? <img src={fileDomain+imageUrl} className='upload-img' alt="avatar" /> : <Icon type="plus" className="avatar-uploader-trigger" />
         }
       </Upload>
       <div className='mask'>
          <img src="../../../../../static/eye.png" className='upload-img'/>
       </div>
     </div>
    )
  }
}


export default UpLoadFile;
