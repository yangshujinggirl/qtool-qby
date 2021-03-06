import react, { Component } from 'react';
import { Button } from 'antd';
import { connect } from 'dva';
import ErrorText from '../ErrorText';
import CommonMod from '../CommonMod';
import Swiper from 'swiper/dist/js/swiper.js';
import 'swiper/dist/css/swiper.min.css';
import './index.less';

let mySwiper;
class BannerMod extends Component {
  componentDidUpdate() {
    const { moduleContent } =this.props.info.banner;
    if(mySwiper&&mySwiper.el){//销毁
      mySwiper.destroy(true,true)
    }
    mySwiper = new Swiper ('.banner-swiper-container', {
          speed:200,
          observer: true,
          observeParents:true,
          observeSlideChildren:true,
          autoplay: {   //滑动后继续播放（不写官方默认暂停）
            disableOnInteraction: false,
          },
          pagination: {  //分页器
            el: '.banner-swiper-pagination'
          },
        })
  }
  goEdit=()=> {
    const { componkey } = this.props;
    const { homepageModuleId } = this.props.info.banner;
    const paneitem={
      title:'banner设置',
      key:`${componkey}edit-banner`,
      componkey:`${componkey}edit-banner`,
      parentKey:componkey,
      data:{
        homepageModuleId
      }
    };
    this.props.dispatch({
        type:'tab/firstAddTab',
        payload:paneitem
    })
  }
  render() {
    let { homepageInfoVo } =this.props.info;
    let { moduleContent, backgroundPicUrl,isDisplay, homepageModuleId } =this.props.info.banner;
    const fileDomain = JSON.parse(sessionStorage.getItem('fileDomain'));
    backgroundPicUrl = `${fileDomain}${backgroundPicUrl}`;
    return(
      <CommonMod
        homepageModuleId={homepageModuleId}
        className="banner-mod hasLine"
        style={{'background':`#fff url(${backgroundPicUrl}) center`}}>
        <div>
          {
            moduleContent&&moduleContent.length>0?
            ( moduleContent.length==1?
              <div className="swiper-slide" key={moduleContent[0].bannerId}>
                <img src={`${fileDomain}${moduleContent[0].bannerPic}`}/>
              </div>
              :
              <div className="swiper-container banner-swiper-container">
                <div className="swiper-wrapper">
                  {
                    moduleContent.map((el,index) => (
                      <div className="swiper-slide" key={el.bannerId}>
                        <img src={`${fileDomain}${el.bannerPic}`}/>
                      </div>
                    ))
                  }
                </div>
                <div className="banner-swiper-pagination swiper-pagination"></div>
              </div>
            )
            :
            <div className="no-module-data banner-no-module">Banner模块</div>
          }
          <div className="handle-btn-action">
            {
              !this.props.data.info&&homepageInfoVo&&!!homepageInfoVo.releasable&&
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
// export default BannerMod;
export default connect(mapStateToProps)(BannerMod);
