import React, { Component } from "react";
import { connect } from 'dva';
import { Button } from "antd";
import Swiper from "swiper/dist/js/swiper.js";
import TitleM from '../TitleM';
import Line from '../Line';
import CommonMod from '../CommonMod';
import "./index.less";

class ThemeMod extends Component {
  componentDidMount() {
    new Swiper(".theme-swiper-container", {
      slidesPerView: 3,
      spaceBetween: 10,
      observer: true,
      observeParents:true,
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
    let { themeActivity } =this.props.info;
    let { moduleContent, moduleBackColor, homepageModuleId } =themeActivity;
    const fileDomain = JSON.parse(sessionStorage.getItem('fileDomain'));
    return (
      <CommonMod
        homepageModuleId={homepageModuleId}
        className="theme-mod"
        style={{'background':`#${moduleBackColor}`}}>
        <div>
          <div className="mod-wrap">
            <div className="mod-common-head">
              <TitleM title={themeActivity.title} type={themeActivity.titleColor}/>
              {!!themeActivity.isDisplayMore&&<p className="hd-item">查看更多</p>}
            </div>
            {
              moduleContent&&moduleContent.length>0?
              <div className="swiper-container theme-swiper-container">
                <div className="swiper-wrapper">
                  {moduleContent.map((el, index) => (
                    <div className="swiper-slide" key={index}>
                      <div className="item-icon">
                        <div className="pic-wrap">
                          <img src={`${fileDomain}${el.themePic}`} />
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
            {
              !this.props.data.info&&
              <Button onClick={this.goEdit}>编辑</Button>
            }
          </div>
        </div>
      </CommonMod>
    );
  }
}

function mapStateToProps(state) {
  const { homeEdit } = state;
  return homeEdit;
}
export default connect(mapStateToProps)(ThemeMod);
