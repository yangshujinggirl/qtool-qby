import React ,{ Component } from 'react';
import { connect } from 'dva';
import { Upload,Icon, Modal, Button } from 'antd';


class UpLoadFile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileList:this.props.fileList
    }
  }

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
	handleChange = ({fileList}) => {
    this.setState({
      fileList
    })
	}
  normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  }
  render() {
   const { fileList } = this.state;
   return(
      <div style={{'display':'inline-block'}}>
       {
         this.props.form.getFieldDecorator(`pdSpuInfo[${this.props.index}].content`,{
           getValueFromEvent: this.normFile,
           initialValue:fileList,
           valuePropName:'fileList',
         })(
             <Upload
              className="avatar-uploader"
              name="imgFile"
              listType="picture-card"
              className="avatar-uploader"
              action="/erpWebRest/qcamp/upload.htm?type=spu"
              beforeUpload={this.beforeUpload}
              onChange={this.handleChange}>
              {
                fileList.length >0 ? null : <Icon type="plus" className="avatar-uploader-trigger" />
              }
            </Upload>
         )
       }
     </div>
    )
  }
}


export default UpLoadFile;
