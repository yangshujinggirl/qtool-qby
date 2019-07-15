import React, { Component } from 'react';
import { DatePicker, Form, Select, Col, Row, Input, Button, Radio } from 'antd';
import { connect } from 'dva';
import lodash from 'lodash';
import GoodsTable from '../GoodsTable';
import ClassifyMod from '../ClassifyMod';
import './index.less';

const RangePicker = DatePicker.RangePicker;
const formItemLayout = {
      labelCol: { span: 2},
      wrapperCol: { span: 16 },
    };
const FormItem = Form.Item;
const Option = Select.Option;
const radioStyle = {
      display: 'block',
      height: '30px',
      lineHeight: '30px',
    };

class ModForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      radioVal:1,
      sortVal:0
    }
  }
  //排序类型
  changeRadio=(e)=> {
    let value = e.target.value;
    this.setState({ radioVal:value })
  }
  //天数排数
  selectSaleSort=(e)=> {
    this.setState({ sortVal:e })
  }
  //提交
  submit=(func)=> {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log(values)
        // let { fieldsTwo, fieldsOne  } =values;
        // let params = {
        //   homePageModuleId:20,
        //   pdSpuList:[...fieldsOne,...fieldsTwo]
        // };
        // getSaveApi(params)
        // .then((res) => {
        //   console.log(res)
        // })
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { categoryData, goodsList, totalData } =this.props;
    const { radioVal, sortVal } =this.state;
    console.log(totalData)
    return(
      <div className="commodity-main-mod">
        <Form>
          <ClassifyMod form={this.props.form}/>
          <div className="part-two part-same">
            <p className="part-head">商品排序规则</p>
            <FormItem label="优先顺序" className="sort-formItem-wrap">
            {
              getFieldDecorator('sortType',{
                initialValue:totalData.sortType?totalData.sortType:10,
                onChange:this.changeRadio
              })(
                <Radio.Group>
                  <Radio style={radioStyle} value={10}>
                    按上架时间倒序排列
                  </Radio>
                  <Radio style={radioStyle} value={20}>
                    按销量排序
                  </Radio>
                  <Radio style={radioStyle} value={30}>
                    自定义排序
                  </Radio>
                </Radio.Group>
              )
            }
            </FormItem>
            {
              totalData.sortType==20&&
              <Row className="sort-row">
                <Col span={6}>
                  <FormItem>
                  {
                    getFieldDecorator('ruleType',{
                      initialValue:0,
                      onChange:(select)=>this.selectSaleSort(select)
                    })(
                      <Select
                        className="sale-type-select"
                        placeholder="请选择销量类型"
                        autoComplete="off">
                        <Option
                          value={0}
                          key={0}>固定天数销量</Option>
                        <Option
                          value={1}
                          key={1}>固定时间段销量</Option>
                        <Option
                          value={2}
                          key={2}>累计销量</Option>
                      </Select>
                    )
                  }
                  </FormItem>
                </Col>
                <Col span={8} >
                {
                  sortVal==0&&
                  <FormItem className="fixed-days-formItem">
                    最近
                    {
                      getFieldDecorator('day')(
                        <Input placeholder="请输入" autoComplete="off"/>
                      )
                    }
                    天
                  </FormItem>
                }
                {
                  sortVal==1&&
                  <FormItem className="fixed-dateTime-formItem">
                    {
                      getFieldDecorator('creatTime')(
                        <RangePicker
                          format="YYYY-MM-DD HH:mm:ss"/>
                      )
                    }
                  </FormItem>
                }
                </Col>
              </Row>
            }
            {
              radioVal ==3&&
              <div className="sort-row">按顺序选择你要排列的属性商品，若存在一个商品有多个属性，则具有多重属性的商品排名靠前，属性越多排名越靠前。</div>
            }
          </div>
          <div className="part-thr part-same">
            <div className="tables-info-desc">
              <p>已添加6件商品，每个tab固定展示40件商品，请再添加34个商品</p>
              <p>已选 {goodsList.length}/100</p>
            </div>
            <GoodsTable form={this.props.form}/>
          </div>
          <div className="handle-btn-footer">
            <Button
              onClick={this.submit}
              size="large"
              type="primary">
                保存
            </Button>
          </div>
        </Form>
      </div>
    )
  }
}
const Mod = Form.create({
  onValuesChange(props, changedFields, allFields) {
    let { goodsList } =props;
    let { spuList } =allFields;
    goodsList = goodsList.map((el,index) => {
      spuList.map((item,idx) => {
        if(index == idx) {
          el = {...el,...item}
        }
      })
      return el;
    })
    props.dispatch({
      type:'commodityFlow/getGoodsList',
      payload:goodsList
    })
  },
  // mapPropsToFields(props) {
  //   return {
  //     spuList: Form.createFormField(props.goodsList),
  //   };
  // }
})(ModForm);
function mapStateToProps(state) {
  const { commodityFlow } =state;
  return commodityFlow;
}
// export default BannerMod;
export default connect(mapStateToProps)(Mod);
