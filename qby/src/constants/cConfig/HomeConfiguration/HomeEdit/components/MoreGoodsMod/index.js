import React, { Component } from 'react';
import { connect } from 'dva';
import { Button } from 'antd';
import Swiper from 'swiper/dist/js/swiper.js';
import './index.less';

class MoreGoodsMod extends Component {
  componentDidMount() {

  }
  goEdit=()=> {
    const { componkey } = this.props;
    const paneitem={
      title:'2行3列商品模块配置',
      key:`${componkey}edit-more-goods`,
      componkey:`${componkey}edit-more-goods`,
      data:{
        homepageModuleId:this.props.info.multilineProduct.homepageModuleId
      }
    };
    this.props.dispatch({
        type:'tab/firstAddTab',
        payload:paneitem
    })
  }
  render() {
    let { homepageModuleId, moduleContent, backgroundPicUrl } =this.props.info.multilineProduct;
    const fileDomain = JSON.parse(sessionStorage.getItem('fileDomain'));
    backgroundPicUrl = `${fileDomain}${backgroundPicUrl}`;
    return(
      <div className="common-sty more-goods-mod" style={{'background':`#${backgroundPicUrl})`}}>
        <div className="mod-wrap">
          <div className="mod-common-head">
            <div className="hd-item">
              2行3列商品模块
            </div>
            <p className="hd-item">查看更多</p>
          </div>
          {
            moduleContent&&moduleContent.length>0?
            <div className="mod-content">
              {
                moduleContent.map((el,index) => (
                  <div className="item-icon" key={index}>
                    <div className="pic-wrap"><img src={`${fileDomain}${el.pdPic}`}/></div>
                    <p className="title-level-one textTwoLine">{el.name}</p>
                    <p className="price">¥999.0</p>
                  </div>
                ))
              }
            </div>
            :
            <div className="no-module-data more-goods-noData">商品模块</div>
          }
        </div>
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
export default connect(mapStateToProps)(MoreGoodsMod);
