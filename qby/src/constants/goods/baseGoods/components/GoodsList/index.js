import React ,{ Component } from 'react';
import { connect } from 'dva';
import {
  Row,
  Col,
  Input,
  Button,
  Icon,
} from 'antd';

import './index.less';

import iconSkuStatus from '../../../../../assets/icon_skuStatus.png';
import iconInfoStatus from '../../../../../assets/icon_que.png';
import nogoodsImg from '../../../../../assets/nogoods.png';

//产品属性icon
const IconList =({data})=>(
  <div className="label-icon-list">
    {
      !!data.skuStatus &&<img src={iconSkuStatus} />//多
    }
    {
      !data.infoStatus &&<img src={iconInfoStatus} />//缺
    }
  </div>
)

class GoodsList extends Component {
  renderBtn =(el)=> {
    const { authorityList } =this.props.baseGoodsList;
    if(el.source==1) {
      if(authorityList.authorityOnline) {
        return <Button size="small"
                      className="event-btn"
                      onClick={()=>onOperateClick(el,'edit')}>编辑</Button>
      } else {
        return ''
      }
    } else {
      if(authorityList.authorityOutLine) {
        return <Button size="small"
                      className="event-btn"
                      onClick={()=>onOperateClick(el,'edit')}>编辑</Button>
      } else {
        return ''
      }
    }
  }
  render() {
    const { baseGoodsList, onOperateClick } = this.props;
    const filePath = JSON.parse(sessionStorage.getItem('fileDomain'));

    return (
      <ul className="common-goods-list">
        {
          baseGoodsList.dataList.length>0 && baseGoodsList.dataList.map((el,index) => (
              <li className="goods-item-content" key={index}>
                <div className="goods-action-top">
                  <div className="part-l">
                    {
                      el.mainPicUrl?
                      <img src={`${filePath}${el.mainPicUrl}`}/>
                      :
                      <img src={nogoodsImg}/>
                    }
                  </div>
                  <div className="part-r">
                    <p className="goods-name" onClick={()=>onOperateClick(el,'detail')}>{el.name}</p>
                    <IconList data={el}/>
                  </div>
                </div>
                <div className="goods-action-bottom">
                  {
                    this.renderBtn(el)
                  }
                  <Button size="small"
                    className="event-btn"
                    onClick={()=>onOperateClick(el,'log')}>日志</Button>
                </div>
              </li>
          ))
        }
      </ul>
    )
  }
}
function mapStateToProps(state) {
  const { baseGoodsList } = state;
  return { baseGoodsList };
}

export default connect(mapStateToProps)(GoodsList);
