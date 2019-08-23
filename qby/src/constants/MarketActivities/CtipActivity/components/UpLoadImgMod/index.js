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
  checkImg=(file)=> {
    let regExp = /image\/(jpeg|jpg|gif|png)/ig;
    let isImg = new Promise((resolve, reject) => {
        let valid = regExp.test(file.type);
        valid ? resolve(true) : reject('格式不正确，请修改后重新上传！');
      })
      return isImg;
  }
  checkLt=(file)=> {
    let isLt2M = new Promise((resolve, reject) => {
        let valid = file.size / 1024 / 1024 < 2;
        valid ? resolve(true) : reject('图片大小超出限制，请修改后重新上传');
      })
      return isLt2M;
  }
  checkSize=(file)=> {
    let isSize = new Promise((resolve, reject) => {
        let percent = this.props.percent;
        let _URL = window.URL || window.webkitURL;
        let img = new Image();
        img.onload = function() {
          let valid = img.width/img.height == percent;
          valid ? resolve(true) : reject(`图片尺寸为${width}*${height}px，大小不符合要求，请修改后重新上传！`);
        };
        img.src = _URL.createObjectURL(file);
      })
      return isSize;
  }
  beforeUpload=(file)=> {
    return Promise.all([this.checkImg(file),this.checkLt(file),this.checkSize(file)])
    .then((res)=> {
      Promise.resolve(true)
    }).catch((err) => {
      message.error(err);
      return Promise.reject(false)
    })
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
     let { fileList,name, formItemLayout, label, rules } = this.props;
     let fileDomain = JSON.parse(sessionStorage.getItem('fileDomain'));
     let fileListArr = (fileList&&fileList!=''&&(typeof fileList == 'string'))?[`${fileList}`]:[];

     return(
       <div>
         <FormItem label={label} {...formItemLayout}>
           {getFieldDecorator(name,{
              initialValue:fileListArr,
              valuePropName: 'file',
              getValueFromEvent: this.normFile,
              rules:rules?rules:[],
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
       </div>
      )
  }
}
export default UpLoadImg;
