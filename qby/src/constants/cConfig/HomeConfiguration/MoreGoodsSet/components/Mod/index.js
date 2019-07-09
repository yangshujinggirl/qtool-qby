import React, { Component } from 'react';
import { Table, Button, Form } from 'antd';
import { connect } from 'dva';
import { DndProvider, DragSource, DropTarget } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import update from 'immutability-helper';
import DragField from '../DragField';
import ImportBtn from '../ImportBtn';
import {
  getSaveApi,getListApi
} from '../../../../../../services/cConfig/homeConfiguration/moreGoodsSet';
import { columnsFun, columnsTwoFun } from '../columns';
import './index.less';


class Mod extends Component {
  constructor(props) {
    super(props);
    this.state = {
      goods:{
        listOne:[],
        listTwo:[],
      },
      key:0,
    }
  }
  componentDidMount() {
    this.getList()
  }
  //查询
  getList() {
    let params={
      homepageModuleId:20,
    }
    getListApi(params)
    .then((res) => {

    })
    const goods= {
      listOne:[
        {
          key: '0',
          pdSpuName: '苏州店主',
          Spuid:'6789',
          pdCategory:'一级商品分类',
          pdSpuPrice:'¥33.99-¥99.33',
          wsInv:'1290',
          outOfStockShopNum:'2家',
          sellingPoints:'2',
          tags:'hot',
        },
        {
          key: '1',
          pdSpuName: '苏州店主',
          pdCategory:'一级商品分类',
          pdSpuPrice:'¥33.99-¥99.33',
          wsInv:'1290',
          outOfStockShopNum:'2家',
          sellingPoints:'2',
          tags:'hot',
        },
        {
          key: '2',
          pdSpuName: '苏州店主',
          pdCategory:'一级商品分类',
          pdSpuPrice:'¥33.99-¥99.33',
          wsInv:'1290',
          outOfStockShopNum:'2家',
          sellingPoints:'2',
          tags:'hot',
        },
      ],
      listTwo:[
        {
          key: '4',
          pdSpuName: '店主',
          pdCategory:'1级商品分类',
          pdSpuPrice:'¥33.99-¥99.33',
          wsInv:'1290',
          outOfStockShopNum:'2家',
          sellingPoints:'2',
          tags:'hot',
        },
      ]
    }
    this.setState({ key:6, goods })
  }
  //表单change
  handleChange=(listType,name,e,index)=> {
    let value;
    value = e.target.value;
    let { goods } =this.state;
    if(!value) {
      goods[listType][index][name]=null;
    } else {
      goods[listType][index][name]=value;
    }
    this.setState({ goods });
  }
  //code
  handleBlur=(listType,e,index)=> {
    let value;
    value = e.target.value;
    if(!value) {
      return;
    }
    this.getSearch(listType,value,index)
  }
  //code查询商品
  getSearch(listType,value,index) {
    let { goods } =this.state;
    let res={
      pdSpuName: '奶粉',
      Spuid:'3456',
      pdCategory:'3级商品分类',
      pdSpuPrice:'¥200-¥999.33',
      wsInv:'1290',
      outOfStockShopNum:'2家',
    };
    goods[listType] = goods[listType].map((el,idx) => {
      if(index == idx) {
        el = {...el,...res}
      };
      return el
    });
    this.setState({ goods })
  }
  //新增
  handleAdd=()=> {
    let { key, dataList, goods } =this.state;
    let { listOne, listTwo } =goods;
    key++;
    if(listOne.length>=6) {
      listTwo.push({ key })
    }  else {
      listOne.push({ key })
    }
    goods={ ...goods,listOne, listTwo};
    this.setState({ key:key, goods  });
  }
  //表单事件
  onOperateClick=(record,listType,type)=> {
    switch(type) {
      case 'delete':
        this.handleDelete(listType,record);
        break;
    }
  }
  //删除
  handleDelete=(listType,record)=> {
    let { goods } =this.state;
    goods[listType] = goods[listType].filter(item => item.key !== record.key)
    this.setState({ goods  });
  }
  moveRow = (dragParent, hoverParent, dragIndex, hoverIndex) => {
    let { goods } =this.state;
    // let tempHover = data[dragParent].splice(dragIndex,1);
    // let tempDrag = data[hoverParent].splice(hoverIndex,1);
    let tempHover = goods[dragParent][dragIndex];
    let tempDrag = goods[hoverParent][hoverIndex];
    goods[hoverParent].splice(hoverIndex, 1, tempHover);
    goods[dragParent].splice(dragIndex, 1, tempDrag);
    this.setState({ goods });
  };
  //提交
  submit=(func)=> {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log(values)
        let { listOne, listTwo } =values;
        let params = {
          homePageModuleId:20,
          pdSpuList:[...listOne,...listTwo]
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
  render() {
    const { goods } =this.state;
    const { form } =this.props;
    let columnsOne = columnsFun(form,this.handleChange,this.handleBlur);
    let columnsTwo = columnsTwoFun(form,this.handleChange,this.handleBlur);
    console.log(goods)
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
        <DragField
          columnsOne={columnsOne}
          columnsTwo={columnsTwo}
          handleAdd={this.handleAdd}
          goods={goods}
          onOperateClick={this.onOperateClick}
          moveRow={this.moveRow}/>
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
const ModF = Form.create({
  // mapPropsToFields(props) {
  //   console.log(props)
  //   return {
  //     listOne: Form.createFormField(props.listOne),
  //     listtwo: Form.createFormField(props.listtwo),
  //   };
  // }
})(Mod);

function mapStateToProps(state) {
  return state;
}
export default connect(mapStateToProps)(ModF);
