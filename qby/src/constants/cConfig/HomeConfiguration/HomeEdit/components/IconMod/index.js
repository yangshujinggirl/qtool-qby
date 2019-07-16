import React, { Component } from 'react';
import { connect } from 'dva';
import { Button } from 'antd';
import './index.less';

class IconMod extends Component {
  goEdit=()=> {
    const { componkey } = this.props;
    const paneitem={
      title:'icon模块',
      key:`${componkey}edit-icon`,
      componkey:`${componkey}edit-icon`,
      data:{
        homepageModuleId:this.props.info.icon.homepageModuleId,
        homepageId:this.props.data.homepageId
      }
    };
    this.props.dispatch({
        type:'tab/firstAddTab',
        payload:paneitem
    })
  }
  render() {
    let { moduleContent, backgroundPicUrl, isDisplay } =this.props.info.icon;
    const fileDomain = JSON.parse(sessionStorage.getItem('fileDomain'));
    backgroundPicUrl = `${fileDomain}${backgroundPicUrl}`;
    return(
      <div className="common-sty icon-mod" style={{'background':`#fff url(${backgroundPicUrl})`}}>
        {
          moduleContent&&moduleContent.length>0?
          <div className="mod-wrap">
            {
              moduleContent&&moduleContent.map((el,index) => (
                <div className="item-icon" key={el.iconId}>
                  <div className="pic-wrap"><img src={`${fileDomain}${el.iconPic}`}/></div>
                  <p>{el.iconName}</p>
                </div>
              ))
            }
          </div>
          :
          <div className="no-module-data icon-no-data">Icon 模块</div>
        }
        {
          !isDisplay&&<div className="hiddle-module"></div>
        }
        <div className="handle-btn-action">
          <Button onClick={this.goEdit}>编辑</Button>
          <Button onClick={()=>this.props.toggleShow(homepageModuleId,isDisplay)}>{isDisplay?'隐藏':'展开'}</Button>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { homeEdit } =state;
  return homeEdit;
}
export default connect(mapStateToProps)(IconMod);
