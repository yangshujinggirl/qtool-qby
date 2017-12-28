import { Form, Select, Input, Button,Upload, Icon, message } from 'antd';
import {deepcCloneObj} from '../../../../utils/commonFc';
import { connect } from 'dva';
class AvatarImg extends React.Component {
    state = {};
  
    handleChange = (info) => {
        if (info.file.status === 'done') {
            if(info.file.response.code==0){
                const urldata=info.file.response.data;
                let tempFormValue = deepcCloneObj(this.props.formValue);
                tempFormValue.url = urldata[0];
                // this.props.dispatch({
                //     type:'operatebanner/syncEditInfo',
                //     payload:tempFormValue
                // })
            }
        }
    }

    beforeUpload = (file) =>{
	    const isJPG = file.type === 'image/jpeg';
	    const isPNG = file.type === 'image/png';
        if (!isJPG && !isPNG) {
            message.error('仅支持jpg/jpeg/png格式');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('图片文件需小于2MB');
        }
	    return (isJPG || isPNG) && isLt2M;
    }
  
    render() {
        const fileDomain=eval(sessionStorage.getItem('fileDomain'));
        return (
            <Upload
                className="h5-avatar-uploader"
                name="imgFile"
                showUploadList={false}
                action="/erpWebRest/qcamp/upload.htm?type=bannerConfig"
                beforeUpload={this.beforeUpload}
                onChange={this.handleChange}
            >
            {
                // imageUrl==null || imageUrl=='' || imageUrl==undefined ?
                <Icon type="plus" className="h5-avatar-uploader-trigger" />
                // :
                // <div className='upload-img-wrapper'>
                // <div className='upload-img-shadow'>
                //     <div>重新上传</div>
                // </div>
                // <img src={imageUrl} alt="" className="h5-avatar" /> 
                // </div>
            }
            </Upload>
        );
    }
}

function mapStateToProps(state) {
   return {};
}

export default connect(mapStateToProps)(AvatarImg);
  