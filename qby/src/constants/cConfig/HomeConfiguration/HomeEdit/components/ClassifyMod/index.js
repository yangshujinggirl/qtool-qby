import React, { Component } from 'react';
import { Button } from 'antd';
import { connect } from 'dva';
import Swiper from 'swiper/dist/js/swiper.js';
import TitleM from '../TitleM';
import Line from '../Line';
import CommonMod from '../CommonMod';
import './index.less';

class ClassifyMod extends Component {
  componentDidMount() {
    new Swiper ('.classify-swiper-container', {
            slidesPerView: 5,
            spaceBetween: 8,
            slidesPerGroup: 3,
            loopFillGroupWithBlank: true,
            observer: true,
            observeParents:true,
        })
  }
  //编辑
  goEdit=()=> {
    const { componkey } =this.props;
    const paneitem={
      title:'商品流设置',
      key:`${componkey}edit-commodity`,
      componkey:`${componkey}edit-commodity`,
      parentKey:componkey,
      data:{
        homepageModuleId:this.props.info.flowProduct.homepageModuleId
      }
    };
    this.props.dispatch({
        type:'tab/firstAddTab',
        payload:paneitem
    })
  }
  toggleType=(el)=> {
    this.props.dispatch({
        type:'homeEdit/fetchGoodsInfo',
        payload:{pdFlowTabId:el.pdFlowTabId}
    })
  }
  render() {
    let { flowProduct } =this.props.info;
    let { moduleContent, moduleBackColor, isDisplay, homepageModuleId } =flowProduct;
    let { flowProductList } =this.props;
    const fileDomain = JSON.parse(sessionStorage.getItem('fileDomain'));

    return(
      <CommonMod
        homepageModuleId={homepageModuleId}
        className="classify-mod">
        <div>
        {
          moduleContent&&moduleContent.length>0?
          <div className="mod-wrap">
            <div className="mod-common-head">
              <div className="hd-item">
                推荐
              </div>
              <div className="hd-item classify-item">
                <div className="swiper-container classify-swiper-container">
                  <div className="swiper-wrapper">
                    {
                      moduleContent.map((el,index) => (
                        <div className="swiper-slide" key={el.pdFlowTabId} onClick={()=>this.toggleType(el)}>
                          <span className="classify-name">{el.tabName}</span>
                        </div>
                      ))
                    }
                  </div>
                </div>
              </div>
            </div>
            {
              flowProductList.length>0&&
              <div className="mod-content">
                {
                  flowProductList.map((el,index) => (
                    <div className="item-icon" key={index}>
                      <div className="pic-wrap"><img src={`${fileDomain}${el.pdPic}`}/></div>
                      <p className="title-level-one textTwoLine">
                        {
                          el.nationalflagPic&&
                          <span className="icon-flag">
                            {
                              <img src={`${fileDomain}${el.nationalflagPic}`}/>
                            }
                          </span>
                        }
                        {el.name}
                      </p>
                      <p className="price">¥{el.showPrice}</p>
                      {
                        el.tags&&
                        <p className="label-action">
                          <span className="lab-item">{el.tags}</span>
                        </p>
                      }
                    </div>
                  ))
                }
              </div>
            }
          </div>
          :
          <div className="no-module-data classify-noData">商品流模块</div>
        }
          <div className="handle-btn-action">
            {
              !this.props.data.info&&
              <Button onClick={this.goEdit}>编辑</Button>
            }

          </div>
        </div>
      </CommonMod>
    )
  }
}
function mapStateToProps(state) {
  const { homeEdit } =state;
  return homeEdit;
}

export default connect(mapStateToProps)(ClassifyMod);
