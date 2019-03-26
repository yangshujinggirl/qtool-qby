import {Component} from 'react'
import { Upload, Icon, message } from 'antd';
class Uploadimg extends Component {
  state = {
    loading: false,
  };

  handleChange = (info) => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      const imageUrl = info.file.response.data[0];
      this.props.changeImg(imageUrl)
       this.setState({
        loading: false,
      });
    }
  }

  render() {
    const fileDomain = eval(sessionStorage.getItem('fileDomain'));
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
      </div>
    );
    const {imageUrl,name,action,beforeUpload} = this.props;
    return (
      <Upload
        name={name}
        listType="picture-card"
        showUploadList={false}
        action={action}
        beforeUpload={beforeUpload}
        onChange={this.handleChange}
      >
        {imageUrl ? <img style={{'width':'102px','height':'102px'}} src={fileDomain+imageUrl} alt="avatar" /> : uploadButton}
      </Upload>
    );
  }
}

export default Uploadimg
