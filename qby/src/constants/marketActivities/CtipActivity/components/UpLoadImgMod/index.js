import React ,{ Component } from 'react';
import { connect } from 'dva';
import { Upload,Icon, Form, Modal, Button, message } from 'antd';
import './index.less';

const FormItem = Form.Item;
class UpLoadImg extends Component {
  static defaultProps={
		imgType: 1,//1-jpg png jpeg gif,//2--png//3--jpg jpeg
    ruleType:1,//1==,2<=,3>=
    imgTypeMap:{
      1:'jpg,png,jpeg',
      2:'png',
      3:'jpg',
    },
    ruleTypeMap:{
      1:'等于',
      3:'大于等于',
      2:'小于等于',
    }
	}
  constructor(props) {
    super(props);
    this.state = {
      loading:false
    }
  }
  checkImg=(file)=> {
    let regExp
    switch(this.props.imgType) {
      case 1:
        regExp = /image\/(jpeg|jpg|png)/ig;
        break;
      case 2:
        regExp = /image\/png/ig;
        break;
      case 3:
        regExp = /image\/(jpeg|jpg)/ig;
        break;
    }
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
    let { ruleType, ruleTypeMap } =this.props;
    let isSize = new Promise((resolve, reject) => {
        let { width, height } =this.props;
        let percent = height/width;
        let _URL = window.URL || window.webkitURL;
        let img = new Image();
        img.onload = function() {
          let valid
          switch(ruleType) {
            case 1:
              valid = img.height/img.width == percent;
              break;
            case 2:
              valid = img.height/img.width == percent||img.height/img.width < percent;
              break;
            case 3:
              valid = img.height/img.width == percent||img.height/img.width > percent;
              break;
          }
          valid ? resolve(true) : reject(`图片高宽比为${ruleTypeMap[ruleType]}${height}:${width}，请修改后重新上传！`);
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
  uploadButton =()=> {
    return <div>
            <Icon type={this.state.loading ? 'loading' : 'plus'} />
            <div className="ant-upload-text">添加图片</div>
          </div>
  };
  render() {
     const { getFieldDecorator } =this.props.form;
     let { fileList,name, formItemLayout, label, rules, width, height, imgTypeMap, ruleTypeMap, imgType, ruleType } = this.props;
     let fileDomain = JSON.parse(sessionStorage.getItem('fileDomain'));
     let fileListArr = (fileList&&fileList!=''&&(typeof fileList == 'string'))?[`${fileList}`]:[];

     return(
       <FormItem label={label} {...formItemLayout} className="ant-form-tips-wrap">
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
              className="avatar-uploader set-upload-wrap"
              showUploadList={false}
              action="/erpWebRest/qcamp/upload.htm?type=spu"
              beforeUpload={this.beforeUpload}>
              {fileListArr&&fileListArr.length>0 ?
                <img src={`${fileDomain}${fileList}`} alt="avatar" />
                :
                this.uploadButton()
              }
            </Upload>
          )}
          <span className="ant-form-text-tips">
            {`${label}需上传高度：宽度为${ruleTypeMap[ruleType]}${height}:${width}的图片，仅支持${imgTypeMap[imgType]}格式`}
          </span>
       </FormItem>
     )
  }
}
export default UpLoadImg;
