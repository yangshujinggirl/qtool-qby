import {Component} from 'react'
import { Upload, Icon, message } from 'antd';
class Uploadimg extends Component {
  state = {
    loading: false,
  };
  beforeUpload =(file)=> {
    const isJPG = file.type === 'image/jpeg'||'image.png';
    if (!isJPG) {
      message.error('仅支持jpg/jpeg/png格式',.8);
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('上传内容大于2M，请选择2M以内的文件',.8);
    }
    return isJPG && isLt2M;
  }
  handleChange = (info) => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      const shareFriendCircleImg = info.file.response.data[0];
      this.props.changeCircleImg(shareFriendCircleImg)
       this.setState({
        loading: false,
      });
    }
  }

  render() {
    const fileDomain = eval(sessionStorage.getItem('fileDomain'));
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} /><br/>
        <p style={{'margin-top':'10px'}}>添加图片</p>
      </div>
    );
    const {shareFriendCircleImg,name,action} = this.props;
    return (
      <Upload
        name={name}
        listType="picture-card"
        showUploadList={false}
        action={action}
        beforeUpload={this.beforeUpload}
        onChange={this.handleChange}
      >
        {shareFriendCircleImg ? <img style={{'width':'102px','height':'102px'}} src={fileDomain+shareFriendCircleImg} alt="avatar" /> : uploadButton}
      </Upload>
    );
  }
}

export default Uploadimg
