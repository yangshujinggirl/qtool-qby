import React, { Component } from "react";
import { connect } from 'dva';
import { Button } from "antd";
import Swiper from "swiper/dist/js/swiper.js";
import "./index.less";

class ThemeMod extends Component {
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
  render() {
    let { moduleContent, backgroundPicUrl } =this.props.info.themeActivity;
    const fileDomain = JSON.parse(sessionStorage.getItem('fileDomain'));
    backgroundPicUrl = `${fileDomain}${backgroundPicUrl}`;
    return (
      <div className="common-sty theme-mod" style={{'background':`#fff url(${backgroundPicUrl})`}}>
        <div className="mod-wrap">
          <div className="mod-common-head">
            <div className="hd-item">主题模块</div>
            <p className="hd-item">查看更多</p>
          </div>
          {
            moduleContent&&moduleContent.length>0?
            <div className="swiper-container theme-swiper-container">
              <div className="swiper-wrapper">
                {moduleContent.map((el, index) => (
                  <div className="swiper-slide" key={index}>
                    <div className="item-icon">
                      <div className="pic-wrap">
                        <img src={el.themePic} />
                      </div>
                      <p className="title-level-one">{el.themeTitle}</p>
                      <p className="price">{el.subtitle}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            :
            <div className="no-module-data theme-noData">主题模块</div>
          }
        </div>
        <div className="handle-btn-action">
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
