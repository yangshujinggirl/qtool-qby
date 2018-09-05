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
import nogoodsImg from '../../../../../assets/nogoods.png';

//产品属性icon
const IconList =({data})=>(
  <div className="label-icon-list">
    {
      !!data.skuStatus &&<img src={iconSkuStatus} />
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
  getMinPrice(record) {
    let pdSkus = record.pdSkus;
    let priceArr = [];
    if( pdSkus && pdSkus.length>0) {
      pdSkus.map((el) => {
        if(el.toCPrice!=null) {
          let itemPrice = {
            toCPrice:el.toCPrice,
            sortPrice:Number(el.toCPrice)
          }
          priceArr.push(itemPrice)
        }
        return el;
      })
      return this.sortPrice(priceArr);
    } else {
      return record.toCPrice;
    }
  }
  sortPrice(priceArr) {
    let minPrice;
    if(priceArr.length>0) {
      priceArr.sort((a,b)=> {
        return a.sortPrice-b.sortPrice;
      })
      minPrice = priceArr[0].toCPrice;
    } else {
      minPrice = '';
    }
    return minPrice;
  }
  render() {
    const { onOperateClick } = this.props;
    const { dataList, authorityList } = this.props.cTipGoodsList;
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
                      onClick={(event)=>this.handleClick(event,el)}>
                      {el.cname?el.cname:el.name}
                    </p>
                    <p className="goods-property">零售价：{this.getMinPrice(el)}</p>
                    <IconList data={el}/>
                  </div>
                </div>
                <div className="goods-action-bottom">
                  {
                    authorityList.authoritySale&&
                    <span>
                      <Button
                        size="small"
                        disabled={el.cstatus == 20?false:true}
                        className="event-btn"
                        onClick={()=>onOperateClick(el,'sell')}>上线</Button>
                      <Button
                        size="small"
                        disabled={el.cstatus == 20?true:false}
                        className="event-btn"
                        onClick={()=>onOperateClick(el,'saleStop')}>下线</Button>
                    </span>
                  }
                  {
                    authorityList.authorityEdit&&
                    <Button
                      size="small"
                      className="event-btn"
                      onClick={()=>onOperateClick(el,'edit')}>编辑</Button>
                  }
                  <Button
                    size="small"
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
  const { cTipGoodsList } = state;
  return { cTipGoodsList };
}
export default connect(mapStateToProps)(GoodsList);
