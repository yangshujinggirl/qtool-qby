import React ,{ Component } from 'react';
import { connect } from 'dva';
import { Form, Upload,Icon, Modal, Button } from 'antd';

const FormItem = Form.Item;
const formItemLayout = {
      labelCol: {
        span: 5
      },
      wrapperCol: {
        span: 12
      },
  };

class UpLoadFile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileList:this.props.countryManage.fileList,
    }
  }
  componentWillReceiveProps(props) {
    this.setState({
      fileList:props.countryManage.fileList,
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
      type:'countryManage/setFileList',
      payload:fileList
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
       <FormItem label="国家名称" {...formItemLayout}>
         {
           this.props.form.getFieldDecorator('url',{
             rules:[{required:true,message:'请上传图片'}],
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
       </FormItem>
      )
    }
}

function mapStateToProps(state) {
  const { countryManage } =state;
  return {countryManage };
}

export default connect(mapStateToProps)(UpLoadFile);
