import { Button, message, Upload, Modal} from 'antd';
import { connect } from 'dva';
import './index.less';

class ImportBtn extends React.Component {
  state = {
    fileList: [],
    noImportSpuCode:'',
    visible:false
  }
  beforeUpload(file) {
    const isSize = file.size / 1024 / 1024 < 1;
    let fileName = file.name;
    let fileType = fileName.split('.')[1];
    if(fileType!='xls'&&fileType!='xlsx') {
      message.error('请选择Excel文件');
      return false;
    }else {
      if (!isSize) {
        message.error('导入文件不得大于1M');
        return false;
      };
    };
  }
  handleChange = (info) => {
    let file = info.file;
    const { response } = file;
    if(file.status == 'done') {
      if (response) {
        if(response.code=='0'){
          const {noImportSpu,noImportSpuCode} = response;
          this.setState({
            noImportSpu,
            noImportSpuCode,
            visible:!!(noImportSpu||noImportSpuCode)
          });
          let pdSpuList= response.pdSpuList?response.pdSpuList:[];
          pdSpuList.map((el,index) => el.key = index)
          this.props.callBack(pdSpuList)
        }else{
          message.error(file.response.message,.8);
        };
        return file.response.status === 'success';
      };
    }
  }
  onCancel=()=>{
    this.setState({
      visible:false
    });
  }
  render() {
    const {type,activityId} = this.props;
    const {noImportSpu,noImportSpuCode,visible} = this.state;
    const params = JSON.stringify({type,activityId})
    const props = {
      action: '/erpWebRest/webrest.htm?code=qerp.web.config.singlelinespu.import',
      onChange: this.handleChange,
      beforeUpload:this.beforeUpload,
      name:'mfile',
      data:{data:params},
      showUploadList:false,
    };
    return (
      <div style={{'display':'inline-block'}}>
        <Upload {...props} className="upload-file-btn">
            <Button type="primary" size="large">
              上传附件
            </Button>
        </Upload>
        <Modal
          onCancel={this.onCancel}
          footer={null}
          wrapClassName='error_msg'
          visible={visible}
        >
          <p>商品已导入超过100个，已下商品导入失败</p>
          {noImportSpu&&
            <p style={{width:'450px','word-wrap':'break-word'}}>
              SPUID:{noImportSpu.map(item=>(<span>{item}，</span>))}
            </p>
          }
          {noImportSpuCode&&
            <p>商品编码:{noImportSpuCode.map(item=>(<span>{item}</span>))}</p>
          }
        </Modal>
      </div>
    );
  }
}


export default ImportBtn;
