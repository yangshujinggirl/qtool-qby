import React ,{ Component } from 'react';
import { connect } from 'dva';
import { Upload,Icon, Form, Modal, Button, message } from 'antd';
import './index.less';

const FormItem = Form.Item;
class UpLoadImg extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading:false
    }
  }
  beforeUpload(file) {
    // const isJPG = file.type === 'image/jpeg';
    // if (!isJPG) {
    //   message.error('You can only upload JPG file!');
    // }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isLt2M;
  }
  handleChange = info => {
    this.setState({
      loading: true,
    })
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      const { response } =info.file;
      if(response.code == 0) {
        this.setState({
          loading: false,
        })
        // this.props.onChange(`${response.data[0]}`)
      }
    }
  };
  normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    };
    if((e.fileList[0] && e.fileList[0].status) || !e.fileList[0]){
      return e && e.file;
    };
  }
  uploadButton = (
     <div>
       <Icon type='plus' />
       <div className="ant-upload-text">添加图片</div>
     </div>
   );
  render() {
     const { getFieldDecorator } =this.props.form;
     let { fileList,index } = this.props;
     let fileDomain = JSON.parse(sessionStorage.getItem('fileDomain'));
     let fileListArr = (fileList&&fileList!='')?[`${fileList}`]:[];
     return(
       <FormItem className="banner-upload-wrap">
         {getFieldDecorator(`goods[${index}].picUrl`,{
            initialValue:fileListArr,
            valuePropName: 'file',
            getValueFromEvent: this.normFile,
            rules:[{required:true,message:'请上传图片'}],
            onChange:this.handleChange
           })(
             <Upload
              name="imgFile"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              action="/erpWebRest/qcamp/upload.htm?type=spu"
              beforeUpload={this.beforeUpload}>
              {fileListArr&&fileListArr.length>0 ? <img src={`${fileDomain}${fileList}`} alt="avatar" /> : this.uploadButton}
            </Upload>
          )}
       </FormItem>
      )
  }
}
export default UpLoadImg;
