import React,{Component} from 'react'
import {
  Upload, message, Button, Icon,
} from 'antd';
class UploadData extends Component{
  constructor(props){
    super(props);
    this.state={

    }
  }
  onChange =(info)=> {
    if(info.file.response){
      if(info.file.response.code=='0'){
        const {pdSpuAsnLists} = info.file.response;
        this.props.getFile(pdSpuAsnLists)
      }else{
        message.error(info.file.response.message)
      }
    }
  }
  render(){
    return(
      <Upload
        accept='.xlsx,.xls'
        name='mfile'
        action='/erpWebRest/webrest.htm?code=qerp.web.pd.spu.import'
        onChange={this.onChange}
        showUploadList={false}
      >
        <Button className='import_good' type='primary'>导入商品</Button>
      </Upload>
    )
  }
}
export default UploadData;
