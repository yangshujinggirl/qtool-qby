import React ,{ Component } from 'react';
import { connect } from 'dva';
import { Upload,Icon, Modal, Button, message } from 'antd';


class UpLoadFile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      previewVisible: false,
      previewImage: '',
    }
  }
  //filelist 限制大小用normalFile
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
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }
  normFile = (e) => {
    const isJPG = e.file.type === 'image/jpeg';
  	const isPNG = e.file.type === 'image/png';
    const isLt2M = e.file.size / 1024 / 1024 < 2;
  	if (!isJPG && !isPNG) {
    	message.error('仅支持jpg/jpeg/png格式',.8);
      return e.fileList.filter((fileItem)=> e.file.uid !== fileItem.uid);
    }else if (!isLt2M) {
    	message.error('上传内容大于2M，请选择2M以内的文件',.8);
      return e.fileList.filter((fileItem)=> e.file.uid !== fileItem.uid);
    }else {
      if (Array.isArray(e)) {
        return e;
      }
      return e && e.fileList;
    }
  }
  onChange =(info)=>{
    if(info.file.status == 'done') {
      this.props.onChange&&this.props.onChange(info.fileList)
    }
  }
  render() {
    const uploadButton = (
       <div>
         <Icon type='plus' />
         <div className="ant-upload-text">添加图片</div>
       </div>
     );
     const { previewVisible, previewImage } = this.state;
     const { name, fileList } = this.props;
     return(
        <div id='drag-upload'>
         {
           this.props.form.getFieldDecorator(this.props.name,{
             getValueFromEvent: this.normFile,
             valuePropName: 'fileList',
             initialValue:fileList,
             onChange:this.onChange
           })(
               <Upload
                name="imgFile"
                listType="picture-card"
                className="avatar-uploader"
                action="/erpWebRest/qcamp/upload.htm?type=spu"
                onPreview={this.handlePreview}>
                {
                  fileList.length >= 1000 ? null : uploadButton
                }
              </Upload>
           )
         }
         <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
            <img alt="example" style={{ width: '100%' }} src={previewImage} />
          </Modal>
       </div>
      )
    }
}


export default UpLoadFile;
