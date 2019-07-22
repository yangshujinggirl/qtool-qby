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
    let regExp = /image\/[jpeg|jpg|gif]/ig;
    let isImg = regExp.test(file.type);
    if (!isImg) {
      message.error('请上传格式为jpg、png、gif的图片');
      return false;
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('图片大小超出限制，请修改后重新上传!');
      return false;
    }
    const isSize = this.checkSize(file)
    return isImg  && isLt2M &&isSize;
  }
  //检测尺寸
  checkSize=(file)=>{
    return new Promise((resolve, reject) => {
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
        message.error("图片尺寸不符合要求，请修改后重新上传！");
        return Promise.reject();
    });
  };
  handleChange = info => {
    this.setState({
      loading: true,
    })
    debugger
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
