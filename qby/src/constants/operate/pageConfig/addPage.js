import React, { Component } from 'react';
import { connect } from 'dva';
import { Form,Button,Input,Row,Col,message} from 'antd';
import {addPageApi,updataPageApi,getConfigDetailApi} from '../../../services/operate/pageConfig/index'
import {GetServerData} from '../../../services/services';
import {deepcCloneObj} from '../../../utils/commonFc';
import moment from 'moment';
//引入三部分区域
import LeftAddType from './components/left/index';
import CenterPreview from './components/center/index';
import RightConfig from './components/right/index';
const FormItem = Form.Item;
import './index.less'
import '../../../style/h5_config.css';

class AddConfig extends  Component {
  constructor(props) {
    super(props);
    this.state={
      configureCode:'',
      previewLink:'',
      pdConfigureId:''
    };
   }
  componentDidMount(){
    if(this.props.data){
      const {
        configureCode,
        previewLink,
        pdConfigureId,
        pageName,
        remark
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
        const {configArrPre} = this.props;
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
         }
         const newArrPre = this.formatValue(configArrPre);
         values.pdConfigureConfigList =  newArrPre
         if(values.pdConfigureConfigList.length > 0){
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
               };
             });
           };
         }else{
           message.error('页面配置不可为空',.8)
         };
       }else{
         message.error('页面配置不可为空',.8)
       };
      };
    });
  }
  formatValue =(value)=> {
    const newArrPre = _.cloneDeep(value);
    newArrPre.length && newArrPre.map((item,index) => {
      if(item.type == '4'){
        if(!item.text){
          newArrPre[index].text = null
        }else{
          newArrPre[index].text = item.text.replace(/\n/g,"#&#")
        };
      };
      if(item.type == '2'){ //后端要求的数据格式不能有这两个
        delete newArrPre[index]['pdSpu'];
        delete newArrPre[index]['rowPdSpu'];
      };
    });
    for(var i=0;i<newArrPre.length;i++){
      if(newArrPre[i].type!=2&&!newArrPre[i].text){
        newArrPre.splice(i,1);
        i--;
      }
    }
    // newArrPre.map((item,index)=> { //清除没有数据的选项
    //   if(item.type!=2 && !item.text){
    //     newArrPre.splice(index,1);
    //      --index;
    //   };
    // });
    return newArrPre;
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
  render() {
    console.log(this.props)
    const {
      configureCode,
      previewLink,
      pageName,
      remark
    } = this.state
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span:3 },
      wrapperCol: { span:6 },
    };
    const url = 'http://v5.qby.testin.qtoolsbaby.net:81/config.html?pdConfigureId='+this.state.pdConfigureId;
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
                  <Button onClick={this.handleSubmit} type="primary">保存</Button>
                </Col>
              </Row>
            </FormItem>
        </Form>
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
