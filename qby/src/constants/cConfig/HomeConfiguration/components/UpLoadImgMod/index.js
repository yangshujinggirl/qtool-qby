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
  beforeUpload=(file)=> {
    let regExp = /image\/(jpeg|jpg|gif|png)/ig;
    let isImg = new Promise((resolve, reject) => {
        let valid = regExp.test(file.type);
        valid ? resolve() : reject();
      }).then(() => {
          return file;
      },() => {
          message.error("格式不正确，请修改后重新上传！");
          return Promise.reject();
      });
    let isLt2M = new Promise((resolve, reject) => {
        let valid = file.size / 1024 / 1024 < 2;
        valid ? resolve() : reject();
      }).then(() => {
          return file;
      },() => {
          message.error("图片大小超出限制，请修改后重新上传");
          return Promise.reject();
      });
    let isSize = new Promise((resolve, reject) => {
        let width = this.props.width;
        let height = this.props.height;
        let _URL = window.URL || window.webkitURL;
        let img = new Image();
        img.onload = function() {
          let valid = img.width == width && img.height == height;
          valid ? resolve() : reject();
        };
        img.src = _URL.createObjectURL(file);
      }).then(() => {
          return file;
      },() => {
          message.error(`图片尺寸为${this.props.width}*${this.props.height}px，大小不符合要求，请修改后重新上传！`);
          return Promise.reject();
      });
    return isImg  && isLt2M &&isSize;
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
