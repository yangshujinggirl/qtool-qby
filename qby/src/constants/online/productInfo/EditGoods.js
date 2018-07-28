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
} from '../../../services/online/productInfo.js';
import AddGoodsDesc from '../../goods/components/AddGoodsDesc/index.js';

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
      type:'productEditGoods/fetchGoodsInfo',
      payload:{spuId:pdSpuId}
    })
  }
  //取消
  onCancel(){
    const { key } = this.props.data;
    const pane = eval(sessionStorage.getItem("pane"));
    if(pane.length<=1){return}
    this.props.dispatch({
      type:'productEditGoods/resetData'
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
        values = Object.assign(values,{pdSpuId});
        values = this.formtParams(values);
        this.saveGoods(values)
      }
    });
  }
  //参数格式化
  formtParams(values) {
    //处理商品描述参数
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
      const { code } =res;
      if(code == '0') {
        this.onCancel();
      }
    },error=> {
      console.log(error)
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { iPdSpu } = this.props.productEditGoods;
    return(
      <div className="btip-add-goods-components">
        <Form className="qtools-form-components">
          <Row wrap>
            <Col span={24}>
              <FormItem label='商品名称' {...formItemLayout}>
                 <label>{iPdSpu.name}</label>
               </FormItem>
            </Col>
            <Col span={24}>
              <FormItem label='电商名称' {...formItemLayout}>
                 {
                   getFieldDecorator('oname', {
                     rules: [{ required: true, message: '请输入商品名称'}],
                     initialValue:iPdSpu.oname
                   })(
                     <Input placeholder="请输入商品名称"/>
                   )
                 }
               </FormItem>
            </Col>
            <Col span={24}>
              <FormItem label='商品图片' {...formItemLayout2}>
                <ul className="img-list-wrap">
                  {
                    iPdSpu.spuPics&&iPdSpu.spuPics.length>0&&
                    iPdSpu.spuPics.map((el,index) => (
                      <li className="img-item">
                        <img src=""/>
                      </li>
                    ))
                  }
                </ul>
              </FormItem>
            </Col>
            <Col span={24}>
              <FormItem label='一级分类' {...formItemLayout}>
                 <label>{iPdSpu.pdCategory1Name}</label>
               </FormItem>
            </Col>
            <Col span={24}>
              <FormItem label='二级分类' {...formItemLayout}>
                 <label>{iPdSpu.pdCategory2Name}</label>
               </FormItem>
            </Col>

            <Col span={24}>
              <FormItem label='商品信息' {...formItemLayout2}>
                 <Qtable
                   columns={iPdSpu.isSkus?DetailSizeColumns:DetailColumns}
                   dataSource={iPdSpu.pdSkus}/>
               </FormItem>
            </Col>
            <Col span={24}>
              <FormItem label='商品描述' {...formItemLayout}>
                  {
                    iPdSpu.pdSpuInfo&&
                    <AddGoodsDesc
                      dataSource={iPdSpu.pdSpuInfo}
                      form={this.props.form}/>
                  }
               </FormItem>
            </Col>
            <Col span={24}>
              <FormItem label='商品备注1' {...formItemLayout}>
                 {
                   getFieldDecorator('remark1', {
                     initialValue:iPdSpu.remark1
                   })(
                     <Input placeholder="请输入商品备注"/>
                   )
                 }
               </FormItem>
            </Col>
            <Col span={24}>
              <FormItem label='商品备注2' {...formItemLayout}>
                 {
                   getFieldDecorator('remark2', {
                     initialValue:iPdSpu.remark2
                   })(
                     <Input placeholder="请输入商品备注"/>
                   )
                 }
               </FormItem>
            </Col>
            <Col span={24}>
              <FormItem label='商品备注3' {...formItemLayout}>
                 {
                   getFieldDecorator('remark3', {
                     initialValue:iPdSpu.remark3
                   })(
                     <Input placeholder="请输入商品备注"/>
                   )
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
  const { productEditGoods } = state;
  return { productEditGoods }
}

const BtipAddGoods = Form.create()(AddGoodsForm);
export default connect(mapStateToProps)(BtipAddGoods);
