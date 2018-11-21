import { Form, Select, Input, Button, message, Upload, Icon} from 'antd'
import React, { Component} from 'react'
const FormItem = Form.Item;
const formItemLayout = {
  labelCol: {span:3},
  wrapperCol: {span:6}
}

class AddImgText extends Component{
  constructor(props){
    super(props);
  }
  beforeUpload = (file) =>{
    const isJPG = file.type === 'image/jpeg';
    const isPNG = file.type === 'image/png';
      if (!isJPG && !isPNG) {
          message.error('仅支持jpg/jpeg/png格式',.8);
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
          message.error('上传内容大于2M，请选择2M以内的文件',.8);
      }
    return (isJPG || isPNG) && isLt2M;
  }
  //输入框发生变化
  textChange =(e,index)=> {
    let value = e.target.value;
    let { DescArr } = this.props;
    DescArr[index].content = value;
    this.setState({DescArr});
  }
  //删除图片/文本
  deleteContent =(index)=> {
    let { DescArr } = this.props;
    DescArr.splice(index,1);
    this.props.changeState(DescArr)
    this.setState({DescArr});
  }
  handleChange = ({fileList},index) => {
    if(fileList[0].response){
      const imgUrl = fileList[0].response.data[0];
      let { DescArr } = this.props;
      DescArr[index].content = imgUrl;
      this.props.changeState(DescArr)
      this.setState({DescArr});
    };
  }

  render(){
    const DescArr = this.props.DescArr;
    const fileDomain=eval(sessionStorage.getItem('fileDomain'));
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return(
      <div>
      <FormItem
        {...formItemLayout}
        label='合作记录'
      >
        <div>
          <Button
            style={{marginRight:'30px'}}
            onClick={()=>this.props.addContent('text')}
          >
            添加文本
          </Button>
          <Button onClick={()=>this.props.addContent('img')}>添加图片</Button>
        </div>
      </FormItem>
      <FormItem
        wrapperCol={{ offset:3 ,span: 6 }}
      >
      {
        DescArr.length>0?DescArr.map((item,index)=>{
          if(item.type=='1'){
            return(
              <div key={index} className='addForm'>
                <Input
                  style={{width:'80%'}}
                  value={item.content}
                  placeholder='请输入'
                  onChange={(e)=>this.textChange(e,index)}
                />
                <a
                  style={{float:'right',color:'#35BAB0'}}
                  onClick={()=>this.deleteContent(index)}
                >删除</ a>
              </div>
            )
          }else if(item.type == '2'){
            return(
              <div key={index} className='addForm'>
                <div>
                  <Upload
                    name='imgFile'
                    showUploadList={false}
                    action="/erpWebRest/qcamp/upload.htm?type=spuDetail"
                    listType="picture-card"
                    beforeUpload={this.beforeUpload}
                    onChange={(fileList)=>this.handleChange(fileList,index)}
                  >
                    {item.content ? <img src={fileDomain + item.content} style={{width:'102px',height:'102px'}} alt="avatar" /> : uploadButton}
                  </Upload>
               </div>
                <a
                  style={{float:'right',color:'#35BAB0',marginTop:'-80px'}}
                  onClick={()=>this.deleteContent(index)}
                >删除
                </a>
              </div>
            )
          }
        }):null
    }
    </FormItem>
    </div>
  )}
}
export default AddImgText
