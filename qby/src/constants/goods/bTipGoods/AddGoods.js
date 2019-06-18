import React,{ Component } from 'react';
import { connect } from 'dva';
import {
  Form,Row,Col,
  Input,Button,Icon,
  Select ,AutoComplete,Upload,
  message,Radio,DatePicker
} from 'antd';
import moment from 'moment';
import {
  goodSaveApi,
  saveValApi
} from '../../../services/goodsCenter/bTipGoods.js';
import AddGoodsDesc from '../components/AddGoodsDesc/index.js';
import Imgmodel from '../../../components/model/modelimg';

import Qtable from '../../../components/Qtable';
import { DetailColumns, DetailSizeColumns} from './columns/detailColumns'
import './AddGoods.less';


const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;

const formItemLayout = {
  labelCol: {
    span: 8
  },
  wrapperCol: {
    span: 6
  }
};
const formItemLayout2 = {
  labelCol: {
    span: 4
  },
  wrapperCol: {
    span: 18
  }
};
const formItemLayout3 = {
  labelCol: {
    span: 8
  },
  wrapperCol: {
    span: 16
  }
};

class AddGoodsForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading:false,
      dataSource:[]
    }
  }
  componentDidMount() {
    this.initPage()
  }
  initPage() {
    const { pdSpuId, source } =this.props.data;
    this.props.dispatch({
      type:'bTipAddGoods/fetchGoodsInfo',
      payload:{
        spuId:pdSpuId,
      },
      callback:(dataSource)=>{
        this.setState({dataSource})
      }
    })
  }
  //取消
  onCancel(){
    const { key } = this.props.data;
    const pane = eval(sessionStorage.getItem("pane"));
    if(pane.length<=1){return}
    this.props.dispatch({
      type:'bTipAddGoods/resetData'
    })
    this.props.dispatch({
      type:'tab/initDeletestate',
      payload:key
    });
  }
  //提交
  handleSubmit = (e) => {
    const { pdSpuId, source } =this.props.data;
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        values = Object.assign(values,{
          pdSpuId,
          source
        })
        values = this.formtParams(values);
        this.saveGoods(values)
      }
    });
  }
  //参数格式化
  formtParams(values) {
    values.bname = values.bname.trim();
    //处理商品描述参数
    values.pdSpuInfo = this.state.dataSource;
    return values;
  }
  //提交api
  saveGoods(values) {
    this.setState({
      loading:true
    })
    goodSaveApi(values)
    .then(res=> {
      const { code } =res;
      if(code == '0') {
        this.setState({
          loading:false
        })
        message.success('修改成功');
        this.onCancel();
        this.props.dispatch({
          type:'bTipGoodsList/fetchList',
          payload:{...this.props.data.listParams}
        })
      } else {
        this.setState({
          loading:false
        })
      }
    },error=> {
      console.log(error)
    })
  }
  //修改dataSource
  changeSource =(dataSource)=> {
    this.setState({dataSource})
  }
  render() {
    const {dataSource} = this.state;
    const { getFieldDecorator } = this.props.form;
    const { pdSpu, fileList } = this.props.bTipAddGoods;
    const { loading } =this.state;
    return(
      <div className="btip-add-goods-components">
        <Form className="qtools-form-components">
          <Row wrap>
            <Col span={24}>
              <FormItem label='商品名称' {...formItemLayout}>
                 <label>{pdSpu.name}</label>
               </FormItem>
            </Col>
            <Col span={24}>
              <FormItem label='B端名称' {...formItemLayout}>
                 {
                   getFieldDecorator('bname', {
                     rules: [{ required: true, message: '请输入商品名称'}],
                     initialValue:pdSpu.bname
                   })(
                     <Input placeholder="请输入B端名称" maxLength="32" autoComplete="off"/>
                   )
                 }
               </FormItem>
            </Col>
            <Col span={24}>
              <FormItem label='一级分类' {...formItemLayout}>
                 <label>{pdSpu.pdCategory1Name}</label>
               </FormItem>
            </Col>
            <Col span={24}>
              <FormItem label='二级分类' {...formItemLayout}>
                 <label>{pdSpu.pdCategory2Name}</label>
               </FormItem>
            </Col>
            <Col span={24}>
              <FormItem label='商品图片' {...formItemLayout3}>
                <ul className="img-list-wrap">
                  {
                    fileList.length>0&&
                    fileList.map((el,index) => (
                      <li className="img-item" key={index}>
                        <Imgmodel picUrl={el.name}/>
                      </li>
                    ))
                  }
                </ul>
              </FormItem>
            </Col>
            <Col span={24}>
              <FormItem label='商品信息' {...formItemLayout2}>
                 <Qtable
                   columns={pdSpu.isSkus?DetailSizeColumns:DetailColumns}
                   dataSource={pdSpu.pdSkus}/>
               </FormItem>
            </Col>
            <Col span={24}>
              <FormItem label='箱规销售' {...formItemLayout}>
                 {getFieldDecorator('containerSpec',{
                   rules: [
                     { required: true, message: '请选择商品状态'},
                     { pattern:/^[0-9]*$/,message:'请输入数字'}
                   ],
                   initialValue:pdSpu.containerSpec
                 })(
                   <Input placeholder="请输入箱规销售" autoComplete="off"/>
                 )}
               </FormItem>
            </Col>
            <Col span={24}>
              <FormItem label='上新商品' {...formItemLayout}>
                 {getFieldDecorator('isNew',{
                   initialValue:pdSpu.eventNew||0
                 })(
                   <RadioGroup>
       							<Radio value={1} value={1}>是</Radio>
       							<Radio value={0} value={0}>否</Radio>
       						 </RadioGroup>
                 )}
               </FormItem>
            </Col>
            <Col span={24}>
              <FormItem label='畅销商品' {...formItemLayout}>
                 {getFieldDecorator('isHot', {
                   initialValue:pdSpu.eventHot||0
                 })(
                   <RadioGroup>
       							<Radio value={1} value={1}>是</Radio>
       							<Radio value={0} value={0}>否</Radio>
       						 </RadioGroup>
                 )}
               </FormItem>
            </Col>
            <Col span={24}>
              <FormItem label='直邮商品' {...formItemLayout}>
                 {getFieldDecorator('isDirectExpress',{
                   initialValue:pdSpu.isDirectExpress
                 })(
                   <RadioGroup>
       							<Radio value={1} value={1}>是</Radio>
       							<Radio value={0} value={0}>否</Radio>
       						 </RadioGroup>
                 )}
               </FormItem>
            </Col>
            <Col span={24}>
              <FormItem label='预售商品' {...formItemLayout}>
                 {getFieldDecorator('isPresell',{
                   initialValue:pdSpu.isPresell
                 })(
                   <RadioGroup>
       							<Radio value={1} value={1}>是</Radio>
       							<Radio value={0} value={0}>否</Radio>
       						 </RadioGroup>
                 )}
               </FormItem>
            </Col>
            <Col span={24}>
              <FormItem
                label='试销天数'
                {...formItemLayout}
                className="addonAfter-inputs-common">
                 {
                   getFieldDecorator('trialDay',{
                     initialValue:pdSpu.trialDay,
                     rules: [{pattern:/^[0-9]*$/,message:'天数只能是整数'}],
                   })(
                      <Input
                        placeholder="请输入试销天数"
                        autoComplete="off"
                        addonAfter="天"/>
                   )
                 }
               </FormItem>
            </Col>
            <Col span={24}>
              <FormItem label='缺货天数' {...formItemLayout} className="addonAfter-inputs-common">
                 {
                   getFieldDecorator('outStockDay',{
                     initialValue:pdSpu.outStockDay,
                     rules: [{pattern:/^[0-9]*$/,message:'天数只能是整数'}],
                   })(
                      <Input
                        placeholder="请输入缺货天数"
                        autoComplete="off"
                        addonAfter="天"/>
                   )
                 }
               </FormItem>
            </Col>
            <Col span={24}>
              <FormItem label='缺货率' {...formItemLayout} className="addonAfter-inputs-common">
                 {
                   getFieldDecorator('outStockRate',{
                     initialValue:pdSpu.outStockRate,
                     rules: [{ pattern:/^[0-9]*$/,message:'请输入数字'}],
                   })(
                      <Input
                        placeholder="请输入缺货率"
                        autoComplete="off"
                        addonAfter="%"/>
                   )
                 }
               </FormItem>
            </Col>
            <Col span={24}>
              <FormItem label='目标周转天数' {...formItemLayout} className="addonAfter-inputs-common">
                 {
                   getFieldDecorator('targetTurnoverDay',{
                     initialValue:pdSpu.targetTurnoverDay,
                     rules: [{pattern:/^[0-9]*$/,message:'天数只能是整数'}],
                   })(
                      <Input
                        placeholder="请输入目标周转天数"
                        autoComplete="off"
                        addonAfter="天"/>
                   )
                 }
               </FormItem>
            </Col>
            <Col span={24}>
              <FormItem label='商品描述' {...formItemLayout}>
                {
                  dataSource&&
                  <AddGoodsDesc
                    changeSource={this.changeSource}
                    dataSource={dataSource}
                    form={this.props.form}/>
                }
               </FormItem>
            </Col>
            <Col span={24}>
              <FormItem>
                <div className="btns-list">
                 <Button type="default" onClick={this.onCancel.bind(this)}>取消</Button>
                 <Button loading={loading} type="primary" onClick={this.handleSubmit.bind(this)}>保存</Button>
                </div>
              </FormItem>
            </Col>
          </Row>
        </Form>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { bTipAddGoods } = state;
  return { bTipAddGoods }
}

const BtipAddGoods = Form.create()(AddGoodsForm);
export default connect(mapStateToProps)(BtipAddGoods);
