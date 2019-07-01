import React, { Component } from 'react';
import { DatePicker, Form, Select, Col, Row, Input, Button, Radio } from 'antd';
import { connect } from 'dva';
import lodash from 'lodash';
import BaseEditTable from '../../../../../../components/BaseEditTable';
import GoodsTable from '../GoodsTable';
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
  componentDidMount(props) {
    this.props.dispatch({
      type:'commodityFlow/fetchCategory',
      payload:{
        level:1,
        parentId:null
			}
    })
  }
  //分类change事件
  handleChangeLevel (level,selected) {
    level++;
    this.props.dispatch({
      type:'commodityFlow/fetchCategory',
      payload:{
        level,
        parentId:selected
      }
    })
    //请空表单中的value值
    switch(level) {
      case 2:
        this.props.form.resetFields(["pdCategory2Id","pdCategory3Id","pdCategory4Id"])
        break;
      case 3:
        this.props.form.resetFields(["pdCategory3Id","pdCategory4Id"])
        break;
      case 4:
        this.props.form.resetFields(["pdCategory4Id"])
        break;
    }
  }
  //添加
  handleAdd=()=> {
    console.log(this.props.form.getFieldsValue())
    const { categoryData } =this.props;
    const { pdCategory1Id, pdCategory2Id, pdCategory3Id, pdCategory4Id } =this.props.form.getFieldsValue();
    let pdCategory = {
      pdCategory1Id, pdCategory2Id, pdCategory3Id, pdCategory4Id
    }
    let paramsStr=null;
    for( let key in pdCategory) {
      if(pdCategory[key]) {
        paramsStr = paramsStr?`${paramsStr}/`:'';
        paramsStr+= pdCategory[key];
      }
    }
    if(!paramsStr) {
      return;
    }
    console.log(paramsStr)
  }
  //导入
  exportGds=()=> {
    console.log('批量导入')
  }
  //下载
  downLoad=()=> {
    console.log('下载')
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
  render() {
    const { getFieldDecorator } = this.props.form;
    const { categoryData, goodsList } =this.props;
    const {
      categoryLevelOne,
      categoryLevelTwo,
      categoryLevelThr,
      categoryLevelFour,
      isLevelTwo,isLevelThr,isLevelFour
     } =categoryData;
     const { radioVal, sortVal } =this.state;
    return(
      <div className="commodity-main-mod">
        <Form>
          <div className="part-one part-same">
            <p className="part-head">选择商品</p>
            <Row gutter={24}>
              <Col span={6}>
                <FormItem label='一级分类'>
                {
                  getFieldDecorator('pdCategory1Id',{
                    onChange:(select)=>this.handleChangeLevel(1,select)
                  })(
                   <Select placeholder="请选择商品分类">
                     {
                       categoryLevelOne.map((ele,index) => (
                         <Option
                           value={ele.pdCategoryId}
                           key={ele.pdCategoryId}>{ele.name}</Option>
                       ))
                     }
                   </Select>
                  )
                }
                </FormItem>
              </Col>
              <Col span={6}>
                <FormItem label='二级分类'>
                {
                  getFieldDecorator('pdCategory2Id',{
                    onChange:(select)=>this.handleChangeLevel(2,select)
                  })(
                    <Select
                      placeholder="请选择商品类型"
                      disabled={categoryData.isLevelTwo}
                      autoComplete="off">
                      {
                        categoryLevelTwo.map((ele,index) => (
                          <Option
                            value={ele.pdCategoryId}
                            key={ele.pdCategoryId}>{ele.name}</Option>
                        ))
                      }
                    </Select>
                  )
                }
                </FormItem>
              </Col>
              <Col span={6}>
                <FormItem label='三级分类'>
                {
                  getFieldDecorator('pdCategory3Id',{
                    onChange:(select)=>this.handleChangeLevel(3,select)
                  })(
                    <Select
                      placeholder="请选择商品类型"
                      disabled={categoryData.isLevelThr}
                      autoComplete="off">
                      {
                        categoryLevelThr.map((ele,index) => (
                          <Option
                            value={ele.pdCategoryId}
                            key={ele.pdCategoryId}>{ele.name}</Option>
                        ))
                      }
                    </Select>
                  )
                }
                </FormItem>
              </Col>
              <Col span={6}>
                <FormItem label='四级分类'>
                {
                  getFieldDecorator('pdCategory4Id')(
                    <Select
                      placeholder="请选择商品类型"
                      disabled={categoryData.isLevelFour}
                      autoComplete="off">
                      {
                        categoryData.categoryLevelFour.map((ele,index) => (
                          <Option
                            value={ele.pdCategoryId}
                            key={ele.pdCategoryId}>{ele.name}</Option>
                        ))
                      }
                    </Select>
                  )
                }
                </FormItem>
              </Col>
            </Row>
            <div className="handle-add-btn-list">
              <Button
                size="large"
                type="primary"
                className="btn-item"
                onClick={this.handleAdd}>
                  确定添加
              </Button>
              <Button
                size="large"
                type="primary"
                className="btn-item"
                onClick={this.exportGds}>
                  批量导入
              </Button>
              <Button
                size="large"
                type="primary"
                className="btn-item"
                onClick={this.downLoad}>
                  下载导入模板
              </Button>
            </div>
          </div>
          <div className="part-two part-same">
            <p className="part-head">商品排序规则</p>
            <FormItem label="优先顺序" className="sort-formItem-wrap">
            {
              getFieldDecorator('ruleType',{
                initialValue:1,
                onChange:this.changeRadio
              })(
                <Radio.Group>
                  <Radio style={radioStyle} value={1}>
                    按上架时间倒序排列
                  </Radio>
                  <Radio style={radioStyle} value={2}>
                    按销量排序
                  </Radio>
                  <Radio style={radioStyle} value={3}>
                    自定义排序
                  </Radio>
                </Radio.Group>
              )
            }
            </FormItem>
            {
              radioVal==2&&
              <Row className="sort-row">
                <Col span={6}>
                  <FormItem>
                  {
                    getFieldDecorator('sortType',{
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
        </Form>
      </div>
    )
  }
}
const Mod = Form.create({
  // mapPropsToFields(props) {
  //   return {
  //     // goodsList:Form.createFormField(props.goodsList),
  //   }
  // }
})(ModForm);
function mapStateToProps(state) {
  const { commodityFlow } =state;
  return commodityFlow;
}
// export default BannerMod;
export default connect(mapStateToProps)(Mod);
