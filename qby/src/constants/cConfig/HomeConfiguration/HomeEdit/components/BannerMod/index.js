import react, { Component } from 'react';
import { Button } from 'antd';
import { connect } from 'dva';
import Swiper from 'swiper/dist/js/swiper.js';
import 'swiper/dist/css/swiper.min.css';
import './index.less';

class BannerMod extends Component {
  componentDidUpdate() {
    new Swiper ('.banner-swiper-container', {
          loop: true,  //循环
          speed:200,
          observer: true,
          observeParents:true,
          autoplay: {   //滑动后继续播放（不写官方默认暂停）
            disableOnInteraction: false,
          },
          pagination: {  //分页器
            el: '.swiper-pagination'
          }
        })
  }
  goEdit=()=> {
    const { componkey } = this.props;
    const { homepageModuleId } = this.props.info.banner;
    const paneitem={
      title:'banner设置',
      key:`${componkey}edit-banner`,
      componkey:`${componkey}edit-banner`,
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
    let { moduleContent, backgroundPicUrl,isDisplay } =this.props.info.banner;
    const fileDomain = JSON.parse(sessionStorage.getItem('fileDomain'));
    backgroundPicUrl = `${fileDomain}${backgroundPicUrl}`;
    return(
      <div className="common-sty banner-mod" style={{'background':`#fff url(${backgroundPicUrl}) center`}}>
        {
          moduleContent&&moduleContent.length>0?
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
            <div className="swiper-pagination"></div>
          </div>
          :
          <div className="no-module-data banner-no-module">Banner模块</div>
        }
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
// export default BannerMod;
export default connect(mapStateToProps)(BannerMod);
