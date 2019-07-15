import React, { Component } from 'react';
import { connect } from 'dva';
import { Button } from 'antd';
import Swiper from 'swiper/dist/js/swiper.js';
import './index.less';

class GoodsMod extends Component {
  componentDidMount() {
    new Swiper('.goods-swiper-container', {
      slidesPerView: 3,
      spaceBetween: 10,
      slidesPerGroup: 3,
      loopFillGroupWithBlank: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
    });
  }
  goEdit=()=> {
    const { componkey } = this.props;
    const paneitem={
      title:'单行商品设置',
      key:`${componkey}edit-goods`,
      componkey:`${componkey}edit-goods`,
      data:{
        homepageModuleId:this.props.info.productDisplay.homepageModuleId
      }
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
    },{
      name:'奶瓶',
    }]
    return(
      <div className="common-sty goods-mod">
        <div className="mod-wrap">
          <div className="mod-common-head">
            <div className="hd-item">
              商品模块
              <span className="count-times">
                <span className="time-num">24</span>
                :
                <span className="time-num">13</span>
                :
                <span className="time-num">13</span>
              </span>
            </div>
            <p className="hd-item">查看更多</p>
          </div>
          <div className="swiper-container goods-swiper-container">
            <div className="swiper-wrapper">
              {
                dataList.map((el,index) => (
                  <div className="swiper-slide" key={index}>
                    <div className="item-icon">
                      <div className="pic-wrap"><img src=''/></div>
                      <p className="title-level-one textTwoLine">{el.name}</p>
                      <p className="price">¥999.0</p>
                    </div>
                  </div>
                ))
              }
            </div>
            {/* <div className="swiper-pagination"></div> */}
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
export default connect(mapStateToProps)(GoodsMod);
