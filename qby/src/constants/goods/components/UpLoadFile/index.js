import React ,{ Component } from 'react';
import { connect } from 'dva';
import { Upload,Icon, Modal, Button } from 'antd';


class UpLoadFile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileList:this.props.fileList,
      previewVisible: false,
      previewImage: '',
    }
  }
  componentWillReceiveProps(props) {
    this.setState({
      fileList:props.fileList,
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
	handleChange = ({fileList}) => {
    this.setState({
      fileList:[...fileList]
    })
	}
  handleCancel = () => this.setState({ previewVisible: false })
  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
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
         <Icon type='plus' />
         <div className="ant-upload-text">添加图片</div>
       </div>
     );
     const { previewVisible, previewImage, fileList } = this.state;
     return(
        <div>
         {
           this.props.form.getFieldDecorator('spuPics',{
             getValueFromEvent: this.normFile,
             valuePropName: 'fileList',
             initialValue:fileList
           })(
               <Upload
                name="imgFile"
                listType="picture-card"
                className="avatar-uploader"
                action="/erpWebRest/qcamp/upload.htm?type=spu"
                beforeUpload={this.beforeUpload}
                onPreview={this.handlePreview}
                onChange={this.handleChange}>
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
