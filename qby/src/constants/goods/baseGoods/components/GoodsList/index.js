import React ,{ Component } from 'react';
import { connect } from 'dva';
import {
  Row,
  Col,
  Input,
  Button,
  Icon,
} from 'antd';

import './index.css';

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
    const { list=[], onOperateClick } = this.props;
    const filePath = JSON.parse(sessionStorage.getItem('fileDomain'));

    return (
      <div className="goods-common-components">
        <Row wrap>
          {
            list.length>0 && list.map((el,index) => (
              <Col span={8} key={index}>
                <div className="goods-item-content">
                  <div className="goods-action-top" onClick={()=>onOperateClick(el.pdSpuId,'detail')}>
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
                    <Button size="small" disabled className="event-btn" onClick={()=>onOperateClick(el,'sell')}>售卖</Button>
                    <Button size="small" className="event-btn" onClick={()=>onOperateClick(el,'saleStop')}>停售</Button>
                    <Button size="small" className="event-btn" onClick={()=>onOperateClick(el,'edit')}>编辑</Button>
                    <Button size="small" className="event-btn" onClick={()=>onOperateClick(el,'log')}>日志</Button>
                  </div>
                </div>
              </Col>
            ))
          }
        </Row>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { goodslist } = state.goods;
  return { goodslist }
}

export default GoodsList;