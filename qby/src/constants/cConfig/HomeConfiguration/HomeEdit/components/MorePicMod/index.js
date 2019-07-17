import react, { Component } from "react";
import { connect } from 'dva';
import { Button } from "antd";
import "./index.less";

class MorePicMod extends Component {
  goEdit = () => {
    const { componkey } = this.props;
    const { homepageModuleId } = this.props.info.picMix;
    const paneitem = {
      title: "多图片组合",
      key: `${componkey}edit-more-pic`,
      componkey: `${componkey}edit-more-pic`,
      data: {
        homepageModuleId
      }
    };
    this.props.dispatch({
      type: "tab/firstAddTab",
      payload: paneitem
    });
  };
  render() {
    let { moduleContent, backgroundPicUrl, isDisplay } =this.props.info.picMix;
    const fileDomain = JSON.parse(sessionStorage.getItem('fileDomain'));
    backgroundPicUrl = `${fileDomain}${backgroundPicUrl}`;
    let mapDex={
      41:'0',
      42:'1',
      43:'2'
    }
    let lImg,tImg,bImg;
    moduleContent&&moduleContent.map((el,index) => {
      if(el.position==41) {
        lImg = el.picUrl;
      } else if(el.position==42) {
        tImg = el.picUrl;
      } else if(el.position==43) {
        bImg = el.picUrl;
      }
    })
    return (
      <div className="common-sty morePic-mod" style={{'background':`#fff url(${backgroundPicUrl})`}}>
        <div className="mod-wrap">
          <div className="mod-common-head">
            <div className="hd-item">多商品组合</div>
            <p className="hd-item">查看更多</p>
          </div>
          <div className="main-layout">
            <div className="layout-l">
              {lImg&&<img src={`${fileDomain}${lImg}`}/>}
            </div>
            <div className="layout-r">
              <div className="lay-t">
                {tImg&&<img src={`${fileDomain}${tImg}`}/>}
              </div>
              <div className="lay-b">
                {bImg&&<img src={`${fileDomain}${bImg}`}/>}
              </div>
            </div>
          </div>
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
export default connect(mapStateToProps)(MorePicMod);
