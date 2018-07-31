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
import iconEventHot from '../../../../../assets/icon_hot.png';
import iconEventNew from '../../../../../assets/icon_new.png';
import iconIsDirectExpress from '../../../../../assets/icon_zhi.png';
import iconIsPresell from '../../../../../assets/icon_yu.png';

//产品属性icon
const IconList =({data})=>(
  <div className="label-icon-list">
    {
      data.skuStatus &&<img src={iconSkuStatus} />
    }
    {
      data.infoStatus &&<img src={iconInfoStatus} />
    }
    {
      data.eventHot &&<img src={iconEventHot} />
    }
    {
      data.eventNew &&<img src={iconEventNew} />
    }
    {
      data.isDirectExpress &&<img src={iconIsDirectExpress} />
    }
    {
      data.isPresell &&<img src={iconIsPresell} />
    }
  </div>
)

class GoodsList extends Component {
  render() {
    const { baseGoodsList, onOperateClick } = this.props;
    const filePath = JSON.parse(sessionStorage.getItem('fileDomain'));
    return (
      <ul className="common-goods-list">
        {
          baseGoodsList.dataList.length>0 && baseGoodsList.dataList.map((el,index) => (
              <li className="goods-item-content" key={index}>
                <div className="goods-action-top" onClick={()=>onOperateClick(el,'detail')}>
                  <div className="part-l">
                    <img src={`${filePath}${el.mainPicUrl}`}/>
                  </div>
                  <div className="part-r">
                    <p className="goods-name">{el.name}</p>
                    <p className="goods-property">库存：{el.inventory}</p>
                    <p className="goods-property">售价：{el.minPrice}</p>
                    <IconList data={el}/>
                  </div>
                </div>
                <div className="goods-action-bottom">
                  <Button size="small"
                    disabled={el.status==20?false:true}
                    className="event-btn"
                    onClick={()=>onOperateClick(el,'sell')}>售卖</Button>
                  <Button size="small"
                    disabled={el.status==20?true:false}
                    className="event-btn"
                    onClick={()=>onOperateClick(el,'saleStop')}>停售</Button>
                  <Button size="small"
                    className="event-btn"
                    onClick={()=>onOperateClick(el,'edit')}>编辑</Button>
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
