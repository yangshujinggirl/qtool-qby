import React, { Component } from 'react';
import { connect } from 'dva';
import { Form,Button,Input,Row,Col} from 'antd';
import {addPageApi,updataPageApi} from '../../../services/operate/pageConfig/index'
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
      this.setState({configureCode,previewLink,pdConfigureId,pageName,remark})
    };
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
  handleSubmit =()=> {
    this.props.form.validateFieldsAndScroll((err,values)=>{
      if(!err){
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
                  payload:componkey
                });
            };
          });
        }else{ //新增
          addPageApi(values).then(res=>{
            if(res.code=='0'){
              message.success('新建成功');
              this.props.dispatch({
                type:'tab/initDeletestate',
                payload:componkey
              });
            };
          });
        };
      };
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
                  <a className='theme-color link' href={previewLink}>{previewLink}</a>
                }
              </FormItem>
            }
            <FormItem {...formItemLayout} label="页面名称">
    					{getFieldDecorator('pageName', {
    						rules: [{ required: true, message: '请输入页面名称,50字符以内'}],
    						initialValue:pageName
    					})(
    						<Input placeholder='请输入页面名称,50字符以内' maxLength='50' autoComplete="off"/>
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
