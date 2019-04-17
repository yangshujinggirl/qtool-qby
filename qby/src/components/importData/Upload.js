import React,{Component} from 'react'
import {
  Upload, message, Button, Icon,
} from 'antd';
import './index.less'

//导入商品
class UploadData extends Component{
  constructor(props){
    super(props);
    this.state={

    }
  }
  onChange =(info)=> {
    if(info.file.response){
      if(info.file.response.code=='0'){
        this.props.onChange(info)
      }else{
        message.error(info.file.response.message,.8)
      };
    };
  }
  render(){
    const {name,action,title,data} = this.props
    return(
      <Upload
        className='import_list'
        accept='.xlsx,.xls'
        name={name}
        action={action}
        data={data}
        onChange={this.onChange}
        showUploadList={false}
      >
        <Button type='primary'>{title}</Button>
      </Upload>
    )
  }
}
export default UploadData;
