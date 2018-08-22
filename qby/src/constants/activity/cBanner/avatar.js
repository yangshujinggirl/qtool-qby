import { Form, Select, Input, Button,Upload, Icon, message } from 'antd';
import {deepcCloneObj} from '../../../utils/commonFc';
import { connect } from 'dva';
class Avatar extends React.Component {
    state = {};

    handleChange = (info) => {
        if (info.file.status === 'done') {
            if(info.file.response.code==0){
                const urldata=info.file.response.data;
                let tempFormValue = deepcCloneObj(this.props.formValue);
                tempFormValue.url = urldata[0];
                this.props.dispatch({
                    type:'cBanner/syncEditInfo',
                    payload:tempFormValue
                })
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
                className="avatar-uploader"
                name="imgFile"
                showUploadList={false}
                action="/erpWebRest/qcamp/upload.htm?type=banner"
                beforeUpload={this.beforeUpload}
                onChange={this.handleChange}
            >
            {
                this.props.formValue.url
                ?<div className='upimg_box'><img src={fileDomain+this.props.formValue.url} alt="" className="avatar" /></div>
                :<div className='upimg_box_out'><Icon type="plus" className="avatar-uploader-trigger" /></div>
            }
            </Upload>
        );
    }
}

function mapStateToProps(state) {
    const {formValue} = state.cBanner;
    return {formValue};
}

export default connect(mapStateToProps)(Avatar);
