import {Component} from 'react'
import { Upload, Icon, message } from 'antd';
class Uploadimg extends Component {
  state = {
    loading: false,
  };
  beforeUpload =(file)=> {
    const isJPG = file.type === 'image/jpeg'||'image.png';
    if (!isJPG) {
      message.error('You can only upload JPG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJPG && isLt2M;
  }
  handleChange = (info) => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      const imageUrl = info.file.response.data[0];
      console.log(imageUrl)
      this.props.changeImg(imageUrl)
       this.setState({
        loading: false,
      });
    }
  }

  render() {
    const fileDomain = eval(sessionStorage.getItem('fileDomain'));
    console.log(fileDomain)
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const {imageUrl,name,action} = this.props;
    console.log(imageUrl)
    return (
      <Upload
        name={name}
        listType="picture-card"
        showUploadList={false}
        action={action}
        beforeUpload={this.beforeUpload}
        onChange={this.handleChange}
      >
        {imageUrl ? <img style={{'width':'102px','height':'102px'}} src={fileDomain+imageUrl} alt="avatar" /> : uploadButton}
      </Upload>
    );
  }
}

export default Uploadimg
