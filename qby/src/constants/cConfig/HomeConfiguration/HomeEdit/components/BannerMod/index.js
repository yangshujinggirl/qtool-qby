import react, { Component } from 'react';
import { Button } from 'antd';
import { connect } from 'dva';
import Swiper from 'swiper/dist/js/swiper.js';
import 'swiper/dist/css/swiper.min.css';
import './index.less';

class BannerMod extends Component {
  componentDidMount() {
    new Swiper ('.banner-swiper-container', {
          loop: true,  //循环
          speed:200,
          observer: true,
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
    const paneitem={
      title:'banner设置',
      key:`${componkey}edit-banner`,
      componkey:`${componkey}edit-banner`,
      data:{}
    };
    this.props.dispatch({
        type:'tab/firstAddTab',
        payload:paneitem
    })
  }
  render() {
    const list=[{
      name:'12',
      pic:'../../../../../../assets/goods.jpg'
    },{
      name:'13',
      pic:'../../../../../../assets/eye.png'
    }]
    return(
      <div className="common-sty banner-mod">
        <div className="swiper-container banner-swiper-container">
          <div className="swiper-wrapper">
            {
              list.map((el,index) => (
                <div className="swiper-slide" key={index}>
                  <img src={require('../../../../../../assets/goods.jpg')}/>
                </div>
              ))
            }
          </div>
          <div className="swiper-pagination"></div>
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
// export default BannerMod;
export default connect(mapStateToProps)(BannerMod);
