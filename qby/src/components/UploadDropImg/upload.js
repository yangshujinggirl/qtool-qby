
import React,{Component} from 'react'
import {Icon,Modal,message} from 'antd'
import Upload from 'rc-upload';
import MyTagControlContext from '../MyTagControlContext';
import update from 'immutability-helper'
import Img from './img'
import './index.less'



class UploadImg extends Component{
  constructor(props){
    super(props)
    this.state = {
      visible:false,
      imgIndex:0,
      uploaderProps:{
         name:this.props.name,
         action:this.props.action,
         multiple: true,
         onStart:this.onStart,
         onSuccess:this.onSuccess,
         beforeUpload:this.beforeUpload,
         onError:this.onError,
      }
    }
  }
  //上传大小限制
  beforeUpload = (file) =>{
    const isJPG = file.type === 'image/jpeg';
    const isPNG = file.type === 'image/png';
      if (!isJPG && !isPNG) {
          message.error('仅支持jpg/jpeg/png格式',.8);
          return false
      };
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
          message.error('上传内容大于2M，请选择2M以内的文件',.8);
          return false
      };
    return (isJPG || isPNG) && isLt2M;
  }

  onStart=(file)=> {
    console.log('onStart', file, file.name);
  }
  onSuccess=(ret)=> {
    if(ret.code == '0'){
      const {imgBoxs} = this.props;
      imgBoxs.push(ret.data[0]);
      this.props.updatePropsImgbox(imgBoxs)
    }else{
      message.error(ret.message)
    };
  }
  onError=(err)=> {
    console.log('onError', err);
  }
  //放大
  enLarge =(index)=> {
    this.setState({
      imgIndex:index,
      visible:true
    })
  }
  changeImgBox=(dragIndex,hoverIndex)=>{
    const {imgBoxs} = this.props;
    const tempSource = imgBoxs[dragIndex];
    const list = update(this.props.imgBoxs, {
          $splice: [[dragIndex, 1], [hoverIndex, 0, tempSource]],
    });
    this.props.updatePropsImgbox(list)
  }
  //删除按钮
  onDelete =(index)=> {
    const list = update(this.props.imgBoxs,{
      $splice:[[index,1]]
    });
    this.props.updatePropsImgbox(list)
  }
  onCancel =()=> {
    this.setState({
      visible:false
    });
  }
  render(){
    const fileDomain = JSON.parse(sessionStorage.getItem('fileDomain'));
    const {uploaderProps,visible,imgIndex} = this.state;
    const {imgBoxs} = this.props;
    const img = imgBoxs[imgIndex] //要放大的图片
    const uploadButton = (
        <div className='upload-img'>
          <Icon type="plus" />
          <div className="ant-upload-text">上传图片</div>
        </div>
    );
    return(
      <div>
        {
          imgBoxs.map((item,index)=>(
            <Img
              onDelete={()=>this.onDelete(index)}
              enLarge={()=>this.enLarge(index)}
              onImg={this.changeImgBox}
              key={index}
              index={index}
              img={item}/>
          ))
        }
        <Modal
          wrapClassName='img-large'
          width={500}
          visible={visible}
          footer={null}
          onCancel={this.onCancel}
        >
          <img style={{width:'400px'}} src={fileDomain+img}/>
        </Modal>
        <Upload {...uploaderProps}>
          {uploadButton}
        </Upload>
      </div>
    )
  }
}
export default MyTagControlContext(UploadImg)
