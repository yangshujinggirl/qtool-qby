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
      data:{
        homepageModuleId:this.props.info.flowProduct.homepageModuleId
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
      let { moduleContent, backgroundPicUrl,isDisplay } =this.props.info.flowProduct;
      let { flowProductList } =this.props;
      const fileDomain = JSON.parse(sessionStorage.getItem('fileDomain'));
      backgroundPicUrl = `${fileDomain}${backgroundPicUrl}`;
    return(
      <div className="common-sty classify-mod" style={{'background':`#fff url(${backgroundPicUrl})`}}>
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
                        <div className="swiper-slide" key={el.pdFlowTabId}>
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
            }
          </div>
          :
          <div className="no-module-data classify-noData">商品流模块</div>
        }
        <div className="handle-btn-action">
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
