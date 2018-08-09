import React ,{ Component } from 'react';
import { connect } from 'dva';
import { Upload,Icon, Modal, Button } from 'antd';


class UpLoadFile extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
  beforeUpload(file){
  	const isJPG = file.type === 'image/jpeg';
  	const isPNG = file.type === 'image/png';
  	if (!isJPG && !isPNG) {
    	message.error('仅支持jpg/jpeg/png格式',.8);
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
    	message.error('图片文件需小于2MB',.8);
    }

    return (isJPG || isPNG) && isLt2M;
  }
	handleChange = ({fileList}) => {
    this.setState({
      fileList
    })
    this.props.dispatch({
      type:'addGoods/setSkusPicUrl',
      payload:{
        index:this.props.index,
        fileList
      }
    })
	}
  normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
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
                beforeUpload={this.beforeUpload}>
                {
                  fileList.length >0 ? null : uploadButton
                }
              </Upload>
           )
         }
       </div>
      )
    }
}

function mapStateToProps(state) {
  const { addGoods } =state;
  return {addGoods };
}

export default connect(mapStateToProps)(UpLoadFile);
