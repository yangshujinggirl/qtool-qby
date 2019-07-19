import { Button, message, Upload, Modal} from 'antd';
import { connect } from 'dva';
import './index.less';

class ImportBtn extends React.Component {
  state = {
    fileList: []
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
      }
    }
  }
  handleChange = (info) => {
    let file = info.file;
    const { response } =file;
    if(file.status == 'done') {
      if (response) {
        if(response.code=='0'){
          let pdSpuList= response.pdSpuList?response.pdSpuList:[];
          pdSpuList.map((el,index) => el.key = index)
          this.props.callback(pdSpuList)
        }else{
          message.error(file.response.message,.8);
        }
        return file.response.status === 'success';
      }
    }
  }
  render() {
    const params = JSON.stringify({type:this.props.type})
    const props = {
      action: '/erpWebRest/webrest.htm?code=qerp.web.config.singlelinespu.import',
      onChange: this.handleChange,
      beforeUpload:this.beforeUpload,
      name:'mfile',
      data:{data:params},
      showUploadList:false,
    };
    return (
      <Upload {...props} className="upload-file-btn">
          <Button type="primary" size="large">
            上传附件
          </Button>
      </Upload>
    );
  }
}


export default ImportBtn;
