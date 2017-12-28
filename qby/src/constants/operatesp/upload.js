import { Upload, Icon, Modal } from 'antd';
import { connect } from 'dva';

class PicturesWall extends React.Component {
    state = {
        previewVisible: false,
        previewImage: '',
        fileList:[],
    };
    beforeUpload=(file)=>{
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
    handleCancel = () => {
        this.setState({ previewVisible: false })
    }
    handlePreview = (file) => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true
        });
    }
    
    handleChange = ({fileList }) =>{
        this.setState({ fileList })
        var res=fileList.every(function(item){
                return item.status=='done'
        })
        if(res==true){
            const  spShopPics=[]
            for(var i=0;i<fileList.length;i++){
                spShopPics.push(fileList[i].response.data[0])
            }
            this.props.dispatch({
                type:'operatesp/spShopPics',
                payload:spShopPics
            })
        }
    }
    
    setinit=(values)=>{
        this.setState({
            fileList:values
        })
    }
    render() {
        const { previewVisible, previewImage, fileList } = this.state;
        const uploadButton = (
            <div>
            <Icon type="plus" />
            <div className="ant-upload-text">添加图片</div>
            </div>
        );
        return (
            <div className="clearfix">
                <Upload
                    action="/erpWebRest/qcamp/upload.htm?type=shop"
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                    beforeUpload={this.beforeUpload}
                    name="imgFile"
                >
                    {fileList.length >= 3 ? null : uploadButton}
                </Upload>
                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
        </div>   
        )
    }

    componentWillReceiveProps(nextProps){
        this.setinit(nextProps.initfileList)
    }

} 

function mapStateToProps(state) {
    const {spShops,total,limit,currentPage,values} = state.operatesp;
    return {spShops,total,limit,currentPage,values};
}
export default connect(mapStateToProps)(PicturesWall);
