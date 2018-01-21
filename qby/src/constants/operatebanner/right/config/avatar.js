import { Form, Select, Input, Button,Upload, Icon, message } from 'antd';
import {deepcCloneObj} from '../../../../utils/commonFc';
import { connect } from 'dva';
class AvatarImg extends React.Component {
    state = {};
  
    handleChange = (info) => {
        if (info.file.status === 'done') {
            if(info.file.response.code==0){
                const urldata=info.file.response.data;
                let tempConfigArr = deepcCloneObj(this.props.configArrPre);
                tempConfigArr[this.props.currentItem].text = urldata[0];
                this.props.dispatch({
                    type:'h5config/syncConfigArrPre',
                    payload:tempConfigArr
                });
            }
        }
    }

    beforeUpload = (file) =>{
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
                !this.props.data?
                <Icon type="plus" className="h5-avatar-uploader-trigger" />
                :
                <div className='upload-img-wrapper'>
                    <div className='upload-img-shadow'>
                        <div>重新上传</div>
                    </div>
                    <img src={fileDomain+this.props.data} alt="" className="h5-avatar"/> 
                </div>
            }
            </Upload>
        );
    }
}

function mapStateToProps(state) {
	const {configArr,configArrPre,currentItem}= state.h5config;
	return {configArr,configArrPre,currentItem};
}

export default connect(mapStateToProps)(AvatarImg);
  