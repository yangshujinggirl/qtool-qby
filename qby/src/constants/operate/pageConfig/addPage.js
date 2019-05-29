import React, { Component } from 'react';
import { connect } from 'dva';
import { Form,Button,Input,Row,Col,message,Radio,Modal } from 'antd';
import {addPageApi,updataPageApi,getConfigDetailApi} from '../../../services/operate/pageConfig/index'
import {GetServerData} from '../../../services/services';
import {deepcCloneObj} from '../../../utils/commonFc';
import FriendCircleImg from './components/FriendCircleImg'
import FriendImg from './components/FriendImg'
import moment from 'moment';
//引入三部分区域
import LeftAddType from './components/left/index';
import CenterPreview from './components/center/index';
import RightConfig from './components/right/index';
const FormItem = Form.Item;
import './index.less'
import '../../../style/h5_config.css';
const RadioGroup = Radio.Group;

class AddConfig extends  Component {
  constructor(props) {
    super(props);
    this.state={
      isLoading:false,
      configureCode:'',
      previewLink:'',
      pdConfigureId:'',
      isShare:1,
      shareFriendCircleImg:'',
      shareFriendImg:'',
      visible:false,
    };
   }
  componentDidMount(){
    if(this.props.data){
      const {
        configureCode,
        previewLink,
        pdConfigureId,
        pageName,
        remark,
        share
      } = this.props.data;
      this.setState({configureCode,previewLink,pdConfigureId,pageName,remark});
      getConfigDetailApi({pdConfigureId}).then(res=>{
        if(res.code == '0'){
          let initdataArr=[];
          const pdBannerConfig = res.pdConfigureConfigList;
          for(var i=0;i<pdBannerConfig.length;i++){
            if(pdBannerConfig[i].type=='4'){
              if(!pdBannerConfig[i].text){
                pdBannerConfig[i].text=pdBannerConfig[i].text
              }else{
                pdBannerConfig[i].text=pdBannerConfig[i].text.replace(/#&#/g,"\n")
              }
            }
          };
          initdataArr = pdBannerConfig;
          this.props.dispatch({
            type:'h5config/syncConfigArzr',
            payload:initdataArr
          });
          this.props.dispatch({
            type:'h5config/syncConfigArrPre',
            payload:initdataArr
          });
          this.props.dispatch({
            type:'h5config/syncCurrentItem',
            payload:0
          });
        };
      })
    }else{
      this.props.dispatch({
        type:'h5config/syncConfigArr',
        payload:[]
      });
      this.props.dispatch({
        type:'h5config/syncConfigArrPre',
        payload:[]
      });
      this.props.dispatch({
        type:'h5config/syncCurrentItem',
        payload:0
      });
    }
  }
  cancel =()=> {
    let {componkey} = this.props;
    if(this.props.data){
      componkey = componkey+this.props.data.pdConfigureId
    };
    this.props.dispatch({
      type:'tab/initDeletestate',
      payload:componkey
    });
  }
  //保存
  handleSubmit =()=> {
    this.props.form.validateFieldsAndScroll((err,values)=>{
      if(!err){
        const {shareFriendImg,shareFriendCircleImg} = this.state;
        if(String(values.isShare)==0 && !shareFriendImg) {return message.error('请上传分享微信好友图片',.8)};
        if(String(values.isShare)==0 && !shareFriendCircleImg) {return message.error('请上传朋友圈分享图片',.8)};
        values.shareFriendImg = shareFriendImg;
        values.shareFriendCircleImg = shareFriendCircleImg;
        const {configArrPre} = this.props;
        if(!configArrPre.length) return  message.error('页面配置不可为空',.8);
        if(configArrPre.length){
         if(configArrPre.some(item=> item.type==1 && !item.text )){
           message.error('请上传图片',.8)
           return ;
         };
         if(configArrPre.some(item=> item.type==2 && item.template==1 && !item.pdCode )){
           message.error('请填写链接商品编码',.8)
           return ;
         };
         if(configArrPre.some(item=> item.type==2 && item.template==2 && !item.pdCode && !item.rowCode)){
           message.error('请填写链接商品编码',.8)
           return ;
         };
         const newArrPre = this.formatValue(configArrPre);
         values.pdConfigureConfigList =  newArrPre
         if(values.pdConfigureConfigList.length > 0){
           this.setState({isLoading:true});
           if(this.props.data){ //修改
             const {pdConfigureId,previewLink,configureCode} = this.props.data;
             values.pdConfigureId = pdConfigureId;
             values.previewLink = previewLink;
             values.configureCode = configureCode;
             updataPageApi(values).then(res=>{
               if(res.code=='0'){
                   message.success('修改成功');
                   this.props.dispatch({
                     type:'tab/initDeletestate',
                     payload:this.props.componkey+this.state.pdConfigureId
                   });
                   this.afterSaveSuccess();
               }else{
                 this.setState({isLoading:false});
               };
             });
           }else{ //新增
             addPageApi(values).then(res=>{
               if(res.code=='0'){
                 message.success('新建成功');
                 this.props.dispatch({
                   type:'tab/initDeletestate',
                   payload:this.props.componkey
                 });
                 this.afterSaveSuccess();
               }else{
                 this.setState({isLoading:false});
               };
             });
           };
         }else{
           message.error('页面配置不可为空',.8)
         };
       }
      };
    });
  }
  formatValue =(value)=> {
    const newArrPre = _.cloneDeep(value);
    newArrPre.length && newArrPre.map((item,index) => {
      if(item.type == '4'){
        if(!item.text){
          newArrPre[index].text = item.text.replace(/\n/g,"#&#")
        }
      };
      if(item.type == '2'){ //后端要求的数据格式不能有这两个
        delete newArrPre[index]['pdSpu'];
        delete newArrPre[index]['rowPdSpu'];
      };
    });
    const newValue = newArrPre.filter(item=>item.type==2||item.text);
    return newValue;
  }
  //成功之后
  afterSaveSuccess =()=> {
    this.props.dispatch({
      type:'h5config/syncConfigArr',
      payload:[]
    });
    this.props.dispatch({
      type:'h5config/syncConfigArrPre',
      payload:[]
    });
    this.props.dispatch({
      type:'h5config/syncCurrentItem',
      payload:0
    });
    this.props.dispatch({ //刷新配置页
      type:'pageConfig/fetchList',
      payload:{}
    });
    this.setState({isLoading:false});
  }
  beforeUpload =(file)=> {
    const isJPG = file.type === 'image/jpeg'||'image.png';
    if (!isJPG) {
      message.error('仅支持jpg/jpeg/png格式',.8);
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('上传内容大于2M，请选择2M以内的文件',.8);
    }
    return isJPG && isLt2M;
  }
  changeCircleImg =(shareFriendCircleImg)=> {
    this.setState({
      shareFriendCircleImg
    });
  }
  changeFriendImg =(shareFriendImg)=> {
    this.setState({
      shareFriendImg
    });
  }
  previwPage =()=> {
    const paneitem = {
      title:'新增商品',
      key:`${this.props.componkey}edit`,
      componkey:`${this.props.componkey}edit`,
    };
    this.props.dispatch({
      type:'tab/firstAddTab',
      payload:paneitem
    });
  }
  onChange=(e)=>{
    const {value} = e.target;
    this.setState({
      isShare:value
    })
  }
  //示例
  displayExample=()=>{
    this.setState({
      visible:true
    })
  }
  //关闭示例
  onCancel=()=>{
    this.setState({
      visible:false
    })
  }
  render() {
    const {
      configureCode,
      previewLink,
      pageName,
      remark,
      isLoading,
      isShare,
      shareFriendCircleImg,
      shareFriendImg,
      shareTitle,
      visible
    } = this.state
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span:3 },
      wrapperCol: { span:6 },
    };
    const currentUrl = window.location.host;
    const url = 'http://'+currentUrl+'/config.html?pdConfigureId='+this.state.pdConfigureId;
    return (
      <div className='add_config'>
      	<Form>
          	<div className='head_title'>基础信息</div>
            {
              configureCode &&
              <FormItem {...formItemLayout}  label="页面编码">
                {configureCode}
              </FormItem>
            }
            {
              previewLink &&
              <FormItem {...formItemLayout} label="预览链接">
                {
                  <a
                    target='_blank'
                    className='theme-color link'
                    href={url}>
                    {previewLink}
                  </a>
                }
              </FormItem>
            }
            <FormItem {...formItemLayout} label="页面名称">
    					{getFieldDecorator('pageName', {
    						rules: [{ required: true, message: '请输入页面名称,15字符以内'}],
    						initialValue:pageName
    					})(
    						<Input placeholder='请输入页面名称,15字符以内' maxLength='15' autoComplete="off"/>
    					)}
    				</FormItem>
            <FormItem {...formItemLayout} label="备注">
    					{getFieldDecorator('remark', {
    						initialValue:remark
    					})(
    						<Input placeholder='请输入备注,50字符以内' maxLength='50' autoComplete="off"/>
    					)}
    				</FormItem>
            <FormItem {...formItemLayout} label="c端是否可分享">
    					{getFieldDecorator('isShare', {
                rules: [{ required: true, message: '请选择c端是否可分享'}],
    						initialValue:isShare
    					})(
                <RadioGroup onChange={this.onChange} value={this.state.value}>
                  <Radio value={0}>是</Radio>
                  <Radio value={1}>否</Radio>
                </RadioGroup>
    					)}
    				</FormItem>
            {
              String(isShare) == 0 &&
              <div>
                <FormItem
                  labelCol={{span:3}}
                  wrapperCol={{span:8}}
                  label="分享微信好友标题">
        					{getFieldDecorator('shareTitle', {
                    rules: [{ required: true, message: '请输入分享微信好友标题'}],
        						initialValue:shareTitle
        					})(
        						<Input style={{width:'75%'}} placeholder='请输入分享标题，30字以内' maxLength='30' autoComplete="off"/>
        					)}<a className='theme-color' onClick={this.displayExample}>　示例</a>
        				</FormItem>
                <FormItem {...formItemLayout} label="分享微信好友图片">
        						<FriendImg
                      name='imgFile'
                      action='/erpWebRest/qcamp/upload.htm?type=brand'
                      shareFriendImg = {shareFriendImg}
                      changeFriendImg = {this.changeFriendImg}/>
        				</FormItem>
                <FormItem {...formItemLayout} label="朋友圈分享图片">
        						<FriendCircleImg
                      name='imgFile'
                      action='/erpWebRest/qcamp/upload.htm?type=brand'
                      shareFriendCircleImg = {shareFriendCircleImg}
                      changeCircleImg = {this.changeCircleImg}
                    />
        				</FormItem>
              </div>
            }
            <div className='head_title'>页面配置</div>
            <div className='content_box h5-wrapper'>
              <div className='white_box h5-container'>
               <LeftAddType/>
    				   <CenterPreview/>
    				   <RightConfig/>
  				   </div>
            </div>
            <FormItem {...formItemLayout} className='btn_cancel_save'>
              <Row type="flex" justify="space-around">
                <Col offset={4}>
                  <Button onClick={this.cancel}>取消</Button>
                </Col>
                <Col>
                  <Button onClick={this.handleSubmit} loading={isLoading} type="primary">保存</Button>
                </Col>
              </Row>
            </FormItem>
        </Form>
        <Modal
          width={600}
          visible={visible}
          footer={null}
          onCancel={this.onCancel}
          className='example'
        >
          <img src={require('../../../assets/example.png')}/>
        </Modal>
      </div>
    )
  }
}
const AddConfigs  = Form.create({})(AddConfig);
const mapStateToProps=(state)=>{
  const {configArr,configArrPre,currentItem}= state.h5config;
  return {configArr,configArrPre,currentItem};
}
export default connect(mapStateToProps)(AddConfigs);
