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
    	message.error('上传内容大于2M，请选择2M以内的文件',.8);
    }

    return (isJPG || isPNG) && isLt2M;
  }
	handleChange = ({fileList}) => {
    this.setState({
      fileList
    })
	}
  //格式化数据
  normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    let formFile = e && e.fileList.map((el)=> {
      if(el.status == 'done') {
        if(el.response) {
          return el.response.data[0]
        } else {
          return el.name
        }
      }
    })
    return formFile;
  }
  render() {
    const uploadButton = (
       <div>
         <Icon type='plus' />
         <div className="ant-upload-text">添加图片</div>
       </div>
     );
   const { fileList } = this.state;
   return(
      <div>
       {
         this.props.getFieldDecorator('spuPics',{
           getValueFromEvent: this.normFile,
           initialValue:fileList
         })(
             <Upload
              name="imgFile"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={true}
              fileList={fileList}
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
     </div>
    )
  }
}


export default connect()(UpLoadFile);
