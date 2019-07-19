import React, { Component } from 'react';
import { connect } from 'dva';
import { Button } from 'antd';
import Countdown from 'react-countdown-now';
import TitleM from '../TitleM';
import Line from '../Line';
import CommonMod from '../CommonMod';
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
    let { productDisplay } =this.props.info;
    let { homepageModuleId, moduleContent, moduleBackColor,isDisplay } =productDisplay;
    const fileDomain = JSON.parse(sessionStorage.getItem('fileDomain'));
    const endDate = new Date('2019-8-24') // Christmas, yay
    return(
      <CommonMod
        homepageModuleId={homepageModuleId}
        className={`goods-mod ${!isDisplay?'hiddle-module':''}`}
        style={{'background':`#${moduleBackColor}`}}>
        <div className="mod-wrap">
          <div className="mod-common-head">
            <div className="hd-item">
              <TitleM title={productDisplay.title} type={productDisplay.titleColor}/>
              { productDisplay.isDisplayCountdown&&<Countdown date={endDate} />}
            </div>
            {
              productDisplay.isDisplayMore&&<p className="hd-item">查看更多</p>
            }
          </div>
          {
            moduleContent&&moduleContent.length>0?
            <div className="swiper-container goods-swiper-container">
              <div className="swiper-wrapper">
                {
                  moduleContent.map((el,index) => (
                    <div className="swiper-slide" key={index}>
                      <div className="item-icon">
                        <div className="pic-wrap"><img src={`${fileDomain}${pdPic}`}/></div>
                        <p className="title-level-one textTwoLine">{el.name}</p>
                        <p className="price">¥999.0</p>
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>
            :
            <div className="no-module-data goods-no-module">商品模块</div>
          }
        </div>
        <div className="handle-btn-action">
          {
            !this.props.data.info&&
            <div>
              <Button onClick={this.goEdit}>编辑</Button>
              <Button onClick={()=>this.props.toggleShow(homepageModuleId,isDisplay)}>{isDisplay?'隐藏':'展开'}</Button>
            </div>
          }
        </div>
      </CommonMod>
    )
  }
}

function mapStateToProps(state) {
  const { homeEdit } =state;
  return homeEdit;
}
export default connect(mapStateToProps)(GoodsMod);
