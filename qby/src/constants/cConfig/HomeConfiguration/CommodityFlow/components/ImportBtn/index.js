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
          const { unImportSpuArr }=response;
          if(unImportSpuArr&&unImportSpuArr.length>0) {
            let content = <span>
            以下商品导入失败<br/>
              {
                unImportSpuArr.map((el) => el = `${el}/`)
              }
            </span>
            message.error(content)
          }
          let spuList= response.spuList?response.spuList:[];
          spuList.map((el,index) =>{
            el.key = index;
            el.FixedPdSpuId = el.pdSpuId;
          })
          this.props.callback(spuList)
        }else{
          message.error(file.response.message,.8);
        }
        return file.response.status === 'success';
      }
    }
  }
  render() {
    const props = {
      action: '/erpWebRest/webrest.htm?code=qerp.web.config.pdFlowSpu.import',
      onChange: this.handleChange,
      beforeUpload:this.beforeUpload,
      name:'mfile',
      showUploadList:false,
    };
    return (
      <Upload{...props}
        className="upload-file-btn">
          <Button type="primary" size="large">
            批量导入
          </Button>
      </Upload>
    );
  }
}


export default ImportBtn;
