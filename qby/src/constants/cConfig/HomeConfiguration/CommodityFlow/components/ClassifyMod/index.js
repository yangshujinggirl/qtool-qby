import React, { Component } from 'react';
import { Form, Select, Col, Row, Input, Button, Radio } from 'antd';
import { connect } from 'dva';
import lodash from 'lodash';
import { getAddApi } from '../../../../../../services/cConfig/homeConfiguration/commodityFlow';

import ImportBtn from '../ImportBtn';

const FormItem = Form.Item;
const Option = Select.Option;

class ClassifyMod extends Component {
  constructor(props) {
    super(props);
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
    const { categoryData } =this.props;
    const { pdCategory1Id, pdCategory2Id, pdCategory3Id, pdCategory4Id } =this.props.form.getFieldsValue();
    let pdCategory = {
      pdCategory1Id, pdCategory2Id, pdCategory3Id, pdCategory4Id
    }
    let paramsStr=null;
    for( let key in pdCategory) {
      if(pdCategory[key]) {
        paramsStr = paramsStr?`${paramsStr}-`:'';
        paramsStr+= pdCategory[key];
      }
    }
    if(!paramsStr) {
      return;
    }
    this.props.dispatch({ type: 'tab/loding', payload:true});
    getAddApi({catalogListStr:paramsStr})
    .then((res) => {
      const { spuList, code } =res;
      if(code == 0) {
        let { goodsList } =this.props;
        for(var i=0;i<goodsList.length;i++){
            for(var j = 0;j<spuList.length;j++){
              if(goodsList[i].pdSpuId == spuList[j].pdSpuId) {
                spuList.splice(j,1);
              }
            }
        }
        goodsList =[...goodsList,...spuList]
        goodsList.map((el,index) => {
          el.FixedPdSpuId = el.pdSpuId;
          if(!el.key) {
            el.key = index
          }
        })
        this.props.dispatch({
          type:'commodityFlow/getGoodsList',
          payload:goodsList
        })
        this.props.dispatch({
          type:'commodityFlow/getGdAddKey',
          payload:goodsList.length
        })
      }
      this.props.dispatch({ type: 'tab/loding', payload:false});
    })
  }
  //下载
  downLoad=()=> {
    console.log('下载')
  }
  callback=(goodsList)=> {
    this.props.dispatch({
      type:'commodityFlow/getGoodsList',
      payload:goodsList
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { categoryData } =this.props;
    const {
      categoryLevelOne,
      categoryLevelTwo,
      categoryLevelThr,
      categoryLevelFour,
      isLevelTwo,isLevelThr,isLevelFour
     } =categoryData;

    return(
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
          <ImportBtn
            callback={this.callback}/>
          <Button
            size="large"
            type="primary"
            className="btn-item"
            onClick={this.downLoad}>
              下载导入模板
          </Button>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { commodityFlow } =state;
  return commodityFlow;
}
// export default BannerMod;
export default connect(mapStateToProps)(ClassifyMod);
