import React,{ Component } from 'react';
import { connect } from 'dva';
import {
  Form,
  Row,
  Col,
  Input,
  Button,
  Icon,
  Select ,
  DatePicker
} from 'antd';
const FormItem = Form.Item;

const formItemLayout = {
  labelCol: {
    span: 8
  },
  wrapperCol: {
    span: 6
  }
};

class AddGoodsForm extends Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    this.initGoodslabel()
  }
  //初始化商品规格，分类
  initGoodslabel() {
    this.props.dispatch({
      type:'baseGoodsList/fetchGoodsType',
      payload:{
				enabled:true
			}
    })
    this.props.dispatch({
      type:'baseGoodsList/fetchCategory',
      payload:{
				getChildren:false,
				enabled:true,
				type:'2'
			}
    })
  }
  handleSubmit(){}
  render() {
    const { getFieldDecorator } = this.props.form;
    return(
      <div>
        <Form className="qtools-form-components">
          <Row wrap>
            <Col span={24}>
              <FormItem label='商品名称' {...formItemLayout}>
                 {
                   getFieldDecorator('name', {
                     rules: [{ required: true, message: '请输入商品名称'}],
                   })(
                     <Input placeholder="请输入商品名称" />
                   )
                 }
               </FormItem>
            </Col>
            <Col span={24}>
              <FormItem label='商品分类' {...formItemLayout}>
                 {
                   getFieldDecorator('pdCategory1Id')(
                     <Input placeholder="Username" />
                   )
                 }
               </FormItem>
            </Col>
            <Col span={24}>
              <FormItem label='商品类型' {...formItemLayout}>
                 {getFieldDecorator('pdCategory2Id')(
                   <Input placeholder="Username" />
                 )}
               </FormItem>
            </Col>
            <Col span={24}>
              <FormItem label='品牌' {...formItemLayout}>
                 {getFieldDecorator('pdBrandname')(
                   <Input placeholder="Username" />
                 )}
               </FormItem>
            </Col>
            <Col span={24}>
              <FormItem label='商品图片' {...formItemLayout}>
                 {getFieldDecorator('imgs')(
                   <Input placeholder="Username" />
                 )}
               </FormItem>
            </Col>
            <Col span={24}>
              <FormItem label='商品规格1' {...formItemLayout}>
                 {getFieldDecorator('guige1')(
                   <Input placeholder="Username" />
                 )}
               </FormItem>
            </Col>
            <Col span={24}>
              <FormItem label='商品规格2' {...formItemLayout}>
                 {getFieldDecorator('guige2')(
                   <Input placeholder="Username" />
                 )}
               </FormItem>
            </Col>
            <Col span={24}>
              <FormItem label='商品信息' {...formItemLayout}>
                 {getFieldDecorator('guige2')(
                   <Input placeholder="Username" />
                 )}
               </FormItem>
            </Col>
            <Col span={24}>
              <FormItem label='开启批次管理' {...formItemLayout}>
                 {getFieldDecorator('lotStatus')(
                   <Input placeholder="Username" />
                 )}
               </FormItem>
            </Col>
            <Col span={24}>
              <FormItem label='保质期' {...formItemLayout}>
                 {getFieldDecorator('expdays')(
                   <Input placeholder="Username" />
                 )}
               </FormItem>
            </Col>
            <Col span={24}>
              <FormItem label='保质依据' {...formItemLayout}>
                 {getFieldDecorator('lotType')(
                   <Input placeholder="Username" />
                 )}
               </FormItem>
            </Col>
            <Col span={24}>
              <FormItem label='禁止入库' {...formItemLayout}>
                 {getFieldDecorator('lotLimitInDay')(
                   <Input placeholder="Username" />
                 )}
               </FormItem>
            </Col>
            <Col span={24}>
              <FormItem label='加入上新' {...formItemLayout}>
                 {getFieldDecorator('eventNew')(
                   <Input placeholder="Username" />
                 )}
               </FormItem>
            </Col>
            <Col span={24}>
              <FormItem label='加入畅销' {...formItemLayout}>
                 {getFieldDecorator('eventHot')(
                   <Input placeholder="Username" />
                 )}
               </FormItem>
            </Col>
            <Col span={24}>
              <FormItem label='直邮商品' {...formItemLayout}>
                 {getFieldDecorator('isDirectExpress')(
                   <Input placeholder="Username" />
                 )}
               </FormItem>
            </Col>
            <Col span={24}>
              <FormItem label='预售商品' {...formItemLayout}>
                 {getFieldDecorator('isPresell')(
                   <Input placeholder="Username" />
                 )}
               </FormItem>
            </Col>
            <Col span={24}>
              <FormItem label='箱规销售' {...formItemLayout}>
                 {getFieldDecorator('containerSpec')(
                   <Input placeholder="Username" />
                 )}
               </FormItem>
            </Col>
            <Col span={24}>
              <FormItem label='分成类别' {...formItemLayout}>
                 {getFieldDecorator('containerSpec')(
                   <Input placeholder="Username" />
                 )}
               </FormItem>
            </Col>
            <Col span={24}>
              <FormItem label='商品描述' {...formItemLayout}>
                 {getFieldDecorator('ssd')(
                   <Input placeholder="Username" />
                 )}
               </FormItem>
            </Col>
            <Col span={24} offset={2}>
              <FormItem label='' {...formItemLayout}>
                 <Button type="primary" htmlType="submit" size='large' onClick={this.handleSubmit.bind(this)}>搜索</Button>
               </FormItem>
            </Col>
          </Row>
        </Form>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { baseGoodsList } = state;
  return { baseGoodsList }
}

const AddGoods = Form.create()(AddGoodsForm);
export default connect(mapStateToProps)(AddGoods);
