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

class GoodsList extends Component {
  render() {
    console.log(this.props)
    return (
      <div className="goods-common-components">
        <Row wrap>
          <Col span={8}>
            <div className="goods-item-content">
              <div className="goods-action-top">
                <div className="part-l"></div>
                <div className="part-r">
                  <p className="goods-name">想不出商品名字</p>
                  <p className="goods-property">库存：200</p>
                  <p className="goods-property">售价：200</p>
                </div>
              </div>
              <div className="goods-action-bottom">
                <Button size="small" disabled className="event-btn">售卖</Button>
                <Button size="small" className="event-btn">停售</Button>
                <Button size="small" className="event-btn">编辑</Button>
                <Button size="small" className="event-btn">日志</Button>
              </div>
            </div>
          </Col>
          <Col span={8}>
            <div className="goods-item-content">
              <div className="goods-action-top">
                <div className="part-l"></div>
                <div className="part-r">
                  <p className="goods-name">想不出商品名字</p>
                  <p className="goods-property">库存：200</p>
                  <p className="goods-property">售价：200</p>
                </div>
              </div>
              <div className="goods-action-bottom">
                <Button size="small" disabled className="event-btn">售卖</Button>
                <Button size="small" className="event-btn">停售</Button>
                <Button size="small" className="event-btn">编辑</Button>
                <Button size="small" className="event-btn">日志</Button>
              </div>
            </div>
          </Col>
          <Col span={8}>
            <div className="goods-item-content">
              <div className="goods-action-top">
                <div className="part-l"></div>
                <div className="part-r">
                  <p className="goods-name">想不出商品名字</p>
                  <p className="goods-property">库存：200</p>
                  <p className="goods-property">售价：200</p>
                </div>
              </div>
              <div className="goods-action-bottom">
                <Button size="small" disabled className="event-btn">售卖</Button>
                <Button size="small" className="event-btn">停售</Button>
                <Button size="small" className="event-btn">编辑</Button>
                <Button size="small" className="event-btn">日志</Button>
              </div>
            </div>
          </Col>
          <Col span={8}>
            <div className="goods-item-content">
              <div className="goods-action-top">
                <div className="part-l"></div>
                <div className="part-r">
                  <p className="goods-name">想不出商品名字</p>
                  <p className="goods-property">库存：200</p>
                  <p className="goods-property">售价：200</p>
                </div>
              </div>
              <div className="goods-action-bottom">
                <Button size="small" disabled className="event-btn">售卖</Button>
                <Button size="small" className="event-btn">停售</Button>
                <Button size="small" className="event-btn">编辑</Button>
                <Button size="small" className="event-btn">日志</Button>
              </div>
            </div>
          </Col>
          <Col span={8}>
            <div className="goods-item-content">
              <div className="goods-action-top">
                <div className="part-l"></div>
                <div className="part-r">
                  <p className="goods-name">想不出商品名字</p>
                  <p className="goods-property">库存：200</p>
                  <p className="goods-property">售价：200</p>
                </div>
              </div>
              <div className="goods-action-bottom">
                <Button size="small" disabled className="event-btn">售卖</Button>
                <Button size="small" className="event-btn">停售</Button>
                <Button size="small" className="event-btn">编辑</Button>
                <Button size="small" className="event-btn">日志</Button>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { goodslist } = state.goods;
  return { goodslist }
}

export default connect(mapStateToProps)(GoodsList);
