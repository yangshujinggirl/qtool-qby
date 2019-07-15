import React, { Component } from 'react';
import { Table, Button, Form, Input } from 'antd';
import { connect } from 'dva';
import ModDis from './components/MainMod';
import ImportBtn from './components/ImportBtn';
import {
  getSaveApi,getListApi
} from '../../../../services/cConfig/homeConfiguration/moreGoodsSet';
import './MoreGoodsSet.less';

//dispatch 更新数据源
const FormItem = Form.Item;
class Mod extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.getList()
  }
  //查询
  getList() {
    let params={
      homepageModuleId:20,
    }
    this.props.dispatch({
      type:'moreGoodsSet/fetchList',
      payload:params
    })
  }
  //提交
  submit=(func)=> {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let { fieldsTwo, fieldsOne  } =values;
        let params = {
          homePageModuleId:20,
          pdSpuList:[...fieldsOne,...fieldsTwo]
        };
        getSaveApi(params)
        .then((res) => {
          console.log(res)
        })
      }
    });
  }
  //导入更新
  uploadData(data) {
    console.log(data)
  }
  //下载
  downLoadTep=()=>{
		window.open('../../static/order.xlsx');
	}
  callBack=(goods)=> {
    this.props.dispatch({
      type:'moreGoodsSet/getGoodsList',
      payload:goods
    })
  }
  render() {
    const { goods } =this.props;
    const { form } =this.props;

    return (
      <div className="more-goods-set-mod">
        <div className="part-top">
          <div className="row-btn">
            <ImportBtn uploadData={this.uploadData}/>
            <Button
              onClick={this.downLoadTep}
              size="large"
              type="primary">
                下载附件模版
            </Button>
          </div>
          <div>
            已选6/100
          </div>
        </div>
        <p className="tips">注：首页单行横划商品模块固定展示8件商品，按照以下顺序展示，售罄或下架商品不展示，由后位商品按照顺序补充</p>
        <ModDis
          callBack={this.callBack}
          form={this.props.form}/>
        <div className="handle-btn-footer">
          <Button
            onClick={this.submit}
            size="large"
            type="primary">
              保存
          </Button>
        </div>
      </div>
    );
  }
}

const MoreGoodsSet = Form.create({
  onValuesChange(props, changedFields, allFields) {
    let { fieldsTwo, fieldsOne } = allFields;
    let { listTwo, listOne } =props.goods;
    listTwo = listTwo.map((el,index) => {
      fieldsTwo.map((item,idx)=> {
        if(index == idx) {
          el = {...el,...item};
        }
      })
      return el;
    })
    listOne = listOne.map((el,index) => {
      fieldsOne.map((item,idx)=> {
        if(index == idx) {
          el = {...el,...item};
        }
      })
      return el;
    })
    let goods = { listTwo, listOne };
    props.dispatch({
      type:'moreGoodsSet/getGoodsList',
      payload:goods
    })
  },
  mapPropsToFields(props) {
    return {
      fieldsOne: Form.createFormField(props.listOne),
      fieldsTwo: Form.createFormField(props.listtwo),
    };
  }
})(Mod);

function mapStateToProps(state) {
  const { moreGoodsSet } =state;
  return moreGoodsSet;
}
export default connect(mapStateToProps)(MoreGoodsSet);
