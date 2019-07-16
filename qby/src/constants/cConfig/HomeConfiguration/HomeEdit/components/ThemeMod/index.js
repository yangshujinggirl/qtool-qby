import React, { Component } from "react";
import { connect } from 'dva';
import { Button } from "antd";
import Swiper from "swiper/dist/js/swiper.js";
import "./index.less";

class ThemeMod extends Component {
  goEdit = () => {
    const { componkey } = this.props;
    const paneitem = {
      title: "主题模块",
      key: `${componkey}edit-theme`,
      componkey: `${componkey}edit-theme`,
      data: {homepageModuleId:this.props.info.themeActivity.homepageModuleId}
    };
    this.props.dispatch({
      type: "tab/firstAddTab",
      payload: paneitem
    });
  };
  componentDidMount() {
    new Swiper(".theme-swiper-container", {
      slidesPerView: 3,
      spaceBetween: 10,
      pagination: {
        el: ".swiper-pagination",
        clickable: true
      }
    });
  }
  render() {
    const dataList = [
      {
        name:
          "这是主题主题的标题两行商品喂乳用品名称最多两行商品名称最多两行商品名称最多两行",
        desc: "这是主题主题的副标题"
      },
      {
        name: "喂乳用品",
        desc: "这是主题主题的副标题"
      },
      {
        name: "婴幼玩具",
        desc: "这是主题主题的副标题"
      },
      {
        name: "尿裤湿巾",
        desc: "这是主题主题的副标题"
      },
      {
        name: "衣衣",
        desc: "这是主题主题的副标题"
      },
      {
        name: "奶嘴",
        desc: "这是主题主题的副标题"
      },
      {
        name: "奶瓶",
        desc: "这是主题主题的副标题"
      }
    ];
    return (
      <div className="common-sty theme-mod">
        <div className="mod-wrap">
          <div className="mod-common-head">
            <div className="hd-item">主题模块</div>
            <p className="hd-item">查看更多</p>
          </div>
          <div className="swiper-container theme-swiper-container">
            <div className="swiper-wrapper">
              {dataList.map((el, index) => (
                <div className="swiper-slide" key={index}>
                  <div className="item-icon">
                    <div className="pic-wrap">
                      <img src="" />
                    </div>
                    <p className="title-level-one">{el.name}</p>
                    <p className="price">{el.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="handle-btn-action">
          <Button>查看</Button>
          <Button onClick={this.goEdit}>编辑</Button>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { homeEdit } = state;
  return homeEdit;
}
export default connect(mapStateToProps)(ThemeMod);
