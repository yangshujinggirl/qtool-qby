import React, { Component } from 'react';
import { Button } from 'antd';
import { connect } from 'dva';
import Swiper from 'swiper/dist/js/swiper.js';
import './index.less';

class ClassifyMod extends Component {
  componentDidMount() {
    new Swiper ('.classify-swiper-container', {
            slidesPerView: 5,
            spaceBetween: 8,
            slidesPerGroup: 3,
            loopFillGroupWithBlank: true,
            observer: true,
        })
  }
  //编辑
  goEdit=()=> {
    const { componkey } =this.props;
    const paneitem={
      title:'商品流设置',
      key:`${componkey}edit-commodity`,
      componkey:`${componkey}edit-commodity`,
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
    const fl =[{
        name:'尿裤湿巾',
      },{
        name:'奶粉辅食',
      },{
        name:'婴幼玩具',
      },{
        name:'尿裤湿巾',
      },{
        name:'分类5',
      },{
        name:'分类6',
      },{
        name:'分类7',
      },{
        name:'分类8',
      },{
        name:'分类9',
      },{
        name:'分类10',
      }]
    return(
      <div className="common-sty classify-mod">
        <div className="mod-wrap">
          <div className="mod-common-head">
            <div className="hd-item">
              推荐
            </div>
            <div className="hd-item classify-item">
              <div className="swiper-container classify-swiper-container">
                <div className="swiper-wrapper">
                  {
                    fl.map((el,index) => (
                      <div className="swiper-slide" key={index}>
                        <span className="classify-name">{el.name}</span>
                      </div>
                    ))
                  }
                </div>
              </div>
            </div>
          </div>
          <div className="mod-content">
            {
              dataList.map((el,index) => (
                <div className="item-icon" key={index}>
                  <div className="pic-wrap"><img src=''/></div>
                  <p className="title-level-one textTwoLine">
                    <span className="icon-flag"></span>
                    {el.name}
                  </p>
                  <p className="price">¥999.0</p>
                  <p className="label-action">
                    <span className="lab-item">热销</span>
                    <span className="lab-item">上新</span>
                    <span className="lab-item">上新</span>
                  </p>
                </div>
              ))
            }
          </div>
        </div>
        <div className="handle-btn-action">
          <Button>查看</Button>
          <Button onClick={this.goEdit}>编辑</Button>
        </div>
      </div>
    )
  }
}
function mapStateToProps(state) {
  const { homeEdit } =state;
  return homeEdit;
}

export default connect(mapStateToProps)(ClassifyMod);
