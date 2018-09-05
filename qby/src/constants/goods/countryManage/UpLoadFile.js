import React ,{ Component } from 'react';
import { connect } from 'dva';
import { Form, Upload,Icon, Modal, Button, message } from 'antd';

class UpLoadFile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageUrl:this.props.countryManage.countryDetail.imageUrl
    }
  }
  componentWillReceiveProps(props) {
    this.setState({
      imageUrl:props.countryManage.countryDetail.imageUrl
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
    	message.error('图片文件需小于2MB',.8);
    }
    return (isJPG || isPNG) && isLt2M;
  }
  handleChange = (info) => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      let imageUrl = info.file.response.data[0];
      this.setState({
        loading: false,
      })
      let { countryDetail } = this.props.countryManage;
      countryDetail.imageUrl = imageUrl;
      this.props.dispatch({
        type:'countryManage/setDetail',
        payload:countryDetail
      })
      this.props.validateLogo(imageUrl)
    }
  }
  render() {
    const uploadButton = (
          <div>
           <Icon type={this.state.loading ? 'loading' : 'plus'} />
           <div className="ant-upload-text">上传Logo</div>
         </div>
     );
     let { imageUrl } = this.state;
     const { fileDomain } =this.props.countryManage;
     return(
         <Upload
           name="imgFile"
           listType="picture-card"
           className="avatar-image-uploader"
           showUploadList={false}
           action="/erpWebRest/qcamp/upload.htm?type=spu"
           beforeUpload={this.beforeUpload}
           onChange={this.handleChange}>
           {imageUrl ? <img src={`${fileDomain}${imageUrl}`} alt="avatar" className="img-size"/> : uploadButton}
         </Upload>
      )
    }
}

function mapStateToProps(state) {
  const { countryManage } =state;
  return {countryManage };
}

export default connect(mapStateToProps)(UpLoadFile);
