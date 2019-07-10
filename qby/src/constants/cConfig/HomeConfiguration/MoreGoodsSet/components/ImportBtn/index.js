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
    let fileList = info.fileList;
    fileList = fileList.slice(-1);
    fileList = fileList.filter((file) => {
      if (file.response) {
        if(file.response.code=='0'){
            if(file.response.warningmessage){
                let message = file.response.warningmessage.split('\r\n')
                let m = []
                for(let i=0;i<message.length;i++){
                  m.push(<p>{message[i]}</p>)
                }
                Modal.warning({
                    content:(
                      <div>
                        {m}
                      </div>
                    )
                  });
            }
            let goodsInfo = [];
            for(var i=0;i<file.response.pdSpuAsnLists.length;i++){
                let json = {};
                json.pdCode = file.response.pdSpuAsnLists[i].pdCode;
                json.price = file.response.pdSpuAsnLists[i].price;
                json.qty = file.response.pdSpuAsnLists[i].qty;
                json.name = file.response.pdSpuAsnLists[i].name;
                json.createTime = file.response.pdSpuAsnLists[i].createTime;
                json.displayName = file.response.pdSpuAsnLists[i].displayName;
                json.key = i;
                json.isDetail = false //是否是导入
                goodsInfo.push(json);
            }
            // this.props.mdopdermeth.funct(goodsInfo)
        }else{
            message.error(file.response.message,.8);
        }
        return file.response.status === 'success';
      }
      return true;
    });
    this.setState({ fileList });
  }
  render() {
    const props = {
      action: '/erpWebRest/webrest.htm?code=qerp.web.config.mulitilinespu.import',
      onChange: this.handleChange,
      beforeUpload:this.beforeUpload,
      name:'mfile'
    };
    return (
      <Upload{...props}
        showUploadList={false}
        fileList={this.state.fileList}
        className="upload-file-btn">
          <Button type="primary" size="large">
            上传附件
          </Button>
      </Upload>
    );
  }
}


export default ImportBtn;
