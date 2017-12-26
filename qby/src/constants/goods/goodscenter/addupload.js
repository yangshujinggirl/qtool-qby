import { Table, Input, Icon, Button ,Upload, message} from 'antd';
import React from 'react';
import { connect } from 'dva';

//图片upload
function beforeUpload(file) {
  const isJPG = file.type === 'image/jpeg';
    const isPNG = file.type === 'image/png';
  if (!isJPG && !isPNG) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return (isJPG || isPNG) && isLt2M;
}

class Addavatar extends React.Component {
  state = {};
  handleChange = (info) => {
   if (info.file.status === 'done') {
      const urldata=info.file.response.data;
      this.setState({
        imageUrl:urldata[1]+urldata[0],
        urldatazero:urldata[0]
      },function(){
         const setimgvalur=this.props.setimgvalur
         setimgvalur(urldata[0])
      })
    }
  }


//   SetPicData=()=>{
//     const url=this.props.url
//     if(url!=null){
//         let fileDomain=this.props.fileDomain
//          this.setState({
//           imageUrl:fileDomain+url
//     })
//     }
//   }

  render() {
    const imageUrl = this.state.imageUrl;
    return (
      <Upload
        className="avatar-uploader"
        name="avatar"
        showUploadList={false}
        action="/erpWebRest/qcamp/upload.htm?type=content"
        beforeUpload={beforeUpload}
        onChange={this.handleChange}
        name="imgFile"
      >
        {
          imageUrl ?
            <div className='pinfo_img'><img src={imageUrl} alt="" className="avatar" /></div> :
            <Icon type="plus" className="avatar-uploader-trigger" />
        }
      </Upload>
    );
  }
//   componentDidMount(){
//     this.SetPicData()
//   }
}
function mapStateToProps(state) {
    const {fileList} = state.goods;
    return {fileList};
}

export default connect(mapStateToProps)(Addavatar);
