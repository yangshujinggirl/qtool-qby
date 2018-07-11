import React ,{ Component } from 'react';
import {
  Row,
  Col,
  Input,
  Button,
  Icon,
} from 'antd';

class GoodsList extends Component {
  render() {
    console.log(this.props)
    return (
      <div>
        <Row wrap>
          <Col span={8}>
            <div className="goods-item-content">
              <div className="goods-action-top">1</div>
              <div className="goods-action-bottom">2</div>
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}

export default GoodsList;
