import React, { Component } from 'react';
import { Table, Button, Form, Input, message } from 'antd';
import { connect } from 'dva';
import ModDis from './components/MainMod';
import ImportBtn from './components/ImportBtn';
import {
  getSaveApi,getListApi,getSearchIdApi
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
    const { homepageModuleId } =this.props.data;
    this.props.dispatch({
      type:'moreGoodsSet/fetchList',
      payload:{homepageModuleId}
    })
  }
  //提交
  submit=(func)=> {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let { fieldsTwo, fieldsOne  } =values;
        let pdSpuList;
        if(fieldsOne&&fieldsTwo) {
          pdSpuList =[...fieldsOne,...fieldsTwo]
        } else if(fieldsOne) {
          pdSpuList = fieldsOne;
        } else if(fieldsTwo) {
          fieldsOne = fieldsTwo;
        }
        const { homepageModuleId } =this.props.data;
        const { totalList } =this.props;
        if(totalList.length<6) {
          message.error('请至少配置6个商品');
          return;
        }
        let params = {
          homePageModuleId:homepageModuleId,
          pdSpuList:pdSpuList
        };
        this.props.dispatch({ type: 'tab/loding', payload:true});
        getSaveApi(params)
        .then((res) => {
          if(res.code == 0) {
            message.success('保存成功');
            this.getList()
          }
          this.props.dispatch({ type: 'tab/loding', payload:false});
        })
      }
    });
  }
  //导入更新
  callback=(list)=> {
    this.props.dispatch({
      type:'moreGoodsSet/getGoodsList',
      payload:list
    });
    this.props.dispatch({
      type:'moreGoodsSet/getAddkey',
      payload:list.length
    });
    this.props.form.resetFields()
  }
  //下载
  downLoadTep=()=>{
		window.open('../../../../static/MultilLine_In.xlsx');
	}
  render() {
    const { goods, totalList } =this.props;

    return (
      <div className="more-goods-pages common-modal-set-component">
        <div className="part-top">
          <div className="row-btn">
            <ImportBtn
              dispatch={this.props.dispatch}
              callback={this.callback}/>
            <Button
              onClick={this.downLoadTep}
              size="large"
              type="primary">
                下载附件模版
            </Button>
          </div>
          <div>
            已选{totalList.length}/100
          </div>
        </div>
        <p className="tips">注：首页2行3列商品模块固定展示6件商品，按照以下顺序展示，B端在售库存为0或下架商品不展示，由后位商品按照顺序补充</p>
        <ModDis
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
    let totalList = [...listOne, ...listTwo]
    props.dispatch({
      type:'moreGoodsSet/getGoodsList',
      payload:totalList
    })
  },
})(Mod);

function mapStateToProps(state) {
  const { moreGoodsSet } =state;
  return moreGoodsSet;
}
export default connect(mapStateToProps)(MoreGoodsSet);
