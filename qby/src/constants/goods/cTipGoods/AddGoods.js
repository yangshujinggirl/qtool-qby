import React,{ Component } from 'react';
import { connect } from 'dva';
import {
  Form,Row,Col,
  Input,Button,Icon,
  Select ,AutoComplete,Upload,
  message,Radio,DatePicker,Checkbox
} from 'antd';
import moment from 'moment';
import './index.less'
import {
  goodSaveApi,
  saveValApi,
  productListApi
} from '../../../services/goodsCenter/cTipGoods.js';
import AddGoodsDesc from '../components/AddGoodsDesc/index.js';
import Imgmodel from '../../../components/model/modelimg';

import Qtable from '../../../components/Qtable';
import { DetailColumns, DetailSizeColumns} from './columns/detailColumns'
import GoodsInfo from './components/GoodsInfo';


const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;

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
      plainOptions:[],
      dataSource:[],
    }
    this.platformOptions = [
      {label:'C端app',value:1},
      {label:'小程序',value:2}
    ]
  }
  componentDidMount() {
    this.initPage()
  }
  initPage() {
    const { pdSpuId, source } =this.props.data;
    this.props.dispatch({
      type:'cTipAddGoods/fetchGoodsInfo',
      payload:{spuId:pdSpuId},
      callback:(dataSource)=>{
        this.setState({dataSource})
      }
    });
    productListApi()
    .then(res => {
      let {plainOptions} = this.state;
      if(res.code == "0"){
        res.pdExplains.map((item,index) => {
          plainOptions[index] = {label:item.name,value:item.pdExplainId}
          return item;
        });
      };
      this.setState({
        plainOptions
      });
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
      if (!err) {
        values = Object.assign(values,{
          pdSpuId
        });
        console.log(pdSpuId)
        values = this.formtParams(values);
        this.saveGoods(values)
      }
    });
  }
  //参数格式化
  formtParams(values) {
    values.platform = '1,2';
    values.cname = values.cname.trim();
    let { skuStatus, pdSkus:pdSkusData } =this.props.cTipAddGoods.pdSpu;
    let pdSkus = values.pdSkus;
    if(skuStatus == 1&&pdSkus&&pdSkus.length>0) {
      pdSkus.map((el,index) => {
        el.code = pdSkusData[index].code
      })
      pdSkus = pdSkus.filter((el,index) =>  el);
    }
    //处理商品描述参数
    values.pdSpuInfo = this.state.dataSource;
    values = {...values,pdSkus};
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
          type:'cTipGoodsList/fetchList',
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
    dataSource.length>0 && dataSource.map((item,index)=>( //商品描述设置唯一key
      item.key=index
    ));
    console.log(dataSource)
    const { getFieldDecorator } = this.props.form;
    const { pdSpu, fileList } = this.props.cTipAddGoods;
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
              <FormItem label='C端名称' {...formItemLayout}>
                 {
                   getFieldDecorator('cname', {
                     rules: [{ required: true, message: '请输入商品名称'}],
                     initialValue:pdSpu.cname
                   })(
                     <Input placeholder="请输入C端名称" maxLength="32" autoComplete="off"/>
                   )
                 }
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
                 {/* <Qtable
                   columns={pdSpu.isSkus?DetailSizeColumns:DetailColumns}
                   dataSource={pdSpu.pdSkus}/> */}
                 <GoodsInfo
                   form={this.props.form}
                   dataSource={pdSpu.pdSkus}/>
               </FormItem>
            </Col>
            <Col span={24}>
              <FormItem label='NEW商品' {...formItemLayout}>
                 {getFieldDecorator('isNew',{
                   initialValue:pdSpu.eventNewc||0
                 })(
                   <RadioGroup>
       							<Radio value={1} value={1}>是</Radio>
       							<Radio value={0} value={0}>否</Radio>
       						 </RadioGroup>
                 )}
               </FormItem>
            </Col>
            <Col span={24}>
              <FormItem label='HOT商品' {...formItemLayout}>
                 {getFieldDecorator('isHot',{
                   initialValue:pdSpu.eventHotc||0
                 })(
                   <RadioGroup>
       							<Radio value={1} value={1}>是</Radio>
       							<Radio value={0} value={0}>否</Radio>
       						 </RadioGroup>
                 )}
               </FormItem>
            </Col>
            <Col span={24}>
              <FormItem label='商品说明' {...formItemLayout}>
                 {getFieldDecorator('pdExplainIds',{
                   rules: [{ required: true, message: '请选择商品说明'}],
                   initialValue:pdSpu.pdExplains?pdSpu.pdExplains:null
                 })(
                   <CheckboxGroup className='checkBox' options={this.state.plainOptions} />
                 )}
               </FormItem>
            </Col>
            <Col span={24}>
              <FormItem label="品牌直供" {...formItemLayout}>
                <label>{pdSpu.brandDirectMail?'是':'否'}</label>
              </FormItem>
            </Col>
            {
              pdSpu.brandDirectMail &&
              <Col span={24}>
                <FormItem label="配送说明" {...formItemLayout}>
                  <label>品牌方直邮，预计{pdSpu.deliveryExplain}工作日内发货</label>
                </FormItem>
              </Col>
            }
            <Col span={24}>
              <FormItem label='商品描述' {...formItemLayout}>
                {
                  pdSpu.pdSpuInfo &&
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
  const { cTipAddGoods } = state;
  return { cTipAddGoods }
}

const BtipAddGoods = Form.create()(AddGoodsForm);
export default connect(mapStateToProps)(BtipAddGoods);
