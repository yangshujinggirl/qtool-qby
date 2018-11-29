import React ,{ Component } from 'react';
import { connect } from 'dva';
import { Upload,Icon, Modal, Button, message } from 'antd';


class UpLoadFile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      previewVisible: false,
      previewImage: '',
      fileList:this.props.fileList,
    }
  }
  componentDidMount() {
    //新增时，重置数据
    this.props.form.resetFields([`pdSkus[${this.props.index}]`]);
  }
  componentWillReceiveProps(props) {
    this.setState({
      fileList:props.fileList,
    })
  }
  handleCancel = () => this.setState({ previewVisible: false })
  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
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
	handleChange = ({fileList}) => {
    if((fileList[0] && fileList[0].status) || !fileList[0]){ //成功或者为空时
      this.setState({
        fileList
      });
      this.props.dispatch({
        type:'addGoods/setSkusPicUrl',
        payload:{
          index:this.props.index,
          fileList
        }
      });
    };
	}
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
     const { fileList, previewVisible, previewImage } = this.state;

     return(
        <div style={{textAlign:'left'}}>
         {
           this.props.form.getFieldDecorator(`pdSkus[${this.props.index}].picUrl`,{
             getValueFromEvent: this.normFile,
             valuePropName: 'fileList',
             initialValue:fileList,
             onChange:this.handleChange,
           })(
               <Upload
                name="imgFile"
                listType="picture-card"
                className="avatar-uploader"
                action="/erpWebRest/qcamp/upload.htm?type=spu"
                onPreview={this.handlePreview}
                beforeUpload={this.beforeUpload}>
                {
                  fileList.length >0 ? null : uploadButton
                }
              </Upload>

           )
         }
         <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel} wrapClassName='billModal'>
           <img alt="example" style={{ width: '100%' }} src={previewImage} />
         </Modal>
       </div>
      )
    }
}

function mapStateToProps(state) {
  const { addGoods } =state;
  return {addGoods };
}

export default connect(mapStateToProps)(UpLoadFile);
