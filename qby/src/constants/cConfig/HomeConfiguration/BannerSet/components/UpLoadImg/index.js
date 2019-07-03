import React ,{ Component } from 'react';
import { connect } from 'dva';
import { Upload,Icon, Modal, Button, message } from 'antd';


class UpLoadImg extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileList:this.props.fileList,
    }
  }
  componentWillReceiveProps(props) {
    this.setState({
      fileList:props.fileList,
    })
  }
  beforeUpload(file){
    let isJPG = true;
    let isPNG = true;
    let isLt2M = true;
    if(file.type){ //一进页面就删除的时候type不存在
       isJPG = file.type === 'image/jpeg';
    	 isPNG = file.type === 'image/png';
       isLt2M = file.size / 1024 / 1024 < 2;
    };
  	if (!isJPG && !isPNG) {
    	message.error('仅支持jpg/jpeg/png格式',.8);
    }else if (!isLt2M) {
    	message.error('上传内容大于2M，请选择2M以内的文件',.8);
    }
    return (isJPG || isPNG) && isLt2M;
  }
  handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      console.log(info)
      // Get this url from response in real world.
      // this.setState({
      //   imageUrl,
      //   loading: false,
      // }),
    }
  };
  normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    };
    if((e.fileList[0] && e.fileList[0].status) || !e.fileList[0]){
      return e && e.fileList;
    };
  }
  render() {
    const uploadButton = (
       <div>
         <Icon type='plus' />
         <div className="ant-upload-text">添加图片</div>
       </div>
     );
     let { fileList } = this.state;
     return(
        <div style={{textAlign:'left'}}>
         {
           this.props.form.getFieldDecorator(`goods[${this.props.index}].picUrl`,{
             onChange:this.handleChange,
             valuePropName: 'fileList',
             getValueFromEvent: this.normFile,
             initialValue:fileList
           })(
              <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action="/erpWebRest/qcamp/upload.htm?type=spu"
                beforeUpload={this.beforeUpload}>
                {fileList.length>0 ? <img src={fileList[0]} alt="avatar" /> : uploadButton}
              </Upload>
           )
         }
       </div>
      )
    }
}

// function mapStateToProps(state) {
//   const { addGoods } =state;
//   return {addGoods };
// }

export default UpLoadImg;
// export default connect(mapStateToProps)(UpLoadFile);
