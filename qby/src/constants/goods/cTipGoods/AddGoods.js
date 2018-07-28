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
} from '../../../services/goodsCenter/cTipGoods.js';
import AddGoodsDesc from '../components/AddGoodsDesc/index.js';

import Qtable from '../../../components/Qtable';
import { DetailColumns, DetailSizeColumns} from './columns/detailColumns'
import './AddGoods.less';


const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;

const formItemLayout = {
  labelCol: {
    span: 6
  },
  wrapperCol: {
    span: 6
  }
};
const formItemLayout2 = {
  labelCol: {
    span: 6
  },
  wrapperCol: {
    span: 14
  }
};

class AddGoodsForm extends Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    this.initPage()
  }
  initPage() {
    const { pdSpuId, source } =this.props.data;
    this.props.dispatch({
      type:'cTipAddGoods/fetchGoodsInfo',
      payload:{
        spuId:pdSpuId
      }
    })
  }
  //取消
  onCancel(){
    const { key } = this.props.data;
    const pane = eval(sessionStorage.getItem("pane"));
    if(pane.length<=1){return}
    this.props.dispatch({
      type:'cTipAddGoods/resetData'
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
      console.log(values)
      if (!err) {
        values = Object.assign(values,{
          pdSpuId
        })
        values = this.formtParams(values);
        this.saveGoods(values)
      }
    });
  }
  //参数格式化
  formtParams(values) {
    let pdSpuInfo = values.pdSpuInfo;
    if(pdSpuInfo) {
      pdSpuInfo.map((el) => {
        if(el.content instanceof Array) {
          if(el.content[0].response) {
            el.content = el.content[0].response.data[0]
          } else {
            el.content = el.content[0].name
          }
          el.type = '2'
        } else {
          el.type = '1'
        }
        return el;
      })
    }
    return values;
  }
  //提交api
  saveGoods(values) {
    goodSaveApi(values)
    .then(res=> {
      console.log(res)
    },error=> {
      console.log(error)
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { pdSpu } = this.props.cTipAddGoods;
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
              <FormItem label='C端名称' {...formItemLayout}>
                 {
                   getFieldDecorator('cname', {
                     rules: [{ required: true, message: '请输入商品名称'}],
                     initialValue:pdSpu.cname
                   })(
                     <Input placeholder="请输入商品名称"/>
                   )
                 }
               </FormItem>
            </Col>
            <Col span={24}>
              <FormItem label='商品图片' {...formItemLayout2}>
                <ul className="img-list-wrap">
                  <li className="img-item"></li>
                  <li className="img-item"></li>
                </ul>
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
              <FormItem label='商品信息' {...formItemLayout2}>
                 <Qtable
                   columns={pdSpu.isSkus?DetailSizeColumns:DetailColumns}
                   dataSource={pdSpu.pdSkus}/>
               </FormItem>
            </Col>
            <Col span={24}>
              <FormItem label='NEW商品' {...formItemLayout}>
                 {getFieldDecorator('isNew',{
                   initialValue:pdSpu.isNew
                 })(
                   <RadioGroup>
       							<Radio value={true} value={true}>是</Radio>
       							<Radio value={false} value={false}>否</Radio>
       						 </RadioGroup>
                 )}
               </FormItem>
            </Col>
            <Col span={24}>
              <FormItem label='HOT商品' {...formItemLayout}>
                 {getFieldDecorator('isHot',{
                   initialValue:pdSpu.isHot
                 })(
                   <RadioGroup>
       							<Radio value={true} value={true}>是</Radio>
       							<Radio value={false} value={false}>否</Radio>
       						 </RadioGroup>
                 )}
               </FormItem>
            </Col>
            <Col span={24}>
              <FormItem label='商品描述' {...formItemLayout}>
                {
                  pdSpu.pdSpuInfo&&
                  <AddGoodsDesc
                    dataSource={pdSpu.pdSpuInfo}
                    form={this.props.form}/>
                }
               </FormItem>
            </Col>
            <Col span={24}>
              <FormItem>
                <div className="btns-list">
                 <Button type="default" onClick={this.onCancel.bind(this)}>取消</Button>
                 <Button type="primary" onClick={this.handleSubmit.bind(this)}>保存</Button>
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
  const { cTipAddGoods } = state;
  return { cTipAddGoods }
}

const BtipAddGoods = Form.create()(AddGoodsForm);
export default connect(mapStateToProps)(BtipAddGoods);
