import React ,{ Component } from 'react';
import { connect } from 'dva';
import { Upload, Icon, Modal, Form, message } from 'antd';

class UploadImg extends Component{
  constructor(props){
    super(props);
    this.state = {
      previewVisible: false,
      previewImage: '',
      maxLength:this.props.maxLength
    }
  }
  //上传大小限制
  beforeUpload = (file) =>{
    const isJPG = file.type === 'image/jpeg';
    const isPNG = file.type === 'image/png';
      if (!isJPG && !isPNG) {
          message.error('仅支持jpg/jpeg/png格式',.8);
      };
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
          message.error('上传内容大于2M，请选择2M以内的文件',.8);
      };
    return (isJPG || isPNG) && isLt2M;
  }

  //弹出框关闭
  handleCancel = () => this.setState({ previewVisible: false })
  //图片预览大图
  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }
  //点击变化时候的回调
  handleChange = ({ fileList }) => {
    if( !fileList[0] || (fileList[0] && fileList[0].status) ){
      this.setState({ fileList })
      this.props.changeImg(fileList)
    }
  }
  render(){
    const { previewVisible, previewImage } = this.state;
    const fileList = this.props.fileList;
    const uploadButton = (
        <div>
          <Icon type="plus" />
          <div className="ant-upload-text">上传图片</div>
        </div>
    );
    return (
      <div className="clearfix">
        <Upload
           name = { this.props.name}
           action = {this.props.action}
           listType = "picture-card"
           fileList = {fileList}
           showUploadList = {true}
           onPreview = {this.handlePreview}
           onChange = { this.handleChange}
           beforeUpload={this.beforeUpload}
         >
           {fileList.length >= this.state.maxLength ? null : uploadButton}
         </Upload>
         <Modal
           visible={ previewVisible }
           footer={ null }
           onCancel={ this.handleCancel }
         >
           <img alt="example" style={{ width: '100%' }} src={previewImage} />
         </Modal>
     </div>
    )
  }
}

export default UploadImg
