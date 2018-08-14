import React ,{ Component } from 'react';
import { connect } from 'dva';
import {
  Row,
  Col,
  Input,
  Button,
  Icon,
  Checkbox
} from 'antd';

import iconSkuStatus from '../../../../../assets/icon_skuStatus.png';
import iconIsDirectExpress from '../../../../../assets/icon_zhi.png';
import iconIsPresell from '../../../../../assets/icon_yu.png';
import nogoodsImg from '../../../../../assets/nogoods.png';

//产品属性icon
const IconList =({data})=>(
  <div className="label-icon-list">
    {
      !!data.skuStatus &&<img src={iconSkuStatus} />
    }
    {
      !!data.isDirectExpress &&<img src={iconIsDirectExpress} />
    }
    {
      !!data.isPresell &&<img src={iconIsPresell} />
    }
  </div>
)

class GoodsList extends Component {
  onChange(event,el) {
    event.stopPropagation();
    this.props.onChange(el)
  }
  handleClick(event,record) {
    event.stopPropagation();
    this.props.onOperateClick(record,'detail')
  }
  getMinPrice(el) {
    let pdSkus = el.pdSkus;
    let priceArr = [];
    if( pdSkus && pdSkus.length>0) {
      pdSkus.map((el) => {
        if(el.toBPrice!=null) {
          el.toBPrice = el.toBPrice*1;
          priceArr.push(el.toBPrice)
        }
        return el;
      })
      priceArr.sort((a,b)=> {
        return a-b;
      })
      let minPrice = priceArr[0];
      return minPrice;
    } else {
      return el.toBPrice;
    }
  }
  render() {
    const { bTipGoodsList, onOperateClick } = this.props;
    const { dataList, authorityList } = this.props.bTipGoodsList;
    const filePath = JSON.parse(sessionStorage.getItem('fileDomain'));
    return (
      <ul className="common-goods-list">
        {
          dataList.length>0 && dataList.map((el,index) => (
              <li className="goods-item-content" key={index}>
                <div className="goods-action-top">
                  <div className="part-l">
                    {
                      el.mainPicUrl?
                      <img src={`${filePath}${el.mainPicUrl}`}/>
                      :
                      <img src={nogoodsImg}/>
                    }
                    <div className="checkbox-wrap">
                      <Checkbox
                        checked={el.checked}
                        onChange={(event)=>this.onChange(event,el)}
                        key={el.pdSpuId}/>
                    </div>
                  </div>
                  <div className="part-r">
                    <p
                      className="goods-name"
                      onClick={(event)=>this.handleClick(event,el)}>{el.bname?el.bname:el.name}</p>
                    <p className="goods-property">库存：{el.qtyErp}</p>
                    <p className="goods-property">售价：{this.getMinPrice(el)}</p>
                    <IconList data={el}/>
                  </div>
                </div>
                <div className="goods-action-bottom">
                  {
                    authorityList.authoritySale&&
                    <span>
                      <Button
                        size="small"
                        disabled={el.status == 20?false:true} className="event-btn"
                        onClick={()=>onOperateClick(el,'sell')}>售卖</Button>
                      <Button
                        size="small"
                        disabled={el.status == 20?true:false}
                        className="event-btn"
                        onClick={()=>onOperateClick(el,'saleStop')}>停售</Button>
                    </span>
                  }
                  {
                    authorityList.authorityNew&&
                    <Button size="small"
                      className="event-btn"
                      onClick={()=>onOperateClick(el,'edit')}>编辑</Button>
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
  const { bTipGoodsList } = state;
  return { bTipGoodsList };
}
export default connect(mapStateToProps)(GoodsList);
