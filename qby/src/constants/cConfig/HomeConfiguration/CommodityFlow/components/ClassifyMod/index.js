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
  }
  //添加
  handleAdd=()=> {
    let { categoryData, goodsList } =this.props;
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
    if(goodsList.length==100) {
      message.error('商品数量已满100，请删除后再添加');
      return;
    }
    this.props.dispatch({ type: 'tab/loding', payload:true});
    getAddApi({catalogListStr:paramsStr})
    .then((res) => {
      const { spuList, code } =res;
      if(code == 0) {
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
    window.open('../../../../../../static/pdSpuFlow.xls');
  }
  callback=(goodsList)=> {
    this.props.dispatch({
      type:'commodityFlow/getGoodsList',
      payload:goodsList
    })
    this.props.dispatch({
      type:'commodityFlow/getGdAddKey',
      payload:goodsList.length
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
                initialValue:categoryData.pdCategory1Id?categoryData.pdCategory1Id:undefined,
                onChange:(select)=>this.handleChangeLevel(1,select)
              })(
               <Select placeholder="请选择一级分类">
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
                initialValue:categoryData.pdCategory2Id?categoryData.pdCategory2Id:undefined,
                onChange:(select)=>this.handleChangeLevel(2,select)
              })(
                <Select
                  placeholder="请选择二级分类"
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
                initialValue:categoryData.pdCategory3Id?categoryData.pdCategory3Id:undefined,
                onChange:(select)=>this.handleChangeLevel(3,select)
              })(
                <Select
                  placeholder="请选择三级分类"
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
              getFieldDecorator('pdCategory4Id',{
                initialValue:categoryData.pdCategory4Id?categoryData.pdCategory4Id:undefined,
              })(
                <Select
                  placeholder="请选择四级分类"
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
            dispatch={this.props.dispatch}
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
