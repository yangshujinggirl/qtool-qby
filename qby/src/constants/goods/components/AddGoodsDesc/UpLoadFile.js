import React ,{ Component } from 'react';
import { connect } from 'dva';
import { Upload,Icon, Modal, Button } from 'antd';


class UpLoadFile extends Component {
  constructor(props) {
    super(props);
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

	handleChange = ({file}) => {
    if(file.status=='done'){
      if(file.response.code == '0'){
        this.props.changeImg(file.response.data[0]);
      };
    }
	}

  render() {
   const { imgUrl } = this.props;
   const fileDomain = eval(sessionStorage.getItem('fileDomain'));
   const uploadButton = (
     <div>
       <Icon type='plus'/>
     </div>
   );
   return(
      <div style={{'display':'inline-block'}}>
       {
         <Upload
          name="imgFile"
          listType="picture-card"
          showUploadList={false}
          action="/erpWebRest/qcamp/upload.htm?type=spuDetail"
          beforeUpload={this.beforeUpload}
          onChange={this.handleChange}>
          {imgUrl ? <img style={{'width':'102px','height':'102px'}} src={fileDomain+imgUrl} alt="avatar" /> : uploadButton}
        </Upload>
       }
     </div>
    )
  }
}


export default UpLoadFile;
