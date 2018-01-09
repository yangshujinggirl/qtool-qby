import { Upload, Icon, Modal } from 'antd';
import { connect } from 'dva';

const fileDomain=eval(sessionStorage.getItem('fileDomain'));
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
class SkuPicturesWall extends React.Component {
  state = {
    previewVisible: false,
    previewImage: '',
    fileList: this.props.url==null?[]:[{
        uid: -1,
        status: 'done',
        url:fileDomain+this.props.url,
      }]
  };

  handleCancel = () => this.setState({ previewVisible: false })

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }

  


  handleChange = ({ fileList }) => {
    this.setState({fileList})
    var s=fileList.every(function(currentValue){
        return  currentValue.status=='done'
    })
    if(s){
        var goodindodatasouce=this.props.goodindodatasouce.slice(0)
        for(var i=0;i<fileList.length;i++){
            goodindodatasouce[this.props.index].picUrl=fileList[i].response.data[0]
        }

        //处理table的数据
        this.props.dispatch({
            type:'goods/goodindodatasouce',
            payload:goodindodatasouce
          })
    }

}
  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div className="clearfix">
        <Upload
          action="/erpWebRest/qcamp/upload.htm?type=content"
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
          name="imgFile"
          beforeUpload={beforeUpload}
          index={this.props.index}
        >
          {fileList.length >= 1 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}

function mapStateToProps(state) {
    const {fileList,goodindodatasouce} = state.goods;
    return {fileList,goodindodatasouce};
}

export default connect(mapStateToProps)(SkuPicturesWall);