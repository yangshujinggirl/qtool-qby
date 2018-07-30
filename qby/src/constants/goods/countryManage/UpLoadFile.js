import React ,{ Component } from 'react';
import { connect } from 'dva';
import { Upload,Icon, Modal, Button } from 'antd';


class UpLoadFile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading:false,
      imageUrl:this.props.countryManage.imgUrl,
    }
  }
  componentWillReceiveProps(props) {
    this.setState({
      imageUrl:props.countryManage.imgUrl,
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
      this.setState({
        imageUrl:info.file.response.data[0],
        loading:false
      })
      this.props.dispatch({
        type:'countryManage/setImg',
        payload:info.file.response.data[0]
      })
    }
	}
  normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  }
  render() {
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
     let { imageUrl } = this.state;
     const { fileDomain } =this.props.countryManage;
     return(
         <Upload
          name="imgFile"
          showUploadList={false}
          listType="picture-card"
          className="avatar-uploader"
          action="/erpWebRest/qcamp/upload.htm?type=spu"
          onChange={this.handleChange}
          beforeUpload={this.beforeUpload}>
          {
            imageUrl?
            <img src={`${fileDomain}${imageUrl}`} alt="avatar" style={{'width':'100px','height':'100px'}}/>
            :
            uploadButton
          }
        </Upload>
      )
    }
}

function mapStateToProps(state) {
  const { countryManage } =state;
  return {countryManage };
}

export default connect(mapStateToProps)(UpLoadFile);
