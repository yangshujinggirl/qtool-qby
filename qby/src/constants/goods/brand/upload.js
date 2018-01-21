import { Upload, Icon, message } from 'antd';
import { connect } from 'dva';

function beforeUpload(file) {
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
    
class Avatar extends React.Component {
    state={
        imageUrl:this.props.imageUrl
    }
    handleChange = (info) => {
        if (info.file.status === 'done') {
            const response=info.file.response.data
            this.setState({
                imageUrl:response[0]
            },function(){
                const imageUrl=this.state.imageUrl
                this.props.dispatch({
                    type:'brand/brandurl',
                    payload:imageUrl
                })
            })
        }
    }
    
    render() {
        const imageUrl = this.state.imageUrl
        const fileDomain=eval(sessionStorage.getItem('fileDomain'));
    	return (
            <Upload
                name="avatar"
                showUploadList={false}
                action="/erpWebRest/qcamp/upload.htm?type=brand"
                beforeUpload={beforeUpload}
                onChange={this.handleChange}
                name="imgFile"
            >
                {
                    imageUrl 
                    ?
                        <img src={fileDomain+imageUrl} alt="" style = {{width:'122px', height:'82px', verticalAlign:'middle', cursor: 'pointer'}}/> 
                    :
                        <Icon type="plus" style = {{width:'122px', height:'82px', verticalAlign:'middle', border: '1px dashed #d9d9d9', cursor: 'pointer', display: 'table-cell'}}/>
                }
    	    </Upload>
    	);
    }
}

function mapStateToProps(state) {
    const {pdBrands} = state.brand;
    return {pdBrands};
}

export default connect(mapStateToProps)(Avatar);

    

    
    