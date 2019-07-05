import React, { Component } from 'react';
import { connect } from 'dva';
import { Button } from 'antd';
import Swiper from 'swiper/dist/js/swiper.js';
import './index.less';

class MoreGoodsMod extends Component {
  componentDidMount() {

  }
  goEdit=()=> {
    const { componkey } = this.props;
    const paneitem={
      title:'2行3列商品模块配置',
      key:`${componkey}edit-more-goods`,
      componkey:`${componkey}edit-more-goods`,
      data:{}
    };
    this.props.dispatch({
        type:'tab/firstAddTab',
        payload:paneitem
    })
  }
  render() {
    const dataList=[{
      name:'商品名称最多两行商品喂乳用品名称最多两行商品名称最多两行商品名称最多两行',
    },{
      name:'喂乳用品',
    },{
      name:'婴幼玩具',
    },{
      name:'尿裤湿巾',
    },{
      name:'衣衣',
    },{
      name:'奶嘴',
    }]
    return(
      <div className="common-sty more-goods-mod">
        <div className="mod-wrap">
          <div className="mod-common-head">
            <div className="hd-item">
              2行3列商品模块
            </div>
            <p className="hd-item">查看更多</p>
          </div>
          <div className="mod-content">
            {
              dataList.map((el,index) => (
                <div className="item-icon" key={index}>
                  <div className="pic-wrap"><img src=''/></div>
                  <p className="title-level-one textTwoLine">{el.name}</p>
                  <p className="price">¥999.0</p>
                </div>
              ))
            }
          </div>
        </div>
        <div className="handle-btn-action">
          <Button>查看</Button>
          <Button onClick={this.goEdit}>编辑</Button>
          <Button>隐藏</Button>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { homeEdit } =state;
  return homeEdit;
}
export default connect(mapStateToProps)(MoreGoodsMod);
